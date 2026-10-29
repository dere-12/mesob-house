import { absoluteUrl } from "@/lib/seo";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/cart",
        "/checkout",
        "/orders",
        "/kitchen",
        "/signin",
        "/api/",
      ],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
