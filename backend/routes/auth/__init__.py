from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from sqlmodel import Session

from database import engine
from database import Credential, User
from routes.auth.index import Register
from utils.auth.response import TokenResponse
from utils.auth.verify import verify_cookie


auth = APIRouter(
    prefix="/auth",
    tags=["auth"],
)

@auth.get(path='', status_code=status.HTTP_200_OK)
def check_authentication(userID: Annotated[int, Depends(verify_cookie)]):
    with Session(engine) as session:
        user = session.get(User, userID)
        if user is None:
            raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail="Not Authenticated")
        
        return TokenResponse(userID=userID)


@auth.put(path='',status_code=status.HTTP_201_CREATED)
def register(req: Register):
    with Session(engine) as session:
        record = session.get(User, req.userID) or session.get(Credential, req.userID)
        if record is not None:
            raise HTTPException(status.HTTP_409_CONFLICT, detail="Account Associated to Employee ID Already Exists")
        
        session.add(req.user)
        session.add(req.credential)
        session.add(req.teamRelation)
        session.commit()

    return JSONResponse(content={"message": "Registered"})


@auth.post('', status_code=status.HTTP_202_ACCEPTED)
def authenticate(req: Credential):
    with Session(engine) as session:
        user = session.get(Credential, req.userID)
        if user is None:
            raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail="Invalid Credentials")
        if not user.check_password(req.password):
            user.tries += 1
            session.commit()
            if user.locked:
                raise HTTPException(status.HTTP_429_TOO_MANY_REQUESTS, detail="Attempts Exceeded; Account Has Been Locked")
            raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail="Invalid Credentials")
        if user.locked:
            raise HTTPException(status.HTTP_429_TOO_MANY_REQUESTS, detail="Account is Currently Locked")

        user.tries = 0
        session.commit()

        user = session.get(User, req.userID)
        if user is None:
            raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail="Invalid Credentials")

        return TokenResponse(userID=user.userID, content={'name': user.name, 'teams': user.teams})

@auth.get('/unlock/{userID}', status_code=status.HTTP_202_ACCEPTED)
def unlock(userID: int):
    with Session(engine) as session:
        user = session.get(Credential, userID)
        if user is None:
            raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail="Invalid Credentials")
        user.tries = 0
        session.commit()

    return JSONResponse(content={"message": "Unlocked"})

__all__ = ["authRouter"]
