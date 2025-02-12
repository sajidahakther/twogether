import React from "react";
import { Navbar } from "../Navbar";
import styles from "./Screen.module.scss";

type ScreenProps = {
  children: React.ReactNode;
  showBack?: boolean;
};

export const Screen = ({ children, showBack = false }: ScreenProps) => {
  return (
    <div className={styles.container}>
      <Navbar showBack={showBack} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};
