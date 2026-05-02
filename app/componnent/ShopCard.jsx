"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

  const isCustomizable =
    product?.type === "customizable" || product?.type === "trading";

  return (
    <article className="w-full max-w-xs sm:max-w-sm mx-auto bg-white rounded-2xl overflow-hidden border border-sky-100 shadow-md hover:shadow-lg hover:shadow-sky-200 hover:-translate-y-1 transition-all duration-300 group">
      <div className="relative w-full aspect-4/3 bg-linear-to-br from-sky-100 to-sky-200 overflow-hidden">
        <Image
          width={1000}
          height={1000}
          draggable={false}
          title={product?.name}
          src={product?.image}
          alt={product?.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />

        {product?.category?.name && (
          <div className="absolute top-3 right-3">
            <span className="bg-sky-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
              {product.category.name}
            </span>
          </div>
        )}
      </div>

      <div className="h-0.75 w-full bg-linear-to-r from-sky-400 via-sky-500 to-sky-100" />

      <div className="p-4 sm:p-5 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-base sm:text-lg font-bold text-slate-800 truncate leading-snug">
            {product?.name}
          </h3>

          {product?.short_description && (
            <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
              {product.short_description}
            </p>
          )}

          <div className="flex items-center gap-2 mt-2">
            <span className="text-xl font-extrabold text-sky-500 tracking-tight">
              $
              {parseFloat(product?.price || product?.final_price || 0).toFixed(
                2,
              )}
            </span>
            {parseFloat(product?.offer_price) > 0 && (
              <span className="text-sm text-slate-400 line-through font-medium">
                ${parseFloat(product?.offer_price).toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={(e) => gotoLink(e, `/shop/${product?.slug}`)}
          disabled={btnLoading}
          className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white text-sm sm:text-base font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-sky-300 active:scale-95 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
        >
          {btnLoading && <SpinLoader />}
          Explore Card
        </button>
      </div>
    </article>
  );
}
