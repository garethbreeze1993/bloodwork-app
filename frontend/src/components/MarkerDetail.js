import {useParams} from "react-router-dom";
import fakeDataDetail from "../fakeDataDetail";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React from "react";

import NavComponent from "./NavBar";
import {getRangefromValue} from "../helpers";

function MarkerDetail(props) {
    // let params = useParams()
    // let taskId = parseInt(params.taskID, 10) || false;
    // const reversed = fakeDataDetail.reverse();

    const loggedIn = true;
    const userEmail = "gareth.breeze1993@gmail.com";

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
                <canvas className="my-4 w-100" id="myChart" width="900" height="380"></canvas>
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