from fastapi import APIRouter
from fastapi.responses import JSONResponse
from schemas.schemas import LoginRequest, AccountantRegisterData, ClientRegisterData
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


@router.post("/register-accountant", tags=["Autoryzacja"])
async def register_accountant(data: AccountantRegisterData):
    auth_response = await auth_service.registerAccountant(data)
    return auth_response


@router.post("/register-client", tags=["Autoryzacja"])
async def register_client(data: ClientRegisterData):
    auth_response = await auth_service.registerClient(data)
    return auth_response
