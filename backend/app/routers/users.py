from fastapi import APIRouter, status, Depends, HTTPException
from sqlalchemy import exc
from sqlalchemy.orm import Session

from app.database import get_db
from app import models
from app.schemas import UserResponse, UserCreate
from app.utils import get_password_hash

router = APIRouter(prefix="/api/v1/users", tags=["results"])


@router.post('/', status_code=status.HTTP_201_CREATED, response_model=UserResponse)
def create_user(user: UserCreate, db_session: Session = Depends(get_db)):

    new_user = models.User()
    new_user.email = user.email
    new_user.password = get_password_hash(user.password)

    db_session.add(new_user)

    try:
        db_session.commit()
    except exc.SQLAlchemyError as e:
        # log.error('Problem with sqlalchemy when creating user')
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f'Unexpected problem please check the request and try again')

    db_session.refresh(new_user)

    return new_user
