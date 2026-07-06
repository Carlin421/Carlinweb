import { ImageResponse } from "next/og";

import { defaultContent } from "@/lib/siteContent";

export const runtime = "edge";
export const alt = "Carlin Hou — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Uses committed defaults (not the live content store) so this stays a fast,
// dependency-free edge render.
const { profile } = defaultContent;

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
          padding: 72,
          backgroundColor: "#FBFAF7",
          color: "#171510",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top rule + label */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ width: "100%", height: 2, backgroundColor: "#171510" }} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#D6381E",
            }}
          >
            <div style={{ width: 12, height: 12, backgroundColor: "#D6381E" }} />
            Open to 2027 SWE / AI internships
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 128, fontWeight: 600, letterSpacing: -4, lineHeight: 1 }}>
            {profile.name}
          </div>
          <div style={{ marginTop: 24, fontSize: 34, color: "#545048", maxWidth: 900 }}>
            Software Engineer — AI systems, retrieval &amp; full-stack products
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["AI systems", "Full-stack", "Backend", "Retrieval / RAG"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "8px 20px",
                border: "1px solid #C7C1B5",
                color: "#54504A",
                fontSize: 22,
                fontFamily: "monospace",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
