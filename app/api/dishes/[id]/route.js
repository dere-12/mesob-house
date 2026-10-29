import { getDishes } from "@/lib/menu";

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const dishes = await getDishes();
    const dish = dishes.find((item) => item.id === id || item.slug === id);

    if (!dish) {
      return Response.json(
        { error: `Dish '${id}' was not found.` },
        { status: 404 },
      );
    }

    return Response.json(dish);
  } catch (error) {
    console.error("Failed to load the requested dish:", error);

    return Response.json(
      { error: "The menu service is temporarily unavailable." },
      { status: 503 },
    );
  }
}
