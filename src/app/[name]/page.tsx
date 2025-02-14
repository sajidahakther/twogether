import React from "react";
import { Text } from "@/components/Text";
import { Layout } from "@/components/Layout";
import { TaskList } from "@/components/TaskList";

export default function List({ params }: { params: { name: string } }) {
  if (!params.name) {
    return <div>Loading...</div>;
  }

  const formattedListName = params.name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <Layout showBack showMenu>
      <Text text={formattedListName} variant="h1" />
      <TaskList />
    </Layout>
  );
}
