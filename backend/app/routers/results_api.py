from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy import select, and_, desc, distinct
from sqlalchemy.orm import Session

from app.database import get_db
from app import models
from app.schemas import ResultResponse

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
