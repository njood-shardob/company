import { useEffect, useMemo, useRef, useState } from "react";
import "./MissionVisionC.css";

function cx(...arr) {
  return arr.filter(Boolean).join(" ");
}

export default function MissionVisionC() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  
  const backgroundImage = "/projects/muqrin-office.jpg";

  const data = useMemo(
    () => ({
      eyebrow: "Our Direction",
      headline: "Mission & Vision",
      subhead:
        "Driven by quality execution, strict safety standards, and reliable on-time delivery.",
      vision: {
        title: "Our Vision",
        text:
          "To be the first-choice multidisciplinary contracting firm in KSA through excellence in quality, safety, and on-time delivery.",
        bullets: ["Multi-disciplinary excellence", "On-time delivery", "Trusted execution"],
        icon: "◎",
      },
      mission: {
        title: "Our Mission",
        text:
          "To deliver integrated contracting solutions that exceed expectations while complying with the latest international standards.",
        bullets: ["Integrated service package", "International specifications", "Customer satisfaction first"],
        icon: "◈",
      },
    }),
    []
  );

  // (1) Reveal on scroll
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect(); // once
        }
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={cx("mvxC", inView && "mvxC--in")} aria-label="Mission and Vision">
      {/* Background */}
      <div className="mvxC__bgWrap" aria-hidden="true">
        <div className="mvxC__bg" style={{ backgroundImage: `url(${backgroundImage})` }} />
        <div className="mvxC__overlay" />
      </div>

      {/* Content */}
      <div className="mvxC__container">
        <header className="mvxC__header">
          <p className="mvxC__eyebrow">{data.eyebrow}</p>
          <h2 className="mvxC__headline">{data.headline}</h2>
          <p className="mvxC__subhead">{data.subhead}</p>
        </header>

        <div className="mvxC__grid">
          {/* Vision */}
          <div className="mvxCcardWrap mvxCcardWrap--v">
            <article className="mvxC__card" tabIndex={0}>
              <div className="mvxC__top">
                <span className="mvxC__icon" aria-hidden="true">
                  {data.vision.icon}
                </span>
                <div className="mvxC__titleBox">
                  <h3 className="mvxC__title">{data.vision.title}</h3>
                  {/* (3) underline animation */}
                  <span className="mvxC__underline" aria-hidden="true" />
                </div>
              </div>

              <p className="mvxC__text">{data.vision.text}</p>

              <ul className="mvxC__bullets" aria-label="Vision highlights">
                {data.vision.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          </div>

          {/* Mission */}
          <div className="mvxCcardWrap mvxCcardWrap--m">
            <article className="mvxC__card" tabIndex={0}>
              <div className="mvxC__top">
                <span className="mvxC__icon" aria-hidden="true">
                  {data.mission.icon}
                </span>
                <div className="mvxC__titleBox">
                  <h3 className="mvxC__title">{data.mission.title}</h3>
                  {/* (3) underline animation */}
                  <span className="mvxC__underline" aria-hidden="true" />
                </div>
              </div>

              <p className="mvxC__text">{data.mission.text}</p>
              <ul className="mvxC__bullets" aria-label="Mission highlights">
                {data.mission.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}