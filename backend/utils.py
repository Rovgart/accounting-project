from models.models import Client, UserModel, Accountant
from database import AsyncSessionLocal
import secrets


class ClientStrategy:
    def add_user(self, user: Client):
        print(f"Dodaję kilenta o NIP {user.nip}")


class AccountantStrategy:
    def add_user(self, user: Accountant):
        print(f"Dodaję księgowego")


def generate_random_token():
    return secrets.token_bytes(32)
