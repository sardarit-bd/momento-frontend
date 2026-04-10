'use client'

import useProductUploadStore from "@/store/useProductUploadStore";

const One = () => {

    const { rander, setrander, productType, setproductType } = useProductUploadStore();


    console.log(productType);


    return (
        <div>
            <div className="flex items-center gap-3 justify-center pt-10 pb-6">
                <div onClick={() => setproductType("Simple")} className={`border border-gray-300 px-6 py-6 rounded-md text-white text-2xl w-[260px] text-center h-[110px] flex items-center justify-center cursor-pointer ${productType === "Simple" ? "bg-sky-400" : "bg-gray-400"}`}>
                    Simple Product
                </div>
                <div onClick={() => setproductType("Customizable")} className={`border border-gray-300 px-6 py-6 rounded-md text-white text-2xl w-[260px] text-center h-[110px] flex items-center justify-center cursor-pointer ${productType === "Customizable" ? "bg-sky-400" : "bg-gray-400"}`}>
                    Customizable Deck Product
                </div>

                <div onClick={() => setproductType("Trading")} className={`border border-gray-300 px-6 py-6 rounded-md text-white text-2xl w-[260px] text-center h-[110px] flex items-center justify-center cursor-pointer ${productType === "Trading" ? "bg-sky-400" : "bg-gray-400"}`}>
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