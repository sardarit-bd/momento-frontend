"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Fraunces, Inter } from "next/font/google";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaBox,
  FaLayerGroup,
  FaTableCells,
  FaTruck,
  FaShieldHalved,
  FaGem,
} from "react-icons/fa6";
import Link from "next/link";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const BRAND = "#3CA9FF";
const BRAND_DARK = "#1C8CE0";
const BRAND_TINT = "#EAF6FF";

const PACKAGES = [
  {
    slug: "single",
    name: "Single",
    badge: "Most Popular",
    subtitle: "1 design · 18 copies",
    description:
      "18 copies of 1 design — great for trying out your first design.",
    price: 29.0,
    originalPrice: 34.99,
    icon: FaBox,
  },
  {
    slug: "trio",
    name: "Trio",
    badge: "Best Value",
    subtitle: "3 designs · 6 each",
    description:
      "6 copies each of 3 different designs — ideal for a small circle.",
    price: 39.0,
    originalPrice: 59.99,
    icon: FaLayerGroup,
  },
  {
    slug: "collection",
    name: "Collection",
    badge: "Full Set",
    subtitle: "6 designs · 3 each",
    description:
      "3 copies each of 6 different designs — for full creative expression.",
    price: 54.0,
    originalPrice: 84.99,
    icon: FaTableCells,
  },
];

const TRUST_CHIPS = [
  { icon: FaGem, label: "Premium print quality" },
  { icon: FaShieldHalved, label: "Damage-free guarantee" },
  { icon: FaTruck, label: "Ships in 7–12 days" },
];

const THUMBNAILS = [0, 1, 2, 3];

