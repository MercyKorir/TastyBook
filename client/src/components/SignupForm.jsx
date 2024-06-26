import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfPwd, setShowConfPwd] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "https://tastybook.onrender.com/user/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        alert("Signup successful!");
        setFormData({
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      } else if (response.status === 400) {
        alert("Email already exists");
      } else {
        const data = await response.data;
        setMessage(`Signup failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={`${styles.formBox} ${styles.register}`}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <span className={styles.icon}>
            <div>
              <PersonIcon />
            </div>
          </span>
          <input
            type="text"
            id="username"
            name="username"
            autoComplete="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className={styles.inputBox}>
          <span className={styles.icon}>
            <div>
              <EmailIcon />
            </div>
          </span>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className={styles.inputBox}>
          <span className={styles.icon}>
            <div onClick={() => setShowPwd(!showPwd)}>
              {showPwd ? (
                <VisibilityIcon style={{ cursor: "pointer" }} />
              ) : (
                <VisibilityOffIcon style={{ cursor: "pointer" }} />
              )}
            </div>
          </span>
          <input
            type={showPwd ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className={styles.inputBox}>
          <span className={styles.icon}>
            <div onClick={() => setShowConfPwd(!showConfPwd)}>
              {showConfPwd ? (
                <VisibilityIcon style={{ cursor: "pointer" }} />
              ) : (
                <VisibilityOffIcon style={{ cursor: "pointer" }} />
              )}
            </div>
          </span>
          <input
            type={showConfPwd ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
        </div>
        <div className={styles.rememberForgot}>
          <label htmlFor="terms">
            <input type="checkbox" id="terms" />I agree to the terms &
            conditions
          </label>
        </div>
        <button type="submit" className={styles.btn}>
          Register
        </button>
        <div className={styles.loginRegister}>
          <p>
            Already have an account?{" "}
            <NavLink className={styles.registerLink} to="/login">
              Login
            </NavLink>
          </p>
        </div>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default SignupForm;
