import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

function NavComponent(props) {

    return (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/">Home</a>
                </li>
                { props.loggedIn &&
                    <li className="nav-item">
                        <a className="nav-link" href="/create">Create</a>
                    </li>
                }
                {!props.loggedIn ?
                    <>
                        <li className={"nav-item"}>
                          <a className={"nav-link"} href="/login">Log in</a>
                        </li>
                        <li className={"nav-item"}>
                          <a className={"nav-link"} href="/signup">Sign Up</a>
                        </li>
                    </>
                :
                    <>
                        <li className={"nav-item"}>
                            <button className={"nav-link"}>Signed in as: {props.userEmail}</button>
                        </li>
                        <li className={"nav-item"}>
                            <a className={"nav-link"} href="/logout">Log Out</a>
                        </li>
                    </>
                }
            </ul>

    )
}

export default NavComponent;