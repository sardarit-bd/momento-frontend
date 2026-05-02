"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsStars } from "react-icons/bs";
import SpinLoader from "./SpingLoader";

export default function ShopCard({ product }) {



    const [btnLoading, setBtnLoading] = useState(false);
    const router = useRouter();




    /************ add to card function is here *************/
    const gotoLink = (e, link) => {

        e.preventDefault();
        setBtnLoading(true);

        setTimeout(() => {
            setBtnLoading(false);
            router.push(link);
        }, 1000);

    }






    return (
        <article className="w-full bg-white rounded-2xl shadow-lg overflow-hidden transform transition">
            {/* Product Image */}
            <div className="relative h-65 w-full overflow-hidden group">
                <div className="bg-[#c9e7fd]">
                    <Image
                        width={1000}
                        height={1000}
                        draggable={false}
                        title={product.name}
                        src={product?.image}
                        alt={product.name}
                        className="h-full w-full rounded-xl object-contain transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                </div>

                {/* Other badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                    {(() => {
                        const displayBadge = product?.type === "customizable" || product?.type === "trading" ? "Customizable" : "Simple";
                        return (
                            <span
                                className="text-xs font-semibold px-3 py-1 rounded-full bg-white/90 text-gray-800 shadow-md flex items-center gap-1"
                            >
                                {product?.type === "customizable" || product?.type === "trading" ? <BsStars className="text-sky-400 text-lg" /> : null}
                                {displayBadge}
                            </span>
                        );
                    })()}
                </div>

            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col gap-3">
                <div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                            {product?.name}
                        </h3>
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-bold text-gray-900">
                                ${parseFloat(product?.price || product?.final_price || 0).toFixed(2)}
                            </span>
                            {parseFloat(product.offer_price) > 0 && (
                                <span className="text-xs line-through text-gray-400">
                                    ${parseFloat(product?.offer_price).toFixed(2)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={(e) => { gotoLink(e, `/shop/${product?.slug}`) }}
                        className="flex-1 inline-flex justify-center items-center gap-2 rounded-md bg-sky-500 text-white py-2 px-4 text-md font-semibold shadow-lg hover:brightness-105 transition cursor-pointer flex items-center justify-center gap-2"
                    >
                        {btnLoading && <SpinLoader />}
                        Explore Card
                    </button>

                </div>
            </div>
        </article>
    );
}







