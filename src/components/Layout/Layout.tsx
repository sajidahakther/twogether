"use client";

import React, { useState } from "react";
import styles from "./Layout.module.scss";
import { Navigation } from "../Navigation";
import { Header } from "@/components/Header";

type LayoutProps = {
  showMenu?: boolean;
  showBack?: boolean;
  onBack?: () => void;
  children: React.ReactNode;
};

export const Layout = ({
  onBack,
  children,
  showBack = false,
  showMenu = false,
}: LayoutProps) => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  const toggleNavigation = () => {
    setIsNavigationOpen((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <Header
        onBack={onBack}
        showBack={showBack}
        showNavigation={showMenu}
        onNavigation={toggleNavigation}
      />
      {isNavigationOpen && (
        <div className={styles.overlay} onClick={toggleNavigation} />
      )}
      <div className={styles.content}>{children}</div>
      <Navigation
        onClose={toggleNavigation}
        isNavigationOpen={isNavigationOpen}
      />
    </div>
  );
};
