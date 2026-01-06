import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FeaturedProjectsSnap.css";

function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function pad2(n) {
  var s = String(n);
  return s.length === 1 ? "0" + s : s;
}

export default function FeaturedProjectsSnap() {
  const navigate = useNavigate();

  const railRef = useRef(null);
  const cardRefs = useRef([]);
  const scrollStopTimer = useRef(null);
  const activeRef = useRef(0);

  const projects = useMemo(
    () => [
      {
        tag: "Mall",
        title: "Kingdom Mall Lifestyle Floor Renovation",
        location: "Riyadh, Kingdom Mall (Floor -1)",
        area: "16,500 m²",
        image: "/projects/kingdom-lifestyle.jpg",
      },
      {
        tag: "Office",
        title: "Muqrin Al Rajhi Investment Office",
        location: "Riyadh, Kingdom Tower (Floor 16)",
        area: "250 m²",
        image: "/projects/muqrin-office.jpg",
      },
      {
        tag: "Coffee / Retail",
        title: "Looz & Jooz",
        location: "Riyadh, Kingdom Mall (Floor -1)",
        area: "580 m²",
        image: "/projects/looz-jooz.jpg",
      },
      {
        tag: "Luxury",
        title: "Compound Antara",
        location: "Riyadh",
        area: "52,000 m²",
        image: "/projects/compound-antara.jpg",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(() => projects.map(() => false));

  useEffect(() => {
    setRevealed(projects.map(() => false));
  }, [projects]);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // تحديد الشريحة النشطة داخل الـ rail (snap)
  useEffect(() => {
    const rootEl = railRef.current;
    const els = cardRefs.current.filter(Boolean);
    if (!rootEl || !els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        var bestIndex = activeRef.current;
        var bestRatio = 0;

        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          if (e.isIntersecting && e.intersectionRatio > bestRatio) {
            bestRatio = e.intersectionRatio;
            var idx = Number(e.target.getAttribute("data-i"));
            if (!Number.isNaN(idx)) bestIndex = idx;
          }
        }

        if (bestRatio > 0) setActive(bestIndex);
      },
      { root: rootEl, threshold: [0.35, 0.5, 0.65, 0.8] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Reveal once داخل الـ rail
  useEffect(() => {
    const rootEl = railRef.current;
    const els = cardRefs.current.filter(Boolean);
    if (!rootEl || !els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        setRevealed((prev) => {
          var next = prev.slice();
          var changed = false;

          for (var i = 0; i < entries.length; i++) {
            var e = entries[i];
            if (e.isIntersecting) {
              var idx = Number(e.target.getAttribute("data-i"));
              if (!Number.isNaN(idx) && !next[idx]) {
                next[idx] = true;
                changed = true;
              }
            }
          }
          return changed ? next : prev;
        });
      },
      { root: rootEl, threshold: 0.18 }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [projects.length]);

  function goTo(i) {
    const el = cardRefs.current[i];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  function openProject(p) {
    const slug = slugify(p.title);
    navigate("/projects/" + slug);
  }

  // ✅ Snap Assist: بعد ما يوقف السحب/السكرول، ثبّت على أقرب كرت
  function snapToNearest() {
    const rail = railRef.current;
    const els = cardRefs.current.filter(Boolean);
    if (!rail || !els.length) return;
    const railRect = rail.getBoundingClientRect();
    const railCenter = railRect.left + railRect.width / 2;

    var bestIdx = 0;
    var bestDist = Infinity;

    for (var i = 0; i < els.length; i++) {
      var r = els[i].getBoundingClientRect();
      var c = r.left + r.width / 2;
      var d = Math.abs(c - railCenter);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    }

    goTo(bestIdx);
  }

  function onRailScroll() {
    if (scrollStopTimer.current) clearTimeout(scrollStopTimer.current);
    scrollStopTimer.current = setTimeout(() => {
      snapToNearest();
    }, 120);
  }

  return (
    <section className="hdsSec">
      <div className="hdsIn">
        <div className="hdsHead">
          <div className="hdsHeadTxt">
            <h2 className="hdsTitle">Featured Projects</h2>
            <p className="hdsSub">Drag horizontally, hover to preview, click to open.</p>
          </div>

          <button className="hdsAllBtn" type="button" onClick={() => navigate("/projects")}>
            View All
          </button>
        </div>

        <div
          className="hdsRail"
          ref={railRef}
          onScroll={onRailScroll}
          aria-label="Featured projects slider"
        >
          {projects.map((p, i) => {
            var isActive = i === active;
            var isRevealed = revealed[i];

            var cls = "hdsCard";
            if (isRevealed) cls += " is-revealed";
            if (isActive) cls += " is-active";

            return (
              <article
                key={p.title}
                className={cls}
                data-i={i}
                ref={(el) => (cardRefs.current[i] = el)}
                tabIndex={0}
                role="button"
                aria-label={"Open project: " + p.title}
                onClick={() => openProject(p)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openProject(p);
                }}
              >
                <div className="hdsMedia">
                  <img className="hdsImg" src={p.image} alt={p.title} loading="lazy" />
                  <div className="hdsOv" aria-hidden="true" />
                  <div className="hdsChip">{p.tag}</div>
                </div>

                <div className="hdsInfo">
                  <h3 className="hdsName">{p.title}</h3>

                  <div className="hdsMeta">
                    <div className="hdsRow">
                      <span className="hdsK">Location</span>
                      <span className="hdsV">{p.location}</span>
                    </div>
                    <div className="hdsRow">
                      <span className="hdsK">Area</span>
                      <span className="hdsV">{p.area}</span>
                    </div>
                  </div>

                  <div className="hdsCta">
                    <span className="hdsCtaTxt">Open Project</span>
                    <span className="hdsCtaArrow" aria-hidden="true">→</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ✅ Counter + dots */}
        <div className="hdsNav">
          <div className="hdsCount" aria-label="Slide counter">
            {pad2(active + 1)} / {pad2(projects.length)}
          </div>

          <div className="hdsDots" aria-label="Project dots">
            {projects.map((_, i) => {
              var on = i === active;
              return (
                <button
                  key={i}
                  type="button"
                  className={on ? "hdsDot is-active" : "hdsDot"}
                  onClick={() => goTo(i)}
                  aria-label={"Go to slide " + (i + 1)}
                />
              );
            })}
          </div>
        </div>

        <div className="hdsHint">Tip: use trackpad/drag (cursor: grab).</div>
      </div>
    </section>
  );
}