'use client'

import useProductUploadStore from "@/store/useProductUploadStore";

const One = () => {
    const { rander, setrander, productType, setproductType } = useProductUploadStore();

    const options = [
        { type: "simple",       label: "Simple Product" },
        { type: "customizable", label: "Customizable Deck Product" },
        { type: "photo",        label: "Photo Portrait Product" },
        { type: "trading",      label: "Customizable Trading Product" },
    ];

    return (
        <div className="px-4">
            {/* Cards — stack on mobile, row on md+ */}
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center pt-6 pb-6">
                {options.map(({ type, label }) => (
                    <div
                        key={type}
                        onClick={() => setproductType(type)}
                        className={`
                            border border-gray-300 rounded-md text-white text-lg font-semibold
                            w-full sm:w-[220px] md:w-[260px]
                            h-[80px] sm:h-[100px] md:h-[110px]
                            flex items-center justify-center text-center
                            cursor-pointer transition px-4
                            ${productType === type ? "bg-sky-400" : "bg-gray-400 hover:bg-gray-500"}
                        `}
                    >
                        {label}
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-center mt-4">
                <button
                    onClick={() => setrander(2)}
                    className="bg-sky-400 text-white px-6 py-2 cursor-pointer rounded-md hover:bg-sky-500 transition font-semibold"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default One;