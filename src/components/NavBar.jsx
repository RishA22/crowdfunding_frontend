import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";
import { useState, useEffect } from "react";
import "./navbar.css";
import Logo_Uplift from "../assets/Logo_Uplift.png";

function NavBar() {
    const { auth, setAuth } = useAuth();
    const [logoutMessage, setLogoutMessage] = useState("");


    const handleLogout = () => {
        window.localStorage.removeItem("token");
        setAuth({ token: null });
        setLogoutMessage("Welcome back! Please log in again.");
    };

    const handleLinkClick = () => {
        console.log("Attempting to clear logout message...");
        setLogoutMessage(""); // Clear the message immediately
    };

    return (
        <div>
            <nav>
                {/* Logo Section */}
                <div className="logo">
                    <img src={Logo_Uplift} alt="App Logo" />
                </div>
                <div className="nav-links">
                    <Link to="/" onClick={handleLinkClick}>Home</Link>
                    {auth?.token ? (<>
                        <Link to="/" onClick={() => { handleLogout() }}>
                            Log Out
                        </Link>
                        <Link to="/createproject" onClick={handleLinkClick} > Apply for a grant</Link>

                    </>

                    ) : (<>
                        <Link to="/login" onClick={handleLinkClick}>Login</Link>
                        <Link to="/signup" onClick={handleLinkClick}>Signup</Link>
                    </>


                    )}
                </div>

            </nav >
            {/* Show the logout message if it exists  */}
            {logoutMessage && <div className="logout-message">{logoutMessage}</div>}

            <Outlet />
        </div >
    );
}

export default NavBar;