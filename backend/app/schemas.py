from datetime import date, datetime
from decimal import Decimal
from pydantic import BaseModel, EmailStr


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


class ResultCreate(BaseModel):

    value: Decimal
    date: date
    marker_id: int


class UserResponse(BaseModel):
    id: int
    email: EmailStr
    created_at: datetime

    class Config:
        orm_mode = True


class UserCreate(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str


class NewAccessTokenResponse(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    user_id: int


class RefreshToken(BaseModel):
    refresh_token: str
