from pydantic import BaseModel, Field
from datetime import date
from typing import List, Optional
from .Category import Caracterise
from .Relation import Valable
from .Commentaire import CommentaireOut
from .Consulter import ConsulterOut
import json

class RessourceOut(BaseModel):
    id_res: int = Field(None, alias='id')
    title_res: str = Field(None, alias='title_res')
    image_res: str = Field(None, alias='image_res')
    status_res: str = Field(None, alias='status')
    acces_res: bool = Field(None, alias='acces')
    content_res: str = Field(None, alias='content')
    content_long_res: str = Field(None, alias='content_long')
    source_res: str = Field(None, alias='source')
    difficulty: str = Field(None)
    created_at_res: date = Field(None, alias='created')
    updated_at_res: date = Field(None, alias='updated')
    valable: List[Valable] = Field(..., alias='doWith')
    caracterise: List[Caracterise] = Field(..., alias='categories')
    commentaires: List[CommentaireOut] = Field(..., alias='comments')
    consulter: List[ConsulterOut] = Field(..., alias='consulter')
    popular: bool = False
    recent: bool = False
    reward: dict = Field(..., alias='reward')
    started: Optional[bool] = False

    class Config:
        orm_mode = True
        allow_population_by_field_name = True


class RessourceCreate(BaseModel):

    title_res: str
    acces_res: str
    content_res: str
    source_res: str
    type_ressource: str
    category_res: str
    relation_res: str
    difficulty: str
    user: int

