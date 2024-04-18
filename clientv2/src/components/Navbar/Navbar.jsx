import { useState, useEffect, useContext } from "react"; 
import { Link } from "react-router-dom"; 
import { AuthContext } from "../../contexts/AuthContext";
import Account from "../Login/Account";

// importing css
import "./Navbar.css";

const Navbar = () => {
  let { token, isAdmin, userId } = useContext(AuthContext);

  useEffect(() => {
    console.log(typeof isAdmin);
  }, [isAdmin, token, userId]);

  return (
    <nav
      className="navbar navbar-expand-sm text-light i-bg-primary"
      style={{ zIndex: "10", position: "fixed", width: "100%", top: 0 }}
    >
      <div className="container-fluid">
        <Link to={"/home"} className="navbar-brand text-white">
          <div className="container d-flex text-center">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "36px" }}
            >
              apps
            </span>
          </div>
        </Link>
      </div>

      <div className="container-fluid d-flex justify-content-end">
        <ul className="navbar-nav">
          {isAdmin === "true" || isAdmin == true ? (
            <>
              <li className="nav-item">
                <Link to={"/dashboard"} className="nav-link text-white">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/view-reports"} className="nav-link text-white">
                  View Reports
                </Link>
              </li>
            </>
          ) : (
            ""
          )}

          <li
            className="nav-item text-white"
            style={{ marginTop: "10px", cursor: "pointer" }}
          >
            {token !== null && <Account userId={userId} />}
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
