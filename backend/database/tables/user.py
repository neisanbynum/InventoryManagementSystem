from typing import Optional
from pydantic import EmailStr, SecretStr
from sqlmodel import Field, SQLModel
from bcrypt import checkpw


class User(SQLModel, table=True):
    userID: int = Field(primary_key=True, index=True)
    last: str = Field(index=True)
    first: str
    middle: Optional[str] = None
    email: EmailStr
    phone: str = Field(min_length=10, max_length=10)


class Credential(SQLModel, table=True):
    userID: int = Field(primary_key=True, index=True)
    password: SecretStr

    def check_password(self, password: str) -> bool:
        return checkpw(
            password.encode("utf-8"), self.password.get_secret_value().encode("utf-8")
        )
