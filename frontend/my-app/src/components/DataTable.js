import '../App.css'
import { Icon } from 'semantic-ui-react'

function Datatable(props) {
    // console.log("In Datatable ")
    const tableData = props.data

    const deleteSymbol = async(symbol) => { 
      // console.log("In Datatable delete", symbol)
      const response = await props.deleteFunc(symbol)
      // console.log("In Datatable delete", response)
      if(response.status === 200 && response.data.length > 1) {
        props.getFunc()
      }
    }

    return (
      <div>
      { 
        tableData != null && tableData.length > 0 ? 
        <table style= {{ borderSpacing: '20px' }} >
          <thead>
            <tr>
                <th width="100"> Symbol </th>
                <th width="400" > Name </th>
                <th width="100" > Price </th>
                <th width="200"> Day High </th>
                <th width="200"> Day Low </th>
                <th width="50"> </th>
            </tr>
          </thead>
          <br/> <br/>
          <tbody>
            { tableData.map((val, key) => {
                return (
                <tr key = { key } >
                    <td> { val.ticker } </td>
                    <td> { val.name } </td>
                    <td> { val.price } </td>
                    <td> { val.day_high } </td>
                    <td> { val.day_low } </td>
                    <td> <Icon name = "trash alternate outline" color='grey' className='transparent-background-icon' 
                    onClick = { () => deleteSymbol(val.ticker) } /> </td>
                </tr>
                )
            }) 
          }
          </tbody>
        </table>
        :
        <div className='No_Data'>
          <b> No data in watchlist </b>
        </div>
      }
      </div>
    );
  }
    
  export default Datatable;