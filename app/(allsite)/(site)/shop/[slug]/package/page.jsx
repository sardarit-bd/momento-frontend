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
    <main className="min-h-screen bg-[#f7f9fc] px-6 py-16 flex justify-center">

      <div className="max-w-6xl w-full">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-semibold text-[#0b1320] tracking-tight">
            Choose your package
          </h1>

          <p className="mt-3 text-slate-500 text-base">
            Select how you want to structure your Momento Cards
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {PACKAGES.map((pkg) => {
            const isSelected = selected?.slug === pkg.slug;

            return (
              <div
                key={pkg.slug}
                onClick={() => setSelected(pkg)}
                className={`
                  relative cursor-pointer rounded-2xl p-7 transition-all duration-300
                  bg-white border
                  hover:-translate-y-1 hover:shadow-xl
                  ${
                    isSelected
                      ? "border-[#0b1320] shadow-lg scale-[1.02]"
                      : "border-slate-200"
                  }
                `}
              >

                {/* Recommended badge */}
                {pkg.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0b1320] text-white text-xs px-3 py-1 rounded-full">
                    Recommended
                  </div>
                )}

                {/* Header */}
                <div className="text-center mt-3">
                  <div className="text-xs uppercase tracking-wider text-slate-400">
                    {pkg.tag}
                  </div>

                  <h2 className="text-2xl font-semibold text-[#0b1320] mt-2">
                    {pkg.name}
                  </h2>

                  <p className="text-sm text-slate-500 mt-2">
                    {pkg.subtitle}
                  </p>
                </div>

                {/* Feature list */}
                <div className="mt-7 space-y-3">
                  {pkg.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <FaCheck className="text-emerald-500 mt-0.5 text-xs" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                {/* Action */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(pkg);
                  }}
                  className={`
                    mt-8 w-full py-3 rounded-xl font-medium transition-all
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

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
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

      </div>
    </main>
  );
}