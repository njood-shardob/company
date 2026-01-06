import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSliderTyping.css";

/**
 * Typing effect that DOES NOT restart if the component re-renders
 * or if effects re-run while typing the same text.
 */
function useTypingStable(text, speedMs) {
  const [out, setOut] = useState("");

  const textRef = useRef(text);
  const iRef = useRef(0);
  const timerRef = useRef(null);
  const runningRef = useRef(false);

  useEffect(() => {
    // If text changed, reset typing
    if (textRef.current !== text) {
      textRef.current = text;
      iRef.current = 0;
      setOut("");
      runningRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // If already typing this same text, don't restart
    if (runningRef.current) return;

    runningRef.current = true;

    const tick = () => {
      // If text changed while typing (edge case), stop
      if (textRef.current !== text) {
        runningRef.current = false;
        return;
      }

      iRef.current += 1;
      const next = text.slice(0, iRef.current);
      setOut(next);

      if (iRef.current >= text.length) {
        runningRef.current = false;
        timerRef.current = null;
        return;
      }

      timerRef.current = setTimeout(tick, speedMs);
    };

    timerRef.current = setTimeout(tick, speedMs);

    return () => {
      // Cleanup: stop timer (prevents leaks)
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = null;
      runningRef.current = false;
    };
  }, [text, speedMs]);

  return out;
}

export default function HeroSliderTyping() {
  const navigate = useNavigate();

  const slides = useMemo(
    () => [
      {
        image: "/hero-1.jpg",
        headline: "Horizon Delta Est.",
        sub: "Building Quality Projects On Time",
        cta: { label: "View Projects", to: "/projects" },
      },
      {
        image: "/hero-2.jpg",
        headline: "Quality. Safety. Commitment.",
        sub: "International standards delivered by expert teams",
        cta: { label: "About Us", to: "/about" },
      },
      {
        image: "/hero-3.jpg",
        headline: "Specialized Contracting in Riyadh",
        sub: "Focused on client satisfaction and on-time delivery",
        cta: { label: "Contact Us", to: "/contact" },
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);

  // ✅ Typing ثابت (بدون إعادة داخل نفس الشريحة)
  const typedHeadline = useTypingStable(slides[index].headline, 80);

  // Auto play (كل 6 ثواني)
  useEffect(() => {
    const t = setInterval(() => {
      setPrevIndex(index);
      setIndex((i) => (i + 1) % slides.length);
    }, 6000);

    return () => clearInterval(t);
  }, [index, slides.length]);

  // clear prev after transition ends
  useEffect(() => {
    if (prevIndex === null) return;
    const clearPrev = setTimeout(() => setPrevIndex(null), 900);
    return () => clearTimeout(clearPrev);
  }, [prevIndex]);

  const goPrev = () => {
    setPrevIndex(index);
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setPrevIndex(index);
    setIndex((i) => (i + 1) % slides.length);
  };

  const onDot = (i) => {
    if (i === index) return;
    setPrevIndex(index);
    setIndex(i);
  };

  const s = slides[index];

  return (
    
    <section className="hero">
      {/* Background slides: slide + fade + zoom */}
      {slides.map((slide, i) => {
        const isActive = i === index;
        const isPrev = prevIndex !== null && i === prevIndex;

        return (
          <div
            key={`${slide.image}-${i}`}
            className={`hero__bg ${isActive ? "is-active" : ""} ${isPrev ? "is-prev" : ""}`}
            aria-hidden="true"
          >
            <div
              className="hero__bgInner"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          </div>
        );
      })}
      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__content">
        <h1 className="hero__title">
          {typedHeadline}
          <span className="hero__cursor" aria-hidden="true" />
        </h1>

        <p className="hero__sub">{s.sub}</p>

        <button
          type="button"
          className="hero__cta"
          onClick={() => navigate(s.cta.to)}
        >
          {s.cta.label}
        </button>
      </div>

      <button type="button" className="heroarrow heroarrow--left" onClick={goPrev} aria-label="Previous slide">
        ‹
      </button>
      <button type="button" className="heroarrow heroarrow--right" onClick={goNext} aria-label="Next slide">
        ›
      </button>

      <div className="hero__dots" aria-label="Hero slides">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`hero__dot ${i === index ? "is-active" : ""}`}
            onClick={() => onDot(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}