"use client";

const ApplicationSkeleton = () => {
    return (
        <div className="grid grid-cols-12 gap-2 h-screen w-screen fixed bg-gray-100 animate-pulse">
            {/* Sidebar Skeleton */}
            <div className="col-span-12 lg:col-span-2 bg-white border-r border-gray-200 p-4 flex flex-col space-y-3">
                <div className="h-[50px] bg-gray-200 rounded w-3/4 mx-auto"></div>
                <div className="space-y-2 mt-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-[100px] bg-gray-200 rounded-md"></div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="col-span-10 h-screen w-full">
                <div className="grid grid-cols-10 h-full mt-2 lg:mt-0">
                    {/* Card Preview Skeleton */}
                    <div className="col-span-10 lg:col-span-6 flex items-center justify-center w-screen lg:w-full">
                        <div className="w-[400px] h-[500px] bg-gray-200 rounded-lg shadow-md"></div>
                    </div>

                    {/* Controller / Right Panel Skeleton */}
                    <div className="col-span-10 lg:col-span-4 w-screen lg:w-full h-full bg-white border-t lg:border-l border-gray-200 px-4 lg:px-6 mt-2 lg:mt-0 flex flex-col justify-between">
                        <div>
                            <div className="h-12 w-2/3 bg-gray-200 rounded mt-4"></div>
                            <div className="h-12 w-1/2 bg-gray-200 rounded mt-3"></div>
                            <div className="space-y-2 mt-6">
                                {[...Array(7)].map((_, i) => (
                                    <div key={i} className="h-[80px] bg-gray-200 rounded-lg"></div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-6 mb-4">
                            <div className="h-12 bg-gray-300 rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationSkeleton;
