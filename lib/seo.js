const configuredSiteUrl = process.env.SITE_URL || "http://localhost:3000";

export const siteUrl = new URL(configuredSiteUrl);

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function shortenDescription(value, maxLength = 155) {
  if (!value || value.length <= maxLength) {
    return value || "";
  }

  return `${value.slice(0, maxLength - 1).trimEnd()}…`;
}

export function socialMetadata({
  title,
  description,
  path,
  imagePath = "/opengraph-image",
}) {
  const fullTitle = `${title} | Mesob House`;
  const url = absoluteUrl(path);
  const image = absoluteUrl(imagePath);

  return {
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "Mesob House",
      locale: "en_ET",
      type: "website",
      images: [
        {
          url: image,
          alt: `${title} — Mesob House`,
        },
      ],
    },
  };
}
