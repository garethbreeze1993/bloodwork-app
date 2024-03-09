import NavComponent from "./NavBar";


function LogOut() {
    localStorage.removeItem('userToken');
    localStorage.removeItem("userRefreshToken");
    localStorage.removeItem("userEmail")
  return (
    <main>
        <NavComponent
            loggedIn={false}
        />
    </main>
  );
}

export default LogOut