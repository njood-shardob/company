import React, { useEffect, useRef, useState } from "react";
import "./CompanyOverview.css";

export default function CompanyOverview() {
  const sectionRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.unobserve(el); // ✅ مرة واحدة
        }
      },
      { threshold: 0.18 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="hdcoSection" ref={sectionRef}>
      <div className="hdcoContainer">
        <div className={`hdcoGrid ${show ? "hdcoOn" : "hdcoOff"}`}>
          {/* Title (يظهر أولاً) */}
          <h2 className="hdcoTitle">
            Company <span className="hdcoAccent">Overview</span>
          </h2>

          {/* Text (يظهر بعده) */}
          <p className="hdcoText">
            Horizon Delta Est. is a specialized contracting organization based in Riyadh,
            Saudi Arabia. We deliver comprehensive services through specialized engineers
            and technicians, adhering to the latest international standards. Our focus is
            on on-time delivery, high quality, and strict safety—measuring success by
            customer satisfaction.
          </p>
        </div>

        {/* <div className={`hdcoDivider ${show ? "hdcoLineOn" : "hdcoLineOff"}`} /> */}
      </div>
    </section>
  );
}