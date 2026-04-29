import { ImageResponse } from "next/og";

export const alt =
  "PropertyPro property management software for landlords and agencies";
export const size = {
  width: 1200,
  height: 630,
};
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
          background: "#ffffff",
          color: "#0f172a",
          padding: "72px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "linear-gradient(135deg, #2563eb, #06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: 36,
              fontWeight: 800,
            }}
          >
            P
          </div>
          <div style={{ fontSize: 38, fontWeight: 800 }}>PropertyPro</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              maxWidth: 930,
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: 0,
            }}
          >
            Property management software for calmer portfolios
          </div>
          <div
            style={{
              maxWidth: 860,
              fontSize: 31,
              lineHeight: 1.35,
              color: "#475569",
            }}
          >
            Manage tenants, rent, leases, maintenance, payments, and reports
            from one modern Next.js dashboard.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            fontSize: 25,
            color: "#0369a1",
            fontWeight: 700,
          }}
        >
          <span>Tenants</span>
          <span>Rent</span>
          <span>Leases</span>
          <span>Maintenance</span>
          <span>Reports</span>
        </div>
      </div>
    ),
    size,
  );
}
