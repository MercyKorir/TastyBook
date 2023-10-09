import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import styles from "../styles/Login.module.css";
import userStyles from "../styles/UserProfile.module.css";
import UserRecipes from "./UserRecipes";
import AccountSettings from "./AccountSettings";
import RecipeForm from "./RecipeForm";

const UserProfile = () => {
  const navigate = useNavigate();
  const [cookies, ,] = useCookies(["token"]);
  const [activeTab, setActiveTab] = useState("recipes");

  axios.defaults.withCredentials = true;

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete("https://tasty-book-api.vercel.app/user/delete", {
        withCredentials: true,
      });
      if (response.status === 200) {
        alert("User account deleted successfully");
        navigate("/login");
      } else {
        console.error("Failed to delete user account");
      }
    } catch (err) {
      console.error("Error deleting user account: ", err);
    }
  };

  const handleActivateTab = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    axios
      .get("https://tasty-book-api.vercel.app/user/verify", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data.status === true) {
          const user = response.data.user;
          console.log(`Welcome ${user.username}`);
          // alert(`Welcome ${user.username}`);
        } else {
          alert("Login to Continue");
          console.error("User is not authorized");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error("Error: ", err);
        navigate("/login");
      });
  }, [cookies.token, navigate]);

  return (
    <div className={userStyles.container}>
      <div className={userStyles.sidebar}>
        <ul className={userStyles.navLinks}>
          <li>
            <span
              onClick={() => handleActivateTab("recipes")}
              className={activeTab === "recipes" ? userStyles.activeLink : ""}
            >
              Your Recipes
            </span>
          </li>
          <li>
            <span
              onClick={() => handleActivateTab("create")}
              className={activeTab === "create" ? userStyles.activeLink : ""}
            >
              Create Recipe
            </span>
          </li>
          <li>
            <span
              onClick={() => handleActivateTab("account")}
              className={activeTab === "account" ? userStyles.activeLink : ""}
            >
              Account Settings
            </span>
          </li>
        </ul>
        <button
          className={styles.btn}
          type="button"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </button>
      </div>
      <div className={userStyles.content}>
        {activeTab === "recipes" && <UserRecipes />}
        {activeTab === "account" && <AccountSettings />}
        {activeTab === "create" && <RecipeForm />}
      </div>
    </div>
  );
};

export default UserProfile;
