import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


export default function Navbar() {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* App title */}
      <h1 className="navbar-title">
        <Link to="/" className="navbar-link">
          MediBooker
        </Link>
      </h1>

      {/* Right side buttons */}
      <div className="navbar-actions">
        {!auth.token ? (
          <>
            <Link to="/login" className="navbar-btn">
              Login
            </Link>
            <Link to="/register" className="navbar-btn">
              Register
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} className="navbar-btn logout-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
