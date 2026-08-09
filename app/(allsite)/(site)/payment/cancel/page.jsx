"use client";

import Link from "next/link";

export default function PaymentFailedPage() {
    return (
        <div className="bg-slate-50">
            <div className="mx-auto max-w-3xl px-4 py-12">
                <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                    {/* Icon */}
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 ring-1 ring-rose-100">
                        <svg
                            viewBox="0 0 24 24"
                            className="h-7 w-7 text-rose-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M18 6L6 18" />
                            <path d="M6 6l12 12" />
                        </svg>
                    </div>

                    <div className="mt-5 text-center">
                        <h1 className="text-2xl font-semibold text-slate-900">
                            Payment Failed
                        </h1>
                        <p className="mt-2 text-sm text-slate-600">
                            We couldn’t process your payment. Please try again or use another
                            payment method.
                        </p>
                    </div>


                    {/* Actions */}
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Link
                            href="/my-cart"
                            className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 sm:w-auto"
                        >
                            Try Again
                        </Link>
                    </div>

                    {/* Help */}
                    <p className="mt-6 text-center text-xs text-slate-500">
                        Still having trouble?{" "}
                        <Link href="/contact" className="font-medium text-slate-700 hover:underline">
                            Contact support
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
