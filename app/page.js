import Image from "next/image";
import Link from "next/link";
import { absoluteUrl, socialMetadata } from "@/lib/seo";

const description =
  "Discover traditional Ethiopian dishes, explore authentic flavors, and order your favorites from Mesob House.";

export const metadata = {
  title: "Ethiopian Food & Hospitality",
  description,
  alternates: {
    canonical: "/",
  },
  ...socialMetadata({
    title: "Ethiopian Food & Hospitality",
    description,
    path: "/",
  }),
};

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Mesob House",
  description,
  url: absoluteUrl("/"),
  image: absoluteUrl("/images/ethiopian-hero.jpg"),
  servesCuisine: "Ethiopian",
  areaServed: {
    "@type": "City",
    name: "Addis Ababa",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(restaurantJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <main className="mx-auto w-[90%] max-w-6xl py-8 sm:py-10">
        <section className="grid items-center gap-8 rounded-2xl bg-orange-50 p-6 sm:p-10 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-orange-700">
              Ethiopian Food &amp; Hospitality
            </p>

            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Welcome to Mesob House
            </h1>

            <p className="mt-4 max-w-xl text-lg leading-8 text-gray-600">
              Discover traditional Ethiopian dishes, explore authentic flavors,
              and find your next favorite meal.
            </p>

            <Link
              href="/menu"
              className="touch-target mt-6 inline-flex rounded-md bg-gray-900 px-5 py-3 font-semibold transition-colors hover:bg-gray-400"
            >
              <h3 className="text-white">Explore Our Menu</h3>

              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </Link>
          </div>

          <div className="overflow-hidden rounded-xl">
            <Image
              src="/images/ethiopian-hero.jpg"
              alt="A traditional Ethiopian platter of food served on injera"
              width={1200}
              height={900}
              sizes="(max-width: 1023px) 90vw, 50vw"
              preload
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </section>

        <section className="py-12 text-center">
          <h2 className="font-display text-3xl font-bold">
            Explore Our Dishes
          </h2>

          <p className="mt-3 text-gray-600">
            From traditional stews to flavorful vegetarian dishes, find
            something you will love.
          </p>

          <Link
            href="/menu"
            className="mt-5 inline-flex min-h-11 items-center font-semibold text-orange-700 hover:underline"
          >
            Browse all dishes →
          </Link>
        </section>
      </main>
    </>
  );
}
