import NavComponent from "./NavBar";
import Cookies from "js-cookie";


function LogOut() {
    localStorage.removeItem('userToken');
    localStorage.removeItem("userRefreshToken");
    localStorage.removeItem("userEmail")
    Cookies.remove("userToken");
    Cookies.remove("userRefreshToken");
    Cookies.remove("userEmail");

  return (
    <main>
        <NavComponent
            loggedIn={false}
        />
    </main>
  );
}

export default LogOut