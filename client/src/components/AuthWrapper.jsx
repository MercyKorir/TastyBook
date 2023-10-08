import React from "react";
import styles from "../styles/Login.module.css";
import authStyles from '../styles/AuthWrapper.module.css'
import CloseIcon from "@mui/icons-material/Close";

const AuthWrapper = ({ children }) => {
  return (
    <div className={authStyles.authContainer}>
      <div className={styles.wrapper}>
        <span className={styles.iconClose}>
          <div>
            <CloseIcon />
          </div>
        </span>
        {children}
      </div>
    </div>
  );
};

export default AuthWrapper;
