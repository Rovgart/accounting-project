from fastapi import APIRouter
from fastapi.responses import JSONResponse
from schemas.schemas import UserData, LoginRequest
from services.auth_service import AuthService, Jwt_Service

router = APIRouter()
auth_service = AuthService(jwt_service=Jwt_Service())


@router.post("/login", tags=["Autoryzacja"])
async def login_user(data: LoginRequest) -> JSONResponse:
    result = await auth_service.authorize_user(data)
    return JSONResponse(
        status_code=200,
        content={"message": result.message, "access_token": result.access_token},
    )


@router.post("/register", tags=["Autoryzacja"])
async def register_client(data: UserData) -> JSONResponse:
    result = await auth_service.register(data)
    return JSONResponse(
        status_code=201,
        content={"message": result.message, "access_token": result.access_token},
    )
