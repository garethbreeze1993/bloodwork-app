import './App.css';
import NavComponent from "./components/NavBar";
import LatestResults from "./components/LatestResults";
import PleaseLogInJumbotron from "./components/PleaseLogInJumbotron";
import React from "react";

function App() {
    const loggedIn = false;
    const userEmail = "gareth.breeze1993@gmail.com";

    const [searchQueryUsed, setSearchQuery] = React.useState(false);



    function handleSearchSubmit(event, searchForm) {
        event.preventDefault();
        setSearchQuery(searchForm['searchQuery']);
    }

  return (
      <>
            <NavComponent
                loggedIn={loggedIn}
                userEmail={userEmail}
                homePage={true}
                handleSubmit={handleSearchSubmit}
            />

            <main className={"mainPageBackground"}>
                { loggedIn ?
                    <LatestResults searchQuery={searchQueryUsed} />
                :
                    <PleaseLogInJumbotron />
                }
            </main>
    </>
  );
}

export default App;
