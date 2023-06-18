# Stocks_App
Python Flask (async, Pytest testing, Swagger) + React (Jest testing) 

App to get 
1. stocks data from external api
2. etf data from from external api
3. index funds data from from external api
4. mutual funds data from from external api
5. Search symbol and add to watchlist
6. Delete symbol from watchlist
7. Info page
8. Sigunp/ Login page
9. Admin page


project structure:
backend:
    -> run.py
    -> config.py
    -> packages
        -> init.py
        -> helpers
            -> init.py
            -> helper1.py
        -> stocks
            -> init.py
            -> stock.py
        -> etf
            -> init.py
            -> etf.py
        -> and so on 


Launch Instructions:
Frontend:
- cd into folder
- npm install
- npm start

Backend:
- cd into folder
- venv1\Scripts\activate.bat
- pip install -r requirement.txt
- python backend_server.py
- python -m pytest -s


Important implemenations:
- Swagger
- Multithreading to hit APIs at same time
- Logging to console
- Async API calls
- Error handling
- Project structure with packages, subpackages, blueprints
- Config file, .env files
- Search with filters, sort and pagination
- Protected routes
- Decoraters, generators
- Testing: unit and mock api tests
- Seperate instance for each user
- Sessions and cookies
- Caching
- Performance testing