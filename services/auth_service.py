from database import AsyncSessionLocal
from bcrypt import hashpw, gensalt, checkpw
from models.models import User
from fastapi import HTTPException, status
from jwt import encode, decode
from dotenv import dotenv_values
from sqlalchemy import select

config=dotenv_values(".env")


class AuthService:
    def __init__(self) -> None:
        pass

    @staticmethod
    @staticmethod
    async def authorize_user(userData):
        async with AsyncSessionLocal() as session:
            stmt = select(User).where(User.email == userData.email)
            result = await session.execute(stmt)
            existing_user = result.scalar_one_or_none()

            if not existing_user:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Unauthorized"
                )

            if not checkpw(userData.password.encode(), existing_user.password_hash.encode()):
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid credentials"
                )

            return {
                "access_token": "mock_access_token",    # <- Wygeneruj JWT tutaj
                "refresh_token": "mock_refresh_token"   # <- lub pomiń
            }
                     
    @staticmethod
    def hash_password(password:str):
        password_bytes=password.encode("utf-8")
        salt= gensalt()
        hashed_password=hashpw(password_bytes, salt)
        print(hashed_password)
        return hashed_password
    
    @staticmethod
    def encode_jwt(payload, algorithm="HS-256"):
         if payload:
              encoded_jwt=encode({payload},key=config["SECRET_KEY"], algorithm=algorithm) 
              return encoded_jwt
         else:
              raise Exception("Not given payload")
    @staticmethod
    def decode_jwt(payload, algorithm="HS-256"):
         if payload:
              decoded_jwt=decode({payload}, key=config["SECRET_KEY"], algorithm=algorithm)
              return decoded_jwt
         else:
              raise Exception("Not given payload")
         
         



        
