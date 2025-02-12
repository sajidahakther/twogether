"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import ShapeCurls from "@/app/assets/images/ShapeCurls";
import ShapeAsterisk from "@/app/assets/images/ShapeAsterisk";
import { Carousel } from "@/components/Carousel";

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
    <div className="bg-stone h-screen py-[50px]">
      <ShapeCurls />
      <Carousel />
      <ShapeAsterisk />
      <div className="flex flex-col gap-5 items-center">
        <Button onClick={signInWithGoogle} label="Log In" variant="outline" />
        <Button onClick={signInWithGoogle} label="Sign Up" variant="filled" />
      </div>
    </div>
  );
}
