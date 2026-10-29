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
  } catch {
    return Response.json({ error: "Failed to load dishes." }, { status: 500 });
  }
}
