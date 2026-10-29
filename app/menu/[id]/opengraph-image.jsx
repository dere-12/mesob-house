import { ImageResponse } from "next/og";

import { getDishBySlug } from "@/lib/menu";
import { etb } from "@/lib/format";

export const alt = "A featured Ethiopian dish from Addis Eats";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage({ params }) {
  const { id } = await params;
  const dish = await getDishBySlug(id);

  const dishName = dish?.nameEn || "Ethiopian Dish";

  const dishDescription =
    dish?.description || "Discover traditional Ethiopian flavors.";

  const price =
    dish?.priceETB != null ? etb.format(dish.priceETB) : "Explore the menu";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
        color: "#431407",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 27,
            fontWeight: 800,
            color: "#c2410c",
          }}
        >
          ADDIS EATS
        </div>

        <div style={{ display: "flex", fontSize: 21, color: "#9a3412" }}>
          ETHIOPIAN FOOD · ADDIS ABABA
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          maxWidth: "100%",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, color: "#9a3412" }}>
          FROM OUR MENU
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 64,
            lineHeight: 1.05,
            fontWeight: 800,
          }}
        >
          {dishName}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            lineHeight: 1.25,
            color: "#7c2d12",
          }}
        >
          {dishDescription.slice(0, 110)}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            borderRadius: 18,
            background: "#c2410c",
            color: "white",
            padding: "14px 24px",
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          {price}
        </div>

        <div style={{ display: "flex", fontSize: 22, color: "#7c2d12" }}>
          Discover your next favorite dish
        </div>
      </div>
    </div>,
    { ...size },
  );
}
