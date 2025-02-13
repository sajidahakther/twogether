"use client";

import React from "react";
import styles from "./Header.module.scss";
import { useRouter } from "next/navigation";
import Logo from "@/app/assets/images/Logo";
import HamburgerMenu from "@/app/assets/images/HamburgerMenu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

type HeaderProps = {
  showBack?: boolean;
  showMenu?: boolean;
};

export const Header = ({ showBack = false, showMenu = false }: HeaderProps) => {
  const router = useRouter();
  const onBack = () => {
    router.back();
  };
  return (
    <div className={styles.header}>
      <div className={`${!showBack ? "invisible" : ""}`} onClick={onBack}>
        <ChevronLeftIcon fontSize="large" className="text-secondary" />
      </div>
      <Logo />
      <HamburgerMenu className={`${!showMenu ? "invisible" : ""}`} />
    </div>
  );
};
