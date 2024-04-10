import NavComponent from "./NavBar";
import {useNavigate} from "react-router-dom";
import React from "react";
import axios from "axios";
import Cookies from "js-cookie";



const CreateForm = () => {
    // const axios = require('axios').default;
    const userEmail = Cookies.get('userEmail');
    const [formErrors, setFormErrors] = React.useState([]);
    const [formMessage, setFormMessage] = React.useState('');
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
                setFormErrors(response.data['error_list'])
                setFormMessage(response.data['message'])
                // console.log(response.data['error_list'])
                // console.log(response.data['message'])
                })
            .catch(function (error) {
                console.log("error")
            });
    }

    const handleChange = (event) => {
        const target = event.target
        setFile(target.files[0])
    }

    const arrayDataItems = formErrors.map(resultErr =>
            <li key={resultErr.lineNumber}>
                      <p>Error on line number{resultErr.lineNumber} {resultErr.errorMessage}</p>
                    </li>
    )

    return (
        <>
        <NavComponent
            loggedIn={true}
            userEmail={userEmail}

        />

            <main className={"mainPageBackground mainLocation container"}>
                {formMessage && <h2>{formMessage}</h2>}
                {formErrors.length > 0 && arrayDataItems}

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