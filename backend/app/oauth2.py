from datetime import datetime, timedelta
from typing import Annotated

from jose import jwt, ExpiredSignatureError, JWTError
from fastapi import HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app import models
from app.schemas import TokenData

SECRET_KEY = "ff430872b45b480b87aa89d55e2cf87b38260097f48ada0755fcd07564974fe3"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_MINUTES = 600
REFRESH_SECRET_KEY = "2eb41d89ebe127c9811cebcd552c7164e06a27e83a8f7d9e15643be98b8db08c"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def create_refresh_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, REFRESH_SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_access_token(token: str, credentials_exception: HTTPException, expired_exception: HTTPException):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get('user_id')
        if user_id is None:
            # log.error('Credentials exception raised user id None')
            raise credentials_exception

        token_data = TokenData(user_id=user_id)

    except ExpiredSignatureError as e:
        # log.warning(f'Usertoken expired error={e}')
        raise expired_exception

    except JWTError as e:
        # log.error(f'JWT Error error={e}')
        raise credentials_exception

    return token_data


def verify_refresh_token(token: str, credentials_exception: HTTPException):
    try:
        payload = jwt.decode(token, REFRESH_SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get('user_id')
        if user_id is None:
            # log.error('Credentials exception raised user id None')
            raise credentials_exception

    except JWTError as e:
        # log.error(f'JWT Error error={e}')
        raise credentials_exception

    return user_id


def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db_session: Session = Depends(get_db)):
    credentials_exception = HTTPException(status.HTTP_401_UNAUTHORIZED, detail='Could not validate credentials',
                                          headers={"WWW-AUTHENTICATE": "BEARER"})

    expired_exception = HTTPException(status.HTTP_401_UNAUTHORIZED, detail='Expired Access Token',
                                      headers={"WWW-AUTHENTICATE": "BEARER"})

    token = verify_access_token(token=token, credentials_exception=credentials_exception,
                                expired_exception=expired_exception)

    user = db_session.get(models.User, token.user_id)

    return user
