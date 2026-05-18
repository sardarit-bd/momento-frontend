'use client'

import PDFViewers from "@/app/componnent/PDFViewers.jsx";
import getCookie from "@/utilis/helper/cookie/gettooken";
import formatDateTime from "@/utilis/helper/formatDateTime.js";
//import pdfToPngDownload from "@/utilis/helper/pdfToPngDownload.js";
import MakeGet from "@/utilis/requestrespose/get";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
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
    const [fetchloading, setfetchloading] = useState(true);
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [allorders, setallorders] = useState([]);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
    });


    const fetching = useCallback(async (page = 1) => {
        try {
            if (page === 1 && allorders?.length === 0) {
                setfetchloading(true);
            } else {
                setIsPageLoading(true);
            }
            const response = await MakeGet(`api/admin/orders?page=${page}`, token);

            const payload = response?.data || {};
            setallorders(payload?.orders || []);
            setPagination(payload?.pagination || {
                current_page: 1,
                last_page: 1,
                per_page: 10,
                total: 0,
            });

            setfetchloading(false);
            setIsPageLoading(false);
        } catch (error) {
            console.error("Error fetching profile:", error);
            setfetchloading(false);
            setIsPageLoading(false);
        }
    }, [token]);



    // Simulate fetching user data
    useEffect(() => {

        fetching(1);

    }, [fetching]);



    if (fetchloading) {
        return <RecentOrdersSkeleton />
    }


    return (
        <div>

            {allorders?.length > 0 ? (
                <OrderTable
                    allorders={allorders}
                    pagination={pagination}
                    onPageChange={fetching}
                    token={token}
                    isPageLoading={isPageLoading}
                />
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
function OrderTable({ allorders, pagination, onPageChange, token, isPageLoading }) {

    const [ismodalopen, setismodalopen] = useState(false);
    const [modalinfo, setmodalinfo] = useState(null);
    const [modaltype, setmodaltype] = useState("pdf");
    const [modalLoading, setModalLoading] = useState(false);

    const hasPdfData = (order) => {
        return Boolean(
            order?.customized_file_url ||
            order?.customized_pdf_url ||
            order?.pdf_url ||
            order?.customized_file?.url ||
            order?.customizedFileUrl
        );
    };

    const hasPngData = (order) => {
        return Boolean(
            (Array.isArray(order?.order_items) && order.order_items.length > 0) ||
            (Array.isArray(order?.items) && order.items.length > 0)
        );
    };

    const openOrderModal = async (order, type) => {
        setmodaltype(type);
        setismodalopen(true);
        setmodalinfo(order);

        const needsDetailFetch = type === "pdf" ? !hasPdfData(order) : !hasPngData(order);
        if (!needsDetailFetch) {
            setModalLoading(false);
            return;
        }

        setModalLoading(true);
        try {
            const detailRes = await MakeGet(`api/admin/orders/${order.id}`, token);
            const detailData = detailRes?.data?.order || detailRes?.data;
            if (detailData) {
                setmodalinfo(detailData);
            }
        } catch (error) {
            console.error("Failed to load order details:", error);
        } finally {
            setModalLoading(false);
        }
    };

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
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">Is Customized</th>
                            <th className="px-4 py-3">Payment Status</th>
                            <th className="px-4 py-3 text-center">Action</th>
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

                                <td className="px-4 py-3 text-center">
                                    <button onClick={() => { openOrderModal(order, "pdf"); }} className="text-blue-600 hover:underline text-sm mr-3 cursor-pointer">
                                        View PDF
                                    </button>
                                    <button onClick={() => { openOrderModal(order, "png"); }} className="text-blue-600 hover:underline text-sm mr-3 cursor-pointer">
                                        View PNG
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isPageLoading && (
                <div className="mt-3 text-sm text-gray-500">Loading page...</div>
            )}
            <div className="flex items-center justify-between mt-4 text-sm text-gray-700">
                <p>
                    Showing page {pagination?.current_page || 1} of {pagination?.last_page || 1}
                </p>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onPageChange((pagination?.current_page || 1) - 1)}
                        disabled={!pagination?.current_page || pagination.current_page <= 1}
                        className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => onPageChange((pagination?.current_page || 1) + 1)}
                        disabled={!pagination?.last_page || pagination.current_page >= pagination.last_page}
                        className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </div>
            {ismodalopen && <TableModal setismodalopen={setismodalopen} modalinfo={modalinfo} modaltype={modaltype} modalLoading={modalLoading} />}
            <ToastContainer position="bottom-right" />
        </div>
    );
}

