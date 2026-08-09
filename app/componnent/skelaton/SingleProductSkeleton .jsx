'use client';

const SingleProductSkeleton = () => {
    return (
        <div className="h-fit max-w-7xl mx-auto my-8 mx-8 border border-gray-200 rounded-lg relative animate-pulse">
            {/* Header */}
            <div className="pb-8 items-center flex justify-between sticky top-[70px] bg-white py-4 px-8 rounded-lg ">
                <div className="flex justify-between items-center gap-4 mt-3 w-full">
                    <div className="bg-gray-200 h-10 w-28 rounded-lg"></div>
                    <div className="bg-gray-200 h-10 w-28 rounded-lg"></div>
                </div>
            </div>

            {/* Main grid */}
            <div className="grid bg-white grid-cols-1 md:grid-cols-5 gap-8 px-8 text-gray-700 pb-8 rounded-b-lg">
                {/* Left: Main Image & Gallery */}
                <div className="w-full col-span-2">
                    <div className="w-full h-[300px] bg-gray-200 rounded-md"></div>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="w-20 h-20 bg-gray-200 rounded-md"></div>
                        ))}
                    </div>
                </div>

                {/* Right: Product Info */}
                <div className="space-y-4 col-span-3">
                    <div className="h-5 w-1/3 bg-gray-200 rounded"></div>
                    <div className="h-5 w-1/4 bg-gray-200 rounded"></div>
                    <div className="h-5 w-1/5 bg-gray-200 rounded"></div>
                    <div className="h-5 w-1/6 bg-gray-200 rounded"></div>
                    <div className="h-5 w-1/4 bg-gray-200 rounded"></div>
                    <div className="h-5 w-2/3 bg-gray-200 rounded"></div>
                    <div className="h-10 w-32 bg-gray-300 rounded-md"></div>
                </div>
            </div>
        </div>
    );
};

export default SingleProductSkeleton;
