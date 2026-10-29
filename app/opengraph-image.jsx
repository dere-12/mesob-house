import { ImageResponse } from "next/og";

export const alt =
  "Addis Eats — traditional Ethiopian food delivered in Addis Ababa";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: "linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)",
        color: "#431407",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 30,
          fontWeight: 700,
          color: "#c2410c",
        }}
      >
        ADDIS EATS
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
          }}
        >
          Ethiopian food,
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
          }}
        >
          made memorable.
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#7c2d12",
            marginTop: 12,
          }}
        >
          Traditional flavors delivered across Addis Ababa
        </div>
      </div>

      <div style={{ display: "flex", fontSize: 23, fontWeight: 600 }}>
        Discover your next favorite dish
      </div>
    </div>,
    { ...size },
  );
}
