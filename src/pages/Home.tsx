import React, { useEffect, useRef, useState } from "react";

/* ================= TYPEWRITER ================= */
const TypewriterColored: React.FC = () => {
  const segments = [
    { text: "Online Ordering System built for businesses " },
    { text: "Ordering", className: "text-red-500" },
    { text: " System " },
    { text: " built " },
    { text: "for", className: "text-red-500" },
    { text: " businesses" },
  ];

  const chars = segments.flatMap(seg =>
    seg.text.split("").map(char => ({ char, className: seg.className }))
  );

  const [i, setI] = useState(0);

  useEffect(() => {
    if (i >= chars.length) return;
    const t = setTimeout(() => setI(v => v + 1), 100);
    return () => clearTimeout(t);
  }, [i, chars.length]);

  return (
    <>
      {chars.slice(0, i).map((c, idx) => (
        <span key={idx} className={c.className}>
          {c.char}
        </span>
      ))}
      {/* Removed the blinking cursor */}
    </>
  );
};

/* ================= HERO ================= */
const HeroSection: React.FC = () => {
  const ref = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // Webflow-style trigger (only AFTER leaving viewport)
      const raw = (vh - rect.bottom) / vh;
      const clamped = Math.min(Math.max(raw, 0), 1);

      setProgress(clamped);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cubic ease-out (same feel as Webflow)
  const eased = 1 - Math.pow(1 - progress, 3);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* ===== STATIC FULL-SIZE WRAPPER ===== */}
      <div className="absolute inset-0 overflow-hidden">
        {/* ===== RETRACTING LAYER ===== */}
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
            className="h-full w-full object-cover"
          >
            <source src="/RetroX.mp4" type="video/mp4" />
          </video>

          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black"
            style={{
              opacity: 0.5 - eased * 0.2,
            }}
          />
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
        <div>
          <h2 className="mt-2 text-3xl font-bold text-black sm:text-4xl md:text-5xl lg:max-w-4xl mx-auto">
            <TypewriterColored />
          </h2>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
