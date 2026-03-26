'use client'


import { useEffect } from "react";

export default function MomentoLanding() {
    useEffect(() => {
        // Inject Google Fonts
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
            { threshold: 0.12 }
        );
        const revealEls = document.querySelectorAll(".scroll-reveal");
        revealEls.forEach((el) => observer.observe(el));

        return () => {
            observer.disconnect();
            document.getElementById("momento-styles")?.remove();
        };
    }, []);

    return (
        <div className="momento-root">
            <div className="grain" />

            {/* ═══ SECTION 1 — HERO ═══ */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden texture-bg" style={{ backgroundColor: "#F5EFE0" }}>
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-16 right-8 md:right-20 w-72 h-72 rounded-full" style={{ background: "radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)" }} />
                    <div className="absolute bottom-20 left-0 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)" }} />
                    <div className="deco-card animate-float hidden lg:block" style={{ width: 120, height: 170, top: "15%", right: "5%", transform: "rotate(12deg)", opacity: 0.5 }} />
                    <div className="deco-card animate-float-delay hidden lg:block" style={{ width: 90, height: 128, top: "55%", right: "12%", transform: "rotate(-8deg)", opacity: 0.35 }} />
                    <div className="deco-card animate-float-delay2 hidden lg:block" style={{ width: 100, height: 142, top: "30%", right: "18%", transform: "rotate(3deg)", opacity: 0.4 }} />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
                    {/* LEFT */}
                    <div className="scroll-reveal" style={{ transitionDelay: "0.1s" }}>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-8" style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)", color: "#C9A84C" }}>
                            ✦ Premium Personalized Cards
                        </div>
                        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.8rem,6vw,4.5rem)", fontWeight: 900, lineHeight: 1.05, marginBottom: "1.5rem" }}>
                            Turn Your<br />
                            <span className="gold-shimmer">Favorite People</span><br />
                            Into Playable<br />
                            Cards
                        </h1>
                        <p style={{ fontSize: "1.125rem", color: "#8B6B3D", lineHeight: 1.7, marginBottom: "0.75rem", fontWeight: 300, maxWidth: "32rem" }}>
                            Create personalized card experiences for game nights, milestones, and unforgettable gifts — all in just a few minutes.
                        </p>
                        <p style={{ fontSize: "0.875rem", color: "rgba(139,107,61,0.7)", marginBottom: "2rem", fontWeight: 500 }}>
                            Perfect for birthdays, graduations, holidays, couples, and friends.
                        </p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
                            <button className="btn-primary" style={{ padding: "1rem 2rem", borderRadius: "9999px", fontSize: "1rem", border: "none" }}>Create Your Deck</button>
                            <button className="btn-outline" style={{ padding: "1rem 2rem", borderRadius: "9999px", fontSize: "1rem" }}>Create a Momento</button>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", color: "rgba(139,107,61,0.6)", marginBottom: "2rem", fontWeight: 500, letterSpacing: "0.05em" }}>
                            <span>✦ No design skills needed</span>
                            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(139,107,61,0.3)", display: "inline-block" }} />
                            <span>✦ Preview before you order</span>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(201,168,76,0.2)" }}>
                            {["Easy to create", "Premium quality", "Made to be shared"].map((t) => (
                                <div key={t} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", fontWeight: 500, color: "#1A1209" }}>
                                    <span style={{ color: "#C9A84C", fontSize: "1rem" }}>◈</span> {t}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — Card stack */}
                    <div className="scroll-reveal" style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", height: 500, transitionDelay: "0.3s" }}>
                        {/* back cards */}
                        <div className="card-float animate-float-delay" style={{ position: "absolute", width: 200, height: 285, borderRadius: 16, background: "linear-gradient(145deg,#e8c96a,#c9a84c)", border: "1.5px solid rgba(201,168,76,0.6)", top: "50%", left: "50%", transform: "translate(-58%,-48%) rotate(-14deg)", zIndex: 2, padding: 16, display: "flex", flexDirection: "column" }}>
                            <div style={{ width: "100%", height: 140, borderRadius: 12, marginBottom: 12, background: "rgba(255,255,255,0.15)" }} />
                            <div style={{ height: 8, borderRadius: 9999, background: "rgba(255,255,255,0.3)", marginBottom: 8, width: "75%" }} />
                            <div style={{ height: 8, borderRadius: 9999, background: "rgba(255,255,255,0.2)", width: "50%" }} />
                        </div>
                        <div className="card-float animate-float-delay2" style={{ position: "absolute", width: 200, height: 285, borderRadius: 16, background: "linear-gradient(145deg,#2d2010,#1a1209)", border: "1px solid rgba(201,168,76,0.3)", top: "50%", left: "50%", transform: "translate(-40%,-52%) rotate(8deg)", zIndex: 1, padding: 16, display: "flex", flexDirection: "column" }}>
                            <div style={{ width: "100%", height: 140, borderRadius: 12, marginBottom: 12, background: "rgba(201,168,76,0.1)" }} />
                            <div style={{ height: 8, borderRadius: 9999, background: "rgba(201,168,76,0.3)", marginBottom: 8, width: "75%" }} />
                            <div style={{ height: 8, borderRadius: 9999, background: "rgba(201,168,76,0.2)", width: "50%" }} />
                        </div>
                        {/* main card */}
                        <div className="card-float animate-float" style={{ position: "absolute", width: 200, height: 285, borderRadius: 16, background: "linear-gradient(145deg,#fff9ee,#f0e0b8)", border: "1.5px solid rgba(201,168,76,0.5)", top: "50%", left: "50%", transform: "translate(-50%,-50%) rotate(-4deg)", zIndex: 3, padding: 16, display: "flex", flexDirection: "column" }}>
                            <div style={{ width: "100%", height: 140, borderRadius: 12, marginBottom: 12, background: "linear-gradient(135deg,#d4a843,#8b6b3d)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>😄</div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ height: 10, borderRadius: 9999, background: "rgba(201,168,76,0.4)", marginBottom: 8, width: "75%" }} />
                                <div style={{ height: 8, borderRadius: 9999, background: "rgba(201,168,76,0.2)", marginBottom: 4, width: "100%" }} />
                                <div style={{ height: 8, borderRadius: 9999, background: "rgba(201,168,76,0.2)", marginBottom: 12, width: "66%" }} />
                                <div style={{ display: "flex", gap: 4 }}>
                                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(201,168,76,0.3)" }} />
                                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(212,136,10,0.2)" }} />
                                </div>
                            </div>
                        </div>


                        <div className="card-float animate-float" style={{ position: "absolute", width: 200, height: 285, borderRadius: 16, background: "linear-gradient(145deg,#fff9ee,#f0e0b8)", border: "1.5px solid rgba(201,168,76,0.5)", top: "50%", left: "50%", transform: "translate(-50%,-50%) rotate(-6deg)", zIndex: 3, padding: 16, display: "flex", flexDirection: "column" }}>
                            <div style={{ width: "100%", height: 140, borderRadius: 12, marginBottom: 12, background: "linear-gradient(135deg,#d4a843,#8b6b3d)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>😄</div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ height: 10, borderRadius: 9999, background: "rgba(201,168,76,0.4)", marginBottom: 8, width: "75%" }} />
                                <div style={{ height: 8, borderRadius: 9999, background: "rgba(201,168,76,0.2)", marginBottom: 4, width: "100%" }} />
                                <div style={{ height: 8, borderRadius: 9999, background: "rgba(201,168,76,0.2)", marginBottom: 12, width: "66%" }} />
                                <div style={{ display: "flex", gap: 4 }}>
                                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(201,168,76,0.3)" }} />
                                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(212,136,10,0.2)" }} />
                                </div>
                            </div>
                        </div>

                        {/* price badge */}
                        <div style={{ position: "absolute", bottom: 48, right: 0, padding: "12px 20px", borderRadius: 16, background: "#1A1209", border: "1px solid rgba(201,168,76,0.3)", boxShadow: "0 8px 30px rgba(0,0,0,0.3)", zIndex: 10 }}>
                            <div style={{ fontSize: "0.65rem", color: "rgba(201,168,76,0.7)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>Starting at</div>
                            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.75rem", fontWeight: 700, color: "#C9A84C" }}>$29</div>
                            <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", marginTop: 2 }}>Real people. Real reactions.</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ MARQUEE STRIP ═══ */}
            <div style={{ padding: "1rem 0", overflow: "hidden", background: "#1A1209", borderTop: "1px solid rgba(201,168,76,0.15)", borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
                <div style={{ overflow: "hidden" }}>
                    <div className="marquee-track" style={{ color: "rgba(201,168,76,0.5)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        {["✦ Fully Personalized", "✦ Game Nights", "✦ Premium Print", "✦ Couples & Families", "✦ Birthdays", "✦ Graduations", "✦ Holidays", "✦ Gifting", "✦ Fully Personalized", "✦ Game Nights", "✦ Premium Print", "✦ Couples & Families", "✦ Birthdays", "✦ Graduations", "✦ Holidays", "✦ Gifting"].map((t, i) => (
                            <span key={i}>{t}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* ═══ SECTION 2 — TWO WAYS ═══ */}
            <section className="texture-bg" style={{ padding: "7rem 1.5rem", backgroundColor: "#F5EFE0" }}>
                <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
                    <div className="scroll-reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
                        <div className="section-divider" style={{ marginBottom: "2rem" }} />
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, marginBottom: "1rem", color: "#1A1209" }}>Two Ways to Create<br />Your Cards</h2>
                        <p style={{ color: "#8B6B3D", fontSize: "1.125rem", fontWeight: 300 }}>Whether you want to play or preserve a moment — there's a format for you.</p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "2rem" }}>
                        {/* Portrait Deck */}
                        <div className="scroll-reveal card-ui hover-lift" style={{ borderRadius: "1.5rem", padding: "2.5rem", position: "relative", overflow: "hidden", cursor: "pointer" }}>
                            <div style={{ position: "absolute", top: 0, right: 0, width: 192, height: 192, borderRadius: "50%", background: "radial-gradient(circle,#C9A84C,transparent)", opacity: 0.2, transform: "translate(30%,-30%)" }} />
                            <div style={{ position: "relative" }}>
                                <div style={{ width: 56, height: 56, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem", background: "linear-gradient(135deg,#C9A84C,#8b6b3d)", fontSize: "1.5rem" }}>🃏</div>
                                <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A84C", marginBottom: 8 }}>Portrait Deck</div>
                                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.75rem", fontWeight: 900, marginBottom: "1rem", color: "#1A1209" }}>Playable &amp;<br />Personal</h3>
                                <p style={{ color: "#8B6B3D", lineHeight: 1.7, marginBottom: "2rem" }}>A full playable card deck built from your people — designed for game nights and replay value.</p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
                                    {["Game Nights", "Friends", "Couples", "Family"].map(tag => (
                                        <span key={tag} style={{ padding: "4px 12px", borderRadius: 9999, fontSize: "0.75rem", fontWeight: 500, background: "rgba(26,18,9,0.06)", color: "rgba(26,18,9,0.6)" }}>{tag}</span>
                                    ))}
                                </div>
                                <button className="btn-primary" style={{ padding: "0.75rem 1.75rem", borderRadius: 9999, fontSize: "0.875rem", border: "none", width: "100%" }}>Start Your Deck →</button>
                            </div>
                        </div>
                        {/* Momento Cards */}
                        <div className="scroll-reveal ink-section hover-lift" style={{ borderRadius: "1.5rem", padding: "2.5rem", position: "relative", overflow: "hidden", cursor: "pointer", transitionDelay: "0.15s" }}>
                            <div style={{ position: "absolute", top: 0, right: 0, width: 192, height: 192, borderRadius: "50%", background: "radial-gradient(circle,#C9A84C,transparent)", opacity: 0.1, transform: "translate(30%,-30%)" }} />
                            <div style={{ position: "relative" }}>
                                <div style={{ width: 56, height: 56, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem", background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)", fontSize: "1.5rem" }}>✨</div>
                                <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A84C", marginBottom: 8 }}>Momento Cards</div>
                                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.75rem", fontWeight: 900, marginBottom: "1rem", color: "#F5EFE0" }}>Collectible &amp;<br />Giftable</h3>
                                <p style={{ color: "rgba(245,239,224,0.6)", lineHeight: 1.7, marginBottom: "2rem" }}>Turn real moments into collectible cards — perfect for gifting or keeping forever.</p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
                                    {["Birthdays", "Milestones", "Gifts"].map(tag => (
                                        <span key={tag} style={{ padding: "4px 12px", borderRadius: 9999, fontSize: "0.75rem", fontWeight: 500, color: "rgba(201,168,76,0.6)", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)" }}>{tag}</span>
                                    ))}
                                </div>
                                <button className="btn-outline" style={{ padding: "0.75rem 1.75rem", borderRadius: 9999, fontSize: "0.875rem", width: "100%" }}>Create a Momento →</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ SECTION 3 — HOW IT WORKS ═══ */}
            <section id="how" className="ink-section" style={{ padding: "7rem 1.5rem" }}>
                <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
                    <div className="scroll-reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
                        <div className="section-divider" style={{ marginBottom: "2rem" }} />
                        <p style={{ color: "#C9A84C", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Takes less than 2 minutes</p>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, color: "#F5EFE0" }}>Create Yours<br />in Minutes</h2>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "2rem", marginBottom: "3.5rem" }}>
                        {[
                            { n: "01", icon: <svg style={{ width: 20, height: 20, color: "#1A1209" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M4 6h16M4 12h8m-8 6h16" /></svg>, title: "Choose your format", desc: "Pick between a full Portrait Deck or individual Momento Cards — whatever fits the moment." },
                            { n: "02", icon: <svg style={{ width: 20, height: 20, color: "#1A1209" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-9 9H5v-3l9-9z" /></svg>, title: "Customize your cards", desc: "Upload photos, add names, and personalize every card exactly the way you want it." },
                            { n: "03", icon: <svg style={{ width: 20, height: 20, color: "#1A1209" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>, title: "Preview and order", desc: "See exactly how it looks before you place the order. Then sit back — we handle the rest." },
                        ].map(({ n, icon, title, desc }, i) => (
                            <div key={n} className="scroll-reveal" style={{ position: "relative", transitionDelay: `${i * 0.15}s` }}>
                                <div className="step-num" style={{ position: "absolute", top: -16, left: -8, pointerEvents: "none", userSelect: "none" }}>{n}</div>
                                <div className="card-ui" style={{ borderRadius: "1rem", padding: "2rem", position: "relative", zIndex: 10 }}>
                                    <div style={{ width: 48, height: 48, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem", background: "linear-gradient(135deg,#C9A84C,#a07830)" }}>{icon}</div>
                                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "#1A1209" }}>{title}</h3>
                                    <p style={{ color: "#8B6B3D", fontSize: "0.875rem", lineHeight: 1.7 }}>{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="scroll-reveal" style={{ textAlign: "center" }}>
                        <button className="btn-primary" style={{ padding: "1rem 2.5rem", borderRadius: 9999, fontSize: "1rem", border: "none" }}>Start Creating Now →</button>
                    </div>
                </div>
            </section>

            {/* ═══ SECTION 4 — PRICING ═══ */}
            <section id="products" className="texture-bg" style={{ padding: "7rem 1.5rem", backgroundColor: "#F5EFE0" }}>
                <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
                    <div className="scroll-reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
                        <div className="section-divider" style={{ marginBottom: "2rem" }} />
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, color: "#1A1209" }}>Pick the Experience<br />That Fits Your Moment</h2>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "2.5rem" }}>
                        {/* Portrait Deck */}
                        <div className="scroll-reveal price-card" style={{ borderRadius: "1.5rem", padding: "2.5rem", display: "flex", flexDirection: "column" }}>
                            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "2rem" }}>
                                <div>
                                    <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(201,168,76,0.6)", marginBottom: 8 }}>Portrait Deck</div>
                                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.75rem", fontWeight: 900, color: "#F5EFE0" }}>Playable Deck</h3>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.25rem", fontWeight: 900, color: "#C9A84C" }}>$59</div>
                                    <div style={{ fontSize: "0.7rem", color: "rgba(245,239,224,0.3)", marginTop: 4 }}>Full deck</div>
                                </div>
                            </div>
                            {/* Card spread visual */}
                            <div style={{ position: "relative", height: 160, marginBottom: "2rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                {[{ r: -15, tx: -50, ty: 5, o: 1 }, { r: -7, tx: -20, ty: 2, o: 1 }, { r: 0, tx: 0, ty: 0, o: 0 }, { r: 7, tx: 20, ty: 2, o: 1 }, { r: 15, tx: 50, ty: 5, o: 1 }].map((c, i) => (
                                    <div key={i} style={{ position: "absolute", width: 112, height: 160, borderRadius: 12, background: i === 2 ? "linear-gradient(145deg,#fff9ee,#f0e0b8)" : "linear-gradient(145deg,#2d2010,#3d2e12)", border: i === 2 ? "1.5px solid rgba(201,168,76,0.5)" : "1px solid rgba(201,168,76,0.3)", transform: `rotate(${c.r}deg) translate(${c.tx}px,${c.ty}px)`, zIndex: i === 2 ? 3 : i, padding: i === 2 ? 12 : 0, display: "flex", flexDirection: "column" }}>
                                        {i === 2 && <><div style={{ width: "100%", flex: 1, borderRadius: 8, marginBottom: 8, background: "linear-gradient(135deg,#d4a843,#8b6b3d)" }} /><div style={{ height: 6, borderRadius: 9999, background: "rgba(201,168,76,0.4)", marginBottom: 6, width: "75%" }} /><div style={{ height: 6, borderRadius: 9999, background: "rgba(201,168,76,0.2)", width: "50%" }} /></>}
                                    </div>
                                ))}
                            </div>
                            <p style={{ color: "rgba(245,239,224,0.6)", lineHeight: 1.7, marginBottom: "1.5rem" }}>Turn your friends, family, or partner into a full playable deck — where every card feels personal.</p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
                                {["🎮 Game Nights", "👫 Couples", "👨‍👩‍👧 Family", "🎉 Friends"].map(tag => (
                                    <span key={tag} style={{ padding: "4px 12px", borderRadius: 9999, fontSize: "0.75rem", fontWeight: 500, color: "rgba(201,168,76,0.6)", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)" }}>{tag}</span>
                                ))}
                            </div>
                            <button className="btn-primary" style={{ padding: "1rem 2rem", borderRadius: 9999, fontSize: "0.875rem", border: "none", marginTop: "auto" }}>Create Your Deck →</button>
                        </div>

                        {/* Momento Cards */}
                        <div className="scroll-reveal" style={{ display: "flex", flexDirection: "column", gap: "1rem", transitionDelay: "0.15s" }}>
                            <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(201,168,76,0.6)", padding: "0 0.5rem", marginBottom: 8 }}>Momento Cards</div>
                            {[
                                { emoji: "🎴", title: "Momento Single", desc: "One custom moment • Perfect for a simple gift", price: "$29", badge: null, featured: false },
                                { emoji: "🎁", title: "Momento Trio", desc: "Three meaningful moments • Great for storytelling", price: "$49", badge: "⭐ Most Popular", featured: true },
                                { emoji: "📦", title: "Momento Collection", desc: "Six custom moments • Only $13 per moment", price: "$79", badge: "🔥 Best Value", featured: false, sub: "Includes full printed card set" },
                            ].map(({ emoji, title, desc, price, badge, featured, sub }) => (
                                <div key={title} className={`price-card${featured ? " featured" : ""}`} style={{ borderRadius: "1rem", padding: "1.5rem", display: "flex", alignItems: "center", gap: "1.25rem", position: "relative", overflow: "hidden" }}>
                                    {badge && <div style={{ position: "absolute", top: 12, right: 12, padding: "4px 10px", borderRadius: 9999, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.05em", ...(featured ? { background: "linear-gradient(135deg,#C9A84C,#E8C96A)", color: "#1A1209" } : { background: "rgba(201,168,76,0.2)", border: "1px solid rgba(201,168,76,0.3)", color: "#F5EFE0" }) }}>{badge}</div>}
                                    <div style={{ width: 48, height: 48, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "1.25rem", background: featured ? "rgba(201,168,76,0.12)" : "rgba(201,168,76,0.08)", border: featured ? "1px solid rgba(201,168,76,0.3)" : "1px solid rgba(201,168,76,0.2)" }}>{emoji}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, color: "#F5EFE0", fontSize: "1.125rem" }}>{title}</div>
                                        <div style={{ color: "rgba(245,239,224,0.4)", fontSize: "0.75rem", marginTop: 2 }}>{desc}</div>
                                        {sub && <div style={{ color: "rgba(201,168,76,0.5)", fontSize: "0.7rem", marginTop: 4 }}>{sub}</div>}
                                    </div>
                                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 900, color: "#C9A84C", flexShrink: 0 }}>{price}</div>
                                </div>
                            ))}
                            <button className="btn-primary" style={{ padding: "1rem 2rem", borderRadius: 9999, fontSize: "0.875rem", border: "none", marginTop: 8 }}>Create Your Momento →</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ SECTION 5 — USE CASES ═══ */}
            <section className="ink-section" style={{ padding: "7rem 1.5rem" }}>
                <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
                    <div className="scroll-reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
                        <div className="section-divider" style={{ marginBottom: "2rem" }} />
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, color: "#F5EFE0", marginBottom: "1rem" }}>Made for<br />Real Moments</h2>
                        <p style={{ color: "rgba(245,239,224,0.5)", fontWeight: 300, fontSize: "1.125rem" }}>However you use it, it gets personal fast.</p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "2rem", marginBottom: "3rem" }}>
                        {[
                            { emoji: "🎮", title: "Fun & Connection", tags: ["🃏 Game Nights", "💑 Couples", "👨‍👩‍👧 Family"], desc: "Bring people together around the table with cards that feel like inside jokes in physical form.", delay: "0s" },
                            { emoji: "🎁", title: "Milestones & Gifts", tags: ["🎓 Graduation", "🎂 Birthdays", "🎄 Holidays"], desc: "Give something that actually means something — a gift they'll hold onto and talk about for years.", delay: "0.15s" },
                        ].map(({ emoji, title, tags, desc, delay }) => (
                            <div key={title} className="scroll-reveal card-ui" style={{ borderRadius: "1.5rem", padding: "2.5rem", position: "relative", overflow: "hidden", transitionDelay: delay }}>
                                <div style={{ position: "absolute", inset: 0, opacity: 0.05, background: "radial-gradient(ellipse at top right,#C9A84C,transparent)" }} />
                                <div style={{ position: "relative" }}>
                                    <div style={{ fontSize: "2.5rem", marginBottom: "1.25rem" }}>{emoji}</div>
                                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 900, color: "#1A1209", marginBottom: "1rem" }}>{title}</h3>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.25rem" }}>
                                        {tags.map(t => <span key={t} style={{ padding: "8px 16px", borderRadius: 9999, fontSize: "0.875rem", fontWeight: 500, background: "rgba(26,18,9,0.06)", color: "rgba(26,18,9,0.6)" }}>{t}</span>)}
                                    </div>
                                    <p style={{ color: "#8B6B3D", fontSize: "0.875rem", lineHeight: 1.7 }}>{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="scroll-reveal" style={{ textAlign: "center" }}>
                        <button className="btn-outline" style={{ padding: "1rem 2.5rem", borderRadius: 9999, fontSize: "1rem" }}>Create Yours →</button>
                    </div>
                </div>
            </section>

            {/* ═══ SECTION 6 & 7 — VALUE + QUALITY ═══ */}
            <section className="texture-bg" style={{ padding: "7rem 1.5rem", backgroundColor: "#F5EFE0" }}>
                <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
                    {/* Value */}
                    <div className="scroll-reveal" style={{ textAlign: "center", marginBottom: "5rem" }}>
                        <div className="section-divider" style={{ marginBottom: "2rem" }} />
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem,5vw,3.75rem)", fontWeight: 900, marginBottom: "1.5rem", color: "#1A1209" }}>
                            This Isn't<br /><em className="gold-shimmer" style={{ fontStyle: "normal" }}>Just Cards</em>
                        </h2>
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem", marginTop: "2rem" }}>
                            {["Fully personalized", "Made to be shared", "Built for real moments"].map(t => (
                                <div key={t} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                    <div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#C9A84C,#a07830)" }}>
                                        <svg style={{ width: 16, height: 16, color: "#1A1209" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                    </div>
                                    <span style={{ fontWeight: 500, color: "#1A1209" }}>{t}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Quality */}
                    <div className="scroll-reveal ink-section" style={{ borderRadius: "1.5rem", padding: "clamp(3rem,5vw,4rem)" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "3rem", alignItems: "center" }}>
                            <div>
                                <div style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "1rem" }}>Quality</div>
                                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.75rem,3vw,2.5rem)", fontWeight: 900, color: "#F5EFE0", marginBottom: "1.5rem" }}>Made to Be Played,<br />Kept, and Gifted</h3>
                                <p style={{ color: "rgba(245,239,224,0.5)", lineHeight: 1.7, marginBottom: "2rem" }}>Every deck and card is printed on premium stock built to last — whether it's being shuffled on a game night or kept as a keepsake forever.</p>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    {[["Premium card stock", "Thick, satisfying, built to last"], ["Durable finish", "Scratch and smudge resistant coating"], ["High-quality print", "Vibrant, true-to-life colors every time"]].map(([title, sub]) => (
                                        <div key={title} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", borderRadius: 12, background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.1)" }}>
                                            <span style={{ fontSize: "1.25rem" }}>✦</span>
                                            <div>
                                                <div style={{ color: "#F5EFE0", fontWeight: 600, fontSize: "0.875rem" }}>{title}</div>
                                                <div style={{ color: "rgba(245,239,224,0.4)", fontSize: "0.75rem", marginTop: 2 }}>{sub}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Card stack mockup */}
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", minHeight: 260 }}>
                                <div style={{ position: "relative", width: 208 }}>
                                    <div style={{ position: "absolute", width: "100%", height: 256, borderRadius: 16, background: "linear-gradient(145deg,#2d2010,#1a1209)", border: "1px solid rgba(201,168,76,0.2)", transform: "rotate(8deg) translate(16px,-8px)" }} />
                                    <div style={{ position: "absolute", width: "100%", height: 256, borderRadius: 16, background: "linear-gradient(145deg,#3d2e12,#2d2010)", border: "1px solid rgba(201,168,76,0.25)", transform: "rotate(4deg) translate(8px,-4px)" }} />
                                    <div style={{ position: "relative", width: "100%", height: 256, borderRadius: 16, display: "flex", flexDirection: "column", padding: 20, background: "linear-gradient(145deg,#fff9ee,#f0e0b8)", border: "1.5px solid rgba(201,168,76,0.5)", boxShadow: "0 20px 50px rgba(26,18,9,0.3)" }}>
                                        <div style={{ width: "100%", flex: 1, borderRadius: 12, marginBottom: 12, background: "linear-gradient(135deg,#d4a843,#8b6b3d)" }} />
                                        <div style={{ height: 8, borderRadius: 9999, background: "rgba(201,168,76,0.4)", marginBottom: 6, width: "75%" }} />
                                        <div style={{ height: 8, borderRadius: 9999, background: "rgba(201,168,76,0.2)", width: "50%" }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ SECTION 8 — TRUST & URGENCY ═══ */}
            <section className="ink-section" style={{ padding: "4rem 1.5rem" }}>
                <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
                    <div className="scroll-reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "1.5rem", textAlign: "center" }}>
                        {[
                            { emoji: "🎯", title: "Made on demand", desc: "Each order is created just for you — no stock, no shortcuts.", border: false },
                            { emoji: "🔑", title: "Limited creator codes", desc: "Early access offers available for a limited time.", border: true },
                            { emoji: "🚀", title: "Order now", desc: "Get your cards as fast as possible — order today.", border: false },
                        ].map(({ emoji, title, desc, border }) => (
                            <div key={title} style={{ padding: "1.5rem", ...(border ? { borderLeft: "1px solid rgba(201,168,76,0.1)", borderRight: "1px solid rgba(201,168,76,0.1)" } : {}) }}>
                                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{emoji}</div>
                                <div style={{ color: "#F5EFE0", fontWeight: 600, marginBottom: 4 }}>{title}</div>
                                <div style={{ color: "rgba(245,239,224,0.4)", fontSize: "0.875rem" }}>{desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ SECTION 9 — FINAL CTA ═══ */}
            <section className="texture-bg" style={{ padding: "8rem 1.5rem", position: "relative", overflow: "hidden", backgroundColor: "#F5EFE0" }}>
                <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                    <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: "48rem", height: "100%", background: "radial-gradient(ellipse at center top,rgba(201,168,76,0.1) 0%,transparent 60%)" }} />
                </div>
                <div className="scroll-reveal" style={{ position: "relative", maxWidth: "56rem", margin: "0 auto", textAlign: "center" }}>
                    <div className="section-divider" style={{ marginBottom: "2.5rem" }} />
                    <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: 900, marginBottom: "1.5rem", lineHeight: 1.1, color: "#1A1209" }}>
                        Create Something<br />They'll Actually<br />
                        <span className="gold-shimmer">Remember</span>
                    </h2>
                    <p style={{ color: "#8B6B3D", fontSize: "1.25rem", fontWeight: 300, marginBottom: "3rem", maxWidth: "28rem", margin: "0 auto 3rem" }}>Real people. Real moments. Real reactions.</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", justifyContent: "center", marginBottom: "3rem" }}>
                        <button className="btn-primary" style={{ padding: "1.25rem 3rem", borderRadius: 9999, fontSize: "1.125rem", border: "none", boxShadow: "0 20px 60px rgba(201,168,76,0.3)" }}>Create Your Deck</button>
                        <button className="btn-outline" style={{ padding: "1.25rem 3rem", borderRadius: 9999, fontSize: "1.125rem" }}>Create Your Momento</button>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", fontSize: "0.875rem", color: "rgba(139,107,61,0.5)", flexWrap: "wrap" }}>
                        <span>✦ No design skills needed</span>
                        <span>·</span>
                        <span>Starting at $29</span>
                        <span>·</span>
                        <span>Preview before you order</span>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="ink-section" style={{ padding: "2.5rem 1.5rem", textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.25rem", color: "#C9A84C", marginBottom: 8 }}>Momento<span style={{ color: "rgba(201,168,76,0.5)" }}>.</span></div>
                <p style={{ color: "rgba(245,239,224,0.25)", fontSize: "0.75rem", letterSpacing: "0.05em" }}>© 2025 Momento. All rights reserved.</p>
            </footer>
        </div>
    );
}