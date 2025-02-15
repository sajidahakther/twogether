"use client";

import { auth } from "@/firebase";
import React, { useState } from "react";
import { Text } from "@/components/Text";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { Layout } from "@/components/Layout";
import styles from "./LoginForm.module.scss";
import { Button } from "@/components/Button";
import { TextInput } from "@/components/TextInput";
import { signInWithEmailAndPassword } from "firebase/auth";

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onLogin = async (): Promise<void> => {
    if (!email || !password) {
      setError("All fields must be filled in to continue.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-credential":
            setError("Incorrect password entered. Please try again.");
            break;
          case "auth/invalid-email":
            setError("Please enter a valid email address.");
            break;
          default:
            setError("Failed to log in. Please try again.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <Layout showBack>
      <div className={styles.container}>
        <Text text="Welcome back!" variant="h1" />
        <TextInput
          required
          value={email}
          label="Email address"
          placeholder="Email address"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <TextInput
          required
          type="password"
          value={password}
          label="Password"
          placeholder="Password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        {error && <Text text={error} variant="error" />}
        <div className={styles.button}>
          <Button label="Log In" onClick={onLogin} variant="filled" />
        </div>
      </div>
    </Layout>
  );
};