export default function PackageSelectionPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [selected, setSelected] = useState(PACKAGES[1]);
  const [activeThumb, setActiveThumb] = useState(0);

  const handleContinue = () => {
    if (!selected) return;
    router.push(`/shop/${slug}/template?package=${selected.slug}`);
  };

  return (
    <main
      className={`${inter.className} min-h-screen bg-[#F7F9FC] px-4 sm:px-6 lg:px-10 py-6 md:py-12`}
    >
      <style jsx global>{`
        @property --angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }
        @keyframes spin-foil {
          to {
            --angle: 360deg;
          }
        }
        .foil-ring {
          position: relative;
          isolation: isolate;
        }
        .foil-ring::before {
          content: "";
          position: absolute;
          inset: -1.5px;
          border-radius: inherit;
          padding: 1.5px;
          background: conic-gradient(
            from var(--angle),
            #3ca9ff,
            #b98ee8,
            #6ec8e0,
            #63bbff,
            #3ca9ff
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: spin-foil 7s linear infinite;
          z-index: 0;
        }
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
            rgba(255, 255, 255, 0.55),
            transparent
          );
          transform: skewX(-20deg);
          transition: left 0.7s ease;
        }
        .btn-sheen:hover::after {
          left: 130%;
        }
      `}</style>

      <div className="max-w-6xl w-full mx-auto">
        <div className="flex items-center justify-between mb-6 md:mb-10">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#12141F] transition-colors"
          >
            <span className="w-7 h-7 rounded-full border border-slate-200 bg-white flex items-center justify-center">
              <FaArrowLeft className="text-[10px]" />
            </span>
            <span className="hidden sm:inline">Back</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-16">
          <div>
            <div className="relative aspect-4/5 sm:aspect-5/6 w-full rounded-[1.75rem] overflow-hidden shadow-[0_20px_50px_-25px_rgba(18,20,40,0.25)]">
              <Image
                src="/mockup7.png"
                alt="Momento Trading Cards mockup"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />

              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur border border-slate-200 text-[#12141F] text-[11px] font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full shadow-sm">
                Premium Print
              </div>
            </div>
          </div>

          <div>
            <h1
              className={`${fraunces.className} text-[2.1rem] sm:text-4xl lg:text-[2.9rem] font-semibold text-[#12141F] tracking-tight leading-[1.1]`}
            >
              Momento Trading Cards
            </h1>

            <p className="mt-5 text-slate-500 text-[0.95rem] leading-relaxed max-w-md">
              Transform your favourite photos into collectible trading cards —
              printed on premium stock with holographic shimmer, sharp detail,
              and a finish that feels like the real thing. Designed for gifting,
              celebrating, and keeping forever.
            </p>

            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-400 mt-8 mb-3">
              Choose your package
            </p>

            <div className="space-y-3">
              {PACKAGES.map((pkg) => {
                const isSelected = selected?.slug === pkg.slug;
                const Icon = pkg.icon;

                const row = (
                  <button
                    type="button"
                    onClick={() => setSelected(pkg)}
                    className={`
                      relative z-10 w-full text-left rounded-2xl bg-white transition-all
                      px-4 sm:px-5 py-4 flex items-center gap-3 sm:gap-4
                      ${
                        isSelected
                          ? "shadow-[0_12px_30px_-16px_rgba(18,20,40,0.35)]"
                          : "border border-slate-200 hover:border-slate-300 hover:shadow-[0_8px_20px_-14px_rgba(18,20,40,0.25)]"
                      }
                    `}
                  >
                    <span
                      className={`absolute -top-2.5 right-4 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full shadow-sm ${
                        isSelected
                          ? "bg-linear-to-r from-[#3CA9FF] to-[#63BBFF] text-white"
                          : "bg-[#EAF6FF] text-[#1C8CE0]"
                      }`}
                    >
                      {pkg.badge}
                    </span>

                    <div
                      className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-[#12141F] text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <Icon className="text-[15px]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#12141F] text-sm sm:text-base">
                        {pkg.name}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-500 truncate">
                        {pkg.subtitle}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-2 justify-end">
                        <span className="font-semibold text-[#12141F] text-sm sm:text-base tabular-nums">
                          ${pkg.price.toFixed(2)}
                        </span>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-[#3CA9FF] flex items-center justify-center shrink-0">
                            <FaCheck className="text-white text-[10px]" />
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 line-through tabular-nums">
                        ${pkg.originalPrice.toFixed(2)}
                      </span>
                    </div>
                  </button>
                );

                return isSelected ? (
                  <div key={pkg.slug} className="foil-ring rounded-2xl">
                    {row}
                  </div>
                ) : (
                  <div key={pkg.slug}>{row}</div>
                );
              })}
            </div>

            {selected && (
              <div className="mt-4 rounded-xl bg-white border border-slate-200 px-4 py-3.5 text-sm text-slate-600 leading-relaxed">
                <span
                  className={`${fraunces.className} font-semibold text-[#12141F]`}
                >
                  {selected.name} Package —{" "}
                </span>
                {selected.description}
              </div>
            )}

            <div className="hidden sm:flex flex-wrap items-center gap-x-5 gap-y-2 mt-5">
              {TRUST_CHIPS.map(({ icon: ChipIcon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 text-xs text-slate-500"
                >
                  <ChipIcon className="text-[#3CA9FF] text-[13px]" />
                  {label}
                </span>
              ))}
            </div>

            <button
              onClick={handleContinue}
              disabled={!selected}
              className={`
                btn-sheen hidden md:flex mt-6 w-full py-3.5 rounded-xl font-semibold transition items-center justify-center gap-2
                ${
                  selected
                    ? "bg-linear-to-r from-[#3CA9FF] to-[#1C8CE0] text-white hover:shadow-[0_14px_30px_-14px_rgba(28,140,224,0.55)]"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }
              `}
            >
              Customize Your Cards
              <FaArrowRight className="text-xs" />
            </button>

            <div className="md:hidden h-24" />
          </div>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-t border-slate-200 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-[11px] text-slate-400">
              {selected ? selected.name : "Select a package"}
            </p>
            {selected && (
              <p className="text-base font-semibold text-[#12141F] tabular-nums">
                ${selected.price.toFixed(2)}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={handleContinue}
          disabled={!selected}
          className={`btn-sheen w-full py-3.5 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
            selected
              ? "bg-linear-to-r from-[#3CA9FF] to-[#1C8CE0] text-white"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          Customize Your Cards
          <FaArrowRight className="text-xs" />
        </button>
      </div>
    </main>
  );
}
