import { getDishes } from "@/lib/menu";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 3600;

const baseRoutes = [
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
];

export default async function sitemap() {
  try {
    const dishes = await getDishes();

    return [
      ...baseRoutes,
      ...dishes.map((dish) => ({
        url: absoluteUrl(`/menu/${dish.slug}`),
        changeFrequency: "monthly",
        priority: 0.7,
      })),
    ];
  } catch (error) {
    console.error("Could not generate dish URLs for the sitemap:", error);

    return baseRoutes;
  }
}
