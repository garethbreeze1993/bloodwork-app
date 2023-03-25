from sqlalchemy import Column, Integer, String, ForeignKey, Date
from sqlalchemy.sql.expression import text
from sqlalchemy.sql.sqltypes import TIMESTAMP, DECIMAL

from .database import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))


class Marker(Base):
    __tablename__ = 'markers'

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False, unique=True)
    unit_measurement = Column(String, nullable=False)
    below_standard_lower = Column(DECIMAL(scale=2, asdecimal=True), nullable=False)
    below_standard_upper = Column(DECIMAL(scale=2, asdecimal=True), nullable=False)
    optimal_lower = Column(DECIMAL(scale=2, asdecimal=True), nullable=False)
    optimal_upper = Column(DECIMAL(scale=2, asdecimal=True), nullable=False)
    above_standard_lower = Column(DECIMAL(scale=2, asdecimal=True), nullable=False)
    above_standard_upper = Column(DECIMAL(scale=2, asdecimal=True), nullable=False)


class Result(Base):
    __tablename__ = 'results'

    id = Column(Integer, primary_key=True, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id', name='results_user_id_fkey', ondelete='CASCADE'), nullable=False)
    marker_id = Column(Integer, ForeignKey('markers.id', name="results_marker_id_fkey", ondelete='CASCADE'),
                       nullable=False)
    value = Column(DECIMAL(scale=2, asdecimal=True), nullable=False)
    date = Column(Date(), nullable=False)
