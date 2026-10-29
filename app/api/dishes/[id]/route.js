import { getDishes } from "@/lib/menu.js";

export async function GET(request, { params }) {
  const { id } = await params;

  const dishes = await getDishes();

  const dish = dishes.find((dish) => dish.id === id || dish.slug === id);

  if (!dish) {
    return Response.json(
      { error: `Dish with slug: '${id}' not found` },
      { status: 404 },
    );
  }

  return Response.json(dish);
}
