import {useParams} from "react-router-dom";
import fakeDataDetail from "../fakeDataDetail";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React from "react";
import HistoryChart from "./HistoryChart";

import NavComponent from "./NavBar";
import {getRangefromValue} from "../helpers";

function MarkerDetail(props) {
    // let params = useParams()
    // let taskId = parseInt(params.taskID, 10) || false;
    // const reversed = fakeDataDetail.reverse();

    const loggedIn = true;
    const userEmail = "gareth.breeze1993@gmail.com";

    const markerName = fakeDataDetail[0].Marker.name

    const resultScaleCount = {"below_scale": 0, "below_standard": 0, "below_optimal": 0, "optimal": 0,
        "above_optimal": 0, "above_standard": 0, "above_scale": 0}

    const tableBody = fakeDataDetail.map((value, index) => {
        return <tr key={index}>
            <td>{index + 1}</td>
            <td>{value.Marker.name}</td>
            <td>{value.date}</td>
            <td>{value.value}</td>
            <td>{value.Marker.unit_measurement}</td>
            <td>{getRangefromValue(value)}</td>
        </tr>
    })


    return (
        <>
            <NavComponent loggedIn={loggedIn} userEmail={userEmail} homePage={false} />
            <main className={"mainPageBackground container"}>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                </div>

                <h1 className="h2" style={{marginTop: 50 +"px"}}>{markerName} - Results from earliest to latest</h1>

                <HistoryChart graphData={fakeDataDetail} resultScaleCount={resultScaleCount} />
                <h2>Section title</h2>
                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Marker Name</th>
                                <th scope="col">Date</th>
                                <th scope="col">Marker Value</th>
                                <th scope="col">Unit of Measurement</th>
                                <th scope={"col"}>Range??</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}

export default MarkerDetail;