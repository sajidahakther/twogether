"use client";

import React from "react";
import styles from "./Header.module.scss";
import { useRouter } from "next/navigation";
import Logo from "@/app/assets/images/Logo";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import HamburgerMenu from "@/app/assets/images/HamburgerMenu";

type HeaderProps = {
  showBack: boolean;
  onBack?: () => void;
  showNavigation: boolean;
  onNavigation: () => void;
};

export const Header = ({
  onBack,
  onNavigation,
  showBack = false,
  showNavigation = false,
}: HeaderProps) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div className={styles.header}>
      <div className={`${!showBack && "invisible"}`} onClick={handleBack}>
        <ChevronLeft fontSize="large" className={styles.chevronLeft} />
      </div>
      <Logo />
      <div
        className={`${!showNavigation && "invisible"}`}
        onClick={onNavigation}
      >
        <HamburgerMenu />
      </div>
    </div>
  );
};
