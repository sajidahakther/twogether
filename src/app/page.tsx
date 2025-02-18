"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { Carousel } from "@/components/Carousel";
import ShapeCurls from "@/app/assets/images/ShapeCurls";
import ShapeAsterisk from "@/app/assets/images/ShapeAsterisk";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const onSignUp = () => {
    router.push("/signup");
  };

  const onLogIn = () => {
    router.push("/login");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-stone flex flex-col items-center">
      <div className="max-w-[430px] flex flex-col bg-stone h-screen md:h-full pb-[50px] justify-center">
        <ShapeCurls />
        <Carousel />
        <ShapeAsterisk />
        <div className="flex flex-col gap-5 items-center">
          <Button onClick={onLogIn} label="Log In" variant="outline" />
          <Button onClick={onSignUp} label="Sign Up" variant="filled" />
        </div>
      </div>
    </div>
  );
}
