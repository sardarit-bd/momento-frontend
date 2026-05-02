"use client";

import { useEffect, useState } from "react";

export default function PaymentHistory() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulated API fetch — replace with your actual endpoint
        setTimeout(() => {
            setPayments([
                {
                    id: "TXN20251109A",
                    date: "2025-11-09",
                    method: "Stripe",
                    amount: 29.99,
                    status: "Completed",
                },
                {
                    id: "TXN20251103B",
                    date: "2025-11-03",
                    method: "PayPal",
                    amount: 12.49,
                    status: "Pending",
                },
                {
                    id: "TXN20251028C",
                    date: "2025-10-28",
                    method: "Credit Card",
                    amount: 49.0,
                    status: "Failed",
                },
                {
                    id: "TXN20251109A",
                    date: "2025-11-09",
                    method: "Stripe",
                    amount: 29.99,
                    status: "Completed",
                },
                {
                    id: "TXN20251103B",
                    date: "2025-11-03",
                    method: "PayPal",
                    amount: 12.49,
                    status: "Pending",
                },
                {
                    id: "TXN20251028C",
                    date: "2025-10-28",
                    method: "Credit Card",
                    amount: 49.0,
                    status: "Failed",
                },
                {
                    id: "TXN20251109A",
                    date: "2025-11-09",
                    method: "Stripe",
                    amount: 29.99,
                    status: "Completed",
                },
                {
                    id: "TXN20251103B",
                    date: "2025-11-03",
                    method: "PayPal",
                    amount: 12.49,
                    status: "Pending",
                },
                {
                    id: "TXN20251028C",
                    date: "2025-10-28",
                    method: "Credit Card",
                    amount: 49.0,
                    status: "Failed",
                },
                {
                    id: "TXN20251109A",
                    date: "2025-11-09",
                    method: "Stripe",
                    amount: 29.99,
                    status: "Completed",
                },
                {
                    id: "TXN20251103B",
                    date: "2025-11-03",
                    method: "PayPal",
                    amount: 12.49,
                    status: "Pending",
                },
                {
                    id: "TXN20251028C",
                    date: "2025-10-28",
                    method: "Credit Card",
                    amount: 49.0,
                    status: "Failed",
                },
                {
                    id: "TXN20251109A",
                    date: "2025-11-09",
                    method: "Stripe",
                    amount: 29.99,
                    status: "Completed",
                },
                {
                    id: "TXN20251103B",
                    date: "2025-11-03",
                    method: "PayPal",
                    amount: 12.49,
                    status: "Pending",
                },
                {
                    id: "TXN20251028C",
                    date: "2025-10-28",
                    method: "Credit Card",
                    amount: 49.0,
                    status: "Failed",
                },
                {
                    id: "TXN20251109A",
                    date: "2025-11-09",
                    method: "Stripe",
                    amount: 29.99,
                    status: "Completed",
                },
                {
                    id: "TXN20251103B",
                    date: "2025-11-03",
                    method: "PayPal",
                    amount: 12.49,
                    status: "Pending",
                },
                {
                    id: "TXN20251028C",
                    date: "2025-10-28",
                    method: "Credit Card",
                    amount: 49.0,
                    status: "Failed",
                },
                {
                    id: "TXN20251109A",
                    date: "2025-11-09",
                    method: "Stripe",
                    amount: 29.99,
                    status: "Completed",
                },
                {
                    id: "TXN20251103B",
                    date: "2025-11-03",
                    method: "PayPal",
                    amount: 12.49,
                    status: "Pending",
                },
                {
                    id: "TXN20251028C",
                    date: "2025-10-28",
                    method: "Credit Card",
                    amount: 49.0,
                    status: "Failed",
                },
                {
                    id: "TXN20251109A",
                    date: "2025-11-09",
                    method: "Stripe",
                    amount: 29.99,
                    status: "Completed",
                },
                {
                    id: "TXN20251103B",
                    date: "2025-11-03",
                    method: "PayPal",
                    amount: 12.49,
                    status: "Pending",
                },
                {
                    id: "TXN20251028C",
                    date: "2025-10-28",
                    method: "Credit Card",
                    amount: 49.0,
                    status: "Failed",
                },
                {
                    id: "TXN20251109A",
                    date: "2025-11-09",
                    method: "Stripe",
                    amount: 29.99,
                    status: "Completed",
                },
                {
                    id: "TXN20251103B",
                    date: "2025-11-03",
                    method: "PayPal",
                    amount: 12.49,
                    status: "Pending",
                },
                {
                    id: "TXN20251028C",
                    date: "2025-10-28",
                    method: "Credit Card",
                    amount: 49.0,
                    status: "Failed",
                },
                {
                    id: "TXN20251109A",
                    date: "2025-11-09",
                    method: "Stripe",
                    amount: 29.99,
                    status: "Completed",
                },
                {
                    id: "TXN20251103B",
                    date: "2025-11-03",
                    method: "PayPal",
                    amount: 12.49,
                    status: "Pending",
                },
                {
                    id: "TXN20251028C",
                    date: "2025-10-28",
                    method: "Credit Card",
                    amount: 49.0,
                    status: "Failed",
                },
                {
                    id: "TXN20251109A",
                    date: "2025-11-09",
                    method: "Stripe",
                    amount: 29.99,
                    status: "Completed",
                },
                {
                    id: "TXN20251103B",
                    date: "2025-11-03",
                    method: "PayPal",
                    amount: 12.49,
                    status: "Pending",
                },
                {
                    id: "TXN20251028C",
                    date: "2025-10-28",
                    method: "Credit Card",
                    amount: 49.0,
                    status: "Failed",
                },
                {
                    id: "TXN20251109A",
                    date: "2025-11-09",
                    method: "Stripe",
                    amount: 29.99,
                    status: "Completed",
                },
                {
                    id: "TXN20251103B",
                    date: "2025-11-03",
                    method: "PayPal",
                    amount: 12.49,
                    status: "Pending",
                },
                {
                    id: "TXN20251028C",
                    date: "2025-10-28",
                    method: "Credit Card",
                    amount: 49.0,
                    status: "Failed",
                },
            ]);
            setLoading(false);
        }, 800);
    }, []);

    return (
        <section className="min-h-screen">
            <div className="">
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
                    Payment History
                </h1>

                {loading ? (
                    <div className="text-gray-400 text-center py-20">
                        Loading payment records...
                    </div>
                ) : payments.length === 0 ? (
                    <div className="text-gray-400 text-center py-20">
                        No payments found.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300 rounded-md">
                            <thead>
                                <tr className="text-left text-sm text-gray-800 border-b border-gray-300">
                                    <th className="py-3 px-4">Transaction ID</th>
                                    <th className="py-3 px-4">Date</th>
                                    <th className="py-3 px-4">Payment Method</th>
                                    <th className="py-3 px-4 text-right">Amount</th>
                                    <th className="py-3 px-4 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((p, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-gray-300 hover:bg-white/10 transition"
                                    >
                                        <td className="py-3 px-4 text-sm text-gray-500">{p.id}</td>
                                        <td className="py-3 px-4 text-sm text-gray-500">{p.date}</td>
                                        <td className="py-3 px-4 text-sm text-gray-500">{p.method}</td>
                                        <td className="py-3 px-4 text-sm text-right text-gray-500">
                                            ${p.amount.toFixed(2)}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-center">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${p.status === "Completed"
                                                    ? "bg-green-600/20 text-green-500 border border-green-200"
                                                    : p.status === "Pending"
                                                        ? "bg-yellow-600/20 text-yellow-600 border border-yellow-200"
                                                        : "bg-red-600/20 text-red-500 border border-red-200"
                                                    }`}
                                            >
                                                {p.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
}
