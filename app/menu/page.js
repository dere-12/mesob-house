import { Suspense } from "react";
import FilterShell from "./FilterShell";
import SearchBox from "./SearchBox";
import { getDishes } from "@/lib/menu";
import { socialMetadata } from "@/lib/seo";

export const revalidate = 3600;

const description =
  "Explore Ethiopian favorites including Doro Wat, Tibs, Shiro, and fasting dishes from the Mesob House menu.";

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
    <div
      aria-label="Loading menu"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
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
  let dishes;

  try {
    dishes = await getDishes();
  } catch (error) {
    console.error("Failed to load the menu:", error);

    return (
      <div
        role="alert"
        className="rounded-lg border border-red-200 bg-red-50 p-6"
      >
        <h2 className="font-display text-xl font-bold">
          The menu is temporarily unavailable
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          We couldn&apos;t load the latest dishes from the menu service. Please
          try again later.
        </p>
      </div>
    );
  }

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
