import React from "react";
import { MoreHoriz } from "@mui/icons-material";
import { Checkbox } from "@/components/Checkbox";
import styles from "./ChecklistItem.module.scss";

type ListItem = {
  text: string;
  checked: boolean;
  id?: string | undefined;
};

type ChecklistItemProps = {
  index: number;
  listItem: ListItem;
  onMore: () => void;
  onChange: () => void;
};

export const ChecklistItem = ({
  index,
  onMore,
  onChange,
  listItem,
}: ChecklistItemProps) => {
  return (
    <div key={`${listItem.id}-${index}`} className={styles.checklistItem}>
      <Checkbox
        onChange={onChange}
        label={listItem.text}
        checked={listItem.checked}
      />
      <div onClick={onMore}>
        <MoreHoriz fontSize="large" className={styles.more} />
      </div>
    </div>
  );
};
