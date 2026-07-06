import { ImageResponse } from "next/og";

import { defaultContent } from "@/lib/siteContent";

export const runtime = "edge";
export const alt = "Carlin Hou — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Uses committed defaults (not the live content store) so this stays a fast,
// dependency-free edge render — name/title changes there are rare.
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
          backgroundColor: "#0E0C09",
          backgroundImage:
            "radial-gradient(700px 400px at 10% -10%, rgba(224,154,104,0.16), transparent 60%), radial-gradient(600px 360px at 95% 0%, rgba(82,199,183,0.12), transparent 60%)",
          color: "#F0E9DC",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 24,
            color: "#52C7B7",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: "#52C7B7",
            }}
          />
          Open to 2027 SWE / AI internships
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 600, letterSpacing: -3 }}>{profile.name}</div>
          <div
            style={{
              marginTop: 18,
              fontSize: 32,
              color: "#B0A695",
              maxWidth: 900,
            }}
          >
            Software Engineer — AI systems, retrieval, and full-stack products
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {["AI systems", "Full-stack", "Backend", "Retrieval / RAG"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "10px 24px",
                borderRadius: 999,
                border: "1px solid rgba(224,154,104,0.45)",
                color: "#E0B486",
                fontSize: 24,
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
