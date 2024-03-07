import NavComponent from "./NavBar";
import {useNavigate} from "react-router-dom";
import React from "react";

const Login = () => {
    const loggedIn = React.useState(false);
    const [loginFormObj, setLoginFormOj] = React.useState(
        {formEmail: '', formPassword: ''});
    const [formError, setFormError] = React.useState(false);

    const handleLoginSubmit = (event, loginFormObj) => {
        event.preventDefault();
        console.log(loginFormObj)
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