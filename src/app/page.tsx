"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Screen } from "@/components/Screen";
import { TaskList } from "@/components/TaskList";

export default function Home() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (loading) return <p>Loading...</p>;

  const username = user?.displayName?.split(" ")[0];

  return (
    <Screen>
      <div className="flex justify-between">
        <h1 className="text-2xl font-nimbus mb-4 text-primary">
          Hello, {username}.
        </h1>
        {user?.photoURL && (
          <Image
            className="border-2 border-secondary"
            width={80}
            height={80}
            alt="profile image"
            src={user?.photoURL}
            style={{ borderRadius: "100%" }}
          />
        )}
      </div>
      <button
        onClick={logout}
        className="bg-red-500 text-white py-2 px-4 rounded shadow hover:bg-red-600 transition"
      >
        Logout
      </button>

      <TaskList title="Groceries List" />
    </Screen>
  );
}
