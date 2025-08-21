from database import AsyncSessionLocal
from bcrypt import hashpw, gensalt, checkpw
from fastapi import HTTPException, status
from dotenv import dotenv_values
from sqlalchemy import select
from models.models import UserModel, Client, Accountant
from schemas.schemas import AuthResponse, UserData, LoginRequest,User, UserContext
from utils import ClientStrategy,AccountantStrategy
from datetime import datetime
from .jwt_service import Jwt_Service


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

        user_bytes = userData.password.encode("utf-8")

        if not checkpw(user_bytes, existing_user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials",
            )
        token_payload = {"email": userData.email}
        token = self.jwt_service.encode_jwt(token_payload)
        return AuthResponse(message="Successfully login !", access_token=token)

    async def register(self, userData: UserData) -> AuthResponse:
        if userData.role=="client":
            context=UserContext(ClientStrategy)
            context.add_user()
        if userData.role=="accountant":
            context=UserContext(AccountantStrategy)
          
            context.add_user()
        async with AsyncSessionLocal() as session:
            stmt = select(User).where(User.email == userData.email)
            result = await session.execute(stmt)
            existing_user = result.scalar_one_or_none()

            if existing_user:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
        hashed_password = self.hash_password(userData.password)
        new_user = UserModel(
            email=userData.email,
            firstname=userData.firstname,
            lastname=userData.lastName,
            password_hash=hashed_password,
            created_at=datetime.now(),
        )
        token_payload = {
            "user_id": new_user.user_id,
            "email": new_user.email,
        }
        session.add(new_user)
        await session.commit()
        await session.refresh(new_user)
        token = self.jwt_service.encode_jwt(token_payload)
        return AuthResponse(message="Successfully created user", access_token=token)

    @staticmethod
    def hash_password(password: str):
        password_bytes = password.encode("utf-8")
        salt = gensalt()
        hashed_password = hashpw(password_bytes, salt)
        print(hashed_password)
        return hashed_password




