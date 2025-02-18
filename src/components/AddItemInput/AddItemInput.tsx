import React from "react";
import { Add } from "@mui/icons-material";
import styles from "./AddItemInput.module.scss";

type AddItemInputProps = {
  value: string;
  onAdd: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const AddItemInput = ({
  value,
  onAdd,
  onChange,
  onKeyDown,
}: AddItemInputProps) => {
  return (
    <div className={styles.addItemInput}>
      <input
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={styles.input}
        placeholder="Add a new item..."
      />
      <Add fontSize="large" className="text-secondary" onClick={onAdd} />
    </div>
  );
};