//******************* Modal Component is here *********************//
const TableModal = ({ setismodalopen, modalinfo, modaltype, modalLoading }) => {
    return (
        <div className="bg-white border border-gray-300 shadow-xl rounded-xl p-0 absolute inset-0 w-full h-full">
            <div onClick={() => { setismodalopen(false) }} className="text-white bg-sky-500 w-8 h-8 flex items-center justify-center p-4 rounded-full absolute hover:rotate-180 transition duration-300 -top-4 -right-4 cursor-pointer shadow-xl">
                x
            </div>


            {modalLoading ? (
                <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">
                    Loading order details...
                </div>
            ) : (
                <ImageDownloadInfo modalinfo={modalinfo} modaltype={modaltype} />
            )}

        </div>
    )
}


function ImageDownloadInfo({ modalinfo, modaltype }) {
    const parseMaybeJson = (value) => {
        if (!value) return null;
        if (typeof value === "object") return value;
        if (typeof value !== "string") return null;
        try { return JSON.parse(value); } catch { return null; }
    };

    const isImageLikeUrl = (value) => {
        if (typeof value !== "string") return false;
        if (value.startsWith("data:image/")) return true;
        return /\.(jpg|jpeg|png|webp|gif|bmp|svg)(\?.*)?$/i.test(value);
    };

    // Extract card images from order_items → cards[]
    const extractCardImages = (order) => {
        const images = [];
        const items = order?.order_items ?? order?.items ?? [];
        items.forEach((item) => {
            const cards = item?.cards ?? [];
            if (Array.isArray(cards)) {
                cards.forEach((card) => {
                    if (card?.image) images.push(card.image);
                });
            }
        });
        return [...new Set(images.filter(Boolean))];
    };

    // Extract tuckbox images from order_items → tuckbox_image
    const extractTuckboxImages = (order) => {
        const images = [];
        const items = order?.order_items ?? order?.items ?? [];
        items.forEach((item) => {
            if (item?.tuckbox_image && isImageLikeUrl(item.tuckbox_image)) {
                images.push(item.tuckbox_image);
            }
        });
        return [...new Set(images.filter(Boolean))];
    };

    const cardImages   = extractCardImages(modalinfo);
    const tuckboxImages = extractTuckboxImages(modalinfo);

    const pdfUrl =
        modalinfo?.customized_file_url ||
        modalinfo?.customized_pdf_url  ||
        modalinfo?.pdf_url             ||
        modalinfo?.customized_file?.url ||
        modalinfo?.customizedFileUrl;

    return (
        <div className="w-full h-full rounded-xl bg-white">
            {modaltype === "pdf" ? (
                <PDFViewers fulldata={modalinfo} url={pdfUrl} />
            ) : (
                <div className="w-full h-full overflow-y-auto p-6 bg-slate-50 space-y-8">

                    {/* Tuckbox Preview */}
                    {tuckboxImages.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-4">
                                Box Preview
                            </h3>
                            <div className="flex flex-wrap gap-4">
                                {tuckboxImages.map((url, index) => (
    <a                                    // ← was missing
        key={`tuckbox-${index}`}
        href={url}
        download={`tuckbox-${index + 1}.png`}
        rel="noreferrer"
        className="block bg-white rounded-xl border border-slate-200 p-2 shadow-sm hover:shadow-md transition w-[200px]"
    >
        <img
            src={url}
            alt={`tuckbox-${index + 1}`}
            className="w-full h-auto rounded-lg object-contain"
        />
        <p className="text-xs text-center text-slate-500 mt-1">
            Box {index + 1}
        </p>
    </a>
))}
                            </div>
                        </div>
                    )}

                    {/* Card Images */}
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">
                            Customized Card Images
                        </h3>
                        {cardImages.length === 0 ? (
                            <div className="text-sm text-slate-600">
                                No customized card images found for this order.
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                                {cardImages.map((url, index) => (
                                    
                                        key={`card-${index}`}
                                        href={url}
                                        download={`card-${index + 1}.png`}
                                        rel="noreferrer"
                                        className="block bg-white rounded-xl border border-slate-200 p-1.5 md:p-2 shadow-sm hover:shadow-md transition"
                                    >
                                        <img
                                            src={url}
                                            alt={`customized-card-${index + 1}`}
                                            className="w-full h-auto rounded-lg object-contain"
                                        />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            )}
        </div>
    );
}
