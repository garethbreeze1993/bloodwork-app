import NavComponent from "./NavBar";
import {useNavigate} from "react-router-dom";
import React from "react";
import axios from "axios";
import Cookies from "js-cookie";



const CreateForm = () => {
    // const axios = require('axios').default;
    const [formSubmitted, setFormsubmitted] = React.useState(false);
    const [file, setFile] = React.useState(null);

    const handleCreateSubmit = (event, loginFormObj) => {
        event.preventDefault();
        if(!file){
            return
        }
        const formData = new FormData();
        formData.append('file', file);

        axios.post(`http://localhost:8000/api/v1/results/`, formData,
            { headers: { Authorization: `Bearer ${Cookies.get("userToken")}`}})
            .then(function (response) {
                console.log("success")
                })
            .catch(function (error) {
                console.log("error")
            });
    }

    const handleChange = (event) => {
        const target = event.target
        setFile(target.files[0])
    }

    return (
        <>
        <NavComponent
            loggedIn={true}
        />
            {formSubmitted && <h3><a href={"/login"}>Successfully signed up! Please click the link to Log in</a></h3>}

            <main className={"mainPageBackground mainLocation container"}>
                <form onSubmit={(event) => {handleCreateSubmit(event)}}>
                    <div className="mb-3">
                        <label htmlFor="uploadFile" className="form-label">Upload File</label>
                        <input type="file" className="form-control" id="uploadFile" accept={".csv"} onChange={handleChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </main>
        </>
    )
}

export default CreateForm;