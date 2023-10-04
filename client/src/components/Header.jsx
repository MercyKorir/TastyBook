import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Header.module.css";
import styles from "../styles/Header.module.css";
import logo from "../assets/tastybook-logo.png"

const Header = () => {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <header>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <img src={logo} alt='logo' />
        <h2 className={styles.logo}>TastyBook</h2>
      </div>
      <nav className={styles.navigation}>
        <NavLink className={styles.navItem} to={"#"}>
          Home
        </NavLink>
        <NavLink className={styles.navItem} to={"#"}>
          Catalog
        </NavLink>
        <NavLink className={styles.navItem} to={"#"}>
          About Us
        </NavLink>
        <NavLink className={styles.navItem} to={"#"}>
          FAQ
        </NavLink>
        <button
          className={styles.btnLoginPopup}
          type="button"
          onClick={handleLogin}
        >
          Login
        </button>
      </nav>
    </header>
  );
};

export default Header;
