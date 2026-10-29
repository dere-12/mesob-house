const MENU_API_URL = "https://addis-eats-backend.onrender.com/menu/";

export async function getDishes() {
  const response = await fetch(MENU_API_URL, {
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch menu");
  }

  const result = await response.json();

  if (result.status !== "ok" || !Array.isArray(result.data)) {
    throw new Error("Invalid menu response");
  }

  return result.data;
}

export async function getDishBySlug(slug) {
  const dishes = await getDishes();

  return dishes.find((dish) => dish.slug === slug);
}
