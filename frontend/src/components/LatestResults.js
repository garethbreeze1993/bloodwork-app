import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import BloodResultCard from "./BloodResultCard";
import fakeData from "../fakeData";
import {createBrowserRouter} from "react-router-dom";
function LatestResults() {
    const rows = [];
    let columns = [];
  fakeData.items.forEach((data, index) => {
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
      rows.push(<div className={"row"} key={fakeData.total}>{columns}</div>);
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
