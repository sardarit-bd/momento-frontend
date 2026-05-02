"use client";
import useLoadingStore from "@/store/useLoadingStore";
import getId from "@/utilis/helper/cookie/getid";
import getCookie from "@/utilis/helper/cookie/gettooken";
import MakeGet from "@/utilis/requestrespose/get";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";



export default function AllProducts() {

    const id = getId();
    const token = getCookie();
    const router = useRouter();
    const { isLoading, setLoading } = useLoadingStore();
    const [fetchloading, setfetchloading] = useState(true);
    const [isedit, setisedit] = useState(false);
    const [name, setname] = useState('');
    const [image, setimage] = useState('');
    const [des, setdes] = useState('');
    const [data, setdata] = useState(null);




    const fetching = useCallback(async (id, token) => {
        try {
            const response = await MakeGet(`api/products`, token);

            setdata(response?.data);

            setfetchloading(false);
        } catch (error) {
            console.error("Error fetching All Products:", error);
            setfetchloading(false);
        }
    }, [id, token]);


    // Simulate fetching user data
    useEffect(() => {
        fetching(id, token);
    }, []);


    if (fetchloading) return <SkeletonLoader />



    return (
        <div className="w-full">
            <div className="w-full">

                <div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-left">
                            Added Products : <span>{data?.categories?.length}</span>
                        </h1>
                        <div>
                            <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {data?.data?.map((cat, idx) => (
                                    <Link
                                        href={`/deshboard/admin/allproducts/${cat?.slug}`}
                                        key={idx}
                                        className="text-center bg-gray-50 rounded-xl shadow-sm overflow-hidden hover:scale-102 transform transition duration-300 relative"
                                    >

                                        <div className="relative w-full h-56 z-20">
                                            <Image
                                                width={1000}
                                                height={1000}
                                                src={cat?.image}
                                                alt={cat?.name}
                                                className="w-full h-full object-cover z-20"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-2xl font-semibold mb-2 text-[#333333] line-clamp-1">{cat?.name}</h3>
                                            <p className="text-gray-600 line-clamp-3">{cat?.short_description}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}


























function SkeletonLoader() {
    return (
        <div className="animate-pulse space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                {Array.from({ length: 6 }).map((_, idx) => (
                    <div
                        key={idx}
                        className="bg-gray-100 rounded-xl shadow-sm h-80 flex flex-col"
                    >
                        <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                        <div className="p-4 space-y-2">
                            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}