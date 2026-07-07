"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft, FaCheck, FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { Fraunces, Inter } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Brand palette — same tokens as the package selection page
const BRAND = "#3CA9FF";
const BRAND_DARK = "#1C8CE0";
const BRAND_TINT = "#EAF6FF";

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

// Display info for the package chip in the header — the page only gets the
// slug back from the URL, so map it to what the package page already shows.
const PACKAGE_INFO = {
  single: { name: "Single", subtitle: "1 design · 18 copies" },
  trio: { name: "Trio", subtitle: "3 designs · 6 each" },
  collection: { name: "Collection", subtitle: "6 designs · 3 each" },
};

export default function TemplateSelectionPage() {
  const { slug } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPackage = searchParams.get("package") || "single";
  const packageInfo = PACKAGE_INFO[selectedPackage] || PACKAGE_INFO.single;
  const [selected, setSelected] = useState(null);

  const handleContinue = () => {
    if (!selected) return;
    router.push(
      `/application/tradingcard/${slug}?package=${selectedPackage}&template=${selected.id}`
    );
  };

  return (
    <main
      className={`${inter.className} bg-[#F7F9FC] min-h-screen flex flex-col items-center px-4 py-8 md:py-14 select-none`}
    >
      <style jsx global>{`
        .btn-sheen {
          position: relative;
          overflow: hidden;
        }
        .btn-sheen::after {
          content: "";
          position: absolute;
          top: 0;
          left: -60%;
          width: 40%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.5),
            transparent
          );
          transform: skewX(-20deg);
          transition: left 0.7s ease;
        }
        .btn-sheen:hover::after {
          left: 130%;
        }
      `}</style>

      <div className="max-w-5xl w-full">
        {/* Back */}
        <div className="mb-6 md:mb-8">
          <Link
            href={`/shop/${slug}/package`}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#12141F] transition-colors"
          >
            <span className="w-7 h-7 rounded-full border border-slate-200 bg-white flex items-center justify-center">
              <FaArrowLeft className="text-[10px]" />
            </span>
            <span className="hidden sm:inline">Back</span>
          </Link>
        </div>

        {/* Header: title + package chip, side by side like the package page's hierarchy */}
        <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-10 md:mb-12">
          <div>
            <h1
              className={`${fraunces.className} text-3xl md:text-[2.6rem] font-semibold text-[#12141F] tracking-tight leading-[1.1]`}
            >
              Choose your template
            </h1>
            <p className="text-slate-500 text-sm md:text-base mt-2 font-medium">
              Select a card design to start customizing
            </p>
          </div>

          <div className="shrink-0 rounded-xl border border-slate-200 bg-white px-4 py-3 sm:min-w-[180px]">
            <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-slate-400">
              Your package
            </p>
            <p className={`${fraunces.className} text-[#12141F] font-semibold mt-0.5`}>
              {packageInfo.name}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">{packageInfo.subtitle}</p>
          </div>
        </header>

        {/* Templates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
          {TEMPLATES.map((tpl) => {
            const isSelected = selected?.id === tpl.id;
            return (
              <div
                key={tpl.id}
                onClick={() => setSelected(tpl)}
                className={`relative bg-white rounded-2xl border p-6 md:p-8 flex flex-col items-center cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                  isSelected
                    ? "border-[#3CA9FF] ring-1 ring-[#3CA9FF] shadow-[0_16px_36px_-20px_rgba(60,169,255,0.4)]"
                    : "border-slate-200 hover:border-slate-300 hover:shadow-[0_10px_24px_-18px_rgba(18,20,40,0.25)]"
                }`}
              >
                {/* Checkmark badge — hangs off the corner (like the package page's
                    "Most Popular" label) instead of sitting inside the rounded
                    curve, so it doesn't read as clipped by the card edge */}
                {isSelected && (
                  <span className="absolute -top-2.5 -right-2.5 z-10 w-7 h-7 rounded-full bg-[#3CA9FF] ring-2 ring-white flex items-center justify-center shadow-sm">
                    <FaCheck className="text-white text-[11px]" />
                  </span>
                )}

                <div className="relative w-full aspect-[3/4] mb-5 rounded-xl overflow-hidden bg-slate-50">
                  <Image
                    src={tpl.image}
                    alt={tpl.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <h2
                  className={`${fraunces.className} text-xl md:text-2xl font-semibold text-[#12141F] mb-1 tracking-tight`}
                >
                  {tpl.name}
                </h2>
                <p className="text-slate-500 text-xs md:text-sm font-medium mb-5">
                  {tpl.description}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(tpl);
                  }}
                  className={`w-full text-[13px] md:text-sm font-semibold py-3 px-6 rounded-xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 ${
                    isSelected
                      ? "bg-gradient-to-r from-[#3CA9FF] to-[#1C8CE0] text-white"
                      : "bg-[#12141F] text-white hover:bg-[#1e2536]"
                  }`}
                >
                  {isSelected ? (
                    <>
                      <FaCheck className="text-[11px]" /> Selected
                    </>
                  ) : (
                    "Select Template"
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Continue row — desktop: selected summary + CTA share one bottom bar */}
        <div
          className={`hidden md:flex items-center justify-between mt-10 pt-6 border-t border-slate-200 transition-all duration-500 ${
            selected
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <p className="text-slate-500 text-sm">
            Selected:{" "}
            <strong className={`${fraunces.className} text-[#12141F] font-semibold`}>
              {selected?.name}
            </strong>
            {selected && ` — ${selected.description}`}
          </p>
          <button
            onClick={handleContinue}
            className="btn-sheen bg-gradient-to-r from-[#3CA9FF] to-[#1C8CE0] text-white text-sm font-semibold py-3 px-8 rounded-xl hover:shadow-[0_14px_30px_-14px_rgba(28,140,224,0.5)] transition-all duration-200 active:scale-[0.98] flex items-center gap-2"
          >
            Start Customizing
            <FaArrowRight className="text-xs" />
          </button>
        </div>

        {/* Mobile spacer so fixed bar never overlaps last card */}
        {selected && <div className="md:hidden h-28" />}
      </div>

      {/* Mobile fixed bottom CTA — appears only once a template is selected */}
      {selected && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-t border-slate-200 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <p className="text-slate-500 text-xs mb-2 text-center truncate">
            Selected: <strong className="text-[#12141F]">{selected?.name}</strong>
          </p>
          <button
            onClick={handleContinue}
            className="btn-sheen w-full bg-gradient-to-r from-[#3CA9FF] to-[#1C8CE0] text-white text-sm font-semibold py-3 px-6 rounded-xl active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
          >
            Start Customizing
            <FaArrowRight className="text-xs" />
          </button>
        </div>
      )}
    </main>
  );
}