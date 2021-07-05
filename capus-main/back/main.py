import fastapi
import uvicorn

from typing import List
from fastapi import Depends, Header, Request,HTTPException
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from sql_app.custom import CategoryLabel, RessourceType
from sql_app.model import models, crud
from sql_app.model.database import SessionLocal, engine
from sql_app.schemas.User import UserCreate, UserOut, UserLogin
from sql_app.schemas.Ressource import RessourceCreate, RessourceOut
from sql_app.schemas.Consulter import FavoriteCreate, ConsulterOut
from sql_app.schemas.Commentaire import CommentaireOut, CommentaireCreate
from auth.auth_handler import signJWT
from auth.auth_bearer import JWTBearer
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional
from auth.auth_handler import decodeJWT
import json

models.Base.metadata.create_all(bind=engine)

api = fastapi.FastAPI(title='Cube')
api.mount("/images", StaticFiles(directory="images"), name="images")
origins = ["*"]

api.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# USER
@api.post('/users', response_model=UserOut)
def create_new_user(user: UserCreate, db: Session = Depends(get_db)):
    content = crud.create_user(db, user)
    return content

# USER
@api.post('/login', response_model=UserOut)
def create_new_user(user: UserLogin, db: Session = Depends(get_db)):
    content = crud.login(db, user.email, user.password)
    if(content):
        content.access_token = signJWT(content.id_user)["access_token"]
        return content
    else:
        raise HTTPException(status_code=401, detail="invalid credentials")

@api.get('/users', response_model=List[UserOut])
def read_users(db: Session = Depends(get_db)):
    content = crud.get_users(db)
    return content


@api.get('/users/{user_id}', response_model=UserOut)
def read_user(user_id: int, db: Session = Depends(get_db)):
    content = crud.get_user(db, user_id)
    return content


@api.put('users/{user_id}', status_code=200)
def update_user(user_id: int, db: Session = Depends(get_db), dependencies=[Depends(JWTBearer())]):
    content = crud.update_user_by_id(user_id, db)
    return content


@api.delete('/users/{user_id}')
def delete_user(user_id: int, db: Session = Depends(get_db)):
    content = crud.delete_user_by_id(user_id, db)
    return content


# RESSOURCE
@api.post('/ressources', response_model=RessourceOut)
def create_new_ressource(ressource: RessourceCreate, db: Session = Depends(get_db)):
    content = crud.create_ressource(db, ressource)
    return content


@api.get('/ressources', response_model=List[RessourceOut])
async def read_ressources(request: Request, order_by:Optional[str]='id_res', order:Optional[str]='asc', db: Session = Depends(get_db)):
    if 'authorization' in request.headers.keys():
      split = request.headers['authorization'].split('Bearer ')
      if len(split) == 2:
          jwt = decodeJWT(split[1])
          content = crud.get_ressources(db, order_by, order, jwt["user_id"])
      else:
        content = crud.get_ressources(db, order_by, order)
    else:
        content = crud.get_ressources(db, order_by, order)

    return content

@api.get('/ressources/bookmarks', response_model=List[RessourceOut], dependencies=[Depends(JWTBearer())])
async def get_bookmarks(request: Request, db: Session = Depends(get_db)):
    if 'authorization' in request.headers.keys():
      split = request.headers['authorization'].split('Bearer ')
      if len(split) == 2:
          jwt = decodeJWT(split[1])
          content = crud.get_bookmarks(db, jwt["user_id"])
          return content




@api.get('/ressources/{ressource_id}', response_model=RessourceOut)
def read_ressource(request: Request, ressource_id: int, db: Session = Depends(get_db)):
    if 'authorization' in request.headers.keys():
      split = request.headers['authorization'].split('Bearer ')
      if len(split) == 2:
        jwt = decodeJWT(split[1])
        content = crud.get_ressource(db, ressource_id, jwt["user_id"])
    else:
        content = crud.get_ressource(db, ressource_id)
        
    return content

@api.put('/ressources/{ressource_id}/start')
def start_ressource(ressource_id: int, request: Request, db: Session = Depends(get_db), dependencies=[Depends(JWTBearer())]):

    split = request.headers['authorization'].split('Bearer ')
    jwt = decodeJWT(split[1])
    content = crud.consulter_ressource(db, ressource_id, jwt["user_id"])
    return content
    
# TODO: faire le filtre sur les relations

@api.get('/ressources/type/{ressource_type}', response_model=List[RessourceOut])
def read_ressource_by_type(ressource_type: RessourceType.RessourceTypeEnum, db: Session = Depends(get_db)):
    """
    TYPE DE RESSOURCES DISPONIBLE : \n
    Jeu : 1 \n
    Action: 2 \n
    Atelier: 3 \n

    """

    content = crud.get_ressource_by_type(db, ressource_type)
    return content


@api.get('/ressources/category/{label_cat}', response_model=List[RessourceOut])
def read_ressource_by_category(label_cat: CategoryLabel.CategoryEnum, db: Session = Depends(get_db)):
    """
    TYPE DE CATEGORIES DISPONIBLE : \n
    Communication: 1 \n
    Cultures: 2 \n
    Loisirs: 3 \n
    Monde professionnel: 4 \n
    Parentalité: 5 \n
    Santé physique: 6 \n
    Vie affective: 7 \n

    """

    content = crud.get_ressource_by_category_label(db, label_cat)
    return content


@api.delete('/ressources/{ressource_id}')
def delete_ressource(ressource_id: int, db: Session = Depends(get_db)):
    content = crud.delete_ressource_by_id(ressource_id, db)
    return content


#FAVORITE
@api.post('/ressource/favorite', response_model=ConsulterOut)
def create_new_favorite(favorite: FavoriteCreate, db: Session = Depends(get_db)):
    content = crud.create_favorite(db, favorite)
    return content


# COMMENTAIRES
@api.post('/ressources/{ressource_id}/commentaire', response_model=CommentaireOut, status_code=201)
def create_new_comment(ressource_id: int, comment: CommentaireCreate, db: Session = Depends(get_db)):
    content = crud.create_comment(ressource_id, comment, db)
    return content


@api.get('/ressources/{ressource_id}/commentaire', response_model=List[CommentaireOut])
def read_comments(ressource_id: int, db: Session = Depends(get_db)):
    content = crud.get_comments(db, ressource_id)
    return content


@api.get('/ressources/{ressource_id}/commentaire/{commentaire_id}', response_model=CommentaireOut)
def read_comment(ressource_id: int, commentaire_id: int, db: Session = Depends(get_db)):
    content = crud.get_comment_by_id(ressource_id, commentaire_id, db)
    return content


@api.put('/ressources/{ressource_id}/commentaire/{commentaire_id}')
def update_comment(ressource_id: int, commentaire_id: int, db: Session = Depends(get_db)):
    content = crud.update_comment_by_id(ressource_id, commentaire_id, db)
    return content


@api.delete('/ressources/{ressource_id}/commentaire/{commentaire_id}')
def delete_comment(ressource_id: int, commentaire_id: int, db: Session = Depends(get_db)):
    content = crud.delete_comment_by_id(ressource_id, commentaire_id, db)
    return content


if __name__ == "__main__":
    uvicorn.run(api, host="0.0.0.0", port=8000)
