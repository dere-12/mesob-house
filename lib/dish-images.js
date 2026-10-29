export function getDishImage(dish) {
  const dishName = `${dish.slug} ${dish.nameEn}`.toLowerCase();

  if (dishName.includes("doro")) {
    return "/images/doro-wat.jpg";
  }

  if (dishName.includes("beyaynet")) {
    return "/images/full-vegan-beyaynetu.jpg";
  }

  if (dishName.includes("shiro")) {
    return "/images/shiro-tegamino.jpg";
  }

  if (dishName.includes("tibs")) {
    return "/images/siga-derek-tibs.jpg";
  }

  return "/images/full-vegan-beyaynetu.jpg";
}
