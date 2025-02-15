"use client";

import React from "react";
import { Text } from "@/components/Text";
import { Layout } from "@/components/Layout";
import { usePathname } from "next/navigation";
import { TaskList } from "@/components/TaskList";

export const SectionItemScreen = ({ sectionItem }: { sectionItem: string }) => {
  const pathname = usePathname();
  const title =
    process.env.NEXT_PUBLIC_EXPORT == "true"
      ? pathname
          .split(/[-/]+/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : sectionItem
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

  return (
    <Layout showBack showMenu>
      <Text text={title} variant="h1" />
      <TaskList />
    </Layout>
  );
};
