import React, { useState } from "react";
import axios from "axios";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styles from "../styles/Login.module.css";

const ResetPassword = () => {
  const [resetData, setResetData] = useState({
    email: "",
    newPassword: "",
    resetToken: "",
  });
  const [message, setMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfPwd, setShowConfPwd] = useState(false);
  const [showToken, setShowToken] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResetData({
      ...resetData,
      [name]: value,
    });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (resetData.newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.patch(
        "https://tastybook.onrender.com/user/reset-password",
        resetData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setMessage("Password reset successfully.");
        setResetData({
          email: "",
          newPassword: "",
          resetToken: "",
        });
        setConfirmPassword("");
      }
    } catch (err) {
      console.error("Error setting new Password: ", err);
      setMessage("Error resetting password");
    }
  };
  return (
    <div className={`${styles.formBox} ${styles.register}`}>
      <h2>Reset Password</h2>
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
            value={resetData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className={styles.inputBox}>
          <span className={styles.icon}>
            <div onClick={() => setShowToken(!showToken)}>
              {showToken ? (
                <VisibilityIcon style={{ cursor: "pointer" }} />
              ) : (
                <VisibilityOffIcon style={{ cursor: "pointer" }} />
              )}
            </div>
          </span>
          <input
            type={showToken ? "text" : "password"}
            id="resetToken"
            name="resetToken"
            value={resetData.resetToken}
            onChange={handleChange}
            required
          />
          <label htmlFor="resetToken">Reset Token</label>
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
            id="newPassword"
            name="newPassword"
            value={resetData.newPassword}
            onChange={handleChange}
            required
          />
          <label htmlFor="newPassword">New Password</label>
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
            id="confirmNewPassword"
            name="confirmNewPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label htmlFor="confirmNewPassword">Confirm Password</label>
        </div>
        <button type="submit" className={styles.btn}>
          Reset Password
        </button>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default ResetPassword;
