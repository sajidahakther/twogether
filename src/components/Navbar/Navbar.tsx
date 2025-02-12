import React from "react";
import styles from "./Navbar.module.scss";
import Logo from "@/app/assets/images/Logo";
import Menu from "@/app/assets/images/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

type NavbarProps = {
  showBack?: boolean;
};

export const Navbar = ({ showBack = false }: NavbarProps) => {
  return (
    <div className={styles.navbar}>
      <ChevronLeftIcon
        fontSize="large"
        className={`text-secondary ${!showBack ? "invisible" : ""}`}
      />
      <Logo />
      <Menu />
    </div>
  );
};
