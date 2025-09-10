from pydantic import BaseModel, EmailStr, StringConstraints
from typing import Optional
from datetime import date
from typing import Annotated, Protocol


class JWTPayload(BaseModel):
    user_id: int
    email: str
    exp: str


class UserData(BaseModel):
    email: str
    firstname: str
    lastName: str
    password: str
    nip: str
    role: str
    companyAddress: str
    privacy_policy: bool
    isAccountant: bool


class LoginRequest(BaseModel):
    email: str
    password: str


class AuthResponse(BaseModel):
    message: str
    access_token: str


class LoginResponse(BaseModel):
    email: str
    password: str


class AccountantRegisterData(BaseModel):
    email: str
    firstname: str
    lastname: str
    password: str
    nip: str
    companyAddress: str
    officeName: str
    certificateNumber: str
    officeAddress: str
    phoneNumber: str
    companiesServed: str


class UserModel(BaseModel):
    user_id: int
    email: EmailStr
    password_hash: Annotated[str, StringConstraints(min_length=8)]
    role: Annotated[str, StringConstraints(pattern="^(accountant|client|admin)$")]
    created_at: date

    class Config:
        from_attributes = True


class ClientRegisterData(BaseModel):
    company_name: str
    nip: str
    email: EmailStr
    password: str
    phone: str
    address_street: str
    address_postal: str
    address_city: str
    address_country: str
    notes: Optional[str] = None
    created_at: date
    updated_at: Optional[date] = None

    class Config:
        from_attributes = True


class User:
    def __init__(self, user_id: str, email: str) -> None:
        self.user_id = user_id
        self.email = email


class UserStrategy(Protocol):
    def add_user(self, user: User) -> None:
        return


class Client(User):
    def __init__(self, user_id, email: str, nip) -> None:
        super().__init__(user_id=user_id, email=email)
        self.nip = nip


class Accountant(User):
    def __init__(
        self, user_id: EmailStr, email: EmailStr, certification_number: str
    ) -> None:
        super().__init__(user_id, email)
        self.certification_number = certification_number


class UserContext:
    def __init__(self, strategy) -> None:
        self.strategy = strategy

    def set_strategy(self, set_strategy):
        self.set_strategy = set_strategy

    def add_user(self, user: User):
        self.strategy.add_user(user)