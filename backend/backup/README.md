# Stocks_App
React (Jest testing) + Python Flask (async, scheduler, Pytest testing)


App to get stocks data from external api and display
1. Search symbol and add to watchlist
2. Delete symbol from watchlist


Launch Instructions:

Frontend:
cd into folder
npm install
npm start


Backend:
cd into folder

venv1\Scripts\activate.bat
pip install -r requirement.txt
python backend_server.py

python -m pytest -s


AWS: (To be added)
AWS RDS postgres for Watchlist
Signup and Login with Auth0 custom forms
AWS Elasticache for Redis caching: profile info, stock data beofre refresh
User Sessions/ cookies
Host on AWS EC2
