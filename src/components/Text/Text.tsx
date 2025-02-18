import React from "react";
import styles from "./Text.module.scss";

type TextProps = {
  variant: string;
  className?: string;
  text: string | undefined;
};

export const Text = ({ text, variant, className }: TextProps) => {
  return <p className={`${className} ${styles[variant]}`}>{text}</p>;
};
