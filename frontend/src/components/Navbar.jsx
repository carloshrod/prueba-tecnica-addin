import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function Navbar() {
    const { pathname } = useLocation();
    const { auth, payload, logout } = useAuthContext();

    const linkPath = pathname === "/" ? "/signup" : "/";
    const linkLabel = pathname === "/" ? "Signup" : "Login"
    
    return (
        <header className="navbar">
            <span className="navbar__logo">
                Addin Technologies
            </span>
            {!auth
                ?
                <Link to={linkPath}>
                    <span className="navbar__link">
                        {linkLabel}
                    </span>
                </Link>
                :
                <span className="navbar__user-info" onClick={logout}>
                    {payload.username}<i className="fa-solid fa-right-from-bracket" />
                </span>
            }
        </header>
    )
}

export default Navbar;