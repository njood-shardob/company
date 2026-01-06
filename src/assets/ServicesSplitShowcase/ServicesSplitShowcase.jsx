import { useEffect, useMemo, useRef, useState } from "react";
import "./ServicesSplitShowcase.css";

export default function ServicesSplitShowcase() {
  const rootRef = useRef(null);
  const itemRefs = useRef([]);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);

  const services = useMemo(
    () => [
      {
        no: "01",
        title: "Electrical & Mechanical Works",
        desc: "Integrated MEP execution delivered by specialized engineers and technicians aligned with international specifications.",
        bullets: ["Integrated MEP delivery", "MEP coordination", "Quality-driven execution"],
      },
      {
        no: "02",
        title: "Security, Safety & Fire Fighting",
        desc: "Comprehensive safety, security and fire-fighting solutions with strict compliance and professional supervision.",
        bullets: ["Safety compliance", "Fire systems coordination", "Site supervision"],
      },
      {
        no: "03",
        title: "Landscaping Works",
        desc: "Outdoor and landscape execution that enhances space experience with durable finishing and clean details.",
        bullets: ["Hardscape & softscape", "Outdoor finishing", "Maintenance-ready delivery"],
      },
      {
        no: "04",
        title: "Drilling Works",
        desc: "Drilling works delivered with clear scope control, safety priority, and high execution standards.",
        bullets: ["Controlled scope", "Safety-first process", "On-time execution"],
      },
    ],
    []
  );

  // ✅ اختر صورة من public
  const bgImage = "/hero-1.jpg";

  // ✅ Reveal on scroll (يتكرر كل ما تدخل/تطلع)
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold: 0.22,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ✅ Moving indicator on the right list
  const [indicator, setIndicator] = useState({ top: 0, height: 0, on: false });

  useEffect(() => {
    const activeEl = itemRefs.current[active];
    const listEl = rootRef.current?.querySelector(".svcX__list");

    if (!activeEl || !listEl) return;

    const listRect = listEl.getBoundingClientRect();
    const rect = activeEl.getBoundingClientRect();

    const top = rect.top - listRect.top;
    const height = rect.height;

    setIndicator({ top, height, on: true });
  }, [active, inView]);

  const current = services[active];

  return (
    <section ref={rootRef} className={`svcX ${inView ? "svcX--in" : ""}`}>
      <div className="svcX__container">
        <header className="svcX__header">
          <div>
            <p className="svcX__eyebrow">Services</p>
            <h2 className="svcX__headline">What We Deliver</h2>
            <p className="svcX__subhead">
              A comprehensive package delivered with quality, safety, and on-time execution.
            </p>
          </div>
        </header>

        <div className="svcX__grid">
          {/* LEFT */}
          <div className="svcX__showcase">
            <div className="svcX__media">
              <img className="svcX__img" src={bgImage} alt="Service showcase" />
              <div className="svcX__imgOverlay" />
            </div>

            <div className="svcX__panel" key={active}>
              <span className="svcX__chip">{current.no}</span>
              <h3 className="svcX__title">{current.title}</h3>
              <span className="svcX__underline" />
              <p className="svcX__desc">{current.desc}</p>

              <ul className="svcX__bullets">
                {current.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>

              <div className="svcX__note">Tip: Hover the cards for premium micro-interactions.</div>
            </div>
          </div>
          {/* RIGHT */}
          <div className="svcX__list">
            <span
              className={`svcX__indicator ${indicator.on ? "svcX__indicator--on" : ""}`}
              style={{
                transform: `translateY(${indicator.top}px)`,
                height: `${indicator.height}px`,
              }}
            />

            {services.map((s, idx) => (
              <button
                key={s.no}
                ref={(el) => (itemRefs.current[idx] = el)}
                type="button"
                className={`svcX__item ${idx === active ? "svcX__item--active" : ""}`}
                onMouseEnter={() => setActive(idx)}
                onFocus={() => setActive(idx)}
                onClick={() => setActive(idx)}
              >
                <div className="svcX__num">{s.no}</div>

                <div className="svcX__itemText">
                  <div className="svcX__itemTitle">{s.title}</div>
                  <div className="svcX__itemHint">Explore details</div>
                </div>

                <div className="svcX__arrow">→</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}