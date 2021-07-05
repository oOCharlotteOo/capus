from pydantic import BaseModel, Field
from datetime import date
from typing import Optional
from .User import UserOut


class CommentaireCreate(BaseModel):
    #id_res: int
    id_user: int
    content_com: str


class CommentaireOut(BaseModel):
    content_com: str = Field(..., alias='commentaire')
    status_com: str = Field(None, alias='statut')
    created_at_com: date = Field(None, alias='created_at')
    user: UserOut = Field(..., alias='user')


    class Config:
        orm_mode = True
        allow_population_by_field_name = True

