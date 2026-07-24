'use client'

import PDFViewers from "@/app/componnent/PDFViewers.jsx";
import getCookie from "@/utilis/helper/cookie/gettooken";
import formatDateTime from "@/utilis/helper/formatDateTime.js";
//import pdfToPngDownload from "@/utilis/helper/pdfToPngDownload.js";
import MakeGet from "@/utilis/requestrespose/get";
import { useCallback, useEffect, useRef, useState } from "react";
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
            console.log("RAW orders response:", response);

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
        setmodalinfo(null); // reset first

        if (type === "receipt") {
            if (!order?.tgc_receipt_id) {
                setmodalinfo({ _error: "No TGC receipt found for this order." });
                return;
            }
            setModalLoading(true);
            try {
                const res = await MakeGet(`api/tgc/receipts/${order.tgc_receipt_id}`, token);
                setmodalinfo(res?.data?.data || res?.data || {});

                const receipt = res?.data?.data || res?.data || {};

                if (receipt?.shipping_address_id) {
                    const addrRes = await MakeGet(`api/tgc/addresses/${receipt.shipping_address_id}`, token);
                    receipt._shippingAddress = addrRes?.data?.data || addrRes?.data || null;
                }

                setmodalinfo(receipt);

            } catch (error) {
                console.error("Failed to fetch receipt:", error);
                setmodalinfo({ _error: "Failed to load receipt." });
            } finally {
                setModalLoading(false);
            }
            return;
        }

        // existing pdf/png logic unchanged
        setmodalinfo(order);
        const needsDetailFetch = type === "pdf" ? !hasPdfData(order) : !hasPngData(order);
        if (!needsDetailFetch) { setModalLoading(false); return; }

        setModalLoading(true);
        try {
            const detailRes = await MakeGet(`api/admin/orders/${order.id}`, token);
            const detailData = detailRes?.data?.order || detailRes?.data;
            if (detailData) setmodalinfo(detailData);
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
                                    <button onClick={() => { openOrderModal(order, "receipt"); }} className="text-blue-600 hover:underline text-sm mr-3 cursor-pointer">
                                        Receipt
                                    </button>
                                    {/* <button onClick={() => { openOrderModal(order, "png"); }} className="text-blue-600 hover:underline text-sm mr-3 cursor-pointer">
                                        View PNG
                                    </button> */}
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
    const modalRef = useRef(null);

    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.scrollTop = 0;
        }
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto px-4 sm:px-6 md:px-10">
            <div onClick={() => { setismodalopen(false) }} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <div ref={modalRef} className="relative bg-white border border-gray-200 shadow-2xl rounded-2xl w-full max-w-4xl max-h-[calc(100vh-180px)] sm:max-h-[85vh] md:max-h-[80vh] flex flex-col overflow-hidden mt-32 sm:mt-0">
                <div className="sticky top-0 z-10 flex justify-between items-center p-4 bg-white/90 backdrop-blur-sm border-b border-gray-100 rounded-t-2xl">
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        {modaltype === "receipt" ? "Receipt Details" : modaltype === "pdf" ? "PDF Preview" : "Order Details"}
                    </h3>
                    <button onClick={() => { setismodalopen(false) }} className="text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {modalLoading ? (
                    <div className="flex items-center justify-center h-64 text-gray-600 text-sm">
                        Loading order details...
                    </div>
                ) : (
                    <div className="overflow-y-auto flex-1 p-4 sm:p-6">
                        <ImageDownloadInfo modalinfo={modalinfo} modaltype={modaltype} />
                    </div>
                )}
            </div>
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
            { modaltype === "receipt" ? (        
                <ReceiptView data={modalinfo} />
            ) : modaltype === "pdf" ? (
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
                                    <a                                    
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

function ReceiptView({ data }) {

    const handleDownloadPDF = async () => {
        const { default: jsPDF } = await import('jspdf');

        const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
        const pageWidth = pdf.internal.pageSize.getWidth();
        const marginL = 40;
        const marginR = pageWidth - 40;
        let y = 40;

        // ── Column positions ──
        const col = {
            name:  marginL,
            qty:   marginR - 180,
            price: marginR - 100,
            total: marginR,
        };

        // ── Helpers ──
        const setStyle = (size = 11, bold = false) => {
            pdf.setFontSize(size);
            pdf.setFont('helvetica', bold ? 'bold' : 'normal');
        };

        const newLine = (gap = 16) => { y += gap; };

        const drawDivider = () => {
            pdf.setDrawColor(200, 200, 200);
            pdf.line(marginL, y, marginR, y);
        };

        // ── Header ──
        setStyle(18, true);
        pdf.text('Thank You For Your Purchase!', marginL, y);
        newLine(22);

        setStyle(11, false);
        pdf.text('We really appreciate your business. Please tell your friends about us.', marginL, y);
        newLine(28);

        // ── Table top border ──
        drawDivider();
        newLine(14);

        // ── Table header row ──
        setStyle(10, true);
        pdf.text('Name',  col.name,  y);
        pdf.text('Qty',   col.qty,   y, { align: 'right' });
        pdf.text('Price', col.price, y, { align: 'right' });
        pdf.text('Total', col.total, y, { align: 'right' });
        newLine(10);

        // ── Border below header ──
        drawDivider();
        newLine(14);

        // ── Table rows ──
        setStyle(10, false);
        if (items.length > 0) {
            items.forEach((item) => {
                const name = pdf.splitTextToSize(
                    String(item.name),
                    col.qty - col.name - 10
                )[0];
                pdf.text(name,                       col.name,  y);
                pdf.text(String(item.qty),           col.qty,   y, { align: 'right' });
                pdf.text(fmt(subtotal),              col.price, y, { align: 'right' });
                pdf.text(fmt(subtotal * item.qty),   col.total, y, { align: 'right' });
                newLine(16);
            });
        } else {
            const name = pdf.splitTextToSize(
                String(data?.id ?? ''),
                col.qty - col.name - 10
            )[0];
            pdf.text(name,           col.name,  y);
            pdf.text('1',            col.qty,   y, { align: 'right' });
            pdf.text(fmt(subtotal),  col.price, y, { align: 'right' });
            pdf.text(fmt(subtotal),  col.total, y, { align: 'right' });
            newLine(16);
        }

        // ── Table bottom border ──
        drawDivider();
        newLine(14);

        // ── Totals section ──
        const addRow = (label, value, bold = false) => {
            setStyle(10, bold);
            pdf.text(label, col.name,  y);
            pdf.text(value, col.total, y, { align: 'right' });
            newLine(16);
        };

        addRow('Subtotal', fmt(subtotal), true);
        addRow(`Shipping: ${shippingMethod}`, fmt(shippingCost));
        if (handlingFee > 0)   addRow('Handling Fee',        fmt(handlingFee));
        if (insuranceCost > 0) addRow('Insurance',           fmt(insuranceCost));
        addRow('Total', fmt(total), true);
        if (shopCreditUsed > 0) addRow('Shop Credit',        `-${fmt(shopCreditUsed)}`);
        addRow(
            'Grand Total',
            grandTotal < 0 ? `-${fmt(Math.abs(grandTotal))}` : fmt(grandTotal),
            true
        );

        // ── Divider before Ship To ──
        newLine(8);
        drawDivider();
        newLine(24);

        // ── Ship To ──
        setStyle(13, true);
        pdf.text('Ship To', marginL, y);
        newLine(20);

        setStyle(10, false);
        [
            shipName,
            shipCompany,
            shipAddr1,
            shipAddr2,
            [shipCity, shipState, shipZip].filter(Boolean).join(', '),
            shipCountry,
            shipPhone,
        ]
            .filter(Boolean)
            .forEach((line) => {
                pdf.text(line, marginL, y);
                newLine(16);
            });

        // ── Save ──
        pdf.save(`receipt-${data?.id ?? Date.now()}.pdf`);
    };

    if (!data || data?._error) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-3 opacity-50">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <p className="text-sm font-medium">{data?._error || "No receipt data available."}</p>
            </div>
        );
    }

    const items = data?.packing_list?.[0]?.packing_list
        ? Object.entries(data.packing_list[0].packing_list).map(([name, qty]) => ({ name, qty }))
        : [];

    const subtotal        = parseFloat(data?.subtotal        ?? 0);
    const shippingCost    = parseFloat(data?.shipping_cost   ?? 0);
    const handlingFee     = parseFloat(data?.handling_fee    ?? 0);
    const insuranceCost   = parseFloat(data?.insurance_cost  ?? 0);
    const total           = parseFloat(data?.total           ?? 0);
    const shopCreditUsed  = parseFloat(data?.shop_credit_used ?? 0);
    const grandTotal      = parseFloat(data?.grand_total     ?? 0);
    const shippingMethod  = data?.shipping_method ?? "Standard Shipping";

    const shipping    = data?._shippingAddress ?? {};
    const shipName    = shipping?.name          ?? data?.name     ?? "";
    const shipCompany = shipping?.company       ?? "";
    const shipAddr1   = shipping?.address1      ?? "";
    const shipAddr2   = shipping?.address2      ?? "";
    const shipCity    = shipping?.city          ?? "";
    const shipState   = shipping?.state         ?? "";
    const shipZip     = shipping?.postal_code   ?? "";
    const shipCountry = shipping?.country       ?? "";
    const shipPhone   = shipping?.phone_number  ?? "";

    const fmt = (n) => `$${Math.abs(n).toFixed(2)}`;

    return (
        <div className="w-full h-full overflow-y-auto bg-white font-sans text-sm text-gray-800">

            {/* ── Download button — hidden when printing ── */}
            <div className="flex justify-center sm:justify-end px-8 pt-2 pb-4 print:hidden">
                <button
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium px-4 py-2 rounded-lg shadow transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Download Receipt
                </button>
            </div>

            {/* ── Printable receipt area ── */}
            <div id="receipt-print-area" className="px-8 pb-8">

                {/* Header */}
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Thank You For Your Purchase!</h1>
                <p className="text-gray-600 mb-6">We really appreciate your business. Please tell your friends about us.</p>

                {/* Items Table */}
                <table className="w-full border border-gray-300 mb-6 text-sm">
                    <thead>
                        <tr className="border-b border-gray-300">
                            <th className="text-left px-3 py-2 font-semibold">Name</th>
                            <th className="text-center px-3 py-2 font-semibold">Quantity</th>
                            <th className="text-right px-3 py-2 font-semibold">Price Each</th>
                            <th className="text-right px-3 py-2 font-semibold">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 ? items.map((item, i) => (
                            <tr key={i} className="border-b border-gray-200">
                                <td className="px-3 py-2 text-blue-600">{item.name}</td>
                                <td className="px-3 py-2 text-center">{item.qty}</td>
                                <td className="px-3 py-2 text-right">{fmt(subtotal)}</td>
                                <td className="px-3 py-2 text-right">{fmt(subtotal * item.qty)}</td>
                            </tr>
                        )) : (
                            <tr className="border-b border-gray-200">
                                <td className="px-3 py-2 text-blue-600">{data?.id}</td>
                                <td className="px-3 py-2 text-center">1</td>
                                <td className="px-3 py-2 text-right">{fmt(subtotal)}</td>
                                <td className="px-3 py-2 text-right">{fmt(subtotal)}</td>
                            </tr>
                        )}
                        <tr className="border-b border-gray-300 bg-white">
                            <td colSpan={3} className="px-3 py-2 font-bold">Subtotal</td>
                            <td className="px-3 py-2 text-right font-bold">{fmt(subtotal)}</td>
                        </tr>
                        <tr className="border-b border-gray-200 bg-gray-50">
                            <td colSpan={3} className="px-3 py-2">Shipping Method: {shippingMethod}</td>
                            <td className="px-3 py-2 text-right">{fmt(shippingCost)}</td>
                        </tr>
                        {handlingFee > 0 && (
                            <tr className="border-b border-gray-200 bg-gray-50">
                                <td colSpan={3} className="px-3 py-2">Handling Fee</td>
                                <td className="px-3 py-2 text-right">{fmt(handlingFee)}</td>
                            </tr>
                        )}
                        {insuranceCost > 0 && (
                            <tr className="border-b border-gray-200 bg-gray-50">
                                <td colSpan={3} className="px-3 py-2">Shipping Insurance</td>
                                <td className="px-3 py-2 text-right">{fmt(insuranceCost)}</td>
                            </tr>
                        )}
                        <tr className="border-b border-gray-300 bg-white">
                            <td colSpan={3} className="px-3 py-2 font-bold">Total</td>
                            <td className="px-3 py-2 text-right font-bold">{fmt(total)}</td>
                        </tr>
                        {shopCreditUsed > 0 && (
                            <tr className="border-b border-gray-200 bg-gray-50">
                                <td colSpan={3} className="px-3 py-2">Shop Credit</td>
                                <td className="px-3 py-2 text-right text-gray-800">-{fmt(shopCreditUsed)}</td>
                            </tr>
                        )}
                        {grandTotal < 0 && (
                            <tr className="border-b border-gray-200 bg-gray-50">
                                <td colSpan={3} className="px-3 py-2">Refunds Applied</td>
                                <td className="px-3 py-2 text-right">-{fmt(Math.abs(grandTotal))}</td>
                            </tr>
                        )}
                        <tr className="bg-white">
                            <td colSpan={3} className="px-3 py-2 font-bold">Grand Total</td>
                            <td className="px-3 py-2 text-right font-bold">
                                {grandTotal < 0 ? `-${fmt(grandTotal)}` : fmt(grandTotal)}
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Ship To */}
                <h2 className="text-xl font-bold text-gray-900 mb-2">Ship To</h2>
                <div className="text-gray-700 leading-6">
                    {shipName    && <p>{shipName}</p>}
                    {shipCompany && <p>{shipCompany}</p>}
                    {shipAddr1   && <p>{shipAddr1}</p>}
                    {shipAddr2   && <p>{shipAddr2}</p>}
                    {(shipCity || shipState || shipZip) && (
                        <p>{[shipCity, shipState, shipZip].filter(Boolean).join(", ")}</p>
                    )}
                    {shipCountry && <p>{shipCountry}</p>}
                    {shipPhone   && <p>{shipPhone}</p>}
                </div>
            </div>
        </div>
    );
}