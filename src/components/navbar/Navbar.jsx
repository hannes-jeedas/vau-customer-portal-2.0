import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/vau_logo.png";

const Navbar = ({ name }) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate('/login');
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img className="navbar-logo" src={Logo} alt="" />
        <span>Customer Order Portal</span>
      </div>
      <div className="navbar-customer">
        <span>{name}</span>
      </div>
      <div className="navbar-menu">
        {/* TODO: */}
        {/* <a href="/" className="nav-link">Home</a>
        <a href="/orders" className="nav-link">Orders</a>
        <a href="/profile" className="nav-link">Profile</a> */}
        <a onClick={() => handleLogOut()} className="nav-link logout">
          Log Out
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
