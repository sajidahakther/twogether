"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
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
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-xl font-bold mb-4">Welcome, {user?.displayName}!</h1>
      {user?.photoURL && (
        <Image
          width={80}
          height={80}
          alt="profile image"
          src={user?.photoURL}
          style={{ borderRadius: "100%" }}
        />
      )}
      <button
        onClick={logout}
        className="bg-red-500 text-white py-2 px-4 rounded shadow hover:bg-red-600 transition"
      >
        Logout
      </button>

      <TaskList title="Groceries List" />
    </div>
  );
}
