"use client";

export default function ShopCardSkeleton() {
    return (

        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 max-w-7xl mx-auto">
            {
                Array.from({ length: 8 }).map((_, idx) => {
                    return (
                        <article key={idx} className="w-full bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                            {/* Image */}
                            <div className="h-60 w-full bg-gray-200 rounded-t-2xl" />

                            {/* Info */}
                            <div className="p-4 flex flex-col gap-3">
                                {/* Name */}
                                <div className="h-5 bg-gray-300 rounded w-3/4" />

                                {/* Price */}
                                <div className="h-4 bg-gray-300 rounded w-1/2 mt-2" />

                                {/* Button */}
                                <div className="h-10 bg-gray-300 rounded mt-4" />
                            </div>
                        </article>
                    )
                })
            }

        </div>

    );
}
