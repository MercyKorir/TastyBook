import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import styles from "../styles/Login.module.css";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPwd, setShowPwd] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5050/user/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        alert("Login successful!");
        setLoginData({
          email: "",
          password: "",
        });
        navigate("/user");
      } else {
        setMessage("Login failed. Check your email and password.");
      }
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  return (
    <div className={`${styles.formBox} ${styles.login}`}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <span className={styles.icon}>
            <div>
              <EmailIcon />
            </div>
          </span>
          <input
            type="email"
            id="loginEmail"
            name="email"
            autoComplete="email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="loginEmail">Email</label>
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
            id="loginPassword"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="loginPassword">Password</label>
        </div>
        <div className={styles.rememberForgot}>
          <label htmlFor="remember">
            <input type="checkbox" id="remember" />
            Remember me
          </label>
          <NavLink className={styles.forgotLink} to={"/forgot-password"}>
            Forgot Password?
          </NavLink>
        </div>
        <button type="submit" className={styles.btn}>
          Login
        </button>
        <div className={styles.loginRegister}>
          <p>
            Don't have an account?{" "}
            <NavLink className={styles.registerLink} to="/signup">
              Register
            </NavLink>
          </p>
        </div>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default Login;
