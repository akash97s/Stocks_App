from backend_api import app
import json

def test_home_route():
    response = app.test_client().get('/')
    assert response.status_code == 200
    # assert b"Hello, World!" in response.data

    
def test_get_symbollist_endpoint():
    with app.test_client() as c:
        response = c.get('/symbollist')
        assert response.status_code == 200
        json_response = response.get_json()
        print("From test 2 ", len(json_response) )
        assert len(json_response) > 10000 


def test_add_to_watchlist_endpoint():
    data = {
        "symbol": "CBOE"
    }
    with app.test_client() as c:
        response = c.post('/watchlist',
            json = data,
            headers = {"Content-Type": "application/json"})
        
        
        json_response = response.get_json()
        print("From test 3 ", response )
        assert response.status_code == 200
        # assert json_response == {'message': 'Nice to meet you, Vincent!'}