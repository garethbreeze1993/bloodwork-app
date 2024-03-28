import NavComponent from "./NavBar";
import {useNavigate} from "react-router-dom";
import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
    const loggedIn = false;
    const [loginFormObj, setLoginFormOj] = React.useState(
        {formEmail: '', formPassword: ''});
    const [formError, setFormError] = React.useState(false);
    let navigate = useNavigate();


    const handleLoginSubmit = (event, loginFormObj) => {
        event.preventDefault();
        const bodyFormData = new FormData();
        bodyFormData.append('username', loginFormObj.formEmail)
        bodyFormData.append('password', loginFormObj.formPassword)
        console.log(loginFormObj)
        axios.post(`http://localhost:8000/api/v1/login`, bodyFormData)
            .then(function (response) {
                setLoginFormOj({formEmail: '', formPassword1: ''})
                Cookies.set("userToken", response.data.access_token, { expires: 7, path: "/" });
                Cookies.set("userRefreshToken", response.data.refresh_token, { expires: 7, path: "/" });
                Cookies.set("userEmail", response.data.user_email, { expires: 7, path: "/" });
                localStorage.setItem('userToken', response.data.access_token)
                localStorage.setItem('userRefreshToken', response.data.refresh_token)
                localStorage.setItem('userEmail', response.data.user_email)
                navigate("/");
                })
            .catch(function (error) {
                setFormError(true)
                if(error.response.status === 401){
                    console.log(error.response.detail)
                }
                else{
                    console.log("Error when submitting form. Please try again later.")
                }
            });

    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setLoginFormOj(prevState => {
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
            <main className={"mainPageBackground mainLocation container"}>
                <form onSubmit={(event) => {handleLoginSubmit(event, loginFormObj)}}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            value={loginFormObj['formEmail']} name={"formEmail"} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"
                           value={loginFormObj['formPassword']} name={"formPassword"} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </main>
        </>
    )
}

export default Login;