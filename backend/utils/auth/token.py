from datetime import datetime, timedelta
import os

from dotenv import load_dotenv
import jwt
from pydantic import BaseModel
from sqlmodel import Session

from database import engine
from database.tables.auth import RefreshToken


load_dotenv()


def accessToken(userID: int):
    exp = (
        datetime.now() + timedelta(minutes=int(os.getenv("ACCESS_TOKEN_EXP")))
    ).timestamp()
    return jwt.encode(
        {"userID": userID, "exp": exp},
        os.getenv("ACCESS_TOKEN_SECRET"),
        os.getenv("ALGORITHM"),
    )


def refreshToken(userID: int):
    exp = (
        datetime.now() + timedelta(days=int(os.getenv("REFRESH_TOKEN_EXP")))
    ).timestamp()
    token = jwt.encode(
        {"userID": userID, "exp": exp},
        os.getenv("REFRESH_TOKEN_SECRET"),
        os.getenv("ALGORITHM"),
    )

    with Session(engine) as session:
        exist = session.get(RefreshToken, userID)
        if exist is None:
            session.add(RefreshToken(userID=userID, token=token, exp=exp))
        else:
            exist.token = token
            exist.exp = exp

        session.commit()

    return token

class Payload(BaseModel):
    userID: int | str
    exp: int

    def model_post_init(self, __context):
        self.userID = int(self.userID)
        return super().model_post_init(__context)