import React from "react";
import { Text } from "@/components/Text";
import styles from "./Checkbox.module.scss";

type CheckboxProps = {
  label: string;
  checked?: boolean;
  onChange: () => void;
};

export const Checkbox = ({ checked, onChange, label }: CheckboxProps) => {
  return (
    <div className={styles.container} onClick={onChange}>
      <label className={styles.input}>
        <input
          type="checkbox"
          checked={checked}
          className="hidden"
          onChange={onChange}
        />
        <div
          className={`${styles.checkbox} ${checked ? "bg-sage" : "bg-stone"}`}
        />
      </label>
      <Text
        text={label}
        variant="body"
        className={`${styles.label} ${checked ? "line-through text-grey" : "text-black"}`}
      />
    </div>
  );
};
