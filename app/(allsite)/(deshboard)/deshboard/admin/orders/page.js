'use client'

import PDFViewers from "@/app/componnent/PDFViewers.jsx";
import SpinLoader from "@/app/componnent/SpingLoader.jsx";
import getCookie from "@/utilis/helper/cookie/gettooken";
import formatDateTime from "@/utilis/helper/formatDateTime.js";
//import pdfToPngDownload from "@/utilis/helper/pdfToPngDownload.js";
import MakeGet from "@/utilis/requestrespose/get";
import { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
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
    const [allorders, setallorders] = useState([]);




    const fetching = useCallback(async (token) => {
        try {
            const response = await MakeGet(`api/orders`, token);

            setallorders(response?.data);


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



    if (fetchloading) {
        return <RecentOrdersSkeleton />
    }


    return (
        <div>

            {allorders?.length > 0 ? (
                <OrderTable allorders={allorders} token={token} fetching={fetching} />
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
function OrderTable({ allorders, token, fetching }) {

    const [ismodalopen, setismodalopen] = useState(false);
    const [modalinfo, setmodalinfo] = useState(null);
    const [modaltype, setmodaltype] = useState("pdf");
    const [dloading, setdloading] = useState(false);
    const [currentIndex, setcurrentIndex] = useState(0);


    /***************************** hanlde dalivary function is here ********************************/
    const handleDalivary = async (e, order, index) => {
        e.preventDefault();

        const orderID = order?.id;
        setcurrentIndex(index);
        setdloading(true);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orderupdate/${orderID}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            },
            body: JSON.stringify({ status: "completed" }),
        });


        const updatedres = await res.json();

        setdloading(false);
        if (updatedres) {
            toast.success(updatedres?.message);
            fetching(token);
        } else {
            toast.error("Something went wrong");
        }
    }




    // console.log(allorders);





    return (
        <div className="w-full bg-white min-h-[83vh]">
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
                            <th className="px-4 py-3">Update Delivery Status</th>
                            <th className="px-4 py-3 text-right">Action</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 border-t border-gray-200">
                        {allorders?.map((order, index) => (
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

                                <td className="px-4 py-3 text-center">
                                    <button disabled={order.status == 'completed'} onClick={(e,) => { handleDalivary(e, order, index) }} className={`bg-sky-300 text-white px-2 py-1 cursor-pointer rounded-md ${order.status == 'completed' ? "opacity-50" : "opacity-100"}`}>
                                        {dloading ? (

                                            currentIndex === index ? <SpinLoader /> : "Delivary"

                                        ) : (
                                            "Delivary"
                                        )}
                                    </button>
                                </td>

                                <td className="px-4 py-3 text-right">
                                    <button onClick={() => { setmodaltype("pdf"); setismodalopen(true); setmodalinfo(order); }} className="text-blue-600 hover:underline text-sm mr-3 cursor-pointer">
                                        View PDF
                                    </button>
                                    <button onClick={() => { setmodaltype("png"); setismodalopen(true); setmodalinfo(order); }} className="text-blue-600 hover:underline text-sm mr-3 cursor-pointer">
                                        View PNG
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {ismodalopen && <TableModal setismodalopen={setismodalopen} modalinfo={modalinfo} modaltype={modaltype} />}
            <ToastContainer position="bottom-right" />
        </div>
    );
}









//******************* Modal Component is here *********************//
const TableModal = ({ setismodalopen, modalinfo, modaltype }) => {
    return (
        <div className="bg-white border border-gray-300 shadow-xl rounded-xl p-0 absolute inset-0 w-full h-full">
            <div onClick={() => { setismodalopen(false) }} className="text-white bg-sky-500 w-8 h-8 flex items-center justify-center p-4 rounded-full absolute hover:rotate-180 transition duration-300 -top-4 -right-4 cursor-pointer shadow-xl">
                x
            </div>


            <ImageDownloadInfo modalinfo={modalinfo} modaltype={modaltype} />

        </div>
    )
}





















function ImageDownloadInfo({ modalinfo, modaltype }) {
    const parseMaybeJson = (value) => {
        if (!value) return null;
        if (typeof value === "object") return value;
        if (typeof value !== "string") return null;
        try {
            return JSON.parse(value);
        } catch {
            return null;
        }
    };

    const buildDeckPreviewFromCard = (card) => {
        if (!card || typeof card !== "object") return null;
        if (card.baseImage) return card.baseImage;
        return null;
    };

    const isImageLikeUrl = (value) => {
        if (typeof value !== "string") return false;
        if (value.startsWith("data:image/")) return true;
        return /\.(jpg|jpeg|png|webp|gif|bmp|svg)(\?.*)?$/i.test(value);
    };

    const collectImageUrlsDeep = (node, path = "", bag = []) => {
        if (!node) return bag;

        if (Array.isArray(node)) {
            node.forEach((entry, index) => collectImageUrlsDeep(entry, `${path}[${index}]`, bag));
            return bag;
        }

        if (typeof node === "string") {
            if (isImageLikeUrl(node)) bag.push(node);
            return bag;
        }

        if (typeof node !== "object") return bag;

        Object.entries(node).forEach(([key, rawValue]) => {
            const value = parseMaybeJson(rawValue) || rawValue;
            const fullPath = `${path}.${key}`.toLowerCase();

            // Prefer customization-related keys to avoid unrelated catalog image noise.
            const looksCustomizationField =
                fullPath.includes("final") ||
                fullPath.includes("custom") ||
                fullPath.includes("preview") ||
                fullPath.includes("front") ||
                fullPath.includes("back") ||
                fullPath.includes("base") ||
                fullPath.includes("layer");

            if (typeof value === "string" && isImageLikeUrl(value) && looksCustomizationField) {
                bag.push(value);
                return;
            }

            if (typeof value === "string" && value.startsWith("data:image/")) {
                bag.push(value);
                return;
            }

            if (Array.isArray(value) || (value && typeof value === "object")) {
                collectImageUrlsDeep(value, fullPath, bag);
            }
        });

        return bag;
    };

    const extractCustomizedImagesFromOrder = (order) => {
        const items = Array.isArray(order?.items)
            ? order.items
            : Array.isArray(order?.order_items)
                ? order.order_items
                : Array.isArray(order?.orderItems)
                    ? order.orderItems
                    : [];
        const images = [];

        items.forEach((item) => {
            const possibleSources = [
                item,
                item?.product,
                item?.pivot,
                parseMaybeJson(item?.product_data),
                parseMaybeJson(item?.productData),
                parseMaybeJson(item?.meta),
                parseMaybeJson(item?.customization_data),
                parseMaybeJson(item?.customizationData),
            ].filter(Boolean);

            possibleSources.forEach((src) => {
                const finalProductImages =
                    parseMaybeJson(src?.FinalProductImages) ||
                    parseMaybeJson(src?.final_product_images) ||
                    src?.FinalProductImages ||
                    src?.final_product_images;
                if (Array.isArray(finalProductImages)) {
                    finalProductImages.forEach((url) => {
                        if (typeof url === "string" && url) images.push(url);
                    });
                }

                const previews =
                    parseMaybeJson(src?.previews) ||
                    parseMaybeJson(src?.preview_images) ||
                    src?.previews ||
                    src?.preview_images;
                if (previews && typeof previews === "object") {
                    if (typeof previews.front === "string" && previews.front) images.push(previews.front);
                    if (typeof previews.back === "string" && previews.back) images.push(previews.back);
                }

                const finalProduct =
                    parseMaybeJson(src?.FinalProduct) ||
                    parseMaybeJson(src?.final_product) ||
                    src?.FinalProduct ||
                    src?.final_product;
                if (Array.isArray(finalProduct)) {
                    finalProduct.forEach((entry) => {
                        if (typeof entry === "string" && entry) {
                            images.push(entry);
                            return;
                        }
                        const deckBase = buildDeckPreviewFromCard(entry);
                        if (deckBase) images.push(deckBase);
                    });
                }

                // Generic fallback: recursively scan this source for customization image URLs.
                collectImageUrlsDeep(src, "item", images);
            });
        });

        // Order-level fallback in case backend stores customization outside items.
        collectImageUrlsDeep(order, "order", images);

        const deduped = [];
        images.forEach((url) => {
            if (!url) return;
            if (!deduped.includes(url)) deduped.push(url);
        });

        return deduped;
    };

    const pngImages = extractCustomizedImagesFromOrder(modalinfo);

    return (
        <div className="w-full h-full rounded-xl bg-white">
            <div className="w-full h-full flex items-center gap-4 flex-wrap">
                {modaltype === "pdf" ? (
                    <PDFViewers fulldata={modalinfo} url={modalinfo?.customized_file_url} />
                ) : (
                    <div className="w-full h-full overflow-y-auto p-6 bg-slate-50">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">Customized Card Images</h3>
                        {pngImages.length === 0 ? (
                            <div className="text-sm text-slate-600">No customized PNG images found for this order.</div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {pngImages.map((url, index) => (
                                    <a
                                        key={`${url}-${index}`}
                                        href={url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="block bg-white rounded-xl border border-slate-200 p-2 shadow-sm hover:shadow-md transition"
                                    >
                                        <img
                                            src={url}
                                            alt={`customized-card-${index + 1}`}
                                            className="w-full h-auto rounded-lg object-cover"
                                        />
                                        <p className="text-xs text-slate-500 mt-2 text-center">Image {index + 1}</p>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                )}


            </div>
        </div>
    );
}
