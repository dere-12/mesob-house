const DEFAULT_IMAGE_SLUGS = [
  "chornake-fish-tibs",
  "gored-gored",
  "kitfo-dulet",
];

export function getDishImage(dish) {
  const slug = dish?.slug;

  if (DEFAULT_IMAGE_SLUGS.includes(slug) || !slug) {
    return "/images/default.jpg";
  }

  return `/images/${slug}.jpg`;
}
