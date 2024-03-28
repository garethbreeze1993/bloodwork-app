import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import BloodResultCard from "./BloodResultCard";
import fakeData from "../fakeData";
import axios from "axios";
import Cookies from "js-cookie";

function LatestResults(props) {
    console.log(props.searchQuery)
    const rows = [];
    let columns = [];

    const [actualData, setActualData] = React.useState([]);
    const [totalItems, setTotalItems] = React.useState(0);

    React.useEffect(() => {
    axios.get(`http://localhost:8000/api/v1/results`, { headers: { Authorization: `Bearer ${Cookies.get("userToken")}`}})
        .then((response) => {
            setActualData(response.data.items)
            setTotalItems(response.data.total)
          })
        .catch(err => {
        })
  }, [])


    actualData.forEach((data, index) => {
    if (index % 3 === 0) {
      rows.push(<div className={"row"} key={index}>{columns}</div>);
      columns = [];
    }
    columns.push(<BloodResultCard key={data.Marker.id}
        data={data}
    />);
  });

  // to push the remaining columns
  if(columns.length){
      rows.push(<div className={"row"} key={totalItems}>{columns}</div>);
  }


    return (
        <>
            <div className="mb-4 bg-light rounded-3">
                <div className="container-fluid py-5">
                </div>
            </div>
            <div className={"container"}>
                {rows}
            </div>
        </>
    )
}

export default LatestResults;
