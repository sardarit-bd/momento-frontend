"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft, FaCheck } from "react-icons/fa6";
import Link from "next/link";

const PACKAGES = [
  {
    slug: "single",
    name: "Single Pack",
    tag: "Simple Start",
    subtitle: "For trying out your first design",
    features: [
      "1 unique design",
      "18 printed cards",
      "Standard layout system",
    ],
    recommended: false,
  },
  {
    slug: "trio",
    name: "Trio Pack",
    tag: "Recommended",
    subtitle: "Balanced choice for most users",
    features: [
      "3 unique designs",
      "18 total cards",
      "Balanced variation",
      // "Optimized for gifting",
    ],
    recommended: true,
  },
  {
    slug: "collection",
    name: "Collector Pack",
    tag: "Maximum Variety",
    subtitle: "For full creative expression",
    features: [
      "6 unique designs",
      "18 total cards",
      "Maximum variation",
      // "Collector-style presentation",
    ],
    recommended: false,
  },
];

export default function PackageSelectionPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [selected, setSelected] = useState(null);

  const handleContinue = () => {
    if (!selected) return;
    router.push(`/shop/${slug}/template?package=${selected.slug}`);
  };

  return (
    <main className="min-h-screen bg-[#f7f9fc] px-4 sm:px-6 py-8 md:py-16 flex justify-center">

      <div className="max-w-6xl w-full">

        {/* Header */}
        <div className="text-center mb-8 md:mb-14">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-[#0b1320] tracking-tight">
            Choose your package
          </h1>

          <p className="mt-2 md:mt-3 text-slate-500 text-xs sm:text-sm md:text-base">
            Select how you want to structure your Momento Cards
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8">

          {PACKAGES.map((pkg) => {
            const isSelected = selected?.slug === pkg.slug;

            return (
              <div
                key={pkg.slug}
                onClick={() => setSelected(pkg)}
                className={`
                  relative cursor-pointer rounded-2xl transition-all duration-300
                  bg-white border
                  hover:-translate-y-1 hover:shadow-xl
                  p-4 md:p-7
                  flex flex-row md:flex-col items-center md:items-stretch
                  gap-4 md:gap-0
                  ${
                    isSelected
                      ? "border-[#0b1320] shadow-lg md:scale-[1.02]"
                      : "border-slate-200"
                  }
                `}
              >

                {/* Recommended badge — desktop floating badge stays as-is */}
                {pkg.recommended && (
                  <div className="hidden md:block absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0b1320] text-white text-xs px-3 py-1 rounded-full whitespace-nowrap">
                    Recommended
                  </div>
                )}

                {/* Selection indicator dot, mobile only */}
                <div
                  className={`
                    md:hidden shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center
                    ${isSelected ? "bg-[#0b1320] border-[#0b1320]" : "border-slate-300"}
                  `}
                >
                  {isSelected && <FaCheck className="text-white text-[10px]" />}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 md:flex-none">

                  {/* Header */}
                  <div className="text-left md:text-center md:mt-3 flex items-center justify-between md:block">
                    <div className="flex items-center gap-2 md:block">
                      <h2 className="text-base md:text-2xl font-semibold text-[#0b1320] md:mt-2">
                        {pkg.name}
                      </h2>
                      {pkg.recommended && (
                        <span className="md:hidden text-[10px] uppercase tracking-wide bg-[#0b1320] text-white px-2 py-0.5 rounded-full">
                          Recommended
                        </span>
                      )}
                    </div>
                    <div className="hidden md:block text-xs uppercase tracking-wider text-slate-400 order-first">
                      {pkg.tag}
                    </div>

                    <p className="hidden md:block text-sm text-slate-500 mt-2">
                      {pkg.subtitle}
                    </p>
                  </div>

                  {/* Feature list — collapses to single line on mobile */}
                  <div className="mt-1 md:mt-7 hidden md:block space-y-3">
                    {pkg.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <FaCheck className="text-emerald-500 mt-0.5 text-xs shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <p className="md:hidden text-xs text-slate-500 mt-0.5 truncate">
                    {pkg.features.join(" · ")}
                  </p>
                </div>

                {/* Action — desktop only, mobile selects via row tap */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(pkg);
                  }}
                  className={`
                    hidden md:block mt-8 w-full py-3 rounded-xl font-medium transition-all
                    ${
                      isSelected
                        ? "bg-[#0b1320] text-white"
                        : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                    }
                  `}
                >
                  {isSelected ? "Selected" : "Select package"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA — desktop only, unchanged from original */}
        <div className="hidden md:block mt-14 text-center">
          <button
            onClick={handleContinue}
            disabled={!selected}
            className={`
              px-12 py-3 rounded-xl font-medium transition
              ${
                selected
                  ? "bg-[#0b1320] text-white hover:opacity-90"
                  : "bg-slate-300 text-slate-500 cursor-not-allowed"
              }
            `}
          >
            Continue with selection
          </button>
        </div>

        {/* Mobile spacer so fixed bar never overlaps the last card */}
        {selected && <div className="md:hidden h-24" />}

      </div>

      {/* Mobile fixed bottom CTA — appears only once a package is selected */}
      {selected && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#f7f9fc] border-t border-slate-200 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <button
            onClick={handleContinue}
            className="w-full py-3 rounded-xl font-medium bg-[#0b1320] text-white transition active:opacity-80"
          >
            Continue with selection
          </button>
        </div>
      )}
    </main>
  );
}