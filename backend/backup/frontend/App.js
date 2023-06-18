import React, { useState, useEffect } from 'react'
import './App.css'
import Datatable from './components/DataTable'
import axios from "axios"
import { Button, Icon, Input } from 'semantic-ui-react'
import axiosGet from './helper_functions/axiosGet'

function App() {
  // symbolsList: get all valid symbols from API
  // watchlistData: get data for existing watchlist from API
  const [watchlistData, setWatchlistData] = useState()
  const [userInputSymbol, setUserInputSymbol] = useState('')
  const [symbolsList, setSymbolsList] = useState(new Set())
  const [isLoading, setIsLoading ] = useState(true)
  const [errorState, setErrorState ] = useState(null)

  // "AAPL", "TSLA", "MSFT", "GOOGL", "NFLX", "AMZN", "NVDA", "LYFT", "UBER", "F"
  
  // After search bar click: Validate and add symbol
  const validateSymbol = async() => {
    // make search symbol api call / search from existing symbols
    console.log("Validation")
    const response = await postWatchListData(userInputSymbol)
    if(response.data === "Already in set") {
      alert("Symbol already in watchlist")
    }
    if(response.data.length > 1) {
      await getWatchListData()
    }
    else {
      alert("Invalid symbol, please enter valid symbol")
    }

  }

  const getSymbolsData = async() => {
    try {
      const response = await axios({
        url: "http://127.0.0.1:5000/symbollist",
        method: "GET",
        headers: {
          authorization: "None",
        },
        data: { message: "Empty data" },
      })
      // console.log("symbolist in api call ", response) 
      setSymbolsList(new Set(response.data))
    }
    catch(error) {
      console.log("getSymbolsData api call error ", error)
    }
    
  }

  const getWatchListData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/watchlist")
      setWatchlistData(response.data.data)
      console.log("watchlistdata ", response)
    }
    catch(error) {
      console.log("getWatchListData api call error ", error)
    }
    // Using helper, error boundary 
    // const { response, isLoading: loadingState, errorState: errorState1 } = await axiosGet("http://127.0.0.1:5000/watchlist")
    // setWatchlistData(response)
    // setIsLoading(loadingState)
    // setErrorState(errorState1)
    // console.log("watchlistdata ", loadingState, errorState1, response)
  }

  // Add symbol to server list
  const postWatchListData = async (userInputSymbol) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/watchlist",
        { symbol: userInputSymbol }
      )
      // console.log(response.data)
      // console.log("post watchlistdata ", response)
      return response
    }
    catch(error) {
      console.log("postWatchListData api call error ", error)
    }
    getWatchListData()
    return null
  }

  // Delete symbol from server list 
  const deleteFromWatchListData = async (deleteSymbol) => {
    try {
      const response = await axios.delete(
        "http://127.0.0.1:5000/watchlist", { data: { symbol: deleteSymbol } }
      )
      // console.log("delete deleteFromWatchListData", response)
      return response
    }
    catch(error) {
      console.log("deleteFromWatchListData api call error ", error)
    }
    getWatchListData()
    return null
  }

  // Load symbolsData, watchlist once when components first mounts
  useEffect(() => {
    // console.log("In usEffect ")
    // getSymbolsData()
    getWatchListData()

    const interval = setInterval(()=>{
      getWatchListData()
    }, 360000)
    // console.log("USEFFECT ", isLoading, errorState, response) 
    // cleanup: when component unmounts
    return() => clearInterval(interval)

  }, [])



  return (
    <div className="App">
      <h1>Hello world</h1>
        <br/>
        <Input className="Search-symbol" size='mini' value = { userInputSymbol }
          onChange={e => setUserInputSymbol(e.target.value)} placeholder="Type symbol" />
        <br/><br/>
        <Button icon labelPosition='left' onClick = { validateSymbol } inverted size='big' color = 'blue' className="Watch-Button" >
          <Icon name = "plus" /> Watch 
        </Button>
        <br/><br/>
        <Datatable data = { watchlistData } deleteFunc = { deleteFromWatchListData } getFunc = { getWatchListData } > </Datatable>
    </div>
  );
}

export default App;