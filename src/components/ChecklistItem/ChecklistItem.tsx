import { convertToUrl } from "@/utils";
import React, { useState } from "react";
import { Text } from "@/components/Text";
import { Checkbox } from "@/components/Checkbox";
import styles from "./ChecklistItem.module.scss";
import { ExpandLess, ExpandMore, Link, MoreHoriz } from "@mui/icons-material";

type ListItem = {
  id?: string;
  url?: string;
  text: string;
  checked: boolean;
  description?: string;
};

type ChecklistItemProps = {
  index: number;
  listItem: ListItem;
  onMore: () => void;
  onChange: () => void;
};

export const ChecklistItem = ({
  onMore,
  onChange,
  listItem,
}: ChecklistItemProps) => {
  const [expand, setExpand] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.checklistItem}>
        <Checkbox
          onChange={onChange}
          label={listItem.text}
          checked={listItem.checked}
        />
        <MoreHoriz fontSize="large" className={styles.more} onClick={onMore} />
      </div>

      {(listItem.description || listItem.url) && (
        <>
          <div className={styles.expand} onClick={() => setExpand(!expand)}>
            <Text
              variant="expand"
              className={styles.expandText}
              text={expand ? "Hide Details" : "View Details"}
            />
            {expand ? (
              <ExpandLess className={styles.expandIcon} />
            ) : (
              <ExpandMore className={styles.expandIcon} />
            )}
          </div>

          {expand && (
            <div className={styles.content}>
              {listItem.description && (
                <Text variant="body" text={listItem.description} />
              )}
              {listItem.url && (
                <div className={styles.link}>
                  <Link />
                  <a
                    target="_blank"
                    className={styles.url}
                    rel="noopener noreferrer"
                    href={convertToUrl(listItem.url)}
                  >
                    {listItem.url}
                  </a>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
