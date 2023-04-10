from typing import List

from fastapi.testclient import TestClient
import pytest
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import Base, get_db
from app.main import app
from app import models
from app.oauth2 import create_access_token, create_refresh_token
from tests.database import TestingSessionLocal, engine


@pytest.fixture
def get_test_db_session():
    """
    From the test database yield a SQLAlchemy db session for testing purposes
    :return:
    """
    Base.metadata.drop_all(bind=engine)  # Drop tables from test database if any
    Base.metadata.create_all(bind=engine)  # Create tables for test database
    db_session = TestingSessionLocal()  # create a dbsession from test database
    try:
        # Request and response delivered during yield statement allowing functions access to db session
        yield db_session
    finally:
        # After response close the db session
        db_session.close()


@pytest.fixture
def client(get_test_db_session):
    """
    Making a test client to run our tests from
    :param get_test_db_session: The pycharm fixture which is a SQLAlchemy db session
    :return:
    """

    def override_get_db():
        try:
            yield get_test_db_session
        finally:
            get_test_db_session.close()

    app.dependency_overrides[get_db] = override_get_db

    yield TestClient(app)


@pytest.fixture
def test_user(client) -> dict:
    """
    Saves a user to the database and returns the dict so we have information from that user
    :param client: A pycharm fixture which is a fastapi test client
    :return: dict with user information
    """
    user_dict = {'email': 'gareth@gmail.com', 'password': 'password123'}
    res = client.post('/api/v1/users/', json=user_dict)
    assert res.status_code == 201
    new_user = dict(password=user_dict['password'], **res.json())
    return new_user


@pytest.fixture
def test_user_2(client) -> dict:
    """
    Saves a user to the database and returns the dict so we have information from that user
    :param client: A pycharm fixture which is a fastapi test client
    :return: dict with user information
    """
    user_dict = {'email': 'jack@gmail.com', 'password': 'password1234'}
    res = client.post('/api/v1/users/', json=user_dict)
    assert res.status_code == 201
    new_user = dict(password=user_dict['password'], **res.json())
    return new_user


@pytest.fixture
def token(test_user):
    """
    Gives us a JWT token so we can have an authorised user for testing purposes
    :param test_user: Pycharm fixture which creates a user and returns a dict with user information
    :return:
    """
    access_token = create_access_token(data=dict(user_id=test_user['id']))
    return access_token


@pytest.fixture
def token_2(test_user_2):
    """
    Gives us a JWT token so we can have an authorised user for testing purposes
    :param test_user_2: Pycharm fixture which creates a user and returns a dict with user information
    :return:
    """
    access_token = create_access_token(data=dict(user_id=test_user_2['id']))
    return access_token


@pytest.fixture
def authorised_client(client, token):
    """
    Gives us an authorised client which can be used to test endpoints which need a user to be logged in
    :param client: FastApi test client
    :param token: A JWT bearer token used for authorization
    :return:
    """
    client.headers.update({'Authorization': f'Bearer {token}'})
    return client


@pytest.fixture
def authorised_client_2(client, token_2):
    """
    Gives us an authorised client which can be used to test endpoints which need a user to be logged in
    :param client: FastApi test client
    :param token_2: A JWT bearer token used for authorization
    :return:
    """
    client.headers.update({'Authorization': f'Bearer {token_2}'})
    return client


@pytest.fixture
def refresh_token(test_user):
    """
    Gives us a JWT refresh token so we can test the refresh token functionality
    :param test_user: Pycharm fixture which creates a user and returns a dict with user information
    :return:
    """
    refresh_token = create_refresh_token(data=dict(user_id=test_user['id']))
    return refresh_token


@pytest.fixture
def create_test_markers(get_test_db_session):
    """
    Create some blood markers for test database and return them for use in results_api tests
    :param get_test_db_session: SQLAlchemy session for use with test database
    :return: A list of models.Markers
    """
    test_markers_data = [{'name': 'T4 - Total', 'unit_measurement': 'pmol/L', 'below_standard_lower': 43.76,
                          'below_standard_upper': 57.92, 'optimal_lower': 77.22, 'optimal_upper': 153.15,
                          'above_standard_lower': 154.44, 'above_standard_upper': 173.74},
                         {'name': 'Iron - Serum', 'unit_measurement': 'umol/L', 'below_standard_lower': 2.68,
                          'below_standard_upper': 5.91, 'optimal_lower': 15.22, 'optimal_upper': 23.27,
                          'above_standard_lower': 34.55, 'above_standard_upper': 44.75}]

    for marker in test_markers_data:
        marker_obj = models.Marker(**marker)
        get_test_db_session.add(marker_obj)

    get_test_db_session.commit()

    marker_query = get_test_db_session.execute(select(models.Marker))\
        .scalars() \
        .all()
    return marker_query


@pytest.fixture
def create_test_results(get_test_db_session, test_user, test_user_2, create_test_markers):
    """
    Create some blood marker results for test database and return them for use in results_api tests

    :param get_test_db_session: SQLAlchemy session for use with test database
    :param test_user: A model.User
    :param test_user_2: A different model.User
    :param create_test_markers: List of Markers for use in results
    :return: List of models.Results
    """
    test_results_data = [
        {'marker_id': create_test_markers[0].id, 'user_id': test_user['id'], 'value': 104.2, 'date': '2021-11-17'},
        {'marker_id': create_test_markers[0].id, 'user_id': test_user['id'], 'value': 105.2, 'date': '2021-11-18'},
        {'marker_id': create_test_markers[0].id, 'user_id': test_user['id'], 'value': 103.2, 'date': '2021-11-19'},
        {'marker_id': create_test_markers[0].id, 'user_id': test_user['id'], 'value': 106.2, 'date': '2021-11-20'},
        {'marker_id': create_test_markers[0].id, 'user_id': test_user['id'], 'value': 101.2, 'date': '2021-11-21'},
        {'marker_id': create_test_markers[0].id, 'user_id': test_user['id'], 'value': 104.4, 'date': '2022-11-22'},
        {'marker_id': create_test_markers[1].id, 'user_id': test_user['id'], 'value': 17.1, 'date': '2021-11-17'},
        {'marker_id': create_test_markers[1].id, 'user_id': test_user['id'], 'value': 16.8, 'date': '2021-11-18'},
        {'marker_id': create_test_markers[1].id, 'user_id': test_user['id'], 'value': 16.5, 'date': '2021-11-19'},
        {'marker_id': create_test_markers[1].id, 'user_id': test_user['id'], 'value': 16.4, 'date': '2021-11-20'},
        {'marker_id': create_test_markers[1].id, 'user_id': test_user['id'], 'value': 17.0, 'date': '2021-11-21'},
        {'marker_id': create_test_markers[1].id, 'user_id': test_user['id'], 'value': 17.3, 'date': '2022-11-29'},
        {'marker_id': create_test_markers[0].id, 'user_id': test_user_2['id'], 'value': 100.0, 'date': '2022-12-21'},
        {'marker_id': create_test_markers[1].id, 'user_id': test_user_2['id'], 'value': 10.0, 'date': '2022-12-10'}
    ]

    for result in test_results_data:
        result_obj = models.Result(**result)
        get_test_db_session.add(result_obj)

    get_test_db_session.commit()

    result_query = get_test_db_session.execute(select(models.Result)) \
        .scalars() \
        .all()
    return result_query
