import sys
import pytest
import responses
import requests
sys.path.append("..")
from backend_server import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_home_page(client):
    response = client.get('/')
    assert response.status_code == 200

def test_watchlist(client):
    response = client.get('/watchlist')
    assert response.status_code == 200
    
def test_symbollist(client):
    response = client.get('/symbollist')
    assert response.status_code == 200
    # assert b"This is the about page." in response.data

@responses.activate
def test_external_stock_api():
    # Mock API calls
    # Add responses to a dict/ if backend calls an api, url is checked in dict and hardcoded response is returned
    responses.add(responses.GET, 
                  'https://jsonplaceholder.typicode.com/users/1',
                  json = [{
                            "id": 2,
                            "name": "Leanne Graham",
                            "username": "Bret",
                            "email": "Sincere@april.biz",
                            "address": {
                                "street": "Kulas Light",
                                "suite": "Apt. 556",
                                "city": "Gwenborough",
                                "zipcode": "92998-3874",
                                "geo": {
                                "lat": "-37.3159",
                                "lng": "81.1496"
                                }
                            },
                            "phone": "1-770-736-8031 x56442",
                            "website": "hildegard.org",
                            "company": {
                                "name": "Romaguera-Crona",
                                "catchPhrase": "Multi-layered client-server neural-net",
                                "bs": "harness real-time e-markets"
                            }
                        }]
                    )

    # call our backend endpoints, which inturn calls external apis
    response = requests.get('https://jsonplaceholder.typicode.com/users/1')

    assert response.status_code == 200
    # print(response.json)
    assert response.json() == [{
                            "id": 1,
                            "name": "Leanne Graham",
                            "username": "Bret",
                            "email": "Sincere@april.biz",
                            "address": {
                                "street": "Kulas Light",
                                "suite": "Apt. 556",
                                "city": "Gwenborough",
                                "zipcode": "92998-3874",
                                "geo": {
                                "lat": "-37.3159",
                                "lng": "81.1496"
                                }
                            },
                            "phone": "1-770-736-8031 x56442",
                            "website": "hildegard.org",
                            "company": {
                                "name": "Romaguera-Crona",
                                "catchPhrase": "Multi-layered client-server neural-net",
                                "bs": "harness real-time e-markets"
                            }
                        }]