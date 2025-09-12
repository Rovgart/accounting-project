from database import AsyncSessionLocal
from bcrypt import hashpw, gensalt
from fastapi import HTTPException, status
from dotenv import dotenv_values
from sqlalchemy import select
from models.models import UserModel, Accountant, Client
from schemas.schemas import (
    AuthResponse,
    LoginRequest,
    AccountantRegisterData,
    ClientRegisterData,
    JWTPayload,
)
from services.email_service import Email_Service
from .jwt_service import Jwt_Service
from models.models import UserRole, UserTokens
from datetime import datetime, timedelta, timezone

config = dotenv_values(".env")


class AuthService:
    def __init__(self, jwt_service: Jwt_Service, email_service: Email_Service) -> None:
        self.email_service = email_service
        self.jwt_service = jwt_service

    async def authorize_user(self, userData: LoginRequest) -> AuthResponse:
        async with AsyncSessionLocal() as session:
            stmt = select(UserModel).where(UserModel.email == userData.email)
            result = await session.execute(stmt)
            existing_user = result.scalar_one_or_none()

            if not existing_user:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                )

        token_payload = {"email": userData.email}
        token = self.jwt_service.encode_jwt(token_payload)
        return AuthResponse(message="Successfully login !", access_token=token)

    async def registerAccountant(
        self, accountantData: AccountantRegisterData
    ) -> AuthResponse:
        async with AsyncSessionLocal() as session:
            sql_query = select(Accountant).where(
                Accountant.certificateNumber == accountantData.certificateNumber
            )
            result2 = await session.execute(
                select(Accountant).where(
                    Accountant.officeName == accountantData.officeName
                )
            )
            result = await session.execute(sql_query)
            existing_certificate = result.scalar()
            existing_office = result2.scalar()
            if existing_office:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Podana nazwa biura juz istnieje.",
                )

            if existing_certificate:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Księgowy o podanym certyfikacie już istnieje",
                )
            new_user = await self.add_user_to_db("accountant", accountantData)
            if new_user:
                accountant = Accountant(
                    email=accountantData.email,
                    accountant_id=new_user.user_id,
                    user_id=new_user.user_id,
                    firstname=accountantData.firstname,
                    lastname=accountantData.lastname,
                    officeName=accountantData.officeName,
                    certificateNumber=accountantData.certificateNumber,
                    officeAddress=accountantData.officeAddress,
                    phoneNumber=accountantData.phoneNumber,
                )
                session.add(accountant)
                await session.commit()
                await session.refresh(accountant)
                expire = datetime.now((timezone.utc) + timedelta(minutes=15))
                token_payload = {
                    "user_id": new_user.user_id,
                    "email": new_user.email,
                    "exp": expire,
                }
                token = self.jwt_service.encode_jwt(token_payload)
                return AuthResponse(
                    access_token=token, message="Pomyślnie załozono konto"
                )

    async def registerClient(self, clientData: ClientRegisterData):
        async with AsyncSessionLocal() as session:
            statement1 = select(Client).where(
                Client.company_name == clientData.company_name
            )
            statement2 = select(Client).where(Client.nip == clientData.nip)

            result1 = await session.execute(statement1)
            result2 = await session.execute(statement2)

            existing_company_name = result1.scalar_one_or_none()
            existing_nip = result2.scalar_one_or_none()

            if existing_nip:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Podany klient z takim numerem NIP już istnieje",
                )
            if existing_company_name:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Podana nazwa firmy już istnieje",
                )

            new_user = await self.add_user_to_db("client", clientData)

            client = Client(
                user_id=new_user.user_id,
                firstname=clientData.firstname,
                lastname=clientData.lastname,
                company_name=clientData.company_name,
                nip=clientData.nip,
                phone=clientData.phone,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow(),
            )

            session.add(client)
            await session.commit()
            await session.refresh(client)

            expire = datetime.now(timezone.utc) + timedelta(minutes=15)
            token_payload = {
                "user_id": new_user.user_id,
                "email": new_user.email,
                "exp": int(expire.timestamp()),
            }
            token = self.jwt_service.encode_jwt(token_payload)

            await self.insert_temp_token(token, new_user.user_id)
            await self.email_service.send_verification_email(
                email_to=new_user.email, token=token
            )
            return AuthResponse(
                access_token=token,
                message="Pomyślnie założono konto! Sprawdź maila, aby aktywować.",
            )

    async def add_user_to_db(self, roleArg, userData):
        role_enum = UserRole[roleArg.upper()]  # np. "client" -> "CLIENT"

        async with AsyncSessionLocal() as session:
            statement = select(UserModel).where(UserModel.email == userData.email)
            result = await session.execute(statement)
            existing_user = result.scalar()
            if existing_user:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Użytkownik o takim adresie e-mail już istnieje",
                )

            new_user = UserModel(
                email=userData.email,
                password_hash=self.hash_password(userData.password),
                role=role_enum,
                status="PENDING",
                created_at=datetime.utcnow(),
                isAccountantRegistration=1 if UserRole == "accountant" else 0,
            )

            session.add(new_user)
            await session.commit()
            await session.refresh(new_user)
            return new_user

    @staticmethod
    def hash_password(password: str):
        password_bytes = password.encode("utf-8")
        salt = gensalt()
        hashed_password = hashpw(password_bytes, salt)
        print(hashed_password)
        return hashed_password

    @staticmethod
    async def insert_temp_token(token, user_id: int, minutes: int = 15):
        async with AsyncSessionLocal() as session:
            query = select(UserTokens).where(
                UserTokens.user_id == user_id, UserTokens.expires_at > datetime.utcnow()
            )
            result = await session.execute(query)
            existing_token = result.scalar()
            if existing_token:
                return existing_token

            expires = datetime.now() + timedelta(minutes=minutes)
            new_token = UserTokens(token=token, user_id=user_id, expires_at=expires)
            session.add(new_token)
            await session.commit()
            await session.refresh(new_token)
            return new_token

    async def verify_token(self, token: str):
        decoded_token = self.jwt_service.decode_jwt(token)
        async with AsyncSessionLocal() as session:
            query = select(UserTokens).where(
                UserTokens.user_id == decoded_token.user_id,
                UserTokens.expires_at > decoded_token.expires_at,
            )
            result = await session.execute(query)
            unexpired_token = result.scalar()

            if unexpired_token:
                activated_user = select(UserModel)
