import os
from typing import Optional
from bcrypt import gensalt, hashpw
from dotenv import load_dotenv
from pydantic import BaseModel, EmailStr, Field

from database import User, Credential
from database.relationships import TeamUser


load_dotenv()

class Register(BaseModel):
    userID: int | str
    teamID: int | str
    last: str
    first: str
    middle: Optional[str] = None
    email: EmailStr
    phone: int | str
    password: str = Field(exclude=True, min_length=8, max_length=24, nullable=False)
    passwordConfirm: str

    def model_post_init(self, __context):
        if self.password != self.passwordConfirm:
            raise ValueError("Passwords do not match")
        self.userID = int(self.userID)
        self.teamID = int(self.teamID)
        rawPhone = str(self.phone)
        self.phone = f"+1({rawPhone[0:3]})-{rawPhone[3:6]}-{rawPhone[6:10]}"
        self.password = hashpw((self.password + os.getenv('PASSWORD_PEPPER')).encode(), gensalt()).decode("utf-8")
        self.passwordConfirm = None
        return super().model_post_init(__context)

    @property
    def user(self):
        return User(
            userID=self.userID,
            last=self.last,
            first=self.first,
            middle=self.middle,
            email=self.email,
            phone=self.phone,
        )

    @property
    def credential(self):
        return Credential(userID=self.userID, password=self.password)
    
    @property
    def teamRelation(self):
        return TeamUser(teamID=self.teamID, userID=self.userID)
