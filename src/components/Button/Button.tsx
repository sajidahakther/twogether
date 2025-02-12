import React from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  label: string;
  onClick: () => void;
  variant: "filled" | "outline";
};

export const Button = ({ onClick, label, variant }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${variant === "outline" ? styles.outline : ""}`}
    >
      {label}
    </button>
  );
};
