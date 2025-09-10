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
        self, userData: AccountantRegisterData
    ) -> AuthResponse:
        if not userData.certificateNumber:
            raise HTTPException(
                status_code=400, detail="Certificate number is required"
            )
        new_user = await self.add_user_to_db("accountant", userData)
        async with AsyncSessionLocal() as session:
            accountant = Accountant(
                email=userData.email,
                user_id=new_user.user_id,
                firstname=userData.firstname,
                lastname=userData.lastname,
                officeName=userData.officeName,
                officeAddress=userData.officeAddress,
                phoneNumber=userData.phoneNumber,
                companiesServed=userData.companiesServed,
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
        new_user = await self.add_user_to_db("client", clientData)
        async with AsyncSessionLocal() as session:
            client = Client(
                user_id=new_user.user_id,
                email=clientData.email,
                company_name=clientData.company_name,
                nip=clientData.nip,
                phone=clientData.phone,
                address_street=clientData.address_street,
                address_postal=clientData.address_postal,
                address_city=clientData.address_city,
                address_country=clientData.address_country,
                notes=clientData.notes,
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
                    status_code=400,
                    detail="User with this email address already exists ",
                )
            new_user = UserModel(
                email=userData.email,
                password_hash=self.hash_password(userData.password),
                role=role_enum,
                status="ACTIVE",
                created_at=datetime.utcnow(),
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