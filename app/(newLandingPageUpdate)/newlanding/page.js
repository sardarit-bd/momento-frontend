"use client";
import Image from "next/image";
import Link from "next/link";
import portraitDeckPreview from "../../../public/mockup1.png";
import deckCardImage from "../../../public/mockup4.png";
import TradingCardImage from "../../../public/mockup5.png";
import tradingCardsPreview from "../../../public/mockup6.png";
import TradingCardImage6 from "../../../public/mockup7.png";

import { useEffect, useRef, useState } from "react";

export default function MomentoLanding() {
  const heroRef = useRef(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const fontLink = document.createElement("link");
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);

    // Inject Tailwind CDN
    if (!document.getElementById("tailwind-cdn")) {
      const tw = document.createElement("script");
      tw.id = "tailwind-cdn";
      tw.src = "https://cdn.tailwindcss.com";
      tw.onload = () => {
        if (window.tailwind) {
          window.tailwind.config = {
            theme: {
              extend: {
                fontFamily: {
                  display: ['"Playfair Display"', "serif"],
                  serif2: ['"DM Serif Display"', "serif"],
                  body: ['"DM Sans"', "sans-serif"],
                },
                colors: {
                  cream: "#F5EFE0",
                  ink: "#1A1209",
                  gold: "#C9A84C",
                  "gold-light": "#E8C96A",
                  amber: "#D4880A",
                  blush: "#F0D9C0",
                  warm: "#8B6B3D",
                },
                animation: {
                  float: "float 6s ease-in-out infinite",
                  "float-delay": "float 6s ease-in-out 2s infinite",
                  "float-delay2": "float 6s ease-in-out 4s infinite",
                  "fade-up": "fadeUp 0.7s ease forwards",
                  shimmer: "shimmer 2.5s linear infinite",
                },
                keyframes: {
                  float: {
                    "0%,100%": { transform: "translateY(0px) rotate(-2deg)" },
                    "50%": { transform: "translateY(-12px) rotate(2deg)" },
                  },
                  fadeUp: {
                    from: { opacity: "0", transform: "translateY(30px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                  },
                  shimmer: {
                    "0%": { backgroundPosition: "-200% center" },
                    "100%": { backgroundPosition: "200% center" },
                  },
                },
              },
            },
          };
        }
      };
      document.head.appendChild(tw);
    }

    // Inject CSS
    const style = document.createElement("style");
    style.id = "momento-styles";
    style.textContent = `
      .momento-root { font-family: 'DM Sans', sans-serif; background-color: #F5EFE0; color: #1A1209; overflow-x: hidden; }
      .grain { position: fixed; inset: 0; pointer-events: none; z-index: 100; opacity: 0.03;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"); }
      .gold-shimmer { background: linear-gradient(90deg, #C9A84C 0%, #E8C96A 40%, #C9A84C 60%, #A07830 100%); background-size: 200% auto; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 3s linear infinite; }
      @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
      @keyframes float { 0%,100% { transform: translateY(0px) rotate(-2deg); } 50% { transform: translateY(-12px) rotate(2deg); } }
      @keyframes float-d1 { 0%,100% { transform: translateY(0px) rotate(-8deg); } 50% { transform: translateY(-12px) rotate(-3deg); } }
      @keyframes float-d2 { 0%,100% { transform: translateY(0px) rotate(3deg); } 50% { transform: translateY(-12px) rotate(8deg); } }
      @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      .animate-float { animation: float 6s ease-in-out infinite; }
      .animate-float-delay { animation: float-d1 6s ease-in-out 2s infinite; }
      .animate-float-delay2 { animation: float-d2 6s ease-in-out 4s infinite; }
      .marquee-track { display: flex; gap: 2rem; animation: marquee 20s linear infinite; white-space: nowrap; }
      .card-float { filter: drop-shadow(0 20px 40px rgba(26,18,9,0.25)); transition: transform 0.4s ease, filter 0.4s ease; }
      .card-float:hover { filter: drop-shadow(0 30px 60px rgba(26,18,9,0.35)); transform: translateY(-8px) rotate(0deg) !important; }
      .btn-primary { background: linear-gradient(135deg, #C9A84C, #E8C96A, #C9A84C); background-size: 200% auto; color: #1A1209; font-weight: 600; letter-spacing: 0.04em; transition: all 0.3s ease; position: relative; overflow: hidden; cursor: pointer; }
      .btn-primary:hover { background-position: right center; transform: translateY(-2px); box-shadow: 0 12px 40px rgba(201,168,76,0.45); }
      .btn-primary::after { content: ''; position: absolute; top: 0; left: -100%; width: 60%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent); transition: left 0.5s ease; }
      .btn-primary:hover::after { left: 150%; }
      .btn-outline { border: 1.5px solid #C9A84C; color: #C9A84C; background: transparent; font-weight: 500; letter-spacing: 0.04em; transition: all 0.3s ease; cursor: pointer; }
      .btn-outline:hover { background: rgba(201,168,76,0.1); transform: translateY(-2px); }
      .section-divider { width: 60px; height: 2px; background: linear-gradient(90deg, #C9A84C, transparent); margin: 0 auto; }
      .card-ui { background: linear-gradient(145deg, #fff9ee, #f5ead0); border: 1px solid rgba(201,168,76,0.3); box-shadow: 0 4px 20px rgba(26,18,9,0.1), inset 0 1px 0 rgba(255,255,255,0.8); }
      .price-card { background: #1A1209; border: 1px solid rgba(201,168,76,0.2); transition: all 0.3s ease; }
      .price-card:hover { border-color: rgba(201,168,76,0.6); box-shadow: 0 20px 60px rgba(201,168,76,0.15); transform: translateY(-4px); }
      .price-card.featured { background: linear-gradient(145deg, #221a0a, #1A1209); border-color: rgba(201,168,76,0.5); }
      .step-num { font-family: 'Playfair Display', serif; font-size: 5rem; font-weight: 900; line-height: 1; color: rgba(201,168,76,0.12); }
      .texture-bg { background-image: radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.05) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.04) 0%, transparent 50%); }
      .ink-section { background: #1A1209; background-image: radial-gradient(ellipse at 30% 60%, rgba(201,168,76,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.05) 0%, transparent 40%); }
      .deco-card { border-radius: 12px; position: absolute; background: linear-gradient(145deg, #fff9ee, #f0e0c0); border: 1px solid rgba(201,168,76,0.4); box-shadow: 0 15px 40px rgba(26,18,9,0.2); }
      .scroll-reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
      .scroll-reveal.revealed { opacity: 1; transform: translateY(0); }
      .hover-lift { transition: transform 0.3s ease; }
      .hover-lift:hover { transform: translateY(-4px); }
    `;
    document.head.appendChild(style);

    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((el) => {
          if (el.isIntersecting) el.target.classList.add("revealed");
        });
      },
      { threshold: 0.12 },
    );
    const revealEls = document.querySelectorAll(".scroll-reveal");
    revealEls.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      document.getElementById("momento-styles")?.remove();
    };
  }, []);

  // Sticky bar visibility — tied to hero leaving the viewport
  useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // show bar once hero is mostly scrolled past
        setShowStickyBar(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" },
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const MOMENTS = [
    {
      image: "/mockup2.png",
      alt: "Friends laughing over a custom card deck during game night",
      title: "Fun & Connection",
      tags: ["🃏 Game Nights", "💑 Couples", "👨‍👩‍👧 Family"],
      desc: "Bring people together around personalized cards built from inside jokes, memories, and moments that actually mean something.",
      delay: "0s",
    },
    {
      image: "/mockup2.png",
      alt: "Friends laughing over a custom card deck during game night",
      title: "Love & Laughter",
      tags: ["🃏 Game Nights", "💑 Couples", "👨‍👩‍👧 Family"],
      desc: "Share meaningful moments through personalized playing cards created from your favorite photos and memories.",
      delay: "0s",
    },
    {
      image: "/mockup8.png",
      alt: "A wrapped gift beside a personalized deck of cards",
      title: "Milestones & Gifts",
      tags: ["🎓 Graduation", "🎂 Birthdays", "🎄 Holidays"],
      desc: "Turn memories into something people can actually hold onto.",
      delay: "0.15s",
    },
  ];

  return (
    <div className="momento-root">
      <div className="grain" />

      {/* ═══ STICKY SHOP NOW BAR ═══ */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transform: showStickyBar ? "translateY(0)" : "translateY(-100%)",
          opacity: showStickyBar ? 1 : 0,
          transition: "transform 0.4s ease, opacity 0.4s ease",
          pointerEvents: showStickyBar ? "auto" : "none",
        }}
      >
        <div
          style={{
            background: "rgba(26,18,9,0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(201,168,76,0.2)",
          }}
          className="flex items-center justify-between px-5 sm:px-8 py-3"
        >
          <span
            style={{ fontFamily: "'Playfair Display',serif" }}
            className="font-bold text-base sm:text-lg text-[#C9A84C]"
          >
            Momento<span style={{ color: "rgba(201,168,76,0.5)" }}>.</span>
          </span>

          <Link
            href="/shop"
            className="btn-primary"
            style={{
              padding: "0.6rem 1.5rem",
              borderRadius: 9999,
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.03em",
              textTransform: "uppercase",
            }}
          >
            Shop Now →
          </Link>
        </div>
      </div>

      {/* ═══ SECTION 1 — HERO ═══ */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16 lg:py-24 bg-[#FAF9F6]"
      >
        {/* 1. Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={TradingCardImage6}
            alt="Cards Mockup Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-white/50 via-transparent to-white/50 pointer-events-none" />
          <div className="absolute inset-0 bg-white/10 pointer-events-none" />
        </div>

        {/* 2. Main Content Container */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 flex justify-center">
          <div
            className="
                            w-full
                            max-w-187.5
                            backdrop-blur-sm
                            border border-white/30
                            rounded-[2.5rem]
                            p-8 md:p-10 lg:p-12
                            shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                            text-center
                            flex
                            flex-col
                            items-center
                        "
            style={{
              background: "rgba(253, 253, 253, 0.8)",
            }}
          >
            {/* Badge */}
            <div
              className="
                                inline-flex items-center gap-2
                                px-4 py-2
                                rounded-full
                                text-[10px] sm:text-xs
                                font-bold
                                tracking-[0.15em]
                                uppercase
                                mb-5
                                bg-[#C9A84C]/10
                                border border-[#C9A84C]/30
                                text-[#A68630]
                            "
            >
              <span>✦</span> Premium Personalized Cards
            </div>

            {/* Headline */}
            <h1
              className="
                                font-serif
                                text-4xl
                                sm:text-5xl
                                md:text-[56px]
                                lg:text-[64px]
                                font-black
                                leading-[1.1]
                                tracking-tight
                                text-[#221f1c]
                                max-w-175
                            "
            >
              Turn Your{" "}
              <span
                style={{
                  background: "linear-gradient(to right, #C9A84C, #A68630)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Favorite People
              </span>{" "}
              Into Playable Cards
            </h1>

            {/* Description */}
            <p
              className="
                                mt-5
                                text-sm
                                sm:text-base
                                md:text-[17px]
                                text-gray-600
                                leading-relaxed
                                max-w-xl
                                font-medium
                            "
            >
              Create premium personalized cards for game nights, milestones,
              gifts, and unforgettable memories — all in just a few minutes.
            </p>

            {/* Trust Indicators */}
            <div
              className="
                                mt-6
                                flex
                                flex-wrap
                                justify-center
                                gap-x-6
                                gap-y-2
                                text-[13px]
                                sm:text-sm
                                font-bold
                                text-gray-700
                            "
            >
              <span className="flex items-center gap-1.5">
                <span className="text-gray-800 text-base">✓</span> No Design
                Skills Needed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-gray-800 text-base">✓</span> Ready in
                Minutes
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-gray-800 text-base">✓</span> Premium Print
                Quality
              </span>
            </div>

            {/* CTA Button */}
            <div className="mt-8 mb-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/shop"
                className="
                                    inline-block
                                    bg-[#42A5F5]
                                    hover:bg-[#318CE7]
                                    text-white
                                    font-bold
                                    text-sm
                                    uppercase
                                    tracking-wide
                                    py-4
                                    px-10
                                    rounded-xl
                                    transition-all
                                    duration-300
                                    shadow-[0_10px_25px_rgba(66,165,245,0.3)]
                                    hover:shadow-[0_10px_25px_rgba(49,140,231,0.4)]
                                    hover:-translate-y-0.5
                                "
              >
                Create Your Deck
              </Link>

              <Link
                href="/shop"
                className="
                                    inline-block
                                    bg-transparent
                                    hover:bg-white/20
                                    text-[#221f1c]
                                    font-bold
                                    text-sm
                                    uppercase
                                    tracking-wide
                                    py-4
                                    px-10
                                    rounded-xl
                                    transition-all
                                    duration-300
                                    border-2
                                    border-[#221f1c]/20
                                    hover:border-[#221f1c]/40
                                    hover:-translate-y-0.5
                                "
              >
                Create a Momento
              </Link>
            </div>

            {/* Bottom Features */}
            <div
              className="
                                w-full
                                pt-6
                                border-t
                                border-gray-200/70
                                grid
                                grid-cols-1
                                sm:grid-cols-3
                                gap-4
                            "
            >
              <div>
                <div className="text-[#42A5F5] font-bold text-xs uppercase tracking-wider mb-1">
                  Easy to Customize
                </div>
                <p className="text-[13px] text-gray-500 font-medium">
                  Create your deck in minutes.
                </p>
              </div>
              <div>
                <div className="text-[#42A5F5] font-bold text-xs uppercase tracking-wider mb-1">
                  Premium Quality
                </div>
                <p className="text-[13px] text-gray-500 font-medium">
                  Durable cards with vibrant printing.
                </p>
              </div>
              <div>
                <div className="text-[#42A5F5] font-bold text-xs uppercase tracking-wider mb-1">
                  Fast Delivery
                </div>
                <p className="text-[13px] text-gray-500 font-medium">
                  Delivered straight to your door.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE STRIP ═══ */}
      <div
        style={{
          padding: "1rem 0",
          overflow: "hidden",
          background: "#1A1209",
          borderTop: "1px solid rgba(201,168,76,0.15)",
          borderBottom: "1px solid rgba(201,168,76,0.15)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div
            className="marquee-track"
            style={{
              color: "rgba(201,168,76,0.5)",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {[
              "✦ Fully Personalized",
              "✦ Game Nights",
              "✦ Premium Print",
              "✦ Couples & Families",
              "✦ Birthdays",
              "✦ Graduations",
              "✦ Holidays",
              "✦ Gifting",
              "✦ Fully Personalized",
              "✦ Game Nights",
              "✦ Premium Print",
              "✦ Couples & Families",
              "✦ Birthdays",
              "✦ Graduations",
              "✦ Holidays",
              "✦ Gifting",
            ].map((t, i) => (
              <span key={i}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ SECTION 2 — TWO WAYS ═══ */}

      <section
        className="texture-bg"
        style={{ padding: "7rem 1.5rem", backgroundColor: "#F5EFE0" }}
      >
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <div
            className="scroll-reveal"
            style={{ textAlign: "center", marginBottom: "4rem" }}
          >
            <div className="section-divider" style={{ marginBottom: "2rem" }} />
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 900,
                marginBottom: "1rem",
                color: "#1A1209",
              }}
            >
              Play with your people <br /> or preserve a moment.
            </h2>
            <p
              style={{
                color: "#8B6B3D",
                fontSize: "1.125rem",
                fontWeight: 300,
              }}
            >
              Personalized cards made for game nights, gifts, and meaningful
              memories.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Portrait Deck */}
            <div
              className="scroll-reveal card-ui hover-lift"
              style={{
                borderRadius: "1.5rem",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              {/* Image zone */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: 240,
                  overflow: "hidden",
                }}
              >
                <Image
                  src={portraitDeckPreview}
                  alt="Spread of Momento Portrait Deck playing cards"
                  fill
                  style={{ objectFit: "cover" }}
                />
                {/* blend image into card background */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, #F5EFE0 0%, transparent 35%)",
                  }}
                />
              </div>

              {/* Content zone */}
              <div
                style={{
                  padding: "2rem 2.5rem 2.5rem",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -120,
                    right: 0,
                    width: 192,
                    height: 192,
                    borderRadius: "50%",
                    background: "radial-gradient(circle,#C9A84C,transparent)",
                    opacity: 0.15,
                    transform: "translate(30%,-30%)",
                  }}
                />
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#C9A84C",
                      marginBottom: 8,
                    }}
                  >
                    Portrait Deck
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "1.75rem",
                      fontWeight: 900,
                      marginBottom: "1rem",
                      color: "#1A1209",
                    }}
                  >
                    Momento Portrait Deck
                  </h3>
                  <p
                    style={{
                      color: "#8B6B3D",
                      lineHeight: 1.7,
                      marginBottom: "2rem",
                    }}
                  >
                    A fully playable custom deck built around your favorite
                    people — designed for game nights, inside jokes, memories,
                    and replay value.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                      marginBottom: "2rem",
                    }}
                  >
                    {["Game Nights", "Friends", "Couples", "Family"].map(
                      (tag) => (
                        <span
                          key={tag}
                          style={{
                            padding: "4px 12px",
                            borderRadius: 9999,
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            background: "rgba(26,18,9,0.06)",
                            color: "rgba(26,18,9,0.6)",
                          }}
                        >
                          {tag}
                        </span>
                      ),
                    )}
                  </div>
                  <button
                    className="btn-primary"
                    style={{
                      padding: "0.75rem 1.75rem",
                      borderRadius: 9999,
                      fontSize: "0.875rem",
                      border: "none",
                      width: "100%",
                    }}
                  >
                    Start Your Deck →
                  </button>
                </div>
              </div>
            </div>

            {/* Photo Portrait Deck */}
            <div
              className="scroll-reveal card-ui hover-lift"
              style={{
                borderRadius: "1.5rem",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              {/* Image zone */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: 240,
                  overflow: "hidden",
                }}
              >
                <Image
                  src={portraitDeckPreview}
                  alt="Spread of Momento Portrait Deck playing cards"
                  fill
                  style={{ objectFit: "cover" }}
                />
                {/* blend image into card background */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, #F5EFE0 0%, transparent 35%)",
                  }}
                />
              </div>

              {/* Content zone */}
              <div
                style={{
                  padding: "2rem 2.5rem 2.5rem",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -120,
                    right: 0,
                    width: 192,
                    height: 192,
                    borderRadius: "50%",
                    background: "radial-gradient(circle,#C9A84C,transparent)",
                    opacity: 0.15,
                    transform: "translate(30%,-30%)",
                  }}
                />
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#C9A84C",
                      marginBottom: 8,
                    }}
                  >
                    Photo Portrait Deck
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "1.75rem",
                      fontWeight: 900,
                      marginBottom: "1rem",
                      color: "#1A1209",
                    }}
                  >
                    Momento Photo Portrait Deck
                  </h3>
                  <p
                    style={{
                      color: "#8B6B3D",
                      lineHeight: 1.7,
                      marginBottom: "2rem",
                    }}
                  >
                    A fully playable custom deck transformed with your own
                    photos—made for game nights, meaningful moments, and endless
                    fun.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                      marginBottom: "2rem",
                    }}
                  >
                    {["Game Nights", "Friends", "Couples", "Family"].map(
                      (tag) => (
                        <span
                          key={tag}
                          style={{
                            padding: "4px 12px",
                            borderRadius: 9999,
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            background: "rgba(26,18,9,0.06)",
                            color: "rgba(26,18,9,0.6)",
                          }}
                        >
                          {tag}
                        </span>
                      ),
                    )}
                  </div>
                  <button
                    className="btn-primary"
                    style={{
                      padding: "0.75rem 1.75rem",
                      borderRadius: 9999,
                      fontSize: "0.875rem",
                      border: "none",
                      width: "100%",
                    }}
                  >
                    Start Your Deck →
                  </button>
                </div>
              </div>
            </div>

            {/* Momento Cards */}
            <div
              className="scroll-reveal ink-section hover-lift"
              style={{
                borderRadius: "1.5rem",
                overflow: "hidden",
                cursor: "pointer",
                transitionDelay: "0.15s",
              }}
            >
              {/* Image zone */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: 240,
                  overflow: "hidden",
                }}
              >
                <Image
                  src={tradingCardsPreview}
                  alt="Stack of personalized Momento Trading Cards"
                  fill
                  style={{ objectFit: "cover" }}
                />
                {/* blend image into dark card background — note different gradient color */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, #1A1209 0%, transparent 35%)",
                  }}
                />
              </div>

              {/* Content zone */}
              <div
                style={{
                  padding: "2rem 2.5rem 2.5rem",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -120,
                    right: 0,
                    width: 192,
                    height: 192,
                    borderRadius: "50%",
                    background: "radial-gradient(circle,#C9A84C,transparent)",
                    opacity: 0.1,
                    transform: "translate(30%,-30%)",
                  }}
                />
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#C9A84C",
                      marginBottom: 8,
                    }}
                  >
                    Momento Cards
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "1.75rem",
                      fontWeight: 900,
                      marginBottom: "1rem",
                      color: "#F5EFE0",
                    }}
                  >
                    Momento Trading Cards
                  </h3>
                  <p
                    style={{
                      color: "rgba(245,239,224,0.6)",
                      lineHeight: 1.7,
                      marginBottom: "2rem",
                    }}
                  >
                    Turn meaningful moments into collectible personalized cards
                    designed for gifting, celebrating milestones, and keeping
                    forever.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                      marginBottom: "2rem",
                    }}
                  >
                    {["Birthdays", "Milestones", "Gifts"].map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: "4px 12px",
                          borderRadius: 9999,
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          color: "rgba(201,168,76,0.6)",
                          background: "rgba(201,168,76,0.1)",
                          border: "1px solid rgba(201,168,76,0.2)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    className="btn-outline"
                    style={{
                      padding: "0.75rem 1.75rem",
                      borderRadius: 9999,
                      fontSize: "0.875rem",
                      width: "100%",
                    }}
                  >
                    Create a Momento →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3 — HOW IT WORKS ═══ */}
      <section
        id="how"
        className="ink-section"
        style={{ padding: "7rem 1.5rem" }}
      >
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <div
            className="scroll-reveal"
            style={{ textAlign: "center", marginBottom: "4rem" }}
          >
            <div className="section-divider" style={{ marginBottom: "2rem" }} />
            <p
              style={{
                color: "#C9A84C",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              Takes less than 2 minutes
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 900,
                color: "#F5EFE0",
              }}
            >
              Create Yours
              <br />
              in Minutes
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              gap: "2rem",
              marginBottom: "3.5rem",
            }}
          >
            {[
              {
                n: "01",
                icon: (
                  <svg
                    style={{ width: 20, height: 20, color: "#1A1209" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M4 6h16M4 12h8m-8 6h16" />
                  </svg>
                ),
                title: "Choose Your Product",
                desc: "Pick between a Momento Portrait Deck or Momento Trading Cards.",
              },
              {
                n: "02",
                icon: (
                  <svg
                    style={{ width: 20, height: 20, color: "#1A1209" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-9 9H5v-3l9-9z" />
                  </svg>
                ),
                title: "Personalize Your Cards",
                desc: "Upload photos and customize your cards in minutes.",
              },
              {
                n: "03",
                icon: (
                  <svg
                    style={{ width: 20, height: 20, color: "#1A1209" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                ),
                title: "Preview & Order",
                desc: "Preview your design, place your order, and we’ll deliver it straight to your door.",
              },
            ].map(({ n, icon, title, desc }, i) => (
              <div
                key={n}
                className="scroll-reveal"
                style={{
                  position: "relative",
                  transitionDelay: `${i * 0.15}s`,
                }}
              >
                <div
                  className="step-num"
                  style={{
                    position: "absolute",
                    top: -16,
                    left: -8,
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  {n}
                </div>
                <div
                  className="card-ui"
                  style={{
                    borderRadius: "1rem",
                    padding: "2rem",
                    position: "relative",
                    zIndex: 10,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1.25rem",
                      background: "linear-gradient(135deg,#C9A84C,#a07830)",
                    }}
                  >
                    {icon}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      marginBottom: "0.75rem",
                      color: "#1A1209",
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      color: "#8B6B3D",
                      fontSize: "0.875rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="scroll-reveal" style={{ textAlign: "center" }}>
            <button
              className="btn-primary"
              style={{
                padding: "1rem 2.5rem",
                borderRadius: 9999,
                fontSize: "1rem",
                border: "none",
              }}
            >
              Start Creating Now →
            </button>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4 — PRICING ═══ */}
      <section
        id="products"
        className="texture-bg"
        style={{ padding: "7rem 1.5rem", backgroundColor: "#F5EFE0" }}
      >
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <div
            className="scroll-reveal"
            style={{ textAlign: "center", marginBottom: "4rem" }}
          >
            <div className="section-divider" style={{ marginBottom: "2rem" }} />
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 900,
                color: "#1A1209",
              }}
            >
              Pick the Experience
              <br />
              That Fits Your Moment
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Portrait Deck */}
            <div
              className="scroll-reveal price-card"
              style={{
                borderRadius: "1.5rem",
                padding: "2.5rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "2rem",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(201,168,76,0.6)",
                      marginBottom: 8,
                    }}
                  >
                    Portrait Deck
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "1.75rem",
                      fontWeight: 900,
                      color: "#F5EFE0",
                    }}
                  >
                    Momento Portrait Deck
                  </h3>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "2.25rem",
                      fontWeight: 900,
                      color: "#C9A84C",
                    }}
                  >
                    $59
                  </div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: "rgba(245,239,224,0.3)",
                      marginTop: 4,
                    }}
                  >
                    Full deck
                  </div>
                </div>
              </div>
              {/* Card spread visual */}
              <div
                style={{
                  position: "relative",
                  height: 260,
                  marginBottom: "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image src={deckCardImage} alt="momento-deck-card" fill />
              </div>
              <p
                style={{
                  color: "rgba(245,239,224,0.6)",
                  lineHeight: 1.7,
                  marginBottom: "1.5rem",
                }}
              >
                Turn your friends, family, or partner into a fully playable
                personalized deck where every card feels personal.
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginBottom: "2rem",
                }}
              >
                {[
                  "🎮 Game Nights",
                  "👫 Couples",
                  "👨‍👩‍👧 Family",
                  "🎉 Friends",
                ].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "4px 12px",
                      borderRadius: 9999,
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: "rgba(201,168,76,0.6)",
                      background: "rgba(201,168,76,0.08)",
                      border: "1px solid rgba(201,168,76,0.15)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                className="btn-primary"
                style={{
                  padding: "1rem 2rem",
                  borderRadius: 9999,
                  fontSize: "0.875rem",
                  border: "none",
                  marginTop: "auto",
                }}
              >
                Create Your Deck →
              </button>
            </div>

            {/* Photo portrait */}

            <div
              className="scroll-reveal price-card"
              style={{
                borderRadius: "1.5rem",
                padding: "2.5rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "2rem",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(201,168,76,0.6)",
                      marginBottom: 8,
                    }}
                  >
                    Photo Portrait Deck
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "1.75rem",
                      fontWeight: 900,
                      color: "#F5EFE0",
                    }}
                  >
                    Momento Photo Portrait Deck
                  </h3>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "2.25rem",
                      fontWeight: 900,
                      color: "#C9A84C",
                    }}
                  >
                    $59
                  </div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: "rgba(245,239,224,0.3)",
                      marginTop: 4,
                    }}
                  >
                    Full deck
                  </div>
                </div>
              </div>
              {/* Card spread visual */}
              <div
                style={{
                  position: "relative",
                  height: 260,
                  marginBottom: "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image src={deckCardImage} alt="momento-deck-card" fill />
              </div>
              <p
                style={{
                  color: "rgba(245,239,224,0.6)",
                  lineHeight: 1.7,
                  marginBottom: "1.5rem",
                }}
              >
                Bring your favorite people, memories, and milestones to life in
                a fully playable personalized deck.
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginBottom: "2rem",
                }}
              >
                {[
                  "🎮 Game Nights",
                  "👫 Couples",
                  "👨‍👩‍👧 Family",
                  "🎉 Friends",
                ].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "4px 12px",
                      borderRadius: 9999,
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: "rgba(201,168,76,0.6)",
                      background: "rgba(201,168,76,0.08)",
                      border: "1px solid rgba(201,168,76,0.15)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                className="btn-primary"
                style={{
                  padding: "1rem 2rem",
                  borderRadius: 9999,
                  fontSize: "0.875rem",
                  border: "none",
                  marginTop: "auto",
                }}
              >
                Create Your Deck →
              </button>
            </div>

            {/* Momento Cards */}
            <div
              className="scroll-reveal price-card"
              style={{
                borderRadius: "1.5rem",
                padding: "2.5rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "2rem",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(201,168,76,0.6)",
                      marginBottom: 8,
                    }}
                  >
                    Trading Cards
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "1.75rem",
                      fontWeight: 900,
                      color: "#F5EFE0",
                    }}
                  >
                    Momento Trading Cards
                  </h3>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: "rgba(245,239,224,0.3)",
                    }}
                  >
                    Starting at
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "2.25rem",
                      fontWeight: 900,
                      color: "#C9A84C",
                    }}
                  >
                    $29
                  </div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: "rgba(245,239,224,0.3)",
                      marginTop: 4,
                    }}
                  >
                    Full deck
                  </div>
                </div>
              </div>
              {/* Card spread visual */}
              <div
                style={{
                  position: "relative",
                  height: 260,
                  marginBottom: "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* {[{ r: -15, tx: -50, ty: 5, o: 1 }, { r: -7, tx: -20, ty: 2, o: 1 }, { r: 0, tx: 0, ty: 0, o: 0 }, { r: 7, tx: 20, ty: 2, o: 1 }, { r: 15, tx: 50, ty: 5, o: 1 }].map((c, i) => (
                                    <div key={i} style={{ position: "absolute", width: 112, height: 160, borderRadius: 12, background: i === 2 ? "linear-gradient(145deg,#fff9ee,#f0e0b8)" : "linear-gradient(145deg,#2d2010,#3d2e12)", border: i === 2 ? "1.5px solid rgba(201,168,76,0.5)" : "1px solid rgba(201,168,76,0.3)", transform: `rotate(${c.r}deg) translate(${c.tx}px,${c.ty}px)`, zIndex: i === 2 ? 3 : i, padding: i === 2 ? 12 : 0, display: "flex", flexDirection: "column" }}>
                                        {i === 2 && <><div style={{ width: "100%", flex: 1, borderRadius: 8, marginBottom: 8, background: "linear-gradient(135deg,#d4a843,#8b6b3d)" }} /><div style={{ height: 6, borderRadius: 9999, background: "rgba(201,168,76,0.4)", marginBottom: 6, width: "75%" }} /><div style={{ height: 6, borderRadius: 9999, background: "rgba(201,168,76,0.2)", width: "50%" }} /></>}
                                    </div>
                                ))} */}

                <Image src={TradingCardImage} alt="momento-deck-card" fill />
              </div>
              <p
                style={{
                  color: "rgba(245,239,224,0.6)",
                  lineHeight: 1.7,
                  marginBottom: "1.5rem",
                }}
              >
                Six personalized moments • Only $13 per moment
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginBottom: "2rem",
                }}
              >
                {[
                  "🎮 Game Nights",
                  "👫 Couples",
                  "👨‍👩‍👧 Family",
                  "🎉 Friends",
                ].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "4px 12px",
                      borderRadius: 9999,
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: "rgba(201,168,76,0.6)",
                      background: "rgba(201,168,76,0.08)",
                      border: "1px solid rgba(201,168,76,0.15)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                className="btn-primary"
                style={{
                  padding: "1rem 2rem",
                  borderRadius: 9999,
                  fontSize: "0.875rem",
                  border: "none",
                  marginTop: "auto",
                }}
              >
                Create Your Momento →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5 — USE CASES ═══ */}

      <section className="ink-section" style={{ padding: "7rem 1.5rem" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <div
            className="scroll-reveal"
            style={{ textAlign: "center", marginBottom: "4rem" }}
          >
            <div className="section-divider" style={{ marginBottom: "2rem" }} />
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 900,
                color: "#F5EFE0",
                marginBottom: "1rem",
              }}
            >
              Made for
              <br />
              Real Moments
            </h2>
            <p
              style={{
                color: "rgba(245,239,224,0.5)",
                fontWeight: 300,
                fontSize: "1.125rem",
              }}
            >
              However you use it, it gets personal fast.
            </p>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            style={{ marginBottom: "3rem" }}
          >
            {MOMENTS.map(({ image, alt, title, tags, desc, delay }) => (
              <div
                key={title}
                className="scroll-reveal card-ui moment-card"
                style={{
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  position: "relative",
                  transitionDelay: delay,
                }}
              >
                <div className="moment-card__media">
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="moment-card__img"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="moment-card__fade" />
                </div>

                <div
                  style={{
                    position: "relative",
                    padding: "2rem 2.5rem 2.5rem",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "1.5rem",
                      fontWeight: 900,
                      color: "#1A1209",
                      marginBottom: "1rem",
                    }}
                  >
                    {title}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.75rem",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          padding: "8px 16px",
                          borderRadius: 9999,
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          background: "rgba(26,18,9,0.06)",
                          color: "rgba(26,18,9,0.6)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <p
                    style={{
                      color: "#8B6B3D",
                      fontSize: "0.875rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="scroll-reveal flex flex-wrap gap-3 justify-center">
            <button className="btn-outline text-sm sm:text-base px-6 sm:px-10 py-3 sm:py-4 rounded-full whitespace-nowrap bg-[#CFB055] text-black hover:text-[#CFB055]">
              Create your Deck →
            </button>
            <button className="btn-outline text-sm sm:text-base px-6 sm:px-10 py-3 sm:py-4 rounded-full whitespace-nowrap">
              Create a Momento →
            </button>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6 & 7 — VALUE + QUALITY ═══ */}
      <section
        className="texture-bg"
        style={{ padding: "7rem 1.5rem", backgroundColor: "#F5EFE0" }}
      >
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          {/* Value */}
          <div
            className="scroll-reveal"
            style={{ textAlign: "center", marginBottom: "5rem" }}
          >
            <div className="section-divider" style={{ marginBottom: "2rem" }} />
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(2.5rem,5vw,3.75rem)",
                fontWeight: 900,
                marginBottom: "1.5rem",
                color: "#1A1209",
              }}
            >
              This Isn&apos;t
              <br />
              <em className="gold-shimmer" style={{ fontStyle: "normal" }}>
                Just Cards
              </em>
            </h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "2rem",
                marginTop: "2rem",
              }}
            >
              {[
                "Inside jokes you can shuffle",
                "Memories you can hold onto",
                "Gifts people actually keep",
              ].map((t) => (
                <div
                  key={t}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "linear-gradient(135deg,#C9A84C,#a07830)",
                    }}
                  >
                    <svg
                      style={{ width: 16, height: 16, color: "#1A1209" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span style={{ fontWeight: 500, color: "#1A1209" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Quality */}
          <div
            className="scroll-reveal ink-section"
            style={{
              borderRadius: "1.5rem",
              padding: "clamp(3rem,5vw,4rem)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
                gap: "3rem",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#C9A84C",
                    marginBottom: "1rem",
                  }}
                >
                  Quality
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "clamp(1.75rem,3vw,2.5rem)",
                    fontWeight: 900,
                    color: "#F5EFE0",
                    marginBottom: "1.5rem",
                  }}
                >
                  Made to Be Played,
                  <br />
                  Kept, and Gifted
                </h3>
                <p
                  style={{
                    color: "rgba(245,239,224,0.5)",
                    lineHeight: 1.7,
                    marginBottom: "2rem",
                  }}
                >
                  Every Momento product is printed on premium card stock
                  designed to feel collectible, durable, and worth holding onto
                  forever.
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  {[
                    ["Premium card stock", "Thick, satisfying, built to last"],
                    ["Durable finish", "Scratch and smudge resistant coating"],
                    [
                      "High-quality print",
                      "Vibrant, true-to-life colors every time",
                    ],
                  ].map(([title, sub]) => (
                    <div
                      key={title}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        padding: "1rem",
                        borderRadius: 12,
                        background: "rgba(201,168,76,0.05)",
                        border: "1px solid rgba(201,168,76,0.1)",
                      }}
                    >
                      <span style={{ fontSize: "1.25rem", color: "#F5EFE0" }}>
                        ✦
                      </span>
                      <div>
                        <div
                          style={{
                            color: "#F5EFE0",
                            fontWeight: 600,
                            fontSize: "0.875rem",
                          }}
                        >
                          {title}
                        </div>
                        <div
                          style={{
                            color: "rgba(245,239,224,0.4)",
                            fontSize: "0.75rem",
                            marginTop: 2,
                          }}
                        >
                          {sub}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Card stack mockup */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  minHeight: 260,
                }}
              >
                <Image src={TradingCardImage6} width={1000} height={1000} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 8 — TRUST & URGENCY ═══ */}
      <section className="ink-section" style={{ padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
          <div
            className="scroll-reveal"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
              gap: "1.5rem",
              textAlign: "center",
            }}
          >
            {[
              {
                emoji: "🎯",
                title: "Made on demand",
                desc: "Each order is created just for you — no stock, no shortcuts.",
                border: false,
              },
              {
                emoji: "🔑",
                title: "Limited creator codes",
                desc: "Early access offers available for a limited time.",
                border: true,
              },
              {
                emoji: "🚀",
                title: "Order now",
                desc: "Get your cards as fast as possible — order today.",
                border: false,
              },
            ].map(({ emoji, title, desc, border }) => (
              <div
                key={title}
                style={{
                  padding: "1.5rem",
                  ...(border
                    ? {
                        borderLeft: "1px solid rgba(201,168,76,0.1)",
                        borderRight: "1px solid rgba(201,168,76,0.1)",
                      }
                    : {}),
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>
                  {emoji}
                </div>
                <div
                  style={{
                    color: "#F5EFE0",
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    color: "rgba(245,239,224,0.4)",
                    fontSize: "0.875rem",
                  }}
                >
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 9 — FINAL CTA ═══ */}
      <section
        className="texture-bg"
        style={{
          padding: "8rem 1.5rem",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#F5EFE0",
        }}
      >
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              maxWidth: "48rem",
              height: "100%",
              background:
                "radial-gradient(ellipse at center top,rgba(201,168,76,0.1) 0%,transparent 60%)",
            }}
          />
        </div>
        <div
          className="scroll-reveal"
          style={{
            position: "relative",
            maxWidth: "56rem",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div className="section-divider" style={{ marginBottom: "2.5rem" }} />
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2.5rem,6vw,4.5rem)",
              fontWeight: 900,
              marginBottom: "1.5rem",
              lineHeight: 1.1,
              color: "#1A1209",
            }}
          >
            Create Something
            <br />
            They&apos;ll Actually
            <br />
            <span className="gold-shimmer">Remember</span>
          </h2>
          <p
            style={{
              color: "#8B6B3D",
              fontSize: "1.25rem",
              fontWeight: 300,
              marginBottom: "3rem",
              maxWidth: "28rem",
              margin: "0 auto 3rem",
            }}
          >
            Fast & Easy Ordering — Customize your cards in minutes and have them
            delivered straight to your door.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.25rem",
              justifyContent: "center",
              marginBottom: "3rem",
            }}
          >
            <button
              className="btn-primary"
              style={{
                padding: "1.25rem 3rem",
                borderRadius: 9999,
                fontSize: "1.125rem",
                border: "none",
                boxShadow: "0 20px 60px rgba(201,168,76,0.3)",
              }}
            >
              Explore Cards
            </button>
            <button
              className="btn-outline"
              style={{
                padding: "1.25rem 3rem",
                borderRadius: 9999,
                fontSize: "1.125rem",
              }}
            >
              Start Creating
            </button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              fontSize: "0.875rem",
              color: "rgba(139,107,61,0.5)",
              flexWrap: "wrap",
            }}
          >
            <span>✦ No design skills needed</span>
            <span>·</span>
            <span>Starting at $29</span>
            <span>·</span>
            <span>Preview before you order</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="ink-section"
        style={{ padding: "2.5rem 1.5rem", textAlign: "center" }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display',serif",
            fontWeight: 700,
            fontSize: "1.25rem",
            color: "#C9A84C",
            marginBottom: 8,
          }}
        >
          Momento<span style={{ color: "rgba(201,168,76,0.5)" }}>.</span>
        </div>
        <p
          style={{
            color: "rgba(245,239,224,0.25)",
            fontSize: "0.75rem",
            letterSpacing: "0.05em",
          }}
        >
          © {new Date().getFullYear()} Momento. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
