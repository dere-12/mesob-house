import { Suspense } from "react";
import FilterShell from "./FilterShell";
import SearchBox from "./SearchBox";
import { getDishes } from "@/lib/menu";
import { socialMetadata } from "@/lib/seo";

export const revalidate = 3600;

const description =
  "Explore Ethiopian favorites including Doro Wat, Tibs, Shiro, and fasting dishes from the Addis Eats menu.";

export const metadata = {
  title: "Menu",
  description,
  alternates: {
    canonical: "/menu",
  },
  ...socialMetadata({
    title: "Menu",
    description,
    path: "/menu",
  }),
};

function DishSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-64 animate-pulse rounded-lg bg-gray-200"
        />
      ))}
    </div>
  );
}

async function MenuContent() {
  const dishes = await getDishes();

  return (
    <FilterShell>
      <SearchBox initialData={dishes} />
    </FilterShell>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<DishSkeleton />}>
      <MenuContent />
    </Suspense>
  );
}
