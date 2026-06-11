"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
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

export default function TemplateSelectionPage() {
  const { slug } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPackage = searchParams.get("package") || "single";
  const [selected, setSelected] = useState(null);

  const handleContinue = () => {
    if (!selected) return;
    router.push(
      `/application/tradingcard/${slug}?package=${selectedPackage}&template=${selected.id}`
    );
  };

  return (
    <main className="bg-[#f7f9fc] min-h-screen flex flex-col items-center px-4 py-12 md:py-24 select-none">
      <div className="max-w-5xl w-full">

        {/* Back */}
        <div className="mb-8">
          <Link
            href={`/shop/${slug}/package`}
            className="inline-flex items-center gap-2 bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-sky-300 transition text-sm font-medium"
          >
            <FaArrowLeft /> Back
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-[42px] font-semibold text-[#091124] tracking-tight leading-tight">
            Choose Your Template
          </h1>
          <p className="text-slate-500 text-sm md:text-base mt-2 md:mt-3 font-medium tracking-wide">
            Select a card template to start designing
          </p>
        </header>

        {/* Templates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
          {TEMPLATES.map((tpl) => {
            const isSelected = selected?.id === tpl.id;
            return (
              <div
                key={tpl.id}
                onClick={() => setSelected(tpl)}
                className={`bg-white rounded-2xl border p-6 md:p-8 flex flex-col items-center cursor-pointer transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 ${
                  isSelected
                    ? "border-[#0d1527] ring-2 ring-[#0d1527]"
                    : "border-slate-100"
                }`}
              >
                <div className="relative w-full aspect-[3/4] mb-5 rounded-xl overflow-hidden bg-slate-50">
                  <Image
                    src={tpl.image}
                    alt={tpl.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
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
                    setSelected(tpl);
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

        {/* Continue CTA */}
        <div
          className={`mt-10 text-center transition-all duration-500 ${
            selected
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <p className="text-slate-500 text-sm mb-4">
            You selected{" "}
            <strong className="text-[#091124]">{selected?.name}</strong>
            {selected && ` \u2014 ${selected.description}`}
          </p>
          <button
            onClick={handleContinue}
            className="bg-[#0d1527] text-white text-sm font-medium py-3 px-10 rounded-[10px] hover:bg-[#1e293b] transition-all duration-200 active:scale-[0.98]"
          >
            Continue to Design &rarr;
          </button>
        </div>

      </div>
    </main>
  );
}
