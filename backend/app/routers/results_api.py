from typing import List

from fastapi import APIRouter, Depends, status, HTTPException, Response
from sqlalchemy import select, and_, desc, distinct, exc
from sqlalchemy.orm import Session

from app.database import get_db
from app import models
from app.schemas import ResultResponse, ResultCreate

router = APIRouter(prefix="/api/v1/results", tags=["results"])


@router.get("/", response_model=List[ResultResponse])
def get_latest_results_each_marker(db_session: Session = Depends(get_db)):
    user_id = 1

    get_latest_result = (db_session.execute(select(models.Result.id)
                                            .distinct(models.Result.marker_id)
                                            .where(models.Result.user_id == user_id)
                                            .order_by(models.Result.marker_id, desc(models.Result.date))))\
        .scalars()\
        .all()

    query = db_session.execute(select(models.Marker, models.Result.value, models.Result.date)
                               .join(models.Result, models.Result.marker_id == models.Marker.id)
                               .where(models.Result.user_id == user_id,
                                      models.Result.id.in_(get_latest_result)))\
        .all()

    return query


@router.get("/{marker_id}", response_model=List[ResultResponse])
def get_marker_results_by_id(marker_id: int, db_session: Session = Depends(get_db)):
    user_id = 1

    query = db_session.execute(select(models.Marker, models.Result.value, models.Result.date)
                               .join(models.Result, models.Result.marker_id == models.Marker.id)
                               .where(models.Result.user_id == user_id,
                                      models.Result.marker_id == marker_id)
                               .order_by(desc(models.Result.date)
                                         )
                               .limit(5))\
        .all()

    return query


@router.post("/", response_model=ResultResponse, status_code=status.HTTP_201_CREATED)
def post_new_result(result_data: ResultCreate, db_session: Session = Depends(get_db)):

    user_id = 1

    result_dict = result_data.dict()

    new_result = models.Result(**result_dict)
    new_result.user_id = user_id

    db_session.add(new_result)

    try:
        db_session.commit()
    except exc.SQLAlchemyError as e:
        # log.error('Error creating task sql alchemy')
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f'Unexpected problem please check the request and try again')

    db_session.refresh(new_result)

    query = db_session.execute(select(models.Marker, models.Result.value, models.Result.date)
                               .join(models.Result, models.Result.marker_id == models.Marker.id)
                               .where(models.Result.id == new_result.id)) \
        .one()

    return query


@router.delete("/{result_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_result(result_id: int, db_session: Session = Depends(get_db)):
    result = db_session.get(models.Result, result_id)
    user_id = 1

    if not result:
        # log.error(f'Task not found id={id_} when deleting task')
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Task not found id={result_id}')

    if result.user_id != user_id:
        # log.error(f'Not authorised to perform requested action wrong user trying to delete other user post')
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Not authorised to perform requested action')

    db_session.delete(result)

    try:
        db_session.commit()
    except exc.SQLAlchemyError as e:
        # log.error('Error sqlalchemy when trying to delete post')
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f'Unexpected problem please check the request and try again')

    return Response(status_code=status.HTTP_204_NO_CONTENT)
