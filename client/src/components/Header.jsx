import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../styles/Header.module.css";
import styles from "../styles/Header.module.css";
import logo from "../assets/tastybook-logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = () => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(["token"]);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5050/user/logout",
        null,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        removeCookie("token");
        setUser(null);
        alert("Logout successful");
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Error Logging out:", err);
    }
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    if (cookies.token) {
      axios
        .get("http://localhost:5050/user/verify", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((response) => {
          if (response.status === 200 && response.data.status === true) {
            const user = response.data.user;
            setUser(user);
          } else if (response.status === 401) {
            setUser(null);
            return;
          }
        })
        .catch((err) => {
          console.error("Error verifying user: ", err);
          // navigate("/login");
        });
    } else {
      return;
    }
  }, [cookies.token, navigate]);

  return (
    <header>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <img src={logo} className={styles.logoImg} alt="logo" />
        <h2 className={styles.logo}>TastyBook</h2>
      </div>
      <nav className={styles.navigation}>
        <NavLink className={styles.navItem} to={"/"}>
          Home
        </NavLink>
        <NavLink className={styles.navItem} to={"#"}>
          Catalog
        </NavLink>
        <NavLink className={styles.navItem} to={"/about"}>
          About Us
        </NavLink>
        <NavLink className={styles.navItem} to={"#"}>
          FAQ
        </NavLink>
      </nav>
      <div>
        {user ? (
          <div>
            <span onClick={toggleDropdown}>
              <AccountCircleIcon
                style={{ cursor: "pointer" }}
                className={styles.avatar}
              />
            </span>
            {isDropdownOpen && (
              <div className={styles.dropdownContainer}>
                <div className={styles.dropdownContent}>
                  <div className={styles.greeting}>
                    <h3>Hi, {user.username} 👋</h3>
                  </div>
                  <div>
                    <NavLink to="/user" className={styles.dropdownItem}>
                      Account
                    </NavLink>
                  </div>
                  <div>
                    <NavLink
                      to="/recipe/create"
                      className={styles.dropdownItem}
                    >
                      Create Recipe
                    </NavLink>
                  </div>
                  <div>
                    <NavLink
                      to="/recipe/create"
                      className={styles.dropdownItem}
                      onClick={handleLogout}
                    >
                      Logout
                    </NavLink>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            className={styles.btnLoginPopup}
            type="button"
            onClick={handleLogin}
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
