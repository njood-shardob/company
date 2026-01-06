import React, { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Projects() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const openSlug = params.get("open"); // مثل: kingdom-mall...

  const projects = useMemo(() => [
    { slug: "kingdom-mall-lifestyle-floor-renovation", title: "Kingdom Mall Lifestyle Floor Renovation" },
    { slug: "muqrin-al-rajhi-investment-office", title: "Muqrin Al Rajhi Investment Office" },
    { slug: "looz-and-jooz", title: "Looz & Jooz" },
    { slug: "compound-antara", title: "Compound Antara" },
  ], []);

  const selected = projects.find(p => p.slug === openSlug);

  return (
    <div style={{ padding: "90px 20px", maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ margin: 0 }}>Projects</h1>
      <p style={{ opacity: 0.7 }}>All projects will be listed here.</p>

      {/* ✅ Modal داخل نفس صفحة projects */}
      {selected && (
        <div
          onClick={() => navigate("/projects")}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "grid",
            placeItems: "center",
            padding: 16,
            zIndex: 9999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(860px, 100%)",
              background: "#fff",
              borderRadius: 18,
              padding: 18,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <h2 style={{ margin: 0 }}>{selected.title}</h2>
              <button
                onClick={() => navigate("/projects")}
                style={{
                  border: "none",
                  background: "#eee",
                  borderRadius: 10,
                  padding: "8px 12px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>

            <p style={{ marginTop: 10, opacity: 0.7 }}>
              هنا لاحقًا نضيف صور المشروع + الموقع + المساحة + وصف كامل…
            </p>
          </div>
        </div>
      )}
    </div>
  );
}