import {useParams} from "react-router-dom";
import fakeDataDetail from "../fakeDataDetail";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React from "react";

import NavComponent from "./NavBar";
import {getRangefromValue} from "../helpers";
import MarkerResultCard from "./MarkerTableResults";
import Cookies from "js-cookie";
import axios from "axios";

function MarkerDetail(props) {
    let params = useParams()
    let markerID = parseInt(params.markerID, 10) || false;

    const [dataDetail, setDataDetail] = React.useState([]);
    const[markerName, setMarkerName] = React.useState('');
    const [deletedEntry, setDeletedEntry] = React.useState(false)

    const userEmail = Cookies.get('userEmail');

    const loggedIn = true;

    React.useEffect(() => {
        if(deletedEntry === true){
                setDeletedEntry(false);
        }
    axios.get(`http://localhost:8000/api/v1/results/${markerID}`,
        { headers: { Authorization: `Bearer ${Cookies.get("userToken")}`}})
        .then((response) => {
            setDataDetail(response.data)
            setMarkerName(response.data[0].Marker.name)
          })
        .catch(err => {
        })
  }, [markerID, deletedEntry])

    const handleDelete = (result_id) => {
        axios.delete(`http://localhost:8000/api/v1/results/${result_id}`,
        { headers: { Authorization: `Bearer ${Cookies.get("userToken")}`}})
        .then((response) => {
            setDeletedEntry(true);
          })
        .catch(err => {
        })
    }

    // const markerName = fakeDataDetail[0].Marker.name

    const resultScaleCount = {"below_scale": 0, "below_standard": 0, "below_optimal": 0, "optimal": 0,
        "above_optimal": 0, "above_standard": 0, "above_scale": 0}

    const tableBody = dataDetail.map((value, index) => {
        return <tr key={index}>
            <td>{index + 1}</td>
            <td>{value.Marker.name}</td>
            <td>{value.date}</td>
            <td>{value.value}</td>
            <td>{value.Marker.unit_measurement}</td>
            <td>{getRangefromValue(value)}</td>
            <td><button onClick={() => handleDelete(value.id)}>Delete</button></td>
        </tr>
    })


    return (
        <>
            <NavComponent loggedIn={loggedIn} userEmail={userEmail} homePage={false} />
            <main className={"mainPageBackground container"}>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                </div>



                {dataDetail.length > 0 ?
                    <MarkerResultCard tableBody={tableBody}
                                      dataDetail={dataDetail}
                                      resultsScaleCount={resultScaleCount}
                                      markerName={markerName}/> :
                <h4>No results found</h4>
                }

            </main>
        </>
    )
}

export default MarkerDetail;