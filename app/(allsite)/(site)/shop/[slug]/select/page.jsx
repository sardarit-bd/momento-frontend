"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaCheck, FaBoxOpen, FaLayerGroup, FaLock, FaStar } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

const TEMPLATES = [
  {
    id: "1",
    name: "Classic",
    description: "Traditional card layout",
    image: "/trading-cards/trading-front1.png",
  },
  {
    id: "2",
    name: "Modern",
    description: "Contemporary card design",
    image: "/trading-cards/trading-front2.png",
  },
];

export default function PackageAndTemplateSelectionPage() {
  const { slug } = useParams();
  const router = useRouter();

  // Packages now come from the backend — this is the single source of
  // truth for pricing, so the UI can never drift from what checkout charges.
  const [packages, setPackages] = useState([]);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [packagesError, setPackagesError] = useState(false);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templateSectionRef = useRef(null);
  const hasAutoScrolled = useRef(false);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoadingPackages(true);
      setPackagesError(false);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/trading-card/packages`);
        if (!res.ok) throw new Error("Failed to load packages");
        const data = await res.json();
        setPackages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setPackagesError(true);
      } finally {
        setLoadingPackages(false);
      }
    };
    fetchPackages();
  }, []);

  useEffect(() => {
    if (selectedPackage && !hasAutoScrolled.current) {
      hasAutoScrolled.current = true;
      templateSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedPackage]);

  const bothSelected = Boolean(selectedPackage && selectedTemplate);

  const handleContinue = () => {
    if (!bothSelected) return;
    // Only slugs are passed forward — price is never trusted from the
    // client. The checkout step re-resolves price server-side from
    // package_slug against the trading_card_packages table.
    router.push(
      `/application/tradingcard/${slug}?package=${selectedPackage.slug}&template=${selectedTemplate.id}`
    );
  };

  return (
    <main className="relative min-h-screen bg-[#f7f9fc] overflow-hidden px-4 sm:px-6 py-8 md:py-16 pb-40 md:pb-44">
      {/* Ambient glow, matching the rest of the site's hero/section treatment */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full opacity-60"
        style={{ background: "radial-gradient(closest-side, rgba(60,169,255,0.10), transparent)" }}
      />
      <div
        className="pointer-events-none absolute top-[30%] -right-32 w-[460px] h-[460px] rounded-full opacity-60"
        style={{ background: "radial-gradient(closest-side, rgba(60,169,255,0.08), transparent)" }}
      />

      <div className="relative max-w-6xl w-full mx-auto">

        {/* Back */}
        <div className="mb-6 md:mb-8">
          <Link
            href={`/shop/${slug}`}
            className="inline-flex items-center gap-2 bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-sky-300 transition text-sm font-medium"
          >
            <FaArrowLeft /> Back
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-block text-xs font-bold tracking-[0.2em] text-[#3CA9FF] uppercase mb-3">
            Start Designing
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-[#0b1320] tracking-tight">
            Build your deck
          </h1>
          <p className="mt-2 md:mt-3 text-slate-500 text-xs sm:text-sm md:text-base max-w-md mx-auto">
            Choose how many designs you want, then the style they're printed in.
          </p>
        </div>

        {/* ── Step 1: Package ── */}
        <section>
          <StepLabel index={1} title="Choose your package" active />

          {loadingPackages ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8 mt-5 md:mt-7">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-[26px] border border-slate-200 bg-white p-4 md:p-7 h-[120px] md:h-[420px]"
                />
              ))}
            </div>
          ) : packagesError ? (
            <div className="mt-5 md:mt-7 rounded-[26px] border border-dashed border-red-200 bg-red-50/50 py-14 flex flex-col items-center justify-center text-center px-6">
              <p className="text-sm text-red-500">
                Couldn't load packages. Please refresh the page.
              </p>
            </div>
          ) : packages.length === 0 ? (
            <div className="mt-5 md:mt-7 rounded-[26px] border border-dashed border-slate-300 bg-white/50 py-14 flex flex-col items-center justify-center text-center px-6">
              <p className="text-sm text-slate-500">
                No packages are available right now. Please try again shortly.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-5 md:mt-7">
              {packages.map((pkg, idx) => {
                const isSelected = selectedPackage?.slug === pkg.slug;
                const features = pkg.features ?? [];

                return (
                  <div
                    key={pkg.slug}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedPackage(pkg)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedPackage(pkg);
                      }
                    }}
                    className={`
                      reveal-in group relative cursor-pointer rounded-[28px] transition-all duration-300
                      hover:-translate-y-1.5
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3CA9FF] focus-visible:ring-offset-2
                      p-5 md:p-8 pt-6 md:pt-9
                      flex flex-row md:flex-col items-center md:items-stretch
                      gap-4 md:gap-0
                      ${isSelected
                        ? "shadow-[0_20px_60px_-15px_rgba(60,169,255,0.45)] ring-2 ring-[#3CA9FF]/70 md:scale-[1.02]"
                        : "shadow-[0_4px_24px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/80 hover:ring-[#3CA9FF]/40 hover:shadow-[0_20px_45px_-20px_rgba(60,169,255,0.25)]"
                      }
                    `}
                    style={{
                      animationDelay: `${idx * 90}ms`,
                      background: isSelected
                        ? "linear-gradient(180deg, #F2F9FF 0%, #FFFFFF 55%)"
                        : "linear-gradient(180deg, #FAFCFF 0%, #FFFFFF 60%)",
                    }}
                  >
                    {/* Selected check badge */}
                    <div
                      className={`hidden md:flex absolute top-5 right-5 w-8 h-8 rounded-full items-center justify-center transition-all duration-300 z-10 ${
                        isSelected ? "scale-100 opacity-100" : "scale-0 opacity-0"
                      }`}
                      style={{
                        background: "linear-gradient(135deg, #3CA9FF, #6AC0FF)",
                        boxShadow: "0 6px 16px -4px rgba(60,169,255,0.5)",
                      }}
                    >
                      <FaCheck className="text-white text-xs" />
                    </div>

                    {/* Price badge */}
                    <div
                      className={`absolute top-5 left-5 text-xs md:text-sm font-bold px-3 py-1.5 rounded-full transition-all duration-300 z-10 ${
                        isSelected ? "text-white" : "bg-[#EAF4FF] text-[#0b1320]"
                      }`}
                      style={
                        isSelected
                          ? {
                              background: "linear-gradient(135deg, #3CA9FF, #6AC0FF)",
                              boxShadow: "0 6px 16px -4px rgba(60,169,255,0.45)",
                            }
                          : undefined
                      }
                    >
                      ${Number(pkg.price).toFixed(2)}
                    </div>

                    {pkg.recommended && (
                      <div className="hidden md:flex items-center gap-1.5 absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0b1320] text-white text-[11px] font-medium px-3.5 py-1.5 rounded-full whitespace-nowrap z-20 shadow-lg shadow-black/20">
                        <FaStar className="text-[10px] text-amber-300" />
                        Recommended
                      </div>
                    )}

                    {/* Mobile selection dot */}
                    <div
                      className={`
                        md:hidden shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                        ${isSelected ? "bg-[#3CA9FF] border-[#3CA9FF]" : "border-slate-300"}
                      `}
                    >
                      {isSelected && <FaCheck className="text-white text-[10px]" />}
                    </div>

                    <div className="relative flex-1 min-w-0 md:flex-none">
                      <div className="hidden md:block">
                        <PackStack count={pkg.cardCount} active={isSelected} />
                      </div>

                      <div className="text-left md:text-center md:mt-2 flex items-center justify-between md:block">
                        <div className="flex items-center gap-2 md:block">
                          <div className="hidden md:block text-[11px] font-semibold uppercase tracking-[0.15em] text-[#3CA9FF] mb-1.5">
                            {pkg.tag}
                          </div>
                          <h2 className="text-base md:text-2xl font-bold text-[#0b1320] tracking-tight">
                            {pkg.name}
                          </h2>
                          {pkg.recommended && (
                            <span className="md:hidden text-[10px] uppercase tracking-wide bg-[#0b1320] text-white px-2 py-0.5 rounded-full">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="hidden md:block text-sm text-slate-500 mt-2 leading-relaxed">
                          {pkg.subtitle}
                        </p>
                      </div>

                      <div className="mt-1 md:mt-6 hidden md:flex flex-col gap-2.5">
                        {features.map((f, i) => (
                          <div key={i} className="flex items-center gap-2.5 text-sm text-slate-600">
                            <span
                              className={`flex items-center justify-center w-4 h-4 rounded-full shrink-0 transition-colors ${
                                isSelected ? "bg-[#3CA9FF]/15 text-[#3CA9FF]" : "bg-emerald-50 text-emerald-600"
                              }`}
                            >
                              <FaCheck className="text-[9px]" />
                            </span>
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                      <p className="md:hidden text-xs text-slate-500 mt-0.5 truncate">
                        {features.join(" · ")}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPackage(pkg);
                      }}
                      className={`
                        relative hidden md:block mt-8 w-full py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 active:scale-[0.98]
                        ${isSelected
                          ? "text-white shadow-lg shadow-[#3CA9FF]/30"
                          : "bg-[#EEF4FA] text-slate-700 group-hover:bg-slate-900 group-hover:text-white"
                        }
                      `}
                      style={
                        isSelected
                          ? { background: "linear-gradient(135deg, #3CA9FF, #2F8FE0)" }
                          : undefined
                      }
                    >
                      {isSelected ? "Selected" : "Select package"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ── Step 2: Template — locked until a package is chosen ── */}
        <section ref={templateSectionRef} className="mt-14 md:mt-20">
          <StepLabel index={2} title="Choose your template" active={Boolean(selectedPackage)} />

          {!selectedPackage && (
            <div className="mt-5 md:mt-7 rounded-[26px] border border-dashed border-slate-300 bg-white/50 py-14 flex flex-col items-center justify-center text-center px-6">
              <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                <FaLock className="text-slate-400 text-sm" />
              </div>
              <p className="text-sm text-slate-500">
                Pick a package above to unlock template options
              </p>
            </div>
          )}

          <div
            className={`grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none ${
              selectedPackage ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto mt-5 md:mt-7">
                {TEMPLATES.map((tpl) => {
                  const isSelected = selectedTemplate?.id === tpl.id;
                  return (
                    <div
                      key={tpl.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedTemplate(tpl)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedTemplate(tpl);
                        }
                      }}
                      className={`template-card group bg-white rounded-[26px] border p-6 md:p-8 flex flex-col items-center cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3CA9FF] focus-visible:ring-offset-2 ${
                        isSelected
                          ? "border-[#3CA9FF] shadow-xl shadow-[#3CA9FF]/10"
                          : "border-slate-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
                      }`}
                    >
                      <div className="relative w-full aspect-3/4 mb-5">
                        {/* Soft contact shadow beneath the card, like it's resting on a table */}
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[70%] h-6 rounded-full bg-black/10 blur-lg" />
                        <div className="template-card-art relative w-full h-full rounded-xl overflow-hidden bg-slate-50 transition-transform duration-500 ease-out">
                          <Image
                            src={tpl.image}
                            alt={tpl.name}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      </div>

                      <h2 className="text-2xl md:text-[28px] font-semibold text-[#091124] mb-1 tracking-tight">
                        {tpl.name}
                      </h2>
                      <p className="text-[#5e6d82] text-xs md:text-sm font-medium tracking-wide mb-5">
                        {tpl.description}
                      </p>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTemplate(tpl);
                        }}
                        className={`w-full text-[13px] md:text-sm font-medium py-3 px-6 rounded-[10px] transition-all duration-200 active:scale-[0.98] tracking-wide ${
                          isSelected
                            ? "bg-emerald-600 text-white hover:bg-emerald-700"
                            : "bg-[#0d1527] text-white hover:bg-[#1e293b]"
                        }`}
                      >
                        {isSelected ? "\u2713 Selected" : "Select Template"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Sticky build-ticket bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-slate-200 px-4 md:px-8 py-3 md:py-4 shadow-[0_-8px_30px_rgba(11,19,32,0.06)]">
        <div className="max-w-6xl mx-auto flex items-center gap-3 md:gap-6">
          <div className="flex-1 flex items-center gap-3 md:gap-6 min-w-0">
            <BuildSlot
              icon={<FaBoxOpen />}
              label="Package"
              value={
                selectedPackage
                  ? `${selectedPackage.name} – $${Number(selectedPackage.price).toFixed(2)}`
                  : null
              }
            />
            <div className="w-px h-8 bg-slate-200 shrink-0" />
            <BuildSlot icon={<FaLayerGroup />} label="Template" value={selectedTemplate?.name} />
          </div>

          <button
            onClick={handleContinue}
            disabled={!bothSelected}
            className={`
              relative shrink-0 px-5 md:px-10 py-3 rounded-xl font-medium transition whitespace-nowrap text-sm md:text-base
              ${bothSelected
                ? "bg-[#0b1320] text-white hover:opacity-90 ready-pulse"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }
            `}
          >
            <span className="hidden sm:inline">Continue to Design</span>
            <span className="sm:hidden">Continue</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .reveal-in {
          opacity: 0;
          animation: revealIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes revealIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .template-card:hover .template-card-art,
        .template-card:focus-visible .template-card-art {
          transform: translateY(-4px) rotate(-1deg) scale(1.02);
        }

        .ready-pulse {
          box-shadow: 0 0 0 0 rgba(60, 169, 255, 0.45);
          animation: readyPulse 1.8s ease-out 1;
        }
        @keyframes readyPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(60, 169, 255, 0.45);
          }
          100% {
            box-shadow: 0 0 0 14px rgba(60, 169, 255, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal-in {
            animation: none;
            opacity: 1;
          }
          .template-card-art {
            transition: none !important;
          }
          .ready-pulse {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}

function PackStack({ count, active }) {
  const config = count >= 6
    ? { spread: 8, rotate: 6, size: "w-9 h-13" }
    : count === 3
    ? { spread: 13, rotate: 9, size: "w-11 h-16" }
    : { spread: 0, rotate: 0, size: "w-12 h-[4.5rem]" };

  const mid = (count - 1) / 2;

  return (
    <div className="relative h-24 flex items-center justify-center mb-3">
      {Array.from({ length: count }).map((_, i) => {
        const offset = i - mid;
        return (
          <div
            key={i}
            className={`absolute ${config.size} rounded-md border transition-all duration-500 ease-out ${
              active ? "border-white/70" : "border-white/50"
            }`}
            style={{
              transform: `translateX(${offset * config.spread}px) rotate(${offset * config.rotate}deg)`,
              background: active
                ? "linear-gradient(160deg, #3CA9FF 0%, #6AC0FF 100%)"
                : "linear-gradient(160deg, #D9EEFD 0%, #EBF6FF 100%)",
              boxShadow: active
                ? "0 10px 20px -6px rgba(60,169,255,0.45)"
                : "0 4px 10px -4px rgba(60,169,255,0.18)",
              zIndex: i,
            }}
          />
        );
      })}
    </div>
  );
}

function StepLabel({ index, title, active }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-colors duration-300 ${
          active ? "bg-[#3CA9FF] text-white" : "bg-slate-200 text-slate-400"
        }`}
      >
        {index}
      </div>
      <h3
        className={`text-lg md:text-xl font-semibold transition-colors duration-300 ${
          active ? "text-[#0b1320]" : "text-slate-400"
        }`}
      >
        {title}
      </h3>
    </div>
  );
}

function BuildSlot({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2 md:gap-3 min-w-0">
      <div
        className={`w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center text-sm shrink-0 transition-colors duration-300 ${
          value ? "bg-[#EBF6FF] text-[#3CA9FF]" : "bg-slate-100 text-slate-300"
        }`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] md:text-xs uppercase tracking-wide text-slate-400 leading-none mb-1">
          {label}
        </p>
        <p
          className={`text-xs md:text-sm font-medium truncate leading-none ${
            value ? "text-[#0b1320]" : "text-slate-300"
          }`}
        >
          {value || "Not selected"}
        </p>
      </div>
    </div>
  );
}