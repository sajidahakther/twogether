import React from "react";
import styles from "./Text.module.scss";

type TextProps = {
  text: string;
  variant: "h1" | "error" | string;
};

export const Text = ({ text, variant }: TextProps) => {
  return <p className={styles[variant]}>{text}</p>;
};
