import { ImageResponse } from "next/og";

export const alt = "Mesob House — Ethiopian food and hospitality";

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
        background: "linear-gradient(135deg, #fffaf6 0%, #f6ddcd 100%)",
        color: "#30211d",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 30,
          fontWeight: 700,
          color: "#183f30",
        }}
      >
        MESOB HOUSE
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
          Communal warmth,
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
            color: "#8e210c",
          }}
        >
          slow-cooked heritage.
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#735d54",
            marginTop: 12,
          }}
        >
          Discover Ethiopian culinary traditions.
        </div>
      </div>

      <div style={{ display: "flex", fontSize: 23, fontWeight: 600 }}>
        Mesob House · Habesha Hospitality
      </div>
    </div>,
    { ...size },
  );
}
