import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";
import EmailIcon from "@mui/icons-material/Email";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://tastybook.onrender.com/user/forgot-password",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setMessage("Password reset email sent. Check your inbox.");
        setTimeout(() => {
          navigate("/reset-password");
        }, 3000);
      }
    } catch (err) {
      console.error("Error sending email: ", err);
      setMessage("Error sending email");
    }
  };

  return (
    <div className={`${styles.formBox}`}>
      <h2>ForgotPassword</h2>
      <form onSubmit={handleResetPassword}>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="email">Email</label>
        </div>
        <button type="submit" className={styles.btn}>
          Reset Password
        </button>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default ForgotPassword;
