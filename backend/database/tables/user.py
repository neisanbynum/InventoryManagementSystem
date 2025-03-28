import os
from typing import Optional
from dotenv import load_dotenv
from pydantic import EmailStr
from sqlmodel import Field, SQLModel, Session
from bcrypt import checkpw

from database.engine import engine

load_dotenv()

class User(SQLModel, table=True):
    userID: int = Field(primary_key=True, index=True, unique=True)
    last: str = Field(index=True)
    first: str
    middle: Optional[str] = None
    email: EmailStr
    phone: str = Field(min_length=16, max_length=16)

    @property
    def name(self) -> dict[str, Optional[str]]:
        return {"last": self.last, "first": self.first, "middle": self.middle}

    @property
    def contact(self) -> dict[str, str]:
        return {"email": self.email, "phone": self.phone}
    
    @property
    def teams(self) -> list[int]:
        with Session(engine) as session:
            return [team.teamID for team in session.get('TeamUser', self.userID)]


class Credential(SQLModel, table=True):
    userID: int = Field(primary_key=True, index=True, unique=True)
    password: str = Field(exclude=True, min_length=8, max_length=24, nullable=False)
    tries: int = Field(default=0)
    
    @property
    def locked(self) -> bool:
        return self.tries >= 3

    def check_password(self, password: str) -> bool:
        return checkpw(
            (password + os.getenv("PASSWORD_PEPPER")).encode("utf-8"), self.password.encode("utf-8")
        )
