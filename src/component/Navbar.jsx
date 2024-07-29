import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token'); // Remove token on logout
    navigate("/");
  };

  const token = localStorage.getItem("token");

  return (
    <nav className="nav">
      <div className="nav-left">
        {isLoggedIn || token ? (
          <Link to="/add-product" className="nav-link">
            Add Product
          </Link>
        ) : null}
      </div>
      <div className="nav-right">
        {!isLoggedIn && !token ? (
          <>
            <Link to="/login" className="nav-link">Login</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
