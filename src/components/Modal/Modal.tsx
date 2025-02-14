import React from "react";
import { Button } from "../Button";
import { Text } from "@/components/Text";
import styles from "./Modal.module.scss";
import { Close } from "@mui/icons-material";

type ModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  leftButtonLabel: string;
  rightButtonLabel: string;
  onLeftButton: () => void;
  onRightButton: () => void;
  children: React.ReactNode;
};

export const Modal = ({
  title,
  isOpen,
  onClose,
  children,
  onLeftButton,
  onRightButton,
  leftButtonLabel,
  rightButtonLabel,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.title}>
          <Text text={title} variant="h2" />
          <Close fontSize="medium" onClick={onClose} className={styles.close} />
        </div>
        <div className={styles.content}>
          {children}
          <div className={styles.buttons}>
            <Button
              variant="outline"
              onClick={onLeftButton}
              label={leftButtonLabel}
            />
            <Button
              variant="filled"
              onClick={onRightButton}
              label={rightButtonLabel}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
