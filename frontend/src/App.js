import './App.css';
import NavComponent from "./components/NavBar";
import LatestResults from "./components/LatestResults";
import PleaseLogInJumbotron from "./components/PleaseLogInJumbotron";
import React from "react";
import Cookies from "js-cookie";


function App() {

    const userEmail = Cookies.get('userEmail');

    const [searchQueryUsed, setSearchQuery] = React.useState(false);
    // const userToken = localStorage.getItem('userToken');
    const userToken = Cookies.get("userToken");
    console.log(userToken)
    const loggedIn = !!userToken




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
                userToken={userToken}
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
