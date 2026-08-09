"use client";

function SkeletonBox({ className }) {
    return (
        <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
    );
}

function TradingCardApplicationSkelaton() {
    return (
        <div className="grid grid-cols-12 gap-2 h-screen w-screen fixed bg-gray-100">
            {/* Left Sidebar Skeleton */}
            <div className="col-span-12 lg:col-span-3 w-full h-full bg-white p-4">
                <SkeletonBox className="w-2/3 h-6 mb-4" />
                <SkeletonBox className="w-full h-10 mb-3" />
                <SkeletonBox className="w-full h-10 mb-3" />
                <SkeletonBox className="w-full h-10 mb-3" />
            </div>

            {/* Middle + Right */}
            <div className="col-span-12 lg:col-span-9 h-screen w-full">
                <div className="grid grid-cols-10 h-full mt-2 lg:mt-0">
                    {/* Canvas column */}
                    <div className="col-span-10 lg:col-span-6 flex items-center justify-center lg:-translate-y-[50px] w-screen lg:w-full">
                        <div className="border border-gray-200 rounded-md bg-white w-[60%] h-[60%] flex items-center justify-center">
                            <SkeletonBox className="w-2/3 h-2/3" />
                        </div>
                    </div>

                    {/* Right Controls */}
                    <div className="col-span-10 lg:col-span-4 w-screen lg:w-full h-full bg-white border-t lg:border-l border-gray-200 px-4 mt-2 lg:mt-0">
                        <div className="h-[83vh] overflow-y-scroll mt-2 space-y-4">
                            {/* Front Base */}
                            <div>
                                <SkeletonBox className="w-32 h-5 mb-2" />
                                <div className="flex gap-2">
                                    <SkeletonBox className="w-16 h-20" />
                                    <SkeletonBox className="w-16 h-20" />
                                    <SkeletonBox className="w-16 h-20" />
                                </div>
                            </div>

                            {/* Back Base */}
                            <div>
                                <SkeletonBox className="w-32 h-5 mb-2" />
                                <div className="flex gap-2">
                                    <SkeletonBox className="w-16 h-20" />
                                    <SkeletonBox className="w-16 h-20" />
                                    <SkeletonBox className="w-16 h-20" />
                                </div>
                            </div>

                            {/* Upload */}
                            <div>
                                <SkeletonBox className="w-32 h-5 mb-2" />
                                <SkeletonBox className="w-full h-[150px] rounded-md" />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-2">
                                <SkeletonBox className="w-24 h-10" />
                                <SkeletonBox className="w-24 h-10" />
                            </div>

                            {/* Text controls (fake) */}
                            <div className="space-y-2 border-t pt-3 mt-3">
                                <SkeletonBox className="w-1/2 h-4" />
                                <SkeletonBox className="w-full h-8" />
                                <SkeletonBox className="w-1/2 h-4" />
                                <SkeletonBox className="w-full h-8" />
                                <SkeletonBox className="w-1/2 h-4" />
                                <SkeletonBox className="w-full h-8" />
                            </div>
                        </div>

                        {/* Bottom Button */}
                        <div className="mt-4">
                            <SkeletonBox className="w-full h-10 rounded" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default TradingCardApplicationSkelaton;