"use client";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "./Button";
import { LiquidButton } from "./liquid-glass-button";

export function HeroSection() {
  const gradientRef = useRef(null);

  useEffect(() => {
    const words = document.querySelectorAll(".word");
    words.forEach((word) => {
      const delay = parseInt(word.getAttribute("data-delay") || "0", 10);
      setTimeout(() => {
        word.style.animation = "word-appear 0.8s ease-out forwards";
      }, delay);
    });

    const gradient = gradientRef.current;
    function onMouseMove(e) {
      if (gradient) {
        // Adjust for relative positioning if needed, or keep page coordinates
        gradient.style.left = e.clientX - 192 + "px";
        gradient.style.top = e.clientY - 192 + "px";
        gradient.style.opacity = "1";
      }
    }
    function onMouseLeave() {
      if (gradient) gradient.style.opacity = "0";
    }
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    words.forEach((word) => {
      word.addEventListener("mouseenter", () => {
        word.style.textShadow = "0 0 20px rgba(var(--primary), 0.5)";
      });
      word.addEventListener("mouseleave", () => {
        word.style.textShadow = "none";
      });
    });

    function onClick(e) {
      const ripple = document.createElement("div");
      ripple.className = "fixed rounded-full pointer-events-none bg-primary/20";
      ripple.style.left = e.clientX + "px";
      ripple.style.top = e.clientY + "px";
      ripple.style.width = "4px";
      ripple.style.height = "4px";
      ripple.style.transform = "translate(-50%, -50%)";
      ripple.style.animation = "pulse-glow 1s ease-out forwards";
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 1000);
    }
    document.addEventListener("click", onClick);

    let scrolled = false;
    function onScroll() {
      if (!scrolled) {
        scrolled = true;
        document.querySelectorAll(".floating-element").forEach((el, index) => {
          setTimeout(() => {
            el.style.animationPlayState = "running";
          }, index * 200);
        });
      }
    }
    window.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-hidden relative w-full flex flex-col justify-center border-b border-border">
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.15] dark:opacity-[0.25]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <line
          x1="0"
          y1="20%"
          x2="100%"
          y2="20%"
          className="grid-line stroke-foreground"
          style={{ animationDelay: "0.5s" }}
        />
        <line
          x1="0"
          y1="80%"
          x2="100%"
          y2="80%"
          className="grid-line stroke-foreground"
          style={{ animationDelay: "1s" }}
        />
        <line
          x1="20%"
          y1="0"
          x2="20%"
          y2="100%"
          className="grid-line stroke-foreground"
          style={{ animationDelay: "1.5s" }}
        />
        <line
          x1="80%"
          y1="0"
          x2="80%"
          y2="100%"
          className="grid-line stroke-foreground"
          style={{ animationDelay: "2s" }}
        />
        <line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          className="grid-line stroke-foreground"
          style={{ animationDelay: "2.5s", opacity: 0.05 }}
        />
        <line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          className="grid-line stroke-foreground"
          style={{ animationDelay: "3s", opacity: 0.05 }}
        />
        <circle
          cx="20%"
          cy="20%"
          r="2"
          className="detail-dot fill-foreground"
          style={{ animationDelay: "3s" }}
        />
        <circle
          cx="80%"
          cy="20%"
          r="2"
          className="detail-dot fill-foreground"
          style={{ animationDelay: "3.2s" }}
        />
        <circle
          cx="20%"
          cy="80%"
          r="2"
          className="detail-dot fill-foreground"
          style={{ animationDelay: "3.4s" }}
        />
        <circle
          cx="80%"
          cy="80%"
          r="2"
          className="detail-dot fill-foreground"
          style={{ animationDelay: "3.6s" }}
        />
        <circle
          cx="50%"
          cy="50%"
          r="1.5"
          className="detail-dot fill-foreground"
          style={{ animationDelay: "4s" }}
        />
      </svg>

      <div
        className="corner-element absolute top-8 left-8"
        style={{ animationDelay: "4s" }}
      >
        <div className="w-2 h-2 opacity-30 bg-foreground"></div>
      </div>
      <div
        className="corner-element absolute top-8 right-8"
        style={{ animationDelay: "4.2s" }}
      >
        <div className="w-2 h-2 opacity-30 bg-foreground"></div>
      </div>
      <div
        className="corner-element absolute bottom-8 left-8"
        style={{ animationDelay: "4.4s" }}
      >
        <div className="w-2 h-2 opacity-30 bg-foreground"></div>
      </div>
      <div
        className="corner-element absolute bottom-8 right-8"
        style={{ animationDelay: "4.6s" }}
      >
        <div className="w-2 h-2 opacity-30 bg-foreground"></div>
      </div>

      <div
        className="floating-element bg-foreground"
        style={{ top: "25%", left: "15%", animationDelay: "5s" }}
      ></div>
      <div
        className="floating-element bg-foreground"
        style={{ top: "60%", left: "85%", animationDelay: "5.5s" }}
      ></div>
      <div
        className="floating-element bg-foreground"
        style={{ top: "40%", left: "10%", animationDelay: "6s" }}
      ></div>
      <div
        className="floating-element bg-foreground"
        style={{ top: "75%", left: "90%", animationDelay: "6.5s" }}
      ></div>

      <div className="relative z-10 flex flex-col justify-center items-center px-8 text-center max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-xs md:text-sm font-mono font-light uppercase tracking-[0.2em] opacity-80 text-muted-foreground">
            <span className="word" data-delay="0">
              Welcome
            </span>
            <span className="word" data-delay="200">
              to
            </span>
            <span className="word" data-delay="400">
              <b>DevMap</b>
            </span>
            <span className="word" data-delay="600">
              — 
            </span>
            <span className="word" data-delay="800">
              Your
            </span>
            <span className="word" data-delay="1000">
              Path
            </span>
            <span className="word" data-delay="1200">
              to
            </span>
            <span className="word" data-delay="1400">
              Mastery.
            </span>
          </h2>
          <div className="mt-4 w-16 h-px opacity-30 mx-auto bg-gradient-to-r from-transparent via-foreground to-transparent"></div>
        </div>

        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-extralight leading-tight tracking-tight text-foreground">
            <div className="mb-4 md:mb-6">
              <span className="word" data-delay="1600">
                Master
              </span>
              <span className="word" data-delay="1750">
                Programming
              </span>
              <span className="word" data-delay="1900">
                step
              </span>
              <span className="word" data-delay="2050">
                by
              </span>
              <span className="word" data-delay="2200">
                step.
              </span>
            </div>
            <div className="text-2xl md:text-3xl lg:text-4xl font-thin leading-relaxed text-muted-foreground">
              <span className="word" data-delay="2600">
                Clear
              </span>
              <span className="word" data-delay="2750">
                roadmaps,
              </span>
              <span className="word" data-delay="2900">
                curated
              </span>
              <span className="word" data-delay="3050">
                resources,
              </span>
              <span className="word" data-delay="3200">
                and
              </span>
              <span className="word" data-delay="3350">
                steady
              </span>
              <span className="word" data-delay="3500">
                progress.
              </span>
            </div>
          </h1>

          <div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0"
            style={{
              animation: "word-appear 1s ease-out forwards",
              animationDelay: "4s",
            }}
          >
            <Link to="/languages">
              <LiquidButton
                size="xl"
                className="text-primary-foreground font-bold bg-primary hover:bg-primary/90"
              >
                Start Learning <ArrowRight className="ml-2 h-4 w-4" />
              </LiquidButton>
            </Link>
            <Link to="/about">
              <Button
                variant="ghost"
                size="lg"
                className="border border-border"
              >
                How it works
              </Button>
            </Link>
          </div>

          <div
            className="absolute -left-8 top-1/2 w-4 h-px opacity-20 hidden lg:block bg-foreground"
            style={{
              animation: "word-appear 1s ease-out forwards",
              animationDelay: "3.5s",
            }}
          ></div>
          <div
            className="absolute -right-8 top-1/2 w-4 h-px opacity-20 hidden lg:block bg-foreground"
            style={{
              animation: "word-appear 1s ease-out forwards",
              animationDelay: "3.7s",
            }}
          ></div>
        </div>
      </div>

      <div
        id="mouse-gradient"
        ref={gradientRef}
        className="fixed pointer-events-none w-96 h-96 rounded-full blur-3xl transition-all duration-500 ease-out opacity-0 z-0 bg-primary/20"
      ></div>
    </div>
  );
}
