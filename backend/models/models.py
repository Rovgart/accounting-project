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


class UserModel(Base):
    __tablename__ = "users"
    user_id = Column(Integer, primary_key=True, index=True)
    email = Column(
        String(255),
        nullable=False,
        unique=False,
    )
    password_hash = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), nullable=False, default=UserRole.CLIENT)
    status = Column(Enum(Status), nullable=False, default=Status.PENDING)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    isAccountantRegistration = Column(Boolean, default=False)
    clients = relationship("Client", back_populates="user")
    accountants = relationship(
        "Accountant", back_populates="user", foreign_keys="Accountant.user_id"
    )


class Client(Base):
    __tablename__ = "clients"
    client_id = Column(
        Integer,
        primary_key=True,
    )
    user_id = Column(Integer, ForeignKey("users.user_id", ondelete="SET NULL"))
    accountant_id = Column(String, ForeignKey("accountants.accountant_id"))
    firstname = Column(String, nullable=False, unique=False)
    lastname = Column(String, nullable=False, unique=False)
    company_name = Column(String, nullable=True, unique=True)
    nip = Column(String, nullable=False, unique=True)
    phone = Column(String, nullable=True, unique=False)
    created_at = Column(Date, nullable=False, unique=False)
    updated_at = Column(Date, nullable=False, unique=False)
    user = relationship("UserModel", back_populates="clients")
    invoices = relationship("Invoice", back_populates="client")


class Accountant(Base):
    __tablename__ = "accountants"
    accountant_id = Column(String(255), primary_key=True, index=True)
    user_id = Column(
        String(255), ForeignKey("users.user_id", ondelete="SET NULL"), nullable=True
    )

    email = Column(String(255), nullable=False)
    firstname = Column(String(255), nullable=False, unique=False)
    lastname = Column(String(255), nullable=False, unique=False)
    officeName = Column(String(255), nullable=False, unique=True)
    certificateNumber = Column(String(255), nullable=False, unique=False)
    officeAddress = Column(String(255), nullable=False, unique=False)
    phoneNumber = Column(String(20), nullable=False)
    isVerified = Column(Boolean(), nullable=False, unique=False, default=0)
    user = relationship("UserModel", back_populates="accountants")
    invoices = relationship("Invoice", back_populates="accountant")


class Invoice(Base):
    __tablename__ = "invoices"

    invoice_id = Column(Integer, primary_key=True)
    invoice_number = Column(String, nullable=False)
    companyName = Column(String)
    client_id = Column(Integer, ForeignKey("clients.client_id", ondelete="CASCADE"))

    client = relationship("Client", back_populates="invoices")
    details = relationship("InvoiceDetail", back_populates="invoice")
    accountant = relationship("Accountant", back_populates="invoices")
    accountant_id = Column(String(255), ForeignKey("accountants.accountant_id"))


class InvoiceDetail(Base):
    __tablename__ = "invoice_details"

    invoice_detail_id = Column(Integer, primary_key=True)
    invoice_id = Column(Integer, ForeignKey("invoices.invoice_id", ondelete="CASCADE"))

    product_name = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Float, nullable=False)
    total_price = Column(Float, nullable=False)

    invoice = relationship("Invoice", back_populates="details")


class UserTokens(Base):
    __tablename__ = "user_tokens"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"))
    token = Column(String, nullable=True)
    expires_at = Column(DateTime, nullable=False)
    type = Column(String)
