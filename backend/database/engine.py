import os

from sqlmodel import SQLModel, create_engine


filename: str = "database.db"
url: str = f"sqlite:///{os.getcwd()}/database/{filename}"

engine = create_engine(url, echo=True)


def init_db():
    SQLModel.metadata.create_all(engine)