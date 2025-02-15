"use client";

import React from "react";
import { Text } from "@/components/Text";
import { Layout } from "@/components/Layout";
import { usePathname } from "next/navigation";
import { formatPath } from "@/utils/formatPath";
import { Checklist } from "@/components/Checklist";

export const SectionItemScreen = ({ sectionItem }: { sectionItem: string }) => {
  const pathname = usePathname();
  const listId = pathname;
  const title =
    process.env.NEXT_PUBLIC_EXPORT == "true"
      ? formatPath(pathname)
      : formatPath(sectionItem);

  return (
    <Layout showBack showMenu>
      <Text text={title} variant="h1" />
      <Checklist listId={listId} />
    </Layout>
  );
};
