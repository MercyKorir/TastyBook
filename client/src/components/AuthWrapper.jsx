import React from "react";
import styles from "../styles/Login.module.css";
import CloseIcon from "@mui/icons-material/Close";

const AuthWrapper = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.iconClose}>
        <div>
          <CloseIcon />
        </div>
      </span>
      {children}
    </div>
  );
};

export default AuthWrapper;
