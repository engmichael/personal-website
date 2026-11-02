import { ImageResponse } from "next/og";

export const alt = "Michael Eng — MBA Candidate at Chicago Booth";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          background: "radial-gradient(circle at 80% 20%, #2e2414 0%, #0A0A0B 60%)",
          color: "#F4F1EA",
          fontSize: 150,
          lineHeight: 1.02,
          letterSpacing: -4,
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 4, color: "#A7A29A", marginBottom: 28 }}>
          MBA CANDIDATE · CHICAGO BOOTH
        </div>
        <div style={{ display: "flex" }}>
          Michael&nbsp;<span style={{ color: "#C5A572" }}>Eng.</span>
        </div>
        <div style={{ display: "flex", fontSize: 40, letterSpacing: -1, color: "#A7A29A", marginTop: 28 }}>
          In relentless pursuit of&nbsp;<span style={{ color: "#C5A572" }}>growth.</span>
        </div>
      </div>
    ),
    size,
  );
}
