'use client';
import useboxcartstore from "@/store/useboxcartstore";
import captureNodeScreenshotForTranding from "@/utilis/helper/captureNodeScreenshotForTranding";
import Image from "next/image";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast } from "react-toastify";
import CharactersCountComponent from "../CharactersCountComponent";
import SpinLoader from "../SpingLoader";


const BoxPreview = ({ bfor, boxref, boxTitle, setboxTitle, created, setcreated, BoxPreviewOpen, setboxPreviewOpen, children }) => {



    const [isloading, setisloading] = useState(false);
    const { boxs, setboxs } = useboxcartstore();



    //handle boxcapturehandle capture
    const boxcapturehandle = async (e) => {
        e.preventDefault();

        if (boxs.length > 0) {
            toast.warn("Packaging Design Already Captured");
            return;
        }

        setisloading(true);
        await captureNodeScreenshotForTranding(boxref.current, boxs, setboxs);
        setisloading(false);
        // setboxPreviewOpen(false);

    }



    // handle remove function is here
    function handleRemored(e, index) {
        e.preventDefault();
        const updated = boxs.filter((_, i) => i !== index);
        setboxs([...updated]);

    }








    return (
        <div className="absolute inset-0 w-4/4 h-4/4 flex items-center z-50">
            <div className={`h-[650px] bg-white rounded-r-3xl shadow-2xl text-balck flex justify-between transition-all duration-500 ${BoxPreviewOpen ? " w-[350px] md:w-[500px] lg:w-[600px] border-r border-gray-300" : "w-[10px] border-r border-gray-50"}`}>
                <div className={`h-full p-4 flex items-center justify-center transition-all duration-500 ${BoxPreviewOpen ? "w-full opacity-100 block" : "w-0 opacity-0 hidden"}`}>
                    <div className="flex flex-col gap-4">
                        <div className="">
                            {children}
                        </div>
                        <div className="flex flex-col lg:flex-row items-end justify-end gap-3">


                            {
                                bfor === "trading" ? (
                                    <div className="flex flex-col lg:flex-row item-center gap-2 justify-end">
                                        <div className="flex flex-col gap-0">
                                            <label className="text-gray-800/50 font-medium flex items-center justify-between">
                                                <span>Pack Title: </span>
                                                <div className="relative -mb-5">
                                                    <CharactersCountComponent text={boxTitle} limit={14} />
                                                </div>
                                            </label>
                                            <input maxLength={13} value={boxTitle} onChange={(e) => { setboxTitle(e.target.value) }} type="text" className="border border-gray-200 rounded-md focus:outline-none text-gray-500 px-2 py-1" />
                                        </div>
                                        <div className="flex flex-col gap-0">
                                            <label className="text-gray-800/50 font-medium flex items-center justify-between">
                                                <span>Created For:</span>
                                                <div className="relative -mb-5">
                                                    <CharactersCountComponent text={created} limit={14} />
                                                </div>
                                            </label>

                                            <input maxLength={13} value={created} onChange={(e) => { setcreated(e.target.value) }} type="text" className="border border-gray-200 rounded-md focus:outline-none text-gray-500 px-2 py-1" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex item-center gap-2 justify-end">
                                        <div className="flex flex-col gap-0">
                                            <label className="text-gray-800/50 font-medium flex items-center justify-between">
                                                <span>Box Title: </span>
                                                <div className="relative -mb-5">
                                                    <CharactersCountComponent text={boxTitle} limit={14} />
                                                </div>
                                            </label>
                                            <input maxLength={13} value={boxTitle} onChange={(e) => { setboxTitle(e.target.value) }} type="text" className="border border-gray-200 rounded-md focus:outline-none text-gray-500 px-2 py-1" />
                                        </div>
                                    </div>
                                )
                            }


                            <button onClick={(e) => { boxcapturehandle(e) }} className="bg-sky-400 text-white rounded-md px-2 py-1 shadow-lg flex items-center gap-2 cursor-pointer">
                                {isloading && <SpinLoader />}
                                Done
                            </button>
                        </div>
                        <div>
                            {
                                boxs?.map((i, index) => {
                                    return (
                                        <div className="relative w-[60px] h-auto border border-gray-200" key={index}>
                                            <Image src={i} key={index} width={1000} height={1000} alt="box Design" />

                                            <div className="absolute top-0 right-0">
                                                <button onClick={(e) => { handleRemored(e, index) }} className="bg-red-600 rounded-full w-[15px] h-[15px] flex items-center justify-center translate-y-[-50%] translate-x-[50%] cursor-pointer">x</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className={`h-full w-fit flex items-center transition-all duration-300 ${BoxPreviewOpen ? "-translate-x-1/2" : "translate-x-0"}`}>
                    <div onClick={() => { setboxPreviewOpen(!BoxPreviewOpen) }} className="flex rounded-md items-center cursor-pointer">
                        <div className="h-[80px] w-[18px] flex items-center bg-sky-300 rounded-xl">
                            <IoIosArrowDown className={`text-xl text-white ${BoxPreviewOpen ? "rotate-90" : "rotate-270"}`} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BoxPreview;