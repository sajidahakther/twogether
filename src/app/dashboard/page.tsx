"use client";

import React, { useState } from "react";
import { Text } from "@/components/Text";
import { useAuth } from "@/hooks/useAuth";
import { Modal } from "@/components/Modal";
import { useRouter } from "next/navigation";
import { Layout } from "@/components/Layout";
import { Section } from "@/components/Section";
import { TextInput } from "@/components/TextInput";

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

  if (loading) return <p>Loading...</p>;

  if (!user) {
    router.push("/");
    return null;
  }

  const openModal = (type: "list" | "note") => {
    setModal({ isOpen: true, type });
  };

  const closeModal = () => {
    setModal({ isOpen: false, type: "" });
  };

  const handleAddItem = () => {
    if (modal.type === "list" && listName.trim() !== "") {
      setLists((prev) => [...prev, listName]);
      setListName("");
    } else if (modal.type === "note" && noteName.trim() !== "") {
      setNotes((prev) => [...prev, noteName]);
      setNoteName("");
    }
    closeModal();
  };

  const onItemClick = (item: string) => {
    const sectionItem = item.toLowerCase().replace(/\s+/g, "-");
    router.push(`/${sectionItem}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (modal.type === "list") {
      setListName(e.target.value);
    } else {
      setNoteName(e.target.value);
    }
  };

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
