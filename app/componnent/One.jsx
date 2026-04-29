'use client'

import useProductUploadStore from "@/store/useProductUploadStore";

const One = () => {

    const { rander, setrander, productType, setproductType } = useProductUploadStore();

    return (
        <div>
            <div className="flex items-center gap-3 justify-center pt-10 pb-6">
                <div onClick={() => setproductType("simple")} className={`border border-gray-300 px-6 py-6 rounded-md text-white text-2xl w-[260px] text-center h-[110px] flex items-center justify-center cursor-pointer ${productType === "simple" ? "bg-sky-400" : "bg-gray-400"}`}>
                    Simple Product
                </div>
                <div onClick={() => setproductType("customizable")} className={`border border-gray-300 px-6 py-6 rounded-md text-white text-2xl w-[260px] text-center h-[110px] flex items-center justify-center cursor-pointer ${productType === "customizable" ? "bg-sky-400" : "bg-gray-400"}`}>
                    Customizable Deck Product
                </div>

                <div onClick={() => setproductType("trading")} className={`border border-gray-300 px-6 py-6 rounded-md text-white text-2xl w-[260px] text-center h-[110px] flex items-center justify-center cursor-pointer ${productType === "trading" ? "bg-sky-400" : "bg-gray-400"}`}>
                    Customizable Treding Product
                </div>

            </div>
            <div onClick={() => { setrander(2) }} className="flex items-center justify-center mt-6">
                <button className="bg-sky-400 text-white px-4 py-2 cursor-pointer rounded-md">Next</button>
            </div>
        </div>
    )
}


export default One;
