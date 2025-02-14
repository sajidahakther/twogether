import React, { use } from "react";
import { Text } from "@/components/Text";
import { Layout } from "@/components/Layout";
import { TaskList } from "@/components/TaskList";

export default function Section({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = use(params);

  if (!section) {
    return <div>Loading...</div>;
  }

  const title = section
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <Layout showBack showMenu>
      <Text text={title} variant="h1" />
      <TaskList />
    </Layout>
  );
}
