import axios from "axios";

export default async function axiosGet(URL) {
    var isLoading = true
    var errorState = null
    var response = null
    try {
        let resp = await axios({
          url: URL,
          method: "GET",
          headers: {
            authorization: "None",
          },
          data: { message: "Empty data from client request" },
        })
        // console.log("Success: Watchlist helper module ", resp.data) 
        response = resp.data
        errorState = null
        isLoading = false
        // console.log("Success: Watchlist helper module ", isLoading, errorState, response) 
      }
      catch(error) {
        isLoading = false
        errorState = error.message
        console.log("Error: getusers helper module api call error ", errorState)
      }

    //   console.log("Watchlist helper module ", isLoading, errorState, response) 
      return { response, isLoading, errorState }
}