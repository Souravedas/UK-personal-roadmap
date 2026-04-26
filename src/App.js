import { useState } from "react";
import UKMastersRoadmap from "./UKMastersRoadmap";
import ItalyMastersRoadmap from "./italy-masters-roadmap";

export default function App() {
  const [page, setPage] = useState("uk");

  const navBtn = {
    position: "fixed",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 9999,
    padding: "12px 16px",
    border: "none",
    borderRadius: "999px",
    cursor: "pointer",
    fontWeight: 700,
    background: "#111827",
    color: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <button
        style={{ ...navBtn, left: "12px" }}
        onClick={() => setPage("uk")}
        onMouseEnter={() => setPage("uk")}
        aria-label="Go to UK roadmap"
      >
        ← UK
      </button>

      <button
        style={{ ...navBtn, right: "12px" }}
        onClick={() => setPage("italy")}
        onMouseEnter={() => setPage("italy")}
        aria-label="Go to Italy roadmap"
      >
        Italy →
      </button>

      {page === "uk" ? <UKMastersRoadmap /> : <ItalyMastersRoadmap />}
    </div>
  );
}