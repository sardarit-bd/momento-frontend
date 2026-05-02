"use client";
import SpinLoader from "@/app/componnent/SpingLoader";
import useLoadingStore from "@/store/useLoadingStore";
import getId from "@/utilis/helper/cookie/getid";
import getCookie from "@/utilis/helper/cookie/gettooken";
import handleFileChange from "@/utilis/helper/handlefilechange";
import MakeDelete from "@/utilis/requestrespose/delete";
import MakeGet from "@/utilis/requestrespose/get";
import MakePost from "@/utilis/requestrespose/post";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";



export default function ProfilePage() {

    const id = getId();
    const token = getCookie();
    const { isLoading, setLoading } = useLoadingStore();
    const [fetchloading, setfetchloading] = useState(true);
    const [isedit, setisedit] = useState(false);
    const [name, setname] = useState('');
    const [image, setimage] = useState('');
    const [des, setdes] = useState('');
    const [data, setdata] = useState(null);




    const fetching = useCallback(async (id, token) => {
        try {
            const response = await MakeGet(`api/categories`, token);

            setdata(response?.data);

            setfetchloading(false);
        } catch (error) {
            console.error("Error fetching profile:", error);
            setfetchloading(false);
        }
    }, [id, token]);


    // Simulate fetching user data
    useEffect(() => {
        fetching(id, token);
    }, []);





    /************** handle profile update function here` ******************/
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const passdata = {
            name,
            description: des,
            image,
        }


        const response = await MakePost(`api/categories`, passdata, token);

        if (response?.success) {
            toast.success(response?.message);
            setname('');
            setimage('');
            setdes('');
            fetching(id, token);
        } else {
            toast.error('Something went Wrong');
        }

        setLoading(false);

    };






    /*************** handle delete  **************/
    const handleDelect = async (id) => {
        try {
            setfetchloading(true);
            const response = await MakeDelete(`api/categories/${id}`, token);

            if (response?.success) {
                toast.success(response?.message);
                fetching(id, token);
            } else {
                toast.error("Something Went Wrong");
            }

            setfetchloading(false);
        } catch (error) {
            console.error("Error fetching profile:", error);
            setfetchloading(false);
        }
    }



    console.log(data);



    return (
        <div className="w-full">
            <div className="w-full">

                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Add Category
                    </h1>
                </div>


                {
                    fetchloading ? (
                        // Skeleton Loading
                        <SkeletonLoader />
                    ) : (

                        <div>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Name */}
                                <div>
                                    <label className="block text-gray-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        disabled={isLoading}
                                        onChange={(e) => { setname(e.target.value) }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-gray-700 mb-1">Image</label>
                                    <input
                                        type="file"
                                        name="image"
                                        disabled={isLoading}
                                        onChange={(e) => { handleFileChange(e, setimage) }}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>


                                {
                                    image && (
                                        <div className="w-full flex items-center justify-start">
                                            <Image className="border border-gray-200 rounded-lg w-[300px] h-[230px] object-contain" src={image} alt="Image" width={200} height={200} />
                                        </div>
                                    )
                                }



                                {/* Address */}
                                <div>
                                    <label className="block text-gray-700 mb-1">Descriptions</label>
                                    <textarea
                                        name="address"
                                        value={des}
                                        disabled={isLoading}
                                        onChange={(e) => { setdes(e.target.value) }}
                                        rows="6"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    ></textarea>
                                </div>

                                {/* Update Button */}
                                <div className="w-full flex justify-end">
                                    <button
                                        type="submit"
                                        className="w-fit px-3 bg-sky-400 text-white py-2 rounded-lg hover:bg-sky-600 cursor-pointer transition flex items-center justify-center gap-2"
                                    >

                                        {
                                            isLoading && <SpinLoader />
                                        }

                                        Add Category
                                    </button>
                                </div>
                            </form>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-left">
                                    Added Category : <span>{data?.categories?.length}</span>
                                </h1>
                                <div>
                                    <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {data?.categories?.map((cat, idx) => (
                                            <div
                                                key={idx}
                                                className="text-center bg-gray-50 rounded-xl shadow-sm overflow-hidden hover:scale-102 transform transition duration-300 relative"
                                            >
                                                <button className="bg-red-700 p-1 text-white rounded-full absolute top-0 right-0 cursor-pointer z-40" onClick={() => { handleDelect(cat?.id) }}>
                                                    <MdDeleteOutline />
                                                </button>
                                                <div className="relative w-full h-56">
                                                    <Image
                                                        width={1000}
                                                        height={1000}
                                                        src={cat?.image}
                                                        alt={cat?.name}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                                <div className="p-6">
                                                    <h3 className="text-2xl font-semibold mb-2 text-[#333333] line-clamp-1">{cat?.name}</h3>
                                                    <p className="text-gray-600 line-clamp-3">{cat?.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )

                }



            </div>
        </div>
    );
}


























function SkeletonLoader() {
    return (
        <div className="animate-pulse space-y-6">
            {/* Form Skeleton */}
            <div className="h-10 bg-gray-200 rounded w-1/3"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
            <div className="h-24 bg-gray-200 rounded w-full"></div>
            <div className="h-10 bg-gray-200 rounded w-1/4"></div>

            {/* Categories Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                {Array.from({ length: 3 }).map((_, idx) => (
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