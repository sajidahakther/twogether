import React from "react";
import { Header } from "../Header";
import styles from "./Layout.module.scss";

type LayoutProps = {
  children: React.ReactNode;
  showBack?: boolean;
};

export const Layout = ({ children, showBack = false }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <Header showBack={showBack} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};
