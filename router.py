from fastapi import APIRouter
from fastapi.responses import JSONResponse
from schemas.schemas import AuthResponse, LoginResponse
from services.auth_service import AuthService

router = APIRouter()
auth_service = AuthService()

@router.post("/login", tags=["Autoryzacja"])
async def login_user(data: LoginResponse) -> JSONResponse:
    result = await auth_service.authorize_user(data)
    return JSONResponse(status_code=200, content={
        "access_token": result["access_token"],
        "refresh_token": result["refresh_token"]
    })


@router.post("/register", tags=["Autoryzacja"])
async def register_user(data: LoginResponse) -> JSONResponse:
    # result = await auth_service.reg(data)
    return JSONResponse(status_code=201, content={
        "access_token": "access_token",
        "refresh_token": "refresh_token"
    })
