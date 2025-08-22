from models.models import Client, UserModel, Accountant
from database import AsyncSessionLocal


class ClientStrategy:
    def add_user(self, user: Client):
        print(f"Dodaję kilenta o NIP {user.nip}")


class AccountantStrategy:
    def add_user(self, user: Accountant):
        print(f"Dodaję księgowego")
