import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDishes, getDishBySlug } from "@/lib/menu";
import { getDishImage } from "@/lib/dish-images";
import { etb } from "@/lib/format";
import { absoluteUrl, shortenDescription, socialMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const dishes = await getDishes();

  return dishes.map((dish) => ({
    id: dish.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = await getDishBySlug(id);

  if (!dish) {
    return {
      title: "Dish Not Found",
      description:
        "The requested dish could not be found in the Addis Eats menu.",
    };
  }

  const description = shortenDescription(
    `${dish.nameEn} costs ${etb.format(dish.priceETB)}. ${
      dish.description || "Explore this traditional Ethiopian dish."
    } Order for delivery across Addis Ababa.`,
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
    dish.description || `${dish.nameEn} is available from the Addis Eats menu.`;

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

      <article className="mx-auto w-[90%] max-w-4xl py-10">
        <Link
          href="/menu"
          className="touch-target text-sm text-blue-600 hover:underline"
        >
          ← Back to Menu
        </Link>

        <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
          <div className="mb-6 overflow-hidden rounded-lg">
            <Image
              src={getDishImage(dish)}
              alt={`${dish.nameEn} served as Ethiopian food`}
              width={1000}
              height={700}
              sizes="(max-width: 768px) 90vw, 800px"
              className="aspect-[10/7] w-full object-cover"
            />
          </div>

          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{dish.nameEn}</h1>
              <p className="mt-1 text-lg text-gray-500">{dish.nameAm}</p>
            </div>

            {dish.isSpecial && (
              <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
                Special
              </span>
            )}
          </div>

          <p className="mt-6 text-gray-700">{dishDescription}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-medium">{dish.category}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="font-bold">{etb.format(dish.priceETB)}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Spice Level</p>
              <p className="font-medium">{dish.spiceLevel}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Servings</p>
              <p className="font-medium">{dish.servings}</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold">Ingredients</h2>

            <ul className="mt-3 list-inside list-disc text-gray-700">
              {dish.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </>
  );
}
