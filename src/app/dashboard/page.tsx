"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Layout } from "@/components/Layout";
import { TaskList } from "@/components/TaskList";

export default function Dashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (loading) return <p>Loading...</p>;

  return (
    <Layout>
      <div className="flex justify-between">
        <h1 className="text-2xl font-nimbus mb-4 text-primary">
          Hello, {user?.displayName}.
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
    </Layout>
  );
}
