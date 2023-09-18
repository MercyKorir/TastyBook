import React from "react";
import styles from "../styles/Login.module.css";

const AuthWrapper = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.iconClose}>
        <div>C</div>
      </span>
      {children}
    </div>
  );
};

export default AuthWrapper;
