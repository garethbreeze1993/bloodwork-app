import NavComponent from "./NavBar";
import {useNavigate} from "react-router-dom";
import React from "react";
import axios from "axios";


const SignUp = () => {
    // const axios = require('axios').default;
    const [formSubmitted, setFormsubmitted] = React.useState(false);
    const loggedIn = false;
    const [signUpFormObj, setSignUpFormObj] = React.useState(
        {formEmail: '', formPassword1: '', formPassword2: ''});
    const [formError, setFormError] = React.useState(false);
    const [formErrorMsg, setFormErrorMsg] = React.useState('');

    const handleSignUpSubmit = (event, loginFormObj) => {
        event.preventDefault();
        if(signUpFormObj.formPassword1 !== signUpFormObj.formPassword2){
            setFormError(true);
            setFormErrorMsg("Passwords need to match")
            return
        }
        let dataObject = {email: signUpFormObj.formEmail, password: signUpFormObj.formPassword1}

        axios.post(`http://localhost:8000/api/v1/users/`, dataObject)
            .then(function (response) {
                setSignUpFormObj({formEmail: '', formPassword1: '', formPassword2: ''})
                setFormsubmitted(true)
                })
            .catch(function (error) {
                setFormError(true)
                setFormErrorMsg("Error when submitting form. Please try again later.")
            });
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setSignUpFormObj(prevState => {
            return {...prevState,
                    [name]: value}})
        if(formError){
            setFormError(false)
        }
    }

    return (
        <>
        <NavComponent
            loggedIn={loggedIn}
        />
            {formSubmitted && <h3><a href={"/login"}>Successfully signed up! Please click the link to Log in</a></h3>}

            <main className={"mainPageBackground mainLocation container"}>
                {formError && <div className="alert alert-danger" role="alert">
                    {formErrorMsg}</div>}
                <form onSubmit={(event) => {handleSignUpSubmit(event, signUpFormObj)}}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            value={signUpFormObj['formEmail']} name={"formEmail"} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"
                            value={signUpFormObj['formPassword1']} name={"formPassword1"} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Repeat Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword2"
                           value={signUpFormObj['formPassword2']} name={"formPassword2"} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </main>
        </>
    )
}

export default SignUp;