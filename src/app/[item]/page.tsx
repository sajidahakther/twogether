import { SectionItemScreen } from "@/components/SectionItemScreen";

export function generateStaticParams() {
  return [{ item: "default" }];
}

export default async function ItemPage({
  params,
}: {
  params: Promise<{ item: string }>;
}) {
  const sectionItem = (await params).item;

  return <SectionItemScreen sectionItem={sectionItem} />;
}
