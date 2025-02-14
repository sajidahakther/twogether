import React from "react";
import styles from "./Text.module.scss";

type TextProps = {
  text: string;
  className?: string;
  variant: "h1" | "error" | string;
};

export const Text = ({ text, variant, className }: TextProps) => {
  return <p className={`${styles[variant]} ${className}`}>{text}</p>;
};
