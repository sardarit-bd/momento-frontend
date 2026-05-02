"use client";
import useLoadingStore from "@/store/useLoadingStore";
import getId from "@/utilis/helper/cookie/getid";
import getCookie from "@/utilis/helper/cookie/gettooken";
import MakeGet from "@/utilis/requestrespose/get";
import MakePut from "@/utilis/requestrespose/put";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ProfilePage() {

    const id = getId();
    const token = getCookie();
    const { isLoading, setLoading } = useLoadingStore();
    const [fetchloading, setfetchloading] = useState(true);
    const [isedit, setisedit] = useState(false);
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [address, setaddress] = useState('');




    const fetching = useCallback(async (id, token) => {
        try {
            const response = await MakeGet(`api/profile/${id}`, token);

            setname(response?.data?.user?.name);
            setemail(response?.data?.user?.email);
            setphone(response?.data?.user?.phone);
            setaddress(response?.data?.user?.address);

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
            email,
            phone,
            address
        }

        const response = await MakePut(`api/profile/${id}`, passdata, token);

        if (response?.success) {
            toast.success(response?.message);
            setisedit(false);
            fetching(id, token);
        } else {
            toast.error('Something went Wrong');
        }

        setLoading(false);

    };



    return (
        <div className="flex justify-center items-center">
            <div className="w-full">

                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Profile Information
                    </h1>
                    <div>
                        {
                            isedit ? (
                                <button onClick={() => { setisedit(false) }} className="bg-yellow-300 cursor-pointer text-black px-2 rounded-md">Cancel</button>
                            ) : (
                                <button onClick={() => { setisedit(true) }} className="bg-green-300 text-black px-2 cursor-pointer rounded-md">Edit</button>
                            )
                        }


                    </div>
                </div>


                {
                    fetchloading ? (
                        // Skeleton Loading
                        <ProfileSkleton />
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name */}
                            <div>
                                <label className="block text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    disabled={!isedit}
                                    onChange={(e) => { setname(e.target.value) }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    disabled={true}
                                    value={email}
                                    onChange={(e) => { setemail(e.target.value) }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* phone */}
                            <div className="hidden">
                                <label className="block text-gray-700 mb-1">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    disabled={!isedit}
                                    value={phone && phone != null ? phone : ""}
                                    onChange={(e) => { setphone(e.target.value) }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Address */}
                            <div className="hidden">
                                <label className="block text-gray-700 mb-1">Address</label>
                                <textarea
                                    name="address"
                                    value={address && address != null ? address : ""}
                                    disabled={!isedit}
                                    onChange={(e) => { setaddress(e.target.value) }}
                                    rows="6"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                ></textarea>
                            </div>

                            {/* Update Button */}
                            <div className="w-full flex justify-end">
                                <button
                                    type="submit"
                                    className="w-fit px-3 bg-sky-400 text-white py-2 rounded-lg hover:bg-sky-600 transition flex items-center justify-center gap-2"
                                >

                                    {
                                        isLoading && <div className="w-[20px] h-[20px] rounded-full border-b-3 border-l-3 bordergray-50 animate-spin">
                                        </div>
                                    }

                                    Update Profile
                                </button>
                            </div>
                        </form>
                    )

                }



            </div>
        </div >
    );
}
















const ProfileSkleton = () => {
    return (
        <div className="space-y-4 animate-pulse">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="flex justify-end">
                <div className="h-12 w-32 bg-gray-200 rounded"></div>
            </div>
        </div>
    )
}