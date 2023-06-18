from flask import Flask, jsonify, request
from flask_restful import Resource, Api
import requests
import json
from datetime import datetime, date
from flask_cors import CORS
# import atexit
from apscheduler.schedulers.background import BackgroundScheduler
# import base64
import os
from dotenv import load_dotenv
import asyncio
import httpx
import os
import time


        
# Creds from .env file
load_dotenv()
api_token = ""
api_key = os.getenv('API_KEY')

app = Flask(__name__)
CORS(app)
api = Api(app)

# global variables
watchList = set()
watchListData = {}
symbolsList = []
today = str(date.today())

class Backend_watchList(Resource):

    # get watchlist data for all items in watchlist set
    def get(self):
        response = []
        #  only three at a time
        watchListStr = ','.join([str(elem) for elem in watchList] ) # or try async to get data one by one
        print("watchlist string ", watchListStr)
        
        if len(watchList) > 0:
            apiURL = "https://api.stockdata.org/v1/data/quote?symbols="+ watchListStr +"&api_token=" + api_key
            try:
                response = requests.get(apiURL)
                # print("watchlist data ", response.json())
                watchListData = response.json()
                return watchListData
            
            except requests.exceptions.RequestException as e:
                print("Error in GET Watchlist API request ", e)
        
        # print("Get watchlist")
        return response
    
    # add item to watchlist
    def post(self):
        print("symbol to be added ", request)
        # print("symbol to be added ", request.args['symbol'])
        symbol = request.json['symbol']
        # add if not present
        if symbol in watchList:
            # print("Already in set")
            return jsonify("Already in set")

        watchList.add(symbol)
        
        # print("watchlist symbols ", watchList)
        print("New Symbol added to watchlist")

        return jsonify("Added " + symbol + " to watchlist")

    # delete item from watchlist
    def delete(self):
        symbol = request.get_json()['symbol']
        # print("symbol to be deleted ", symbol)
        # remove from watchlist
        watchList.remove(symbol)
        # print("watchlist symbols ", watchList)

        print("Symbol deletede from watchlist")
        return jsonify("Deleted " + symbol + " from watchlist")


# helper: get all valid symbols from api
async def get_symbols():
    url = "https://bulk.stockdata.org/v1/data/entity/bulk?exchange=NYSE&api_token="+api_key
    print(url)
      
    async with httpx.AsyncClient() as session:
        response = await session.get(url)
    
    # response = requests.get(url, headers = {'Authorization': "Bearer "+ api_token })
    print("Async resp ", response)
    return response


class Backend_symbolList(Resource):
        
    def get(self):
        print("Get SymbolList !!!")
        start = time.perf_counter()
        response = asyncio.run(get_symbols() )
        end = time.perf_counter()
        print(f"Time taken ", end - start)
        
        symbolsList = []
        # for i in response.json():
            # symbolsList.append(i["name"])
        
        return symbolsList
        

class Backend_Home(Resource):
        
    def get(self):
        return  { "message": "Go to /symbollist or /watchlist" }


api.add_resource(Backend_Home, '/')
api.add_resource(Backend_watchList, '/watchlist')
api.add_resource(Backend_symbolList, '/symbollist')

  
if __name__ == '__main__':
    app.run(debug = True)