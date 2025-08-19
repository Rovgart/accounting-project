from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    ForeignKey,
    Float,
    DateTime,
    Boolean,
    Enum,
)
import enum

from datetime import datetime
from sqlalchemy.orm import relationship, DeclarativeBase


class UserRole(enum.Enum):
    ADMIN = "ADMIN"
    CLIENT = "CLIENT"
    ACCOUNTANT = "ACCOUNTANT"


class Base(DeclarativeBase):
    pass


class Status(enum.Enum):
    ACTIVE = "ACTIVE"
    PENDING = "PENDING"


class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False)
    firstname = Column(String(255), nullable=False)
    lastname = Column(String(255), nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), nullable=False, default=UserRole.CLIENT)
    status = Column(Enum(Status), nullable=False, default=Status.ACTIVE)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    isAccountantRegistration = Column(Boolean, default=False)

    clients = relationship("Client", back_populates="user")


class Client(Base):
    __tablename__ = "clients"
    client_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.user_id", ondelete="SET NULL"))
    company_name = Column(String, nullable=False)
    nip = Column(String)
    email = Column(String)
    phone = Column(String)
    address_street = Column(String)
    address_postal = Column(String)
    address_city = Column(String)
    address_country = Column(String)
    notes = Column(String)
    created_at = Column(Date)
    updated_at = Column(Date)

    user = relationship("User", back_populates="clients")
    invoices = relationship("Invoice", back_populates="client")


class Invoice(Base):
    __tablename__ = "invoices"

    invoice_id = Column(Integer, primary_key=True)
    invoice_number = Column(String, nullable=False)
    companyName = Column(String)
    client_id = Column(Integer, ForeignKey("clients.client_id", ondelete="CASCADE"))

    client = relationship("Client", back_populates="invoices")
    details = relationship("InvoiceDetail", back_populates="invoice")


class InvoiceDetail(Base):
    __tablename__ = "invoice_details"

    invoice_detail_id = Column(Integer, primary_key=True)
    invoice_id = Column(Integer, ForeignKey("invoices.invoice_id", ondelete="CASCADE"))

    product_name = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Float, nullable=False)
    total_price = Column(Float, nullable=False)

    invoice = relationship("Invoice", back_populates="details")
