"use client";
import { auth } from "@/firebase";
import { Text } from "@/components/Text";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { Button } from "@/components/Button";
import { Layout } from "@/components/Layout";
import styles from "./SignUpForm.module.scss";
import { TextInput } from "@/components/TextInput";
import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState, ChangeEvent, Dispatch, SetStateAction } from "react";

export const SignUpForm = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [partnerName, setPartnerName] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    setter: Dispatch<SetStateAction<string>>,
  ) => {
    setter(e.target.value);
  };

  const onSignUp = async () => {
    if (!name || !partnerName || !email || !password || !confirmPassword) {
      setError("All fields must be filled in to continue.");
      return;
    }

    if (password !== confirmPassword) {
      setError("The passwords you entered don't match. Please try again.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const fullName = `${name} & ${partnerName}`;
      await updateProfile(auth.currentUser!, { displayName: fullName });
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/weak-password":
            setError("Password should be atleast 6 characters.");
            break;
          case "auth/invalid-email":
            setError("Please enter a valid email address.");
            break;
          default:
            setError("Failed to sign up. Please try again.");
        }
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <Layout showBack>
      <div className={styles.container}>
        <Text text="Let's get started!" variant="h1" />
        <TextInput
          required
          value={name}
          label="Your name"
          placeholder="First name"
          onChange={(e) => handleChange(e, setName)}
        />
        <TextInput
          required
          value={partnerName}
          placeholder="First name"
          label="Your partner's name"
          onChange={(e) => handleChange(e, setPartnerName)}
        />
        <TextInput
          required
          value={email}
          label="Email address"
          placeholder="Email address"
          onChange={(e) => handleChange(e, setEmail)}
        />
        <TextInput
          required
          type="password"
          label="Password"
          value={password}
          placeholder="Password"
          onChange={(e) => handleChange(e, setPassword)}
        />
        <TextInput
          required
          type="password"
          placeholder="Password"
          label="Confirm password"
          value={confirmPassword}
          onChange={(e) => handleChange(e, setConfirmPassword)}
        />
        {error && <Text text={error} variant="error" />}
        <div className={styles.button}>
          <Button label="Sign up" onClick={onSignUp} variant="filled" />
        </div>
      </div>
    </Layout>
  );
};
