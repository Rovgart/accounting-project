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
)
from datetime import datetime
from .jwt_service import Jwt_Service
from models.models import UserRole

config = dotenv_values(".env")


class AuthService:
    def __init__(self, jwt_service: Jwt_Service) -> None:
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
            result = await session.execute(sql_query)
            existing_certificate = result.scalar()
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
                token_payload = {"user_id": new_user.user_id, "email": new_user.email}
                token = self.jwt_service.encode_jwt(token_payload)
                return AuthResponse(
                    access_token=token, message="Successfully registered account !"
                )

    async def registerClient(self, clientData: ClientRegisterData):
        async with AsyncSessionLocal() as session:
            statement = select(Client).where(
                Client.company_name == clientData.company_name
            )

            result = await session.execute(statement)
            result2 = await session.execute(
                select(Client).where(Client.nip == clientData.nip)
            )

            existing_nip = result.scalar()
            existing_company_name = result2.scalar()

            if existing_nip:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Podany klient z takim numerem NIP już istnieje",
                )
            if existing_company_name:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Podany nazwa firmy już istnieje",
                )
            new_user = await self.add_user_to_db("client", clientData)
            client = Client(
                user_id=new_user.user_id,
                email=clientData.email,
                firstname=clientData.firstname,
                lastname=clientData.lastname,
                password=clientData.password,
                company_name=clientData.company_name,
                nip=clientData.nip,
                phone=clientData.phone,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow(),
            )

            session.add(client)
            await session.commit()
            await session.refresh(client)
            token_payload = {"user_id": new_user.user_id, "email": new_user.email}
            token = self.jwt_service.encode_jwt(token_payload)
            return AuthResponse(
                access_token=token, message="Successfully registered account !"
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
                status="ACTIVE",
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
