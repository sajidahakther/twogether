"use client";

import { db } from "@/firebase";
import React, { useState } from "react";
import { Text } from "@/components/Text";
import { Modal } from "@/components/Modal";
import { Layout } from "@/components/Layout";
import { MoreHoriz } from "@mui/icons-material";
import { Checklist } from "@/components/Checklist";
import { TextInput } from "@/components/TextInput";
import styles from "./SectionItemScreen.module.scss";
import { usePathname, useRouter } from "next/navigation";
import { formatPathToTitle, formatTitleToPath } from "@/utils";
import {
  doc,
  deleteDoc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";

type List = {
  id: string;
  name: string;
};

export const SectionItemScreen = ({ sectionItem }: { sectionItem: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const listId = pathname;
  const [modal, setModal] = useState({ isOpen: false });
  const [title, setTitle] = useState(
    process.env.NEXT_PUBLIC_EXPORT == "true"
      ? formatPathToTitle(pathname)
      : formatPathToTitle(sectionItem),
  );

  const openModal = () => setModal({ isOpen: true });
  const closeModal = () => setModal({ isOpen: false });

  const fetchListNames = async () => {
    const listNames: List[] = [];
    const querySnapshot = await getDocs(collection(db, "lists"));
    querySnapshot.forEach((doc) => {
      listNames.push({ id: doc.id, name: doc.data().name });
    });
    return listNames;
  };

  const handleSave = async () => {
    const listNames = await fetchListNames();

    const listToUpdate = listNames.find(
      (list) => formatTitleToPath(list.name) === sectionItem,
    );

    if (listToUpdate) {
      const docRef = doc(db, "lists", listToUpdate.id);
      await updateDoc(docRef, { name: title });
    }

    closeModal();
    router.push(`/list/${formatTitleToPath(title)}`);
  };

  const handleDelete = async () => {
    const listNames = await fetchListNames();

    await Promise.all(
      listNames.map(async (list) => {
        const formattedListName = formatTitleToPath(list.name);
        if (formattedListName === sectionItem) {
          await deleteDoc(doc(db, "lists", list.id));
        }
      }),
    );

    closeModal();
    router.back();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <Layout showBack showMenu onBack={() => router.push("/dashboard")}>
      <div className={styles.title}>
        <Text text={title} variant="h1" />
        <MoreHoriz
          fontSize="large"
          className={styles.more}
          onClick={openModal}
        />
      </div>
      {modal.isOpen && (
        <Modal
          title="Edit list"
          onClose={closeModal}
          isOpen={modal.isOpen}
          rightButtonLabel="Save changes"
          leftButtonLabel="Delete list"
          onRightButton={handleSave}
          onLeftButton={handleDelete}
        >
          <TextInput
            label="List name"
            value={title}
            placeholder="List name"
            className={styles.name}
            onChange={handleTitleChange}
          />
        </Modal>
      )}
      <Checklist listId={listId} />
    </Layout>
  );
};
