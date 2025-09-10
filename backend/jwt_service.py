from jwt import encode, decode
from dotenv import dotenv_values
from schemas.schemas import JWTPayload

config = dotenv_values(".env")


class Jwt_Service:
    def __init__(self) -> None:
        pass

    SECRET_KEY = config["SECRET_KEY"]
    ALGORITHM = config["ALGORITHM"]

    def encode_jwt(self, payload):
        if payload:
            encoded_jwt = encode(payload, key=self.SECRET_KEY, algorithm=self.ALGORITHM)
            return encoded_jwt
        else:
            raise Exception("Not given payload")

    def decode_jwt(self, payload):
        if payload:
            decoded_jwt = decode(payload, key=self.SECRET_KEY, algorithm=self.ALGORITHM)
            return decoded_jwt
        else:
            raise Exception("Not given payload")
