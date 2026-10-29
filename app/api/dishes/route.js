import { getDishes } from "@/lib/menu";

export async function GET(request) {
  try {
    const dishes = await getDishes();
    const { searchParams } = new URL(request.url);

    const query = (searchParams.get("q") ?? "").trim().toLowerCase();

    const filteredDishes = query
      ? dishes.filter((dish) => {
          const searchableText = [dish.nameEn, dish.nameAm]
            .join(" ")
            .toLowerCase();

          return searchableText.includes(query);
        })
      : dishes;

    return Response.json(filteredDishes);
  } catch (error) {
    console.error("Failed to serve menu data:", error);

    return Response.json(
      { error: "The menu service is temporarily unavailable." },
      { status: 503 },
    );
  }
}
