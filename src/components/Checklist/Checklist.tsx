"use client";

import { db, auth } from "@/firebase";
import { Text } from "@/components/Text";
import { Modal } from "@/components/Modal";
import styles from "./Checklist.module.scss";
import { TextInput } from "@/components/TextInput";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, useCallback } from "react";
import { AddItemInput } from "@/components/AddItemInput";
import { ChecklistItem } from "@/components/ChecklistItem";

import {
  doc,
  query,
  where,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
} from "firebase/firestore";

export type ListItem = {
  id?: string;
  text: string;
  userId?: string;
  checked: boolean;
  isEditing: boolean;
};

type ChecklistProps = {
  listId: string;
};

export const Checklist = ({ listId }: ChecklistProps) => {
  const [listItems, setListItems] = useState<ListItem[]>([]);
  const [newListItem, setNewListItem] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);
  const [modal, setModal] = useState({ isOpen: false, listItemIndex: -1 });
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchListItems = async () => {
      const q = query(
        collection(db, "listItems"),
        where("userId", "==", userId),
        where("listId", "==", listId),
      );
      const querySnapshot = await getDocs(q);
      const fetchedListItems = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ListItem[];

      const sortedListItems = fetchedListItems.sort(
        (a, b) => Number(a.checked) - Number(b.checked),
      );

      setListItems(sortedListItems);
    };

    fetchListItems();
  }, [userId, listId]);

  const addListItem = useCallback(async () => {
    if (newListItem.trim() && userId && listId) {
      const listItemData = {
        text: newListItem,
        checked: false,
        isEditing: false,
        userId,
        listId,
      };

      const docRef = await addDoc(collection(db, "listItems"), listItemData);
      setListItems((prevListItems) => {
        const updatedList = [
          { ...listItemData, id: docRef.id },
          ...prevListItems,
        ];

        return updatedList.sort(
          (a, b) => Number(a.checked) - Number(b.checked),
        );
      });
      setNewListItem("");
    }
  }, [newListItem, userId, listId]);

  const toggleListItem = useCallback(async (id: string) => {
    setListItems((prevListItems) => {
      const updatedList = prevListItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, checked: !item.checked };
          const listItemRef = doc(db, "listItems", id);
          updateDoc(listItemRef, { checked: updatedItem.checked });
          return updatedItem;
        }
        return item;
      });

      const sortedList = [...updatedList].sort(
        (a, b) => Number(a.checked) - Number(b.checked),
      );
      return sortedList;
    });
  }, []);

  const deleteListItem = useCallback(
    async (index: number) => {
      const listItem = listItems[index];
      if (!listItem.id) return;

      const listItemRef = doc(db, "listItems", listItem.id);
      await deleteDoc(listItemRef);

      setListItems((prevListItems) =>
        prevListItems.filter((_, i) => i !== index),
      );

      closeModal();
    },
    [listItems],
  );

  const openModal = (index: number) => {
    setEditText(listItems[index].text);
    setModal({ isOpen: true, listItemIndex: index });
  };

  const closeModal = () => {
    setModal({ isOpen: false, listItemIndex: -1 });
  };

  const handleSave = async () => {
    const index = modal.listItemIndex;
    if (index === -1 || !listItems[index].id) return;

    const listItemRef = doc(db, "listItems", listItems[index].id!);
    await updateDoc(listItemRef, { text: editText });

    setListItems((prevListItems) =>
      prevListItems.map((listItem, i) =>
        i === index ? { ...listItem, text: editText } : listItem,
      ),
    );

    closeModal();
  };

  return (
    <div>
      <AddItemInput
        value={newListItem}
        onAdd={addListItem}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewListItem(e.target.value)
        }
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            addListItem();
          }
        }}
      />

      {listItems.length > 0 ? (<div className={styles.container}>
        {listItems.map((listItem, index) => (
          <div key={listItem.id}>
            <ChecklistItem
              index={index}
              listItem={listItem}
              onMore={() => openModal(index)}
              onChange={() => listItem.id && toggleListItem(listItem.id)}
            />
          </div>
        ))}
      </div>) : (
        <Text
          variant="body"
          className={styles.text}
          text={`Looks like you haven’t added any items to your checklist yet — ready to add your first?`}
        />
      )}

      {modal.isOpen && (
        <Modal
          title="Edit item"
          onClose={closeModal}
          isOpen={modal.isOpen}
          rightButtonLabel="Save"
          leftButtonLabel="Delete"
          onRightButton={handleSave}
          onLeftButton={() => deleteListItem(modal.listItemIndex)}
        >
          <TextInput
            label="Item"
            value={editText}
            placeholder="Item"
            className={styles.item}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEditText(e.target.value)
            }
          />
        </Modal>
      )}
    </div>
  );
};
