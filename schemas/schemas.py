from pydantic import BaseModel, EmailStr, StringConstraints
from typing import Optional
from datetime import date
from typing import Annotated



class AuthResponse(BaseModel):
    access_token:str
    refresh_token:str
class LoginResponse(BaseModel):
    email:str
    password:str
class UserModel(BaseModel):
    user_id: int
    email: EmailStr
    password_hash: Annotated[str, StringConstraints(min_length=8)]  
    role : Annotated[str, StringConstraints(pattern="^(accountant|client|admin)$")]
    created_at: date

    class Config:
        from_attributes = True


class ClientModel(BaseModel):
    client_id: int
    user_id: int
    company_name: str
    nip: str
    email: EmailStr
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


class InvoiceModel(BaseModel):
    invoice_id: int
    invoice_number: str
    companyName: str
    client_id: int

    class Config:
        from_attributes = True

class InvoiceDetailModel(BaseModel):
    invoice_detail_id: int
    invoice_id: int
    product_name: str
    quantity: int
    unit_price: float
    total_price: float  # np. quantity * unit_price

    class Config:
        from_attributes = True
