from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import select, exc
from sqlalchemy.orm import Session

from app.database import get_db
from app import models
from app import oauth2
from app.schemas import LoginResponse, NewAccessTokenResponse, RefreshToken
from app.utils import verify_password


router = APIRouter(prefix="/api/v1", tags=["results"])


@router.post('/login', response_model=LoginResponse)
def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db_session: Session = Depends(get_db)):

    try:
        user = db_session.execute(select(models.User)
                                  .where(models.User.email == form_data.username))\
            .one()[0]
    except exc.SQLAlchemyError as e:
        # log.error(e)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    # return {'access_token': 'ff', 'refresh_token': 'dkdk', 'token_type': 'Bearer'}
    if not verify_password(form_data.password, user.password):
        # log.error('Incorrect email or password when login')
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

        # create token and return it
    access_token = oauth2.create_access_token(data=dict(user_id=user.id))
    refresh_token = oauth2.create_refresh_token(data=dict(user_id=user.id))
    return {'access_token': access_token, "token_type": "bearer", "refresh_token": refresh_token}


@router.post('/refresh', response_model=NewAccessTokenResponse)
def refresh(refresh_token: RefreshToken):
    credentials_exception = HTTPException(status.HTTP_401_UNAUTHORIZED, detail='Could not validate credentials',
                                          headers={"WWW-AUTHENTICATE": "BEARER"})
    user_id = oauth2.verify_refresh_token(token=refresh_token.refresh_token,
                                          credentials_exception=credentials_exception)
    access_token = oauth2.create_access_token(data=dict(user_id=user_id))
    return {'access_token': access_token, "token_type": "bearer"}
