import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

function NavComponent(props) {

    const [searchForm, setSearchForm] = React.useState({"searchQuery": ''})

    function handleChange(event){
        const {name, value} = event.target
        setSearchForm(prevState => {
            return {...prevState,
                    [name]: value}})
    }

    const showSearchForm = props.loggedIn && props.homePage


    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Bloodwork App</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
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
                    { showSearchForm &&
                    <form className="d-flex" role="search"
                          onSubmit={(event) => props.handleSubmit(event, searchForm)}>
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                               value={searchForm['searchQuery']} name={"searchQuery"} onChange={handleChange} />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>}
                </div>
            </div>
        </nav>
    )
}

export default NavComponent;