import React from "react";
import { Text } from "../Text";
import Add from "@mui/icons-material/Add";
import styles from "./Section.module.scss";
import { ChevronRight } from "@mui/icons-material";

type SectionProps = {
  type: string;
  title: string;
  onClick: () => void;
  sectionItems: string[];
  onItemClick: (item: string) => void;
};

export const Section = ({
  type,
  title,
  onClick,
  onItemClick,
  sectionItems,
}: SectionProps) => {
  return (
    <div>
      <div className={styles.title}>
        <Text text={title} variant="h2" />
        <div onClick={onClick}>
          <Add className={styles.add} />
        </div>
      </div>
      {sectionItems.length > 0 ? (
        <div className={styles.sectionList}>
          {sectionItems.map((item: string, index: number) => (
            <div
              key={index}
              className={styles.sectionItems}
              onClick={() => onItemClick(item)}
            >
              <Text variant="body" text={item} />
              <ChevronRight fontSize="medium" className={styles.chevronRight} />
            </div>
          ))}
        </div>
      ) : (
        <Text
          variant="body"
          className={styles.text}
          text={`Looks like you haven’t created any ${type}s yet — ready to add your first?`}
        />
      )}
    </div>
  );
};
