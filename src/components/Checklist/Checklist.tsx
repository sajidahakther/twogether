"use client";

import { db, auth } from "@/firebase";
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

export type Task = {
  id?: string;
  text: string;
  userId?: string;
  completed: boolean;
  isEditing: boolean;
};

type ChecklistProps = {
  listId: string;
};

export const Checklist = ({ listId }: ChecklistProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);
  const [modal, setModal] = useState({ isOpen: false, taskIndex: -1 });
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchTasks = async () => {
      const q = query(
        collection(db, "tasks"),
        where("userId", "==", userId),
        where("listId", "==", listId),
      );
      const querySnapshot = await getDocs(q);
      const fetchedTasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
      setTasks(fetchedTasks);
    };

    fetchTasks();
  }, [userId, listId]);

  const addTask = useCallback(async () => {
    if (newTask.trim() && userId && listId) {
      const taskData = {
        text: newTask,
        completed: false,
        isEditing: false,
        userId,
        listId,
      };

      const docRef = await addDoc(collection(db, "tasks"), taskData);
      setTasks((prevTasks) => [{ ...taskData, id: docRef.id }, ...prevTasks]);
      setNewTask("");
    }
  }, [newTask, userId, listId]);

  const toggleTask = useCallback(
    async (index: number) => {
      const task = tasks[index];
      if (!task.id) return;

      const taskRef = doc(db, "tasks", task.id);
      const updatedCompleted = !task.completed;
      await updateDoc(taskRef, { completed: updatedCompleted });

      setTasks((prevTasks) =>
        prevTasks.map((t, i) =>
          i === index ? { ...t, completed: updatedCompleted } : t,
        ),
      );
    },
    [tasks],
  );

  const deleteTask = useCallback(
    async (index: number) => {
      const task = tasks[index];
      if (!task.id) return;

      const taskRef = doc(db, "tasks", task.id);
      await deleteDoc(taskRef);

      setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));

      closeModal();
    },
    [tasks],
  );

  const openModal = (index: number) => {
    setEditText(tasks[index].text);
    setModal({ isOpen: true, taskIndex: index });
  };

  const closeModal = () => {
    setModal({ isOpen: false, taskIndex: -1 });
  };

  const handleSave = async () => {
    const index = modal.taskIndex;
    if (index === -1 || !tasks[index].id) return;

    const taskRef = doc(db, "tasks", tasks[index].id!);
    await updateDoc(taskRef, { text: editText });

    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, text: editText } : task,
      ),
    );

    closeModal();
  };

  return (
    <div>
      <AddItemInput
        value={newTask}
        onAdd={addTask}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewTask(e.target.value)
        }
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            addTask();
          }
        }}
      />

      <div className={styles.container}>
        {tasks.map((task, index) => (
          <div key={task.id || index}>
            <ChecklistItem
              task={task}
              index={index}
              onMore={() => openModal(index)}
              onChange={() => toggleTask(index)}
            />
          </div>
        ))}
      </div>

      {modal.isOpen && (
        <Modal
          title="Edit item"
          onClose={closeModal}
          isOpen={modal.isOpen}
          rightButtonLabel="Save"
          leftButtonLabel="Delete"
          onRightButton={handleSave}
          onLeftButton={() => deleteTask(modal.taskIndex)}
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
