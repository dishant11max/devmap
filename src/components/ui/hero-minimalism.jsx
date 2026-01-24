"use client";

import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { LiquidButton } from "./liquid-glass-button";

export default function MinimalHero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();

    let particles = [];
    let raf = 0;

    const count = () => Math.floor((canvas.width * canvas.height) / 7000);

    const make = () => {
      const fadeDelay = Math.random() * 600 + 100;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() / 5 + 0.1,
        opacity: 0.7,
        fadeDelay,
        fadeStart: Date.now() + fadeDelay,
        fadingOut: false,
      };
    };

    const reset = (p) => {
      p.x = Math.random() * canvas.width;
      p.y = Math.random() * canvas.height;
      p.speed = Math.random() / 5 + 0.1;
      p.opacity = 0.7;
      p.fadeDelay = Math.random() * 600 + 100;
      p.fadeStart = Date.now() + p.fadeDelay;
      p.fadingOut = false;
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < count(); i++) particles.push(make());
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < 0) reset(p);
        if (!p.fadingOut && Date.now() > p.fadeStart) p.fadingOut = true;
        if (p.fadingOut) {
          p.opacity -= 0.008;
          if (p.opacity <= 0) reset(p);
        }

        ctx.fillStyle = `rgba(160, 160, 160, ${p.opacity})`;
        ctx.fillRect(p.x, p.y, 0.6, Math.random() * 2 + 1);
      });
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => {
      setSize();
      init();
    };

    window.addEventListener("resize", onResize);
    init();
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="minimal-root relative w-full h-screen overflow-hidden bg-[#050505] text-zinc-100 font-sans border-b border-zinc-800"
    >
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/hubot-sans');

        .minimal-root {
        }

        /* Accent Lines */
        .accent-lines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .hline, .vline {
          position: absolute;
          background: currentColor;
          opacity: .1;
          will-change: transform, opacity;
        }
        .hline {
          height: 1px; left: 0; right: 0;
          transform: scaleX(0);
          transform-origin: 50% 50%;
          animation: drawX 800ms cubic-bezier(.22,.61,.36,1) forwards;
        }
        .hline:nth-child(1){ top: 20%; animation-delay: 150ms; }
        .hline:nth-child(2){ top: 50%; animation-delay: 280ms; }
        .hline:nth-child(3){ top: 80%; animation-delay: 410ms; }

        .vline {
          width: 1px; top: 0; bottom: 0;
          transform: scaleY(0);
          transform-origin: 50% 0%;
          animation: drawY 900ms cubic-bezier(.22,.61,.36,1) forwards;
        }
        .vline:nth-child(4){ left: 20%; animation-delay: 520ms; }
        .vline:nth-child(5){ left: 50%; animation-delay: 640ms; }
        .vline:nth-child(6){ left: 80%; animation-delay: 760ms; }

        /* Shimmer effect on lines */
        .hline::after, .vline::after {
          content:"";
          position:absolute;
          inset:0;
          background: linear-gradient(90deg, transparent, currentColor, transparent);
          opacity:0;
          animation: shimmer 900ms ease-out forwards;
        }
        .hline:nth-child(1)::after{ animation-delay: 150ms; }
        .hline:nth-child(2)::after{ animation-delay: 280ms; }
        .hline:nth-child(3)::after{ animation-delay: 410ms; }
        .vline:nth-child(4)::after{ animation-delay: 520ms; }
        .vline:nth-child(5)::after{ animation-delay: 640ms; }
        .vline:nth-child(6)::after{ animation-delay: 760ms; }

        @keyframes drawX {
          0% { transform: scaleX(0); opacity: 0; }
          60% { opacity: .5; }
          100% { transform: scaleX(1); opacity: .15; }
        }
        @keyframes drawY {
          0% { transform: scaleY(0); opacity: 0; }
          60% { opacity: .5; }
          100% { transform: scaleY(1); opacity: .15; }
        }
        @keyframes shimmer {
          0% { opacity: .0; }
          30% { opacity: .3; }
          100% { opacity: 0; }
        }
      `}</style>

      {/* Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0 mix-blend-screen"
      />

      {/* Accent Lines */}
      <div className="accent-lines text-zinc-100">
        <div className="hline" />
        <div className="hline" />
        <div className="hline" />
        <div className="vline" />
        <div className="vline" />
        <div className="vline" />
      </div>

      {/* Hero Content */}
      <main className="absolute inset-0 grid place-items-center text-center z-10 pointer-events-none pb-32">
        <div className="pointer-events-auto px-4">
          <div className="text-xs tracking-[0.14em] uppercase text-zinc-500 mb-4 font-semibold">
            DevMap Platform
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-semibold leading-[0.95] tracking-tight text-white">
            Master Code.
            <br />
            Build Future.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
            Structured roadmaps to guide your developer journey.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/languages">
              <LiquidButton
                size="xl"
                className="text-primary-foreground font-bold bg-primary hover:bg-primary/90 border border-primary/20 backdrop-blur-md"
              >
                View Roadmaps <ArrowRight className="ml-2 h-4 w-4" />
              </LiquidButton>
            </Link>
            <Link to="/resources">
              <button className="inline-flex h-12 items-center justify-center rounded-md border border-zinc-700 bg-zinc-900/50 backdrop-blur-sm px-8 text-sm font-medium shadow-sm transition-colors hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-300 disabled:pointer-events-none disabled:opacity-50">
                Browse Resources
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Bottom Footer Content */}
      <section className="absolute left-0 right-0 bottom-0 p-8 border-t border-zinc-800 grid place-items-center text-center gap-2 z-20 bg-zinc-900/50 backdrop-blur-sm">
        <div className="text-xs tracking-widest uppercase text-zinc-500 font-medium">
          Community Driven
        </div>
        <div className="text-xl md:text-2xl font-semibold text-white">
          Open Source. Comprehensive. Free.
        </div>
        <p className="text-sm text-zinc-500 max-w-2xl">
          No more tutorial hell. Just a clear path forward for every language
          and framework you want to master.
        </p>
      </section>
    </section>
  );
}
