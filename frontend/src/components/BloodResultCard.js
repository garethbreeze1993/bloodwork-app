import React from "react";

function BloodResultCard(props){
    const data = props.data

    function getRangefromValue(data){

          if(data.value < data.Marker.below_standard_lower){
            return "BELOW SCALE";
          } else if(data.value > data.Marker.below_standard_lower && data.value < data.Marker.below_standard_upper){
              return "BELOW STANDARD";
          } else if (data.value > data.Marker.below_standard_upper && data.value < data.Marker.optimal_lower){
              return "BELOW OPTIMAL"
          } else if (data.value > data.Marker.optimal_lower && data.value < data.Marker.optimal_upper){
              return "OPTIMAL"
          } else if (data.value > data.Marker.optimal_upper && data.value < data.Marker.above_standard_lower){
              return "ABOVE OPTIMAL"
          } else if (data.value > data.Marker.above_standard_lower && data.value < data.Marker.above_standard_upper){
              return "ABOVE STANDARD"
          } else if (data.value > data.Marker.above_standard_upper){
              return "ABOVE SCALE"
          } else {
              return "JUNK DATA"
          }
    }

    return(
        <div className="col-lg-4" key={data.Marker.id}>
            <h2>{data.Marker.name}</h2>
            <p>Last Result Date: {data.date}</p>
            <p>Last Result Value: {data.value} {data.Marker.unit_measurement}</p>
            <p>{getRangefromValue(data)}</p>
            <p><a className="btn btn-secondary" href="#">View details &raquo;</a></p>
        </div>
    )
}

export default BloodResultCard;
