from sqlmodel import Field, SQLModel


class RefreshToken(SQLModel, table=True):
    userID: int = Field(primary_key=True, index=True, unique=True)
    token: str
    exp: int

class BlacklistToken(SQLModel, table=True):
    token: str = Field(primary_key=True, index=True, unique=True)
    exp: int
