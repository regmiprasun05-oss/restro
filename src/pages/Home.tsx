import React, { useEffect, useRef, useState } from "react";

/* ================= TYPEWRITER ================= */
const TypewriterColored: React.FC = () => {
  const segments = [
    { text: "Online " },
    { text: "Ordering", className: "text-red-400" },
    { text: " System built " },
    { text: "for", className: "text-red-400" },
    { text: " businesses" },
  ];

  const chars = segments.flatMap(seg =>
    seg.text.split("").map(char => ({
      char,
      className: seg.className ?? "text-gray-200",
    }))
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= chars.length) return;
    const timer = setTimeout(() => setIndex(v => v + 1), 90);
    return () => clearTimeout(timer);
  }, [index, chars.length]);

  return (
    <>
      {chars.slice(0, index).map((c, i) => (
        <span key={i} className={c.className}>
          {c.char}
        </span>
      ))}
    </>
  );
};

/* ================= HERO SECTION ================= */
const HeroSection: React.FC = () => {
  const ref = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;

      const raw = (vh - rect.bottom) / vh;
      const clamped = Math.min(Math.max(raw, 0), 1);
      setProgress(clamped);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cubic ease-out (Webflow-like)
  const eased = 1 - Math.pow(1 - progress, 3);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* ===== BACKGROUND VIDEO ===== */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `scale(${1 - eased * 0.12})`,
            borderRadius: `${eased * 28}px`,
            transition:
              "transform 0.12s cubic-bezier(0.22,1,0.36,1), border-radius 0.12s ease-out",
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover brightness-75"
          >
            <source src="/.mp4" type="video/mp4" />
          </video>

          {/* DARK OVERLAY */}
          <div
            className="absolute inset-0 bg-black"
            style={{
              opacity: 0.7 - eased * 0.15,
            }}
          />
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
        <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:max-w-4xl mx-auto">
          <TypewriterColored />
        </h2>
      </div>
    </section>
  );
};

export default HeroSection;
