"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";

const PACKAGES = [
  { slug: "single",     name: "Single",     description: "1 design, 18 copies" },
  { slug: "trio",       name: "Trio",       description: "3 designs, 6 each"   },
  { slug: "collection", name: "Collection", description: "6 designs, 3 each"   },
];

export default function PackageSelectionPage() {
  const { slug } = useParams();
  const router   = useRouter();
  const [selected, setSelected] = useState(null);

  const handleContinue = () => {
    if (!selected) return;
    router.push(`/application/tradingcard/${slug}?package=${selected.slug}`);
  };

  return (
    <main className="bg-[#f7f9fc] flex flex-col justify-center items-center px-4 py-12 md:py-24 select-none">
      <div className="max-w-6xl w-full">

        {/* Back */}
        <div className="mb-8">
          <Link
            href={`/shop/${slug}`}
            className="inline-flex items-center gap-2 bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-sky-300 transition text-sm font-medium"
          >
            <FaArrowLeft /> Back
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-[42px] font-semibold text-[#091124] tracking-tight leading-tight">
            Create Your Momento Cards
          </h1>
          <p className="text-slate-500 text-sm md:text-base mt-2 md:mt-3 font-medium tracking-wide">
            Choose your package to get started
          </p>
        </header>

        {/* Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {PACKAGES.map((pkg) => {
            const isSelected = selected?.slug === pkg.slug;
            return (
              <div
                key={pkg.slug}
                onClick={() => setSelected(pkg)}
                className={`bg-white rounded-2xl border p-8 md:p-10 flex flex-col justify-between items-center cursor-pointer transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 ${
                  isSelected ? "border-[#0d1527] ring-2 ring-[#0d1527]" : "border-slate-100"
                }`}
              >
                <div className="flex flex-col items-center flex-grow justify-center mb-8">
                  <h2 className="text-2xl md:text-[28px] font-semibold text-[#091124] mb-2 tracking-tight">
                    {pkg.name}
                  </h2>
                  <p className="text-[#5e6d82] text-xs md:text-sm font-medium tracking-wide">
                    {pkg.description}
                  </p>
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); setSelected(pkg); }}
                  className={`w-full text-[13px] md:text-sm font-medium py-3 px-6 rounded-[10px] transition-all duration-200 active:scale-[0.98] tracking-wide ${
                    isSelected
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "bg-[#0d1527] text-white hover:bg-[#1e293b]"
                  }`}
                >
                  {isSelected ? "✓ Selected" : "Select Package"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Continue CTA */}
        <div
          className={`mt-10 text-center transition-all duration-500 ${
            selected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <p className="text-slate-500 text-sm mb-4">
            You selected <strong className="text-[#091124]">{selected?.name}</strong>
            {selected && ` — ${selected.description}`}
          </p>
          <button
            onClick={handleContinue}
            className="bg-[#0d1527] text-white text-sm font-medium py-3 px-10 rounded-[10px] hover:bg-[#1e293b] transition-all duration-200 active:scale-[0.98]"
          >
            Continue to Design →
          </button>
        </div>

      </div>
    </main>
  );
}