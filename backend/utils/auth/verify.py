import os
from dotenv import load_dotenv
from fastapi import HTTPException, Request, status
import jwt
from sqlmodel import Session
from database import engine
from database.tables.auth import BlacklistToken, RefreshToken
from utils.auth.token import Payload


load_dotenv()

def verify_access(token: str) -> Payload | None:
    with Session(engine) as session:
        blacklist = session.get(BlacklistToken, token)
        if blacklist is not None:
            raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail="Not Authenticated")
        
    try:
        payload = jwt.decode(token, os.getenv('ACCESS_TOKEN_SECRET'), os.getenv('ALGORITHM'))
        return Payload(**payload)
    except jwt.ExpiredSignatureError:
        return


def verify_refresh(token: str) -> Payload | None:
    try:
        payload = Payload(**jwt.decode(token, os.getenv('REFRESH_TOKEN_SECRET'), os.getenv('ALGORITHM')))
        with Session(engine) as session:
            exist = session.get(RefreshToken, payload.userID)
            if exist is None or exist.token != token:
                raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail="Not Authenticated")
        return payload
    except jwt.ExpiredSignatureError:
        return
    
def verify_cookie(req: Request) -> int | None:
    access = req.cookies.get('IMS_ACCESS_TOKEN')
    refresh = req.cookies.get('IMS_REFRESH_TOKEN')
    if access is None or refresh is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail="Not Authenticated")
    
    payload = verify_access(access) or verify_refresh(refresh)
    if payload is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail="Not Authenticated")
        
    return payload