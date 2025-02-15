"use client";

import { db } from "@/firebase";
import { Text } from "@/components/Text";
import { useAuth } from "@/hooks/useAuth";
import { Modal } from "@/components/Modal";
import { useRouter } from "next/navigation";
import { Layout } from "@/components/Layout";
import { Section } from "@/components/Section";
import { TextInput } from "@/components/TextInput";
import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export default function Dashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [lists, setLists] = useState<string[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const [listName, setListName] = useState<string>("");
  const [noteName, setNoteName] = useState<string>("");
  const [modal, setModal] = useState({
    isOpen: false,
    type: "" as "list" | "note" | "",
  });

  useEffect(() => {
    if (!user) return;

    const fetchUserItems = async () => {
      const listsQuery = query(
        collection(db, "lists"),
        where("userId", "==", user.uid),
      );
      const notesQuery = query(
        collection(db, "notes"),
        where("userId", "==", user.uid),
      );

      const listsSnapshot = await getDocs(listsQuery);
      const notesSnapshot = await getDocs(notesQuery);

      setLists(listsSnapshot.docs.map((doc) => doc.data().name));
      setNotes(notesSnapshot.docs.map((doc) => doc.data().name));
    };

    fetchUserItems();
  }, [user]);

  const openModal = (type: "list" | "note") => {
    setModal({ isOpen: true, type });
  };

  const closeModal = () => {
    setModal({ isOpen: false, type: "" });
  };

  const handleAddItem = async () => {
    if (!user) return;

    const collectionName = modal.type === "list" ? "lists" : "notes";
    const itemName = modal.type === "list" ? listName : noteName;

    if (itemName.trim() !== "") {
      try {
        await addDoc(collection(db, collectionName), {
          name: itemName,
          userId: user.uid,
          createdAt: new Date(),
        });

        if (modal.type === "list") {
          setLists((prev) => [...prev, itemName]);
          setListName("");
        } else {
          setNotes((prev) => [...prev, itemName]);
          setNoteName("");
        }
      } catch (error) {
        console.error("Error adding item: ", error);
      }
    }

    closeModal();
  };

  const onItemClick = (item: string) => {
    const sectionItem = item.toLowerCase().replace(/\s+/g, "-");
    router.push(`/list/${sectionItem}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (modal.type === "list") {
      setListName(e.target.value);
    } else {
      setNoteName(e.target.value);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <Layout showMenu>
      <Text text={`Hello, ${user?.displayName}.`} variant="h1" />

      {["list", "note"].map((type) => {
        const sectionItems = type === "list" ? lists : notes;
        const sectionTitle =
          sectionItems.length > 0
            ? `Continue ${type === "list" ? "listing" : "noting"}...`
            : `Add a ${type}`;

        return (
          <div key={type}>
            <Section
              type={type}
              title={sectionTitle}
              onItemClick={onItemClick}
              sectionItems={sectionItems}
              onClick={() => openModal(type as "list" | "note")}
            />
          </div>
        );
      })}

      {modal.isOpen && (
        <Modal
          onClose={closeModal}
          isOpen={modal.isOpen}
          rightButtonLabel="Add"
          leftButtonLabel="Cancel"
          onLeftButton={closeModal}
          title={`Add a ${modal.type}`}
          onRightButton={handleAddItem}
        >
          <TextInput
            onChange={handleInputChange}
            value={modal.type === "list" ? listName : noteName}
            label={`${modal.type === "list" ? "List" : "Note"} name`}
            placeholder={`${modal.type === "list" ? "List" : "Note"} name`}
          />
        </Modal>
      )}
    </Layout>
  );
}
