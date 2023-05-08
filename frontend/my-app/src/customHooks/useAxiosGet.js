import { useState, useEffect } from 'react';
import axios from "axios";


const useAxiosGet = (URL) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorState, setError] = useState(null)

  const getData = async() => {
    try {
      const response = await axios({
        url: URL,
        method: "GET",
        headers: {
          authorization: "None",
        },
        data: { message: "Empty data from client request" },
      })
      console.log("Watchlist custom hook ", response) 
      setIsLoading(false)
      setError(null)
      setData(response.data)
    }
    catch(error) {
      setIsLoading(false)
      setError(error.message)
      console.log("getSymbolsData api call error ", errorState)
    }
    
  }


  useEffect(() => {
    setTimeout(() => { // load data exactly after 1 second
      getData()
    }, 1000)
  }, [URL])

  return { errorState, isLoading, data }
}
 
export default useAxiosGet;