"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsStars } from "react-icons/bs";
import SpinLoader from "./SpingLoader";

export default function ShopCard({ product }) {
  const [btnLoading, setBtnLoading] = useState(false);
  const router = useRouter();

  const gotoLink = (e, link) => {
    e.preventDefault();
    setBtnLoading(true);
    setTimeout(() => {
      setBtnLoading(false);
      router.push(link);
    }, 1000);
  };

  const isTradingCard = product?.type === "trading";
  const targetLink = isTradingCard
    ? `/shop/${product?.slug}/package`
    : `/shop/${product?.slug}`;
  const displayBadge =
    product?.type === "customizable" ||
    product?.type === "trading" ||
    product?.type === "photo"
      ? "Customizable"
      : "Simple";
  return (
    <article className="group w-full lg:w-[32%] flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="relative w-full aspect-4/3 overflow-hidden bg-[#c9e7fd]">
        <Image
          src={product?.image}
          alt={product?.name}
          title={product?.name}
          fill
          draggable={false}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover w-full h-full transform transition-transform duration-500 ease-in-out group-hover:scale-105"
        />

        <div className="absolute top-3 left-3 flex gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/90 text-gray-800 shadow-md flex items-center gap-1">
            {(product?.type === "customizable" ||
              product?.type === "trading") && (
              <BsStars className="text-sky-400 text-lg" />
            )}
            {displayBadge}
          </span>
        </div>
      </div>

      <div className="flex flex-col grow p-6 lg:p-8">
        <div className="grow text-center md:text-left">
          <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-1">
            {product?.name}
          </h3>
          <p className="text-gray-600 leading-relaxed text-base line-clamp-2">
            {product?.short_description}
          </p>

          <div className="mt-4 flex items-center justify-center md:justify-start gap-3">
            <span className="text-lg font-bold text-gray-900">
              $
              {parseFloat(product?.price || product?.final_price || 0).toFixed(
                2,
              )}
            </span>
            {parseFloat(product?.offer_price) > 0 && (
              <span className="text-sm line-through text-gray-400">
                ${parseFloat(product?.offer_price).toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <div className="pt-6 mt-auto">
          <button
            onClick={(e) => {
              localStorage.clear();
              gotoLink(e, targetLink);
            }}
            className="group/btn relative w-full inline-flex items-center justify-center bg-[#3CA9FF] hover:bg-[#FF6F3C] text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3CA9FF] cursor-pointer"
          >
            {btnLoading ? (
              <SpinLoader />
            ) : (
              <>
                <span>Explore Card</span>
                <svg
                  className="ml-2 w-5 h-5 transform transition-transform group-hover/btn:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
