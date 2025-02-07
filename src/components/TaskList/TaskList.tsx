import { db } from "@/app/firebase";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState, useEffect, KeyboardEvent, useCallback } from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

import {
  Card,
  Button,
  Checkbox,
  TextField,
  IconButton,
  Typography,
  CardContent,
} from "@mui/material";

import {
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
} from "firebase/firestore";

interface Task {
  id?: string;
  text: string;
  completed: boolean;
  isEditing: boolean;
}

interface TaskListProps {
  title: string;
}

export const TaskList = ({ title }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  const tasksCollection = collection(db, "tasks");

  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(tasksCollection);
      const fetchedTasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
      setTasks(fetchedTasks);
    };

    fetchTasks();
  }, [tasksCollection]);

  const addTask = useCallback(async () => {
    if (newTask.trim()) {
      const taskData = { text: newTask, completed: false, isEditing: false };
      const docRef = await addDoc(tasksCollection, taskData);

      setTasks((prevTasks) => [{ ...taskData, id: docRef.id }, ...prevTasks]);
      setNewTask("");
    }
  }, [newTask, tasksCollection]);

  const toggleTask = useCallback(
    async (index: number) => {
      const task = tasks[index];
      if (!task.id) return;

      const taskRef = doc(db, "tasks", task.id);
      await updateDoc(taskRef, { completed: !task.completed });

      setTasks((prevTasks) =>
        prevTasks
          .map((t, i) => (i === index ? { ...t, completed: !t.completed } : t))
          .sort((a, b) => (a.completed ? 1 : -1) - (b.completed ? 1 : -1))
      );
    },
    [tasks]
  );

  const deleteTask = useCallback(
    async (index: number) => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this item?"
      );
      if (confirmDelete) {
        const task = tasks[index];
        if (!task.id) return;

        const taskRef = doc(db, "tasks", task.id);
        await deleteDoc(taskRef);

        setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
      }
    },
    [tasks]
  );

  const handleSaveTask = useCallback(
    async (index: number, newText: string) => {
      const task = tasks[index];
      if (!task.id) return;

      const taskRef = doc(db, "tasks", task.id);
      await updateDoc(taskRef, { text: newText, isEditing: false });

      setTasks((prevTasks) =>
        prevTasks.map((t, i) =>
          i === index ? { ...t, text: newText, isEditing: false } : t
        )
      );
    },
    [tasks]
  );

  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    if (e.key === "Enter") {
      handleSaveTask(index, (e.target as HTMLInputElement).value);
    }
  };

  const handleBlur = (index: number, e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleSaveTask(index, e.target.value);
  };

  const handleStartEditing = (index: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, isEditing: true } : task
      )
    );
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", padding: "10px" }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        {title}
      </Typography>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <TextField
          fullWidth
          variant="outlined"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addTask}
          style={{
            minWidth: "48px",
            height: "48px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
          }}
        >
          <AddIcon />
        </Button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
        {tasks.map((task, index) => (
          <Card
            key={task.id || index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0px",
            }}
          >
            <CardContent
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <Checkbox
                checked={task.completed}
                onChange={() => toggleTask(index)}
                color="default"
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={
                  <CheckCircleIcon
                    style={{
                      color: "white",
                      backgroundColor: "green",
                      borderRadius: "50%",
                    }}
                  />
                }
              />
              {task.isEditing ? (
                <TextField
                  value={task.text}
                  onChange={(e) =>
                    setTasks((prevTasks) =>
                      prevTasks.map((t, i) =>
                        i === index ? { ...t, text: e.target.value } : t
                      )
                    )
                  }
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onBlur={(e) => handleBlur(index, e)}
                  autoFocus
                  variant="outlined"
                  size="small"
                  style={{ flex: 1 }}
                />
              ) : (
                <Typography
                  variant="body1"
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "gray" : "black",
                    cursor: "pointer",
                  }}
                  onClick={() => handleStartEditing(index)}
                >
                  {task.text}
                </Typography>
              )}
            </CardContent>
            <IconButton color="secondary" onClick={() => deleteTask(index)}>
              <CloseIcon />
            </IconButton>
          </Card>
        ))}
      </div>
    </div>
  );
};
