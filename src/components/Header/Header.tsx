"use client";

import React from "react";
import styles from "./Header.module.scss";
import { useRouter } from "next/navigation";
import Logo from "@/app/assets/images/Logo";
import HamburgerMenu from "@/app/assets/images/HamburgerMenu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

type HeaderProps = {
  showBack: boolean;
  showNavigation: boolean;
  onNavigation: () => void;
};

export const Header = ({
  onNavigation,
  showBack = false,
  showNavigation = false,
}: HeaderProps) => {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };

  return (
    <div className={styles.header}>
      <div className={`${!showBack && "invisible"}`} onClick={onBack}>
        <ChevronLeftIcon fontSize="large" className="text-secondary" />
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
