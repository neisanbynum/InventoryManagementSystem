from sqlmodel import Field, SQLModel


class TeamUser(SQLModel, table=True):
    userID: int | None = Field(default=None, primary_key=True)
    teamID: int | None = Field(default=None)