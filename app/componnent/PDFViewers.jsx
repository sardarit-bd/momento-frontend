"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export default function PDFViewers({
    url,
    fulldata,
    title = "PDF Preview",
}) {


    const [status, setStatus] = useState("loading"); // loading | ready | error

    // cache-bust if you want to force reload when same URL changes slightly
    const src = useMemo(() => {
        if (!url) return "";
        return url;
    }, [url]);

    useEffect(() => {
        setStatus(url ? "loading" : "error");
    }, [url]);

    return (
        <div className="w-full h-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
                <div>
                    <p className="text-sm font-semibold text-slate-900">{title}</p>
                    <p className="text-xs text-slate-500 break-all">
                        {url ? url : "No PDF URL provided"}
                    </p>
                </div>

                {url ? (
                    <div className="flex items-center gap-5">
                        <span className="bg-sky-200  px-4 py-1 rounded-md font-bold">Customaizable Card</span>
                        <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
                        >
                            Open
                        </a>
                    </div>
                ) : (
                    <>
                        {
                            fulldata?.order_type === "Simple" && (
                                <span className="bg-sky-200  px-4 py-1 rounded-md font-bold">Simple Card</span>
                            )

                        }
                    </>
                )}
            </div>

            {/* Body */}
            <div className="bg-slate-50 p-4 h-[79vh]">
                <div className="h-full w-full overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
                    {!url ? (
                        fulldata?.order_type === "Simple" ? (
                            <div className="flex h-full items-center justify-center p-6 text-sm text-rose-700">
                                <Image src={fulldata?.items?.[0]?.product?.image} width={400} height={400} alt="Simple Card" />
                            </div>
                        ) : (
                            <div className="flex h-full items-center justify-center p-6 text-sm text-slate-600">
                                PDF URL missing.
                            </div>
                        )
                    ) : (
                        <>
                            {status === "loading" && (
                                <div className="flex h-full items-center justify-center p-6 text-sm text-slate-600">
                                    Loading PDF...
                                </div>
                            )}

                            <iframe
                                title={title}
                                src={src}
                                className="h-full w-full"
                                onLoad={() => setStatus("ready")}
                                onError={() => setStatus("error")}
                            />

                            {status === "error" && (
                                <div className="absolute inset-0 flex items-center justify-center p-6 text-sm text-rose-700">
                                    Failed to load PDF. Check the URL / CORS.
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
