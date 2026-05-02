'use client'

import Alluserskalaton from "@/app/componnent/skelaton/Alluserskalaton";
import getCookie from "@/utilis/helper/cookie/gettooken";
import getDateFromTimestamp from "@/utilis/helper/getDateFromTimestamp";
import MakeGet from "@/utilis/requestrespose/get";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AllUser = () => {




    const [loading, setloading] = useState(false);
    const [AllUser, setAlluser] = useState(null);
    const token = getCookie();


    const fetchingUser = useCallback(async () => {

        setloading(true);
        const res = await MakeGet(`api/subscribers`, token);
        setloading(false);

        if (res.success) {

            setAlluser(res?.data);

        } else {
            toast.error('Something went Wrong');
        }



    }, [token])


    useEffect(() => {
        fetchingUser();
    }, [fetchingUser])


    if (loading) return <Alluserskalaton />



    return (
        <div>
            <div className="">
                <div className="overflow-hidden">
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-700">All Users</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                                <tr>
                                    <th className="py-3 px-6 text-left">SL</th>
                                    <th className="py-3 px-6 text-left">Name</th>
                                    <th className="py-3 px-6 text-left">Type</th>
                                    <th className="py-3 px-6 text-left">Email</th>
                                    <th className="py-3 px-6 text-left">Joined</th>
                                </tr>
                            </thead>

                            <tbody className="text-gray-600 text-sm">

                                {
                                    AllUser?.length > 0 ? (

                                        AllUser?.map((item, index) => {
                                            return (
                                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                                    <td className="py-3 px-6">{index + 1}</td>
                                                    <td className="py-3 px-6 font-medium">{item?.name ? item?.name : "-"}</td>
                                                    <td className="py-3 px-6">{item?.email}</td>
                                                    <td className="py-3 px-6">{item?.type}</td>
                                                    <td className="py-3 px-6">{getDateFromTimestamp(item?.created_at
                                                    )}</td>
                                                </tr>
                                            )
                                        })
                                    ) : (
                                        <tr className="text-left py-6">
                                            <td className="py-6">
                                                No Data Found
                                            </td>
                                        </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default AllUser;