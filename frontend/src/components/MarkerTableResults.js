import React from "react";
import {getRangefromValue} from "../helpers";
import HistoryChart from "./HistoryChart";


function MarkerResultCard(props){
    const data = props.data

    return(
        <div>
        <h1 className="h2" style={{marginTop: 50 +"px"}}>{props.markerName} - Results from earliest to latest</h1>

                {props.dataDetail.length > 0 && <HistoryChart graphData={props.dataDetail} resultScaleCount={props.resultScaleCount} />}
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
                            {props.tableBody}
                        </tbody>
                    </table>
                </div>
        </div>
    )
}

export default MarkerResultCard;
