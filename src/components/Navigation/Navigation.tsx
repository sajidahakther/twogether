import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Close } from "@mui/icons-material";
import styles from "./Navigation.module.scss";

type NavigationProps = {
  onClose: () => void;
  isNavigationOpen: boolean;
};

export const Navigation = ({ isNavigationOpen, onClose }: NavigationProps) => {
  const { logout } = useAuth();
  return (
    <div
      className={`${styles.navigation} ${isNavigationOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <Close fontSize="large" onClick={onClose} className={styles.close} />
      <div className={styles.links}>
        <button className={styles.link}>Profile Settings</button>
        <button className={styles.link}>Contact Us</button>
        <button className={styles.link} onClick={logout}>
          Log Out
        </button>
      </div>
    </div>
  );
};
