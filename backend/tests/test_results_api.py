from datetime import datetime
from decimal import Decimal

import pytest

from app.schemas import ResultResponse


def test_unauthorised_user_get_latest_marker_result(client, create_test_results):
    res = client.get('/api/v1/results')
    assert res.status_code == 401


def test_user_1_get_latest_marker_results(authorised_client, create_test_results):
    res = authorised_client.get('/api/v1/results')
    assert res.status_code == 200
    assert res.json()['total'] == 2
    for result in res.json().get('items'):
        if result['Marker']['name'] == 'T4 - Total':
            assert result['value'] == 104.4
            assert result['date'] == '2022-11-22'
        elif result['Marker']['name'] == 'Iron - Serum':
            assert result['value'] == 17.3
            assert result['date'] == '2022-11-29'


def test_user_2_get_latest_marker_results(authorised_client_2, create_test_results):
    res = authorised_client_2.get('/api/v1/results')
    assert res.status_code == 200
    assert res.json()['total'] == 2
    for result in res.json().get('items'):
        if result['Marker']['name'] == 'T4 - Total':
            assert result['value'] == 100.0
            assert result['date'] == '2022-12-21'
        elif result['Marker']['name'] == 'Iron - Serum':
            assert result['value'] == 10.0
            assert result['date'] == '2022-12-10'


def test_unauthorised_user_get_results_by_marker(client, create_test_results):
    res = client.get('/api/v1/results/1')
    assert res.status_code == 401


def test_user_1_get_results_by_marker_first_marker(authorised_client, create_test_results, create_test_markers):
    res = authorised_client.get(f'api/v1/results/{create_test_markers[0].id}')
    assert res.status_code == 200
    assert len(res.json()) == 5
    for result in res.json():
        assert result['Marker']['name'] == 'T4 - Total'
        assert result['Marker']['id'] == create_test_markers[0].id
        assert result['value'] in [105.2, 103.2, 106.2, 101.2, 104.4] and result['value'] != 104.2
        assert result['date'] in ['2021-11-18', '2021-11-19', '2021-11-20', '2021-11-21', '2022-11-22']
        assert result['date'] != '2021-11-17'


def test_user_1_get_results_by_marker_second_marker(authorised_client, create_test_results, create_test_markers):
    res = authorised_client.get(f'api/v1/results/{create_test_markers[1].id}')
    assert res.status_code == 200
    assert len(res.json()) == 5
    for result in res.json():
        assert result['Marker']['name'] == 'Iron - Serum'
        assert result['Marker']['id'] == create_test_markers[1].id
        assert result['value'] in [16.8, 16.5, 16.4, 17.0, 17.3] and result['value'] != 17.1
        assert result['date'] in ['2021-11-18', '2021-11-19', '2021-11-20', '2021-11-21', '2022-11-29']
        assert result['date'] != '2021-11-17'


def test_user_2_get_results_by_marker_first_marker(authorised_client_2, create_test_results, create_test_markers):
    res = authorised_client_2.get(f'api/v1/results/{create_test_markers[0].id}')
    assert res.status_code == 200
    assert len(res.json()) == 1
    for result in res.json():
        assert result['Marker']['name'] == 'T4 - Total'
        assert result['Marker']['id'] == create_test_markers[0].id
        assert result['value'] == 100.0
        assert result['date'] == "2022-12-21"
        assert result['date'] != '2021-11-17'


def test_user_2_get_results_by_marker_second_marker(authorised_client_2, create_test_results, create_test_markers):
    res = authorised_client_2.get(f'api/v1/results/{create_test_markers[1].id}')
    assert res.status_code == 200
    assert len(res.json()) == 1
    for result in res.json():
        assert result['Marker']['name'] == 'Iron - Serum'
        assert result['Marker']['id'] == create_test_markers[1].id
        assert result['value'] == 10.0
        assert result['date'] == "2022-12-10"


def test_unauthorised_client_post_new_result(client, create_test_markers):
    form_data = {"value": 109.2, "date": "2022-09-10", 'marker_id': create_test_markers[0].id}
    res = client.post("/api/v1/results/", json=form_data)
    assert res.status_code == 401


def test_post_new_result(authorised_client, test_user, create_test_markers):
    form_data = {"value": '109.2', "date": "2022-09-10", 'marker_id': create_test_markers[0].id}
    res = authorised_client.post("/api/v1/results/", json=form_data)
    result_response = ResultResponse(**res.json())
    assert res.status_code == 201
    assert result_response.value == Decimal(form_data['value'])
    assert result_response.date == datetime.strptime(form_data['date'], '%Y-%m-%d').date()
    assert result_response.Marker.id == create_test_markers[0].id


def test_unauthorized_user_delete_result_failure(client, create_test_results):
    res = client.delete(f'/api/v1/results/{create_test_results[0].id}')
    assert res.status_code == 401


def test_authorized_user_delete_result_failure(authorised_client, create_test_results):
    res = authorised_client.delete(f'/api/v1/results/5555')
    assert res.status_code == 404


def test_authorized_user_delete_result_success(authorised_client, create_test_results):
    res = authorised_client.delete(f'/api/v1/results/{create_test_results[0].id}')
    assert res.status_code == 204


def test_authorized_user_delete_result_not_own_result_failure(authorised_client_2, create_test_results):
    res = authorised_client_2.delete(f'/api/v1/results/{create_test_results[0].id}')
    assert res.status_code == 403
