import { ImageResponse } from "next/og";

import { profile } from "@/data/profile";

export const alt = "Carlin Hou — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#F7F3EA",
          backgroundImage:
            "linear-gradient(135deg, rgba(221,239,240,0.85) 0%, rgba(247,243,234,0) 45%, rgba(232,216,198,0.6) 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              width: "18px",
              height: "18px",
              borderRadius: "9999px",
              backgroundColor: "#176B73",
            }}
          />
          <div style={{ fontSize: "30px", color: "#176B73", fontWeight: 600 }}>
            Open to 2027 SWE / AI internships
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "104px",
              fontWeight: 700,
              color: "#23211E",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              marginTop: "28px",
              fontSize: "40px",
              color: "#5F3F2B",
              fontWeight: 500,
              maxWidth: "900px",
            }}
          >
            {profile.title}
          </div>
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          {["AI systems", "Full-stack", "Backend", "Retrieval / RAG"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "12px 24px",
                borderRadius: "9999px",
                border: "1px solid #DDD3C2",
                backgroundColor: "#FFFDF8",
                color: "#625D53",
                fontSize: "26px",
                fontWeight: 600,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
