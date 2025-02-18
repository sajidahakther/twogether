import React from "react";
import { MoreHoriz } from "@mui/icons-material";
import { Checkbox } from "@/components/Checkbox";
import styles from "./ChecklistItem.module.scss";

type Task = {
  text: string;
  completed: boolean;
  id?: string | undefined;
};

type ChecklistItemProps = {
  task: Task;
  index: number;
  onMore: () => void;
  onChange: () => void;
};

export const ChecklistItem = ({
  task,
  index,
  onMore,
  onChange,
}: ChecklistItemProps) => {
  return (
    <div key={`${task.id}-${index}`} className={styles.checklistItem}>
      <Checkbox
        label={task.text}
        onChange={onChange}
        checked={task.completed}
      />
      <div onClick={onMore}>
        <MoreHoriz fontSize="large" className={styles.more} />
      </div>
    </div>
  );
};
