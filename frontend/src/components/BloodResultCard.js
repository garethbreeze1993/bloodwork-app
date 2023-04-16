import React from "react";
import {getRangefromValue} from "../helpers";

function BloodResultCard(props){
    const data = props.data

    return(
        <div className="col-lg-4" key={data.Marker.id}>
            <h2>{data.Marker.name}</h2>
            <p>Last Result Date: {data.date}</p>
            <p>Last Result Value: {data.value} {data.Marker.unit_measurement}</p>
            <p>{getRangefromValue(data)}</p>
            <p><a className="btn btn-secondary" href={`/marker/${data.Marker.id}`}>View details &raquo;</a></p>
        </div>
    )
}

export default BloodResultCard;
