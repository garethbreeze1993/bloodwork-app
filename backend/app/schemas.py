from datetime import date
from decimal import Decimal
from pydantic import BaseModel


class MarkerResponse(BaseModel):

    id: int
    name: str
    unit_measurement: str
    below_standard_lower: Decimal
    below_standard_upper: Decimal
    optimal_lower: Decimal
    optimal_upper: Decimal
    above_standard_lower: Decimal
    above_standard_upper: Decimal

    class Config:
        orm_mode = True


class ResultResponse(BaseModel):

    value: Decimal
    date: date
    Marker: MarkerResponse

    class Config:
        orm_mode = True
