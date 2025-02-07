"use client";

import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Login() {
  const { user, signInWithGoogle, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">Sign in with Google</h2>
        <button
          onClick={signInWithGoogle}
          className="w-full bg-red-500 text-white py-2 rounded shadow hover:bg-red-600 transition"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
