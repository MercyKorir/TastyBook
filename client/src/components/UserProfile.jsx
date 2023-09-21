import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import styles from "../styles/Login.module.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(["token"]);

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
        alert("Logout successful");
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Error Logging out:", err);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete("http://localhost:5050/user/delete", {
        withCredentials: true,
      });
      if (response.status === 200) {
        alert("User account deleted successfully");
      } else {
        console.error("Failed to delete user account");
      }
    } catch (err) {
      console.error("Error deleting user account: ", err);
    }
  };

  useEffect(() => {
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
          //   console.log(`Welcome ${user.username}`);
          alert(`Welcome ${user.username}`);
        } else {
          alert("Login to Continue");
          console.error("User is not authorized");
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Error: ", err);
        navigate("/");
      });
  }, [cookies.token, navigate]);

  return (
    <div>
      <h2>User Profile</h2>
      <button className={styles.btn} type="button" onClick={handleLogout}>
        Logout
      </button>
      <br />
      <br />
      <button
        className={styles.btn}
        type="button"
        onClick={handleDeleteAccount}
      >
        Delete Account
      </button>
    </div>
  );
};

export default UserProfile;
