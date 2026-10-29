import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDishes, getDishBySlug } from "@/lib/menu";
import { getDishImage } from "@/lib/dish-images";
import { etb } from "@/lib/format";
import { absoluteUrl, shortenDescription, socialMetadata } from "@/lib/seo";
import AddToCartButton from "./AddToCartButton";

export async function generateStaticParams() {
  try {
    const dishes = await getDishes();

    return dishes.map((dish) => ({
      id: dish.slug,
    }));
  } catch (error) {
    console.error("Could not prebuild dish routes:", error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = await getDishBySlug(id);

  if (!dish) {
    return {
      title: "Dish Not Found",
      description:
        "The requested dish could not be found in the Mesob House menu.",
    };
  }

  const description = shortenDescription(
    `${dish.nameEn} costs ${etb.format(dish.priceETB)}. ${
      dish.description || "Explore this traditional Ethiopian dish."
    } Order from the Mesob House menu.`,
  );

  return {
    title: dish.nameEn,
    description,
    alternates: {
      canonical: `/menu/${dish.slug}`,
    },
    ...socialMetadata({
      title: dish.nameEn,
      description,
      path: `/menu/${dish.slug}`,
      imagePath: `/menu/${dish.slug}/opengraph-image`,
    }),
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDishBySlug(id);

  if (!dish) {
    notFound();
  }

  const dishDescription =
    dish.description ||
    `${dish.nameEn} is available from the Mesob House menu.`;

  const ingredients = Array.isArray(dish.ingredients) ? dish.ingredients : [];

  const menuItemJsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.nameEn,
    description: dishDescription,
    image: absoluteUrl(getDishImage(dish)),
    url: absoluteUrl(`/menu/${dish.slug}`),
    offers: {
      "@type": "Offer",
      price: dish.priceETB,
      priceCurrency: "ETB",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(menuItemJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <article className="w-full py-2">
        <Link
          href="/menu"
          className="touch-target text-sm font-medium text-red-600 hover:underline"
        >
          ← Back to Menu
        </Link>

        <div className="mt-5 grid gap-6 rounded-xl bg-white p-4 shadow-md sm:p-6 md:grid-cols-2 md:items-start md:gap-8 lg:p-8">
          <div className="min-w-0 overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={getDishImage(dish)}
              alt={`${dish.nameEn} served as Ethiopian food`}
              width={1000}
              height={700}
              sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 520px"
              className="aspect-[10/7] w-full object-cover"
              priority
            />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
                  {dish.nameEn}
                </h1>

                {dish.nameAm && (
                  <p className="mt-2 text-lg text-gray-500">{dish.nameAm}</p>
                )}
              </div>

              {dish.isSpecial && (
                <span className="shrink-0 rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
                  Special
                </span>
              )}
            </div>

            <p className="mt-5 leading-7 text-gray-700">{dishDescription}</p>

            <div className="mt-6 rounded-lg bg-orange-50 p-4">
              <p className="text-sm text-gray-600">Price</p>
              <p className="mt-1 text-2xl font-bold text-red-600">
                {etb.format(dish.priceETB)}
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {dish.category && (
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="mt-1 font-medium">{dish.category}</p>
                </div>
              )}

              {dish.spiceLevel && (
                <div>
                  <p className="text-sm text-gray-500">Spice Level</p>
                  <p className="mt-1 font-medium">{dish.spiceLevel}</p>
                </div>
              )}

              {dish.servings && (
                <div>
                  <p className="text-sm text-gray-500">Servings</p>
                  <p className="mt-1 font-medium">{dish.servings}</p>
                </div>
              )}
            </div>

            {ingredients.length > 0 && (
              <div className="mt-7">
                <h2 className="font-display text-xl font-bold">Ingredients</h2>

                <ul className="mt-3 list-inside list-disc space-y-1 text-sm leading-6 text-gray-700">
                  {ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8">
              <AddToCartButton dish={dish} />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
