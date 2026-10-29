import { getDishes } from "@/lib/menu";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 3600;

export default async function sitemap() {
  const dishes = await getDishes();

  return [
    {
      url: absoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/menu"),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...dishes.map((dish) => ({
      url: absoluteUrl(`/menu/${dish.slug}`),
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
