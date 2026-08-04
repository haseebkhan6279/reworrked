import { ImageResponse } from "next/og";
import { SITE } from "@/lib/seo/config";

export const runtime = "edge";
export const alt = `${SITE.name} — Premium Caps & Luxury Headwear`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050505",
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#E8E4DC",
            fontSize: 22,
            letterSpacing: 8,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              background: "#E8E4DC",
              transform: "rotate(45deg)",
            }}
          />
          Collector-grade headwear
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              color: "#F5F5F5",
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: 14,
              lineHeight: 1,
            }}
          >
            {SITE.name}
          </div>
          <div
            style={{
              color: "#9A9A9A",
              fontSize: 30,
              letterSpacing: 4,
              textTransform: "uppercase",
              maxWidth: 820,
            }}
          >
            Premium caps · Luxury streetwear silhouette
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#E8E4DC",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <span>Fitted · Snapback · Dad Cap · Trucker</span>
          <span>reworrked.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
