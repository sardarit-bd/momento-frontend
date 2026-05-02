'use client'

import getId from "@/utilis/helper/cookie/getid.js";
import getCookie from "@/utilis/helper/cookie/gettooken";
import formatDateTime from "@/utilis/helper/formatDateTime.js";
import MakeGet from "@/utilis/requestrespose/get";
import { useCallback, useEffect, useState } from "react";
import RecentOrdersSkeleton from "../../../../../componnent/skelaton/RecentOrdersSkeleton.jsx";




//******************* Beage stles is here *********************//
const statusStyles = {
    completed: "bg-green-100 text-green-700",
    Paid: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Cancelled: "bg-red-100 text-red-700",
    Unpaid: "bg-yellow-100 text-yellow-700",
};






//******************* Order Table Component is here *********************//
const AdminOrders = () => {


    const token = getCookie();
    const id = getId();
    const [fetchloading, setfetchloading] = useState(true);
    const [allorders, setallorders] = useState([]);




    const fetching = useCallback(async (token, id) => {
        try {
            const response = await MakeGet(`api/myorders/${id}`, token);

            setallorders(response?.data);


            setfetchloading(false);
        } catch (error) {
            console.error("Error fetching profile:", error);
            setfetchloading(false);
        }
    }, [id, token]);



    // Simulate fetching user data
    useEffect(() => {

        fetching(token, id);

    }, [fetching, token, id]);




    if (fetchloading) {
        return <RecentOrdersSkeleton />
    }


    return (
        <div>

            {allorders?.data?.length > 0 ? (
                <OrderTable allorders={allorders?.data} />
            ) : (
                <div className="text-center py-10">
                    <p className="text-gray-600">No orders found.</p>
                </div>
            )}

        </div>
    )
}



export default AdminOrders;


















//******************* Order Table Component is here *********************//
function OrderTable({ allorders }) {

    console.log(allorders);


    return (
        <div className="w-full bg-white">
            <div className="border-b border-gray-200">
                <h2 className="text-lg pb-6 font-semibold text-gray-800">
                    Recent Orders
                </h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-l border-b border-r border-gray-200 pb-[100px]">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="px-4 py-3">Order ID</th>
                            <th className="px-4 py-3">Customer</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Total</th>
                            <th className="px-4 py-3">Is Customized</th>
                            <th className="px-4 py-3">Payment Status</th>
                            <th className="px-4 py-3">Delivery Status</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 border-t border-gray-200">
                        {allorders?.map((order) => (
                            <tr
                                key={order.id}
                                className="hover:bg-gray-50 transition"
                            >
                                <td className="px-4 py-3 font-medium text-gray-800">
                                    {order.id}
                                </td>

                                <td className="px-4 py-3">
                                    <div className="font-medium text-gray-800">
                                        {order.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {order.email}
                                    </div>
                                </td>

                                <td className="px-4 py-3 text-gray-600">
                                    {formatDateTime(order.created_at)}
                                </td>

                                <td className="px-4 py-3 font-semibold text-gray-800">
                                    {order.total}
                                </td>

                                <td className="px-4 py-3 font-semibold text-gray-800">
                                    {order.is_customized ? "Customizable" : "Simple"}
                                </td>

                                <td className="px-4 py-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[order.is_paid ? "Paid" : "Unpaid"]}`}
                                    >
                                        {order.is_paid ? "Paid" : "Unpaid"}
                                    </span>
                                </td>

                                <td className="px-4 py-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[order.status]}`}
                                    >
                                        {order.status == 'completed' ? "Delivered" : order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

