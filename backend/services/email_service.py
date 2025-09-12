from fastapi_mail import ConnectionConfig, FastMail, MessageSchema
from pydantic import EmailStr
import asyncio
from services.jwt_service import Jwt_Service
from utils import generate_random_token


class Email_Service:
    def __init__(self, jwt_service: Jwt_Service):
        self.jwt_service = jwt_service
        self.conf = ConnectionConfig(
            MAIL_USERNAME="Sierra Wehner",
            MAIL_PASSWORD="7Jj7RaZwvnXBh1Pssp",
            MAIL_FROM="sierra.wehner@ethereal.email",
            MAIL_SERVER="smtp.ethereal.email",
            MAIL_PORT=587,
            MAIL_SSL_TLS=False,
            MAIL_STARTTLS=True,
            USE_CREDENTIALS=True,
            VALIDATE_CERTS=True,
        )

    async def send_verification_email(self, email_to: EmailStr, token: str):
        random_token = generate_random_token()
        activation_link = f"http://localhost:8000/api/auth/verify?token={random_token}"

        message = MessageSchema(
            subject="Aktywacja konta",
            recipients=[email_to],
            body=f"Witaj!\n Kliknij w link, aby aktywować konto: \n{activation_link}",
            subtype="plain",
        )
        fm = FastMail(self.conf)
        await fm.send_message(message)
