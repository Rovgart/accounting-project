from typing import Union
from router import router
from contextlib import asynccontextmanager

from fastapi import FastAPI

app = FastAPI()

app.include_router(router, prefix="/auth")
