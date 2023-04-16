import './App.css';
import NavComponent from "./components/NavBar";
import LatestResults from "./components/LatestResults";
import PleaseLogInJumbotron from "./components/PleaseLogInJumbotron";
import React from "react";

function App() {
    const loggedIn = true;
    const userEmail = "gareth.breeze1993@gmail.com";

  return (
      <>
          <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Bloodwork App</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                <NavComponent
                    loggedIn={loggedIn}
                    userEmail={userEmail}
                />
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
        <main className={"mainPageBackground"}>
            { loggedIn ?
                <LatestResults />
            :
                <PleaseLogInJumbotron />
            }
        </main>
    </>
  );
}

export default App;
