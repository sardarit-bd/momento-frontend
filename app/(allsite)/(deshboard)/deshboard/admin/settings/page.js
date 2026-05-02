"use client";
import useLoadingStore from "@/store/useLoadingStore";
import getId from "@/utilis/helper/cookie/getid";
import getCookie from "@/utilis/helper/cookie/gettooken";
import MakeGet from "@/utilis/requestrespose/get";
import MakePut from "@/utilis/requestrespose/put";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SiteSettings() {

    const id = getId();
    const token = getCookie();
    const { isLoading, setLoading } = useLoadingStore();
    const [fetchloading, setfetchloading] = useState(true);
    const [isedit, setisedit] = useState(false);
    const [key, setkey] = useState('');
    const [secret, setsecret] = useState('');
    const [webhooksecret, setwebhooksecret] = useState('');
    const [credientialsID, setcredientialsID] = useState(null);





    const fetching = useCallback(async (token) => {
        try {
            const response = await MakeGet(`api/secrets`, token);


            console.log("Fetched profile:", response);



            setkey(response?.data?.[0]?.stripe_publishable_key);
            setsecret(response?.data?.[0]?.stripe_secret_key);
            setwebhooksecret(response?.data?.[0]?.stripe_webhook_key);
            setcredientialsID(response?.data?.[0]?.id);

            setfetchloading(false);
        } catch (error) {
            console.error("Error fetching profile:", error);
            setfetchloading(false);
        }
    }, [token]);


    // Simulate fetching user data
    useEffect(() => {

        fetching(token);

    }, [fetching, token]);




    /************** handle profile update function here` ******************/
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const passdata = {
            stripe_publishable_key: key,
            stripe_secret_key: secret,
            stripe_webhook_key: webhooksecret,
        }


        const response = await MakePut(`api/secrets/${credientialsID}`, passdata, token);

        if (response) {
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
                        Site Settings
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
                        <form onSubmit={handleSubmit} className="space-y-5 border border-gray-200 p-6 rounded-lg bg-white">

                            <h2 className="text-2xl">Stripe Credientials</h2>

                            {/* Name */}
                            <div>
                                <label className="block text-gray-700 mb-1">Stripe Key</label>
                                <input
                                    type="text"
                                    name="stripe-key"
                                    value={key}
                                    disabled={!isedit}
                                    onChange={(e) => { setkey(e.target.value) }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-gray-700 mb-1">Stripe Secret</label>
                                <input
                                    type="text"
                                    value={secret}
                                    name="stripe-secret"
                                    disabled={!isedit}
                                    onChange={(e) => { setsecret(e.target.value) }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* phone */}
                            <div>
                                <label className="block text-gray-700 mb-1">Stripe Webhook Secret</label>
                                <input
                                    type="text"
                                    name="stripe-webhook-secret"
                                    disabled={!isedit}
                                    value={webhooksecret}
                                    onChange={(e) => { setwebhooksecret(e.target.value) }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>


                            {/* Update Button */}
                            <div className="w-full flex justify-end">
                                <button
                                    type="submit"
                                    className="w-fit px-3 bg-sky-400 text-white py-2 rounded-lg hover:bg-sky-600 transition flex items-center justify-center gap-2 cursor-pointer"
                                >

                                    {
                                        isLoading && <div className="w-[20px] h-[20px] rounded-full border-b-3 border-l-3 bordergray-50 animate-spin">
                                        </div>
                                    }

                                    {
                                        isLoading ? 'Saveing...' : 'Save Changes'
                                    }
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