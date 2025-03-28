from typing import Any, Optional

from fastapi import Response
from fastapi.responses import JSONResponse

from utils.auth.token import accessToken, refreshToken


def TokenResponse(userID: int, content: Optional[Any] = None) -> Response:
    if not content:
        content = {"message": None}

    res = JSONResponse(content=content)
    res.set_cookie(
        key='IMS_ACCESS_TOKEN',
        value=accessToken(userID),
        samesite="none",
        httponly=True,
        secure=False,
        domain="localhost",
    )
    res.set_cookie(
        key='IMS_REFRESH_TOKEN',
        value=refreshToken(userID),
        samesite="none",
        httponly=True,
        secure=False,
        domain="localhost",
    )

    return res
