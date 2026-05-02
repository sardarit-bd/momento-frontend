'use client'

import useProductUploadStore from "@/store/useProductUploadStore";
import getCookie from "@/utilis/helper/cookie/gettooken";
import handleFileChange from "@/utilis/helper/handlefilechange";
import handleFileChangeMultipul from "@/utilis/helper/handlefilechangemultipul";
import handlemultipulfilechangeForcustomaizationbaseUrl from "@/utilis/helper/handlemultipulfilechangeForcustomaizationbaseUrl";
import MakeGet from "@/utilis/requestrespose/get";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import SpinLoader from "./SpingLoader";

const Two = () => {

    const token = getCookie();
    const [isLoading, setLoading] = useState(false);
    const [data, setdata] = useState(null);
    const {
        rander, setrander,
        productType, setproductType,
        productName, setproductName,
        productPrice, setproductPrice,
        productDescription, setproductDescription,
        productShortDescription, setproductShortDescription,
        productofferPrice, setproductofferPrice,
        productCategory, setproductCategory,
        productCategoryName, setproductCategoryName,
        productTags, setproductTags,
        productStatus, setproductStatus,
        productThumbnail, setproductThumbnail,
        productSingleImage, setproductSingleImage,
        productImages, setproductImages,
        layerBaseCard, setlayerBaseCard,
        layerSkinTone, setlayerSkinTone,
        layerHair, setlayerHair,
        layerNose, setlayerNose,
        layerEyes, setlayerEyes,
        layerMouth, setlayerMouth,
        layerDress, setlayerDress,
        layerCrown, setlayerCrown,
        layerBeard, setlayerBeard,
        tredingFrontBase, settredingFrontBase,
        tredingBackBase, settredingBackBase,
    } = useProductUploadStore();


    /************** Fetching all categories ******************/
    const fetching = useCallback(async (token) => {
        try {
            const response = await MakeGet(`api/categories`, token);
            setdata(response?.data?.categories);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    }, [token]);


    /*************** run useEffect one time ***************/
    useEffect(() => {
        fetching(token);
    }, [fetching]);




    /************* Handle Preview Image gallery Removed *****************/
    const handleRemove = (index, images, seterImages) => {
        // Create a new array without the clicked item
        const updatedImages = images?.filter((_, i) => i !== index);
        seterImages(updatedImages);
    };





    /************* Handle Preview Image gallery Removed *****************/
    const handleRemoveForcustomaizationBaseURl = (index, images, seterImages, Type) => {


        const updatedImagesWithType = images?.map((item, i) => {
            if (item.card_type === Type) {
                return {
                    ...item,
                    images: item?.images?.filter((_, i) => i !== index)
                }
            }

            return item;
        });

        // Create a new array without the clicked item
        seterImages(updatedImagesWithType);
    };





    /********** handle next function **********/
    const handleNext = () => {

        if (productType === "customizable") {

            if (productName && productPrice > 0 && productShortDescription && productCategory && productThumbnail && productImages?.length > 0 && layerBaseCard?.length > 0 && layerSkinTone?.length > 0) {
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    setrander(3);
                }, 900);
            } else {
                toast.warn("Please Fill Up All Required Fileds");
            }


        } else if (productType === "trading") {


            if (productName && productPrice > 0 && productShortDescription && productCategory && productThumbnail && productImages?.length > 0 && tredingFrontBase?.length > 0 && tredingBackBase?.length > 0) {
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    setrander(3);
                }, 900);
            } else {
                toast.warn("Please Fill Up All Required Fileds");
            }


        } else {


            if (productName && productPrice > 0 && productShortDescription && productCategory && productThumbnail && productImages?.length > 0) {
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    setrander(3);
                }, 900);
            } else {
                toast.warn("Please Fill Up All Required Fileds");
            }

        }

    }


    return (
        <div className="flex justify-center px-2">
            <div className="w-full bg-white rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                    <div className="space-y-5 col-span-1 md:col-span-8 border border-gray-300 rounded-md px-4 py-3">

                        {/* Name */}
                        <div>
                            <label className="block text-gray-700 mb-1">Name <span className="text-red-500 text-xl">*</span></label>
                            <input
                                type="text"
                                name="name"
                                value={productName}
                                onChange={(e) => { setproductName(e.target.value) }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>


                        {/* Type */}
                        <div>
                            <label className="block text-gray-700 mb-1">Type <span className="text-red-500 text-xl">*</span></label>
                            <input
                                disabled
                                type="text"
                                name="type"
                                value={productType === "simple" ? "Simple" : productType === "trading" ? "Trading" : "Customizable"}
                                onChange={(e) => { e.target.value }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>


                        {/* Price */}
                        <div>
                            <label className="block text-gray-700 mb-1">Price <span className="text-red-500 text-xl">*</span></label>
                            <input
                                type="number"
                                name="price"
                                value={productPrice}
                                onChange={(e) => { setproductPrice(e.target.value) }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
                            />
                        </div>

                        {/* Offer Price */}
                        <div>
                            <label className="block text-gray-700 mb-1">Offer Price</label>
                            <input
                                type="number"
                                name="offer_price"
                                value={productofferPrice}
                                onChange={(e) => { setproductofferPrice(e.target.value) }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-gray-700 mb-1">Category <span className="text-red-500 text-xl">*</span></label>
                            <select
                                name="status"
                                value={productCategory}
                                onChange={(e) => { setproductCategory(e.target.value) }}
                                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value={''}>Select Category</option>
                                {
                                    data?.map((item, index) => {
                                        return (
                                            <option key={index} value={JSON.stringify({ id: item?.id, name: item?.name })}>{item?.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>


                        {/* Status */}
                        <div>
                            <label className="block text-gray-700 mb-1">Status</label>
                            <select
                                name="status"
                                value={productStatus}
                                onChange={(e) => { setproductStatus(e.target.value) }}
                                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value={true}>Publish</option>
                                <option value={false}>Draft</option>
                            </select>
                        </div>


                        {/* Short Description */}
                        <div>
                            <label className="block text-gray-700 mb-1">Short Description <span className="text-red-500 text-xl">*</span></label>
                            <textarea
                                name="short_description"
                                value={productShortDescription}
                                onChange={(e) => { setproductShortDescription(e.target.value) }}
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            ></textarea>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-gray-700 mb-1">Description</label>
                            <textarea
                                name="description"
                                value={productDescription}
                                onChange={(e) => { setproductDescription(e.target.value) }}
                                rows="5"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            ></textarea>
                        </div>






                        {/* for customizable product */}

                        {
                            productType === 'customizable' && (
                                <>
                                    <div className="mt-6">
                                        <label className="block text-gray-700 mb-1">Base Card:
                                            <span className="px-1 py-0.5 text-sm rounded-md bg-sky-300 text-white">{layerBaseCard?.length}</span> <span className="text-red-500 text-xl">* </span>
                                            <span className="text-xs">Must Follow The serial (Heart,Dimonds,Club,Spade)</span>
                                        </label>

                                        <div className="w-full min-h-[170px] h-fit bg-gray-100 rounded-md p-2 overflow-y-scroll no-scrollbar flex flex-col gap-3">



                                            {/* Ace Card */}

                                            <div className="flex flex-wrap gap-2">
                                                {/* Image Previews */}

                                                {
                                                    layerBaseCard?.filter(t => t?.card_type === 'Ace_Card')?.map((t, idx) =>
                                                        t?.images?.map((src, i) => (
                                                            <div key={i} className="relative w-[54px] h-[54px] border-gray-200 rounded-md">
                                                                <Image
                                                                    src={src}
                                                                    alt={`Preview ${i}`}
                                                                    fill
                                                                    className="object-cover rounded-md border-gray-200"
                                                                />
                                                                <div
                                                                    onClick={() => handleRemoveForcustomaizationBaseURl(i, layerBaseCard, setlayerBaseCard, t?.card_type)}
                                                                    className="bg-sky-800 text-white w-4 h-4 rounded-full flex items-center justify-center absolute top-0 right-0 cursor-pointer"
                                                                >
                                                                    <RxCross2 className="text-white text-xs" />
                                                                </div>
                                                            </div>
                                                        ))
                                                    )
                                                }




                                                {/* Upload Button */}
                                                <label htmlFor="image_taker_base_card1">
                                                    <h2 className="text-gray-500 text-xs">Ace Card </h2>
                                                    <div
                                                        className="w-[54px] h-[54px] border border-gray-200 rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition"
                                                    >
                                                        <FaPlus className="text-xl text-gray-500" />
                                                    </div>
                                                </label>
                                                <input
                                                    onChange={(e) => { handlemultipulfilechangeForcustomaizationbaseUrl(e, setlayerBaseCard, layerBaseCard, "Ace_Card") }}
                                                    id="image_taker_base_card1"
                                                    type="file"
                                                    className="hidden"
                                                    multiple
                                                    accept=" image/png, image/jpeg, image/jpg"

                                                />
                                            </div>








                                            {/* JeckCard */}
                                            <div className="flex flex-wrap gap-2">
                                                {/* Image Previews */}
                                                {
                                                    layerBaseCard?.filter(t => t?.card_type === 'Jeck_Card')?.map((t, idx) =>
                                                        t?.images?.map((src, i) => (
                                                            <div key={i} className="relative w-[54px] h-[54px] border-gray-200 rounded-md">
                                                                <Image
                                                                    src={src}
                                                                    alt={`Preview ${i}`}
                                                                    fill
                                                                    className="object-cover rounded-md border-gray-200"
                                                                />
                                                                <div
                                                                    onClick={() => handleRemoveForcustomaizationBaseURl(i, layerBaseCard, setlayerBaseCard, t?.card_type)}
                                                                    className="bg-sky-800 text-white w-4 h-4 rounded-full flex items-center justify-center absolute top-0 right-0 cursor-pointer"
                                                                >
                                                                    <RxCross2 className="text-white text-xs" />
                                                                </div>
                                                            </div>
                                                        ))
                                                    )
                                                }


                                                {/* Upload Button */}
                                                <label htmlFor="image_taker_base_card2">
                                                    <h2 className="text-gray-500 text-xs">Jeck Card</h2>
                                                    <div
                                                        className="w-[54px] h-[54px] border border-gray-200 rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition"
                                                    >
                                                        <FaPlus className="text-xl text-gray-500" />
                                                    </div>
                                                </label>
                                                <input
                                                    onChange={(e) => { handlemultipulfilechangeForcustomaizationbaseUrl(e, setlayerBaseCard, layerBaseCard, 'Jeck_Card') }}
                                                    id="image_taker_base_card2"
                                                    type="file"
                                                    className="hidden"
                                                    multiple
                                                    accept=" image/png, image/jpeg, image/jpg"

                                                />
                                            </div>







                                            {/* King Card */}
                                            <div className="flex flex-wrap gap-2">
                                                {/* Image Previews */}
                                                {
                                                    layerBaseCard?.filter(t => t?.card_type === 'Queen_Card')?.map((t, idx) =>
                                                        t?.images?.map((src, i) => (
                                                            <div key={i} className="relative w-[54px] h-[54px] border-gray-200 rounded-md">
                                                                <Image
                                                                    src={src}
                                                                    alt={`Preview ${i}`}
                                                                    fill
                                                                    className="object-cover rounded-md border-gray-200"
                                                                />
                                                                <div
                                                                    onClick={() => handleRemoveForcustomaizationBaseURl(i, layerBaseCard, setlayerBaseCard, t?.card_type)}
                                                                    className="bg-sky-800 text-white w-4 h-4 rounded-full flex items-center justify-center absolute top-0 right-0 cursor-pointer"
                                                                >
                                                                    <RxCross2 className="text-white text-xs" />
                                                                </div>
                                                            </div>
                                                        ))
                                                    )
                                                }


                                                {/* Upload Button */}
                                                <label htmlFor="image_taker_base_card3">
                                                    <h2 className="text-gray-500 text-xs">Queen Card </h2>
                                                    <div
                                                        className="w-[54px] h-[54px] border border-gray-200 rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition"
                                                    >
                                                        <FaPlus className="text-xl text-gray-500" />
                                                    </div>
                                                </label>
                                                <input
                                                    onChange={(e) => { handlemultipulfilechangeForcustomaizationbaseUrl(e, setlayerBaseCard, layerBaseCard, "Queen_Card") }}
                                                    id="image_taker_base_card3"
                                                    type="file"
                                                    className="hidden"
                                                    multiple
                                                    accept=" image/png, image/jpeg, image/jpg"

                                                />
                                            </div>





                                            {/* King Card */}
                                            <div className="flex flex-wrap gap-2">
                                                {/* Image Previews */}
                                                {
                                                    layerBaseCard?.filter(t => t?.card_type === 'king_Card')?.map((t, idx) =>
                                                        t?.images?.map((src, i) => (
                                                            <div key={i} className="relative w-[54px] h-[54px] border-gray-200 rounded-md">
                                                                <Image
                                                                    src={src}
                                                                    alt={`Preview ${i}`}
                                                                    fill
                                                                    className="object-cover rounded-md border-gray-200"
                                                                />
                                                                <div
                                                                    onClick={() => handleRemoveForcustomaizationBaseURl(i, layerBaseCard, setlayerBaseCard, t?.card_type)}
                                                                    className="bg-sky-800 text-white w-4 h-4 rounded-full flex items-center justify-center absolute top-0 right-0 cursor-pointer"
                                                                >
                                                                    <RxCross2 className="text-white text-xs" />
                                                                </div>
                                                            </div>
                                                        ))
                                                    )
                                                }


                                                {/* Upload Button */}
                                                <label htmlFor="image_taker_base_card4">
                                                    <h2 className="text-gray-500 text-xs">King Card </h2>
                                                    <div
                                                        className="w-[54px] h-[54px] border border-gray-200 rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition"
                                                    >
                                                        <FaPlus className="text-xl text-gray-500" />
                                                    </div>
                                                </label>
                                                <input
                                                    onChange={(e) => { handlemultipulfilechangeForcustomaizationbaseUrl(e, setlayerBaseCard, layerBaseCard, "king_Card") }}
                                                    id="image_taker_base_card4"
                                                    type="file"
                                                    className="hidden"
                                                    multiple
                                                    accept=" image/png, image/jpeg, image/jpg"

                                                />
                                            </div>



                                            {/* Joker Card */}
                                            <div className="flex flex-wrap gap-2">
                                                {/* Image Previews */}
                                                {
                                                    layerBaseCard?.filter(t => t?.card_type === 'Joker_Card')?.map((t, idx) =>
                                                        t?.images?.map((src, i) => (
                                                            <div key={i} className="relative w-[54px] h-[54px] border-gray-200 rounded-md">
                                                                <Image
                                                                    src={src}
                                                                    alt={`Preview ${i}`}
                                                                    fill
                                                                    className="object-cover rounded-md border-gray-200"
                                                                />
                                                                <div
                                                                    onClick={() => handleRemoveForcustomaizationBaseURl(i, layerBaseCard, setlayerBaseCard, t?.card_type)}
                                                                    className="bg-sky-800 text-white w-4 h-4 rounded-full flex items-center justify-center absolute top-0 right-0 cursor-pointer"
                                                                >
                                                                    <RxCross2 className="text-white text-xs" />
                                                                </div>
                                                            </div>
                                                        ))
                                                    )
                                                }


                                                {/* Upload Button */}
                                                <label htmlFor="image_taker_base_card5">
                                                    <h2 className="text-gray-500 text-xs">Joker Card </h2>
                                                    <div
                                                        className="w-[54px] h-[54px] border border-gray-200 rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition"
                                                    >
                                                        <FaPlus className="text-xl text-gray-500" />
                                                    </div>
                                                </label>
                                                <input
                                                    onChange={(e) => { handlemultipulfilechangeForcustomaizationbaseUrl(e, setlayerBaseCard, layerBaseCard, "Joker_Card") }}
                                                    id="image_taker_base_card5"
                                                    type="file"
                                                    className="hidden"
                                                    multiple
                                                    accept=" image/png, image/jpeg, image/jpg"

                                                />
                                            </div>



                                        </div>
                                    </div>



                                    <div className="mt-6">
                                        <label className="block text-gray-700 mb-1">Skin Tone Card:
                                            <span className="px-1 py-0.5 text-sm rounded-md bg-sky-300 text-white">{layerSkinTone?.length}</span> <span className="text-red-500 text-xl">*</span>
                                        </label>

                                        <div className="w-full min-h-[170px] max-h-[200px] bg-gray-100 rounded-md p-2 overflow-y-scroll no-scrollbar">


                                            <div className="flex flex-wrap gap-2">
                                                {/* Image Previews */}
                                                {layerSkinTone?.map((src, idx) => (
                                                    <div key={idx} className="relative w-[54px] h-[54px] border-gray-200 rounded-md">
                                                        <Image
                                                            src={src}
                                                            alt={`Preview ${idx}`}
                                                            fill
                                                            className="object-cover rounded-md border-gray-200"
                                                        />
                                                        <div onClick={() => { handleRemove(idx, layerSkinTone, setlayerSkinTone) }} className="bg-sky-800 text-white w-4 h-4 rounded-full flex items-center justify-center absolute top-0 right-0 cursor-pointer">
                                                            <RxCross2 className="text-whtie text-xs" />
                                                        </div>
                                                    </div>
                                                ))}


                                                {/* Upload Button */}
                                                <label htmlFor="image_taker_skin_tone">
                                                    <div
                                                        className="w-[54px] h-[54px] border border-gray-200 rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition"
                                                    >
                                                        <FaPlus className="text-xl text-gray-500" />
                                                    </div>
                                                </label>
                                                <input
                                                    onChange={(e) => { handleFileChangeMultipul(e, setlayerSkinTone, layerSkinTone) }}
                                                    id="image_taker_skin_tone"
                                                    type="file"
                                                    className="hidden"
                                                    multiple
                                                    accept=" image/png, image/jpeg, image/jpg"

                                                />
                                            </div>
                                        </div>
                                    </div>



                                    <div className="mt-6">
                                        <label className="block text-gray-700 mb-1">Hair Card:
                                            <span className="px-1 py-0.5 text-sm rounded-md bg-sky-300 text-white">{layerHair?.length}</span> <span className="text-red-500 text-xl">*</span>
                                        </label>

                                        <div className="w-full min-h-[170px] max-h-[200px] bg-gray-100 rounded-md p-2 overflow-y-scroll no-scrollbar">


                                            <div className="flex flex-wrap gap-2">
                                                {/* Image Previews */}
                                                {layerHair?.map((src, idx) => (
                                                    <div key={idx} className="relative w-[54px] h-[54px] border-gray-200 rounded-md">
                                                        <Image
                                                            src={src}
                                                            alt={`Preview ${idx}`}
                                                            fill
                                                            className="object-cover rounded-md border-gray-200"
                                                        />
                                                        <div onClick={() => { handleRemove(idx, layerHair, setlayerHair) }} className="bg-sky-800 text-white w-4 h-4 rounded-full flex items-center justify-center absolute top-0 right-0 cursor-pointer">
                                                            <RxCross2 className="text-whtie text-xs" />
                                                        </div>
                                                    </div>
                                                ))}


                                                {/* Upload Button */}
                                                <label htmlFor="image_taker_Hair">
                                                    <div
                                                        className="w-[54px] h-[54px] border border-gray-200 rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition"
                                                    >
                                                        <FaPlus className="text-xl text-gray-500" />
                                                    </div>
                                                </label>
                                                <input
                                                    onChange={(e) => { handleFileChangeMultipul(e, setlayerHair, layerHair) }}
                                                    id="image_taker_Hair"
                                                    type="file"
                                                    className="hidden"
                                                    multiple
                                                    accept=" image/png, image/jpeg, image/jpg"

                                                />
                                            </div>
                                        </div>
                                    </div>



                                    <div className="mt-6">
                                        <label className="block text-gray-700 mb-1">Nose Card:
                                            <span className="px-1 py-0.5 text-sm rounded-md bg-sky-300 text-white">{layerNose?.length}</span> <span className="text-red-500 text-xl">*</span>
                                        </label>

                                        <div className="w-full min-h-[170px] max-h-[200px] bg-gray-100 rounded-md p-2 overflow-y-scroll no-scrollbar">


                                            <div className="flex flex-wrap gap-2">
                                                {/* Image Previews */}
                                                {layerNose?.map((src, idx) => (
                                                    <div key={idx} className="relative w-[54px] h-[54px] border-gray-200 rounded-md">
                                                        <Image
                                                            src={src}
                                                            alt={`Preview ${idx}`}
                                                            fill
                                                            className="object-cover rounded-md border-gray-200"
                                                        />
                                                        <div onClick={() => { handleRemove(idx, layerNose, setlayerNose) }} className="bg-sky-800 text-white w-4 h-4 rounded-full flex items-center justify-center absolute top-0 right-0 cursor-pointer">
                                                            <RxCross2 className="text-whtie text-xs" />
                                                        </div>
                                                    </div>
                                                ))}


                                                {/* Upload Button */}
                                                <label htmlFor="image_taker_nose_card">
                                                    <div
                                                        className="w-[54px] h-[54px] border border-gray-200 rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition"
                                                    >
                                                        <FaPlus className="text-xl text-gray-500" />
                                                    </div>
                                                </label>
                                                <input
                                                    onChange={(e) => { handleFileChangeMultipul(e, setlayerNose, layerNose) }}
                                                    id="image_taker_nose_card"
                                                    type="file"
                                                    className="hidden"
                                                    multiple
                                                    accept=" image/png, image/jpeg, image/jpg"

                                                />
                                            </div>
                                        </div>
                                    </div>



                                    <div className="mt-6">
                                        <label className="block text-gray-700 mb-1">Eyes Card:
                                            <span className="px-1 py-0.5 text-sm rounded-md bg-sky-300 text-white">{layerEyes?.length}</span> <span className="text-red-500 text-xl">*</span>
                                        </label>

                                        <div className="w-full min-h-[170px] max-h-[200px] bg-gray-100 rounded-md p-2 overflow-y-scroll no-scrollbar">


                                            <div className="flex flex-wrap gap-2">
                                                {/* Image Previews */}
                                                {layerEyes?.map((src, idx) => (
                                                    <div key={idx} className="relative w-[54px] h-[54px] border-gray-200 rounded-md">
                                                        <Image
                                                            src={src}
                                                            alt={`Preview ${idx}`}
                                                            fill
                                                            className="object-cover rounded-md border-gray-200"
                                                        />
                                                        <div onClick={() => { handleRemove(idx, layerEyes, setlayerEyes) }} className="bg-sky-800 text-white w-4 h-4 rounded-full flex items-center justify-center absolute top-0 right-0 cursor-pointer">
                                                            <RxCross2 className="text-whtie text-xs" />
                                                        </div>
                                                    </div>
                                                ))}


                                                {/* Upload Button */}
                                                <label htmlFor="image_taker_Eyes_card">
                                                    <div
                                                        className="w-[54px] h-[54px] border border-gray-200 rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition"
                                                    >
                                                        <FaPlus className="text-xl text-gray-500" />
                                                    </div>
                                                </label>
                                                <input
                                                    onChange={(e) => { handleFileChangeMultipul(e, setlayerEyes, layerEyes) }}
                                                    id="image_taker_Eyes_card"
                                                    type="file"
                                                    className="hidden"
                                                    multiple
                                                    accept=" image/png, image/jpeg, image/jpg"

                                                />
                                            </div>
                                        </div>
                                    </div>




                                    <div className="mt-6">
                                        <label className="block text-gray-700 mb-1">Mouth Card:
                                            <span className="px-1 py-0.5 text-sm rounded-md bg-sky-300 text-white">{layerMouth?.length}</span> <span className="text-red-500 text-xl">*</span>
                                        </label>

                                        <div className="w-full min-h-[170px] max-h-[200px] bg-gray-100 rounded-md p-2 overflow-y-scroll no-scrollbar">


                                            <div className="flex flex-wrap gap-2">
                                                {/* Image Previews */}
                                                {layerMouth?.map((src, idx) => (
                                                    <div key={idx} className="relative w-[54px] h-[54px] border-gray-200 rounded-md">
                                                        <Image
                                                            src={src}
                                                            alt={`Preview ${idx}`}
                                                            fill
                                                            className="object-cover rounded-md border-gray-200"
                                                        />
                                                        <div onClick={() => { handleRemove(idx, layerMouth, setlayerMouth) }} className="bg-sky-800 text-white w-4 h-4 rounded-full flex items-center justify-center absolute top-0 right-0 cursor-pointer">
                                                            <RxCross2 className="text-whtie text-xs" />
                                                        </div>
                                                    </div>
                                                ))}


                                                {/* Upload Button */}
                                                <label htmlFor="image_taker_mouth_Card">
                                                    <div
                                                        className="w-[54px] h-[54px] border border-gray-200 rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition"
                                                    >
                                                        <FaPlus className="text-xl text-gray-500" />
                                                    </div>
                                                </label>
                                                <input
                                                    onChange={(e) => { handleFileChangeMultipul(e, setlayerMouth, layerMouth) }}
                                                    id="image_taker_mouth_Card"
                                                    type="file"
                                                    className="hidden"
                                                    multiple
                                                    accept=" image/png, image/jpeg, image/jpg"

                                                />
                                            </div>
                                        </div>
                                    </div>






                                    <div className="mt-6">
                                        <label className="block text-gray-700 mb-1">Dress Card:
                                            <span className="px-1 py-0.5 text-sm rounded-md bg-sky-300 text-white">{layerDress?.length}</span> <span className="text-red-500 text-xl">*</span>
                                        </label>

                                        <div className="w-full min-h-[170px] max-h-[200px] bg-gray-100 rounded-md p-2 overflow-y-scroll no-scrollbar">


                                            <div className="flex flex-wrap gap-2">
                                                {/* Image Previews */}
                                                {layerDress?.map((src, idx) => (
                                                    <div key={idx} className="relative w-[54px] h-[54px] border-gray-200 rounded-md">
                                                        <Image
                                                            src={src}
                                                            alt={`Preview ${idx}`}
                                                            fill
                                                            className="object-cover rounded-md border-gray-200"
                                                        />
                                                        <div onClick={() => { handleRemove(idx, layerDress, setlayerDress) }} className="bg-sky-800 text-white w-4 h-4 rounded-full flex items-center justify-center absolute top-0 right-0 cursor-pointer">
                                                            <RxCross2 className="text-whtie text-xs" />
                                                        </div>
                                                    </div>
                                                ))}


                                                {/* Upload Button */}
                                                <label htmlFor="image_taker_dress_card">
                                                    <div
                                                        className="w-[54px] h-[54px] border border-gray-200 rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition"
                                                    >
                                                        <FaPlus className="text-xl text-gray-500" />
                                                    </div>
                                                </label>
                                                <input
                                                    onChange={(e) => { handleFileChangeMultipul(e, setlayerDress, layerDress) }}
                                                    id="image_taker_dress_card"
                                                    type="file"
                                                    className="hidden"
                                                    multiple
                                                    accept=" image/png, image/jpeg, image/jpg"

                                                />
                                            </div>
                                        </div>
                                    </div>



                                    <div className="mt-6">
                                        <label className="block text-gray-700 mb-1">Crown Card:
                                            <span className="px-1 py-0.5 text-sm rounded-md bg-sky-300 text-white">{layerCrown?.length}</span> <span className="text-red-500 text-xl">*</span>
                                        </label>

                                        <div className="w-full min-h-[170px] max-h-[200px] bg-gray-100 rounded-md p-2 overflow-y-scroll no-scrollbar">


                                            <div className="flex flex-wrap gap-2">
                                                {/* Image Previews */}
                                                {layerCrown?.map((src, idx) => (
                                                    <div key={idx} className="relative w-[54px] h-[54px] border-gray-200 rounded-md">
                                                        <Image
                                                            src={src}
                                                            alt={`Preview ${idx}`}
                                                            fill
                                                            className="object-cover rounded-md border-gray-200"
                                                        />
                                                        <div onClick={() => { handleRemove(idx, layerCrown, setlayerCrown) }} className="bg-sky-800 text-white w-4 h-4 rounded-full flex items-center justify-center absolute top-0 right-0 cursor-pointer">
                                                            <RxCross2 className="text-whtie text-xs" />
                                                        </div>
                                                    </div>
                                                ))}


                                                {/* Upload Button */}
                                                <label htmlFor="image_taker_crown_card">
                                                    <div
                                                        className="w-[54px] h-[54px] border border-gray-200 rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition"
                                                    >
                                                        <FaPlus className="text-xl text-gray-500" />
                                                    </div>
                                                </label>
                                                <input
                                                    onChange={(e) => { handleFileChangeMultipul(e, setlayerCrown, layerCrown) }}
                                                    id="image_taker_crown_card"
                                                    type="file"
                                                    className="hidden"
                                                    multiple
                                                    accept=" image/png, image/jpeg, image/jpg"

                                                />
                                            </div>
                                        </div>
                                    </div>




                                    <div className="mt-6">
                                        <label className="block text-gray-700 mb-1">Beard Card:
                                            <span className="px-1 py-0.5 text-sm rounded-md bg-sky-300 text-white">{layerBeard?.length}</span> <span className="text-red-500 text-xl">*</span>
                                        </label>

                                        <div className="w-full min-h-[170px] max-h-[200px] bg-gray-100 rounded-md p-2 overflow-y-scroll no-scrollbar">


                                            <div className="flex flex-wrap gap-2">
                                                {/* Image Previews */}
                                                {layerBeard?.map((src, idx) => (
                                                    <div key={idx} className="relative w-[54px] h-[54px] border-gray-200 rounded-md">
                                                        <Image
                                                            src={src}
                                                            alt={`Preview ${idx}`}
                                                            fill
                                                            className="object-cover rounded-md border-gray-200"
                                                        />
                                                        <div onClick={() => { handleRemove(idx, layerBeard, setlayerBeard) }} className="bg-sky-800 text-white w-4 h-4 rounded-full flex items-center justify-center absolute top-0 right-0 cursor-pointer">
                                                            <RxCross2 className="text-whtie text-xs" />
                                                        </div>
                                                    </div>
                                                ))}


                                                {/* Upload Button */}
                                                <label htmlFor="image_taker_bread_card">
                                                    <div
                                                        className="w-[54px] h-[54px] border border-gray-200 rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition"
                                                    >
                                                        <FaPlus className="text-xl text-gray-500" />
                                                    </div>
                                                </label>
                                                <input
                                                    onChange={(e) => { handleFileChangeMultipul(e, setlayerBeard, layerBeard) }}
                                                    id="image_taker_bread_card"
                                                    type="file"
                                                    className="hidden"
                                                    multiple
                                                    accept=" image/png, image/jpeg, image/jpg"

                                                />
                                            </div>
                                        </div>
                                    </div>

                                </>

                            )
                        }






                        {
                            productType === 'trading' && (
                                <>

                                    <div className="mt-6">
                                        <label className="block text-gray-700 mb-1">Treding Card Front Base Card:
                                            <span className="px-1 py-0.5 text-sm rounded-md bg-sky-300 text-white">{tredingFrontBase?.length}</span> <span className="text-red-500 text-xl">*</span>
                                        </label>

                                        <div className="w-full min-h-[170px] max-h-[200px] bg-gray-100 rounded-md p-2 overflow-y-scroll no-scrollbar">


                                            <div className="flex flex-wrap gap-2">
                                                {/* Image Previews */}
                                                {tredingFrontBase?.map((src, idx) => (
                                                    <div key={idx} className="relative w-[54px] h-[54px] border-gray-200 rounded-md">
                                                        <Image
                                                            src={src}
                                                            alt={`Preview ${idx}`}
                                                            fill
                                                            className="object-cover rounded-md border-gray-200"
                                                        />
                                                        <div onClick={() => { handleRemove(idx, tredingFrontBase, settredingFrontBase) }} className="bg-sky-800 text-white w-4 h-4 rounded-full flex items-center justify-center absolute top-0 right-0 cursor-pointer">
                                                            <RxCross2 className="text-whtie text-xs" />
                                                        </div>
                                                    </div>
                                                ))}


                                                {/* Upload Button */}
                                                <label htmlFor="image_taker_treding_front_base_card">
                                                    <div
                                                        className="w-[54px] h-[54px] border border-gray-200 rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition"
                                                    >
                                                        <FaPlus className="text-xl text-gray-500" />
                                                    </div>
                                                </label>
                                                <input
                                                    onChange={(e) => { handleFileChangeMultipul(e, settredingFrontBase, tredingFrontBase) }}
                                                    id="image_taker_treding_front_base_card"
                                                    type="file"
                                                    className="hidden"
                                                    multiple
                                                    accept=" image/png, image/jpeg, image/jpg"

                                                />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="mt-6">
                                        <label className="block text-gray-700 mb-1">Treding Card Back Base Card:
                                            <span className="px-1 py-0.5 text-sm rounded-md bg-sky-300 text-white">{tredingBackBase?.length}</span> <span className="text-red-500 text-xl">*</span>
                                        </label>

                                        <div className="w-full min-h-[170px] max-h-[200px] bg-gray-100 rounded-md p-2 overflow-y-scroll no-scrollbar">


                                            <div className="flex flex-wrap gap-2">
                                                {/* Image Previews */}
                                                {tredingBackBase?.map((src, idx) => (
                                                    <div key={idx} className="relative w-[54px] h-[54px] border-gray-200 rounded-md">
                                                        <Image
                                                            src={src}
                                                            alt={`Preview ${idx}`}
                                                            fill
                                                            className="object-cover rounded-md border-gray-200"
                                                        />
                                                        <div onClick={() => { handleRemove(idx, tredingBackBase, settredingBackBase) }} className="bg-sky-800 text-white w-4 h-4 rounded-full flex items-center justify-center absolute top-0 right-0 cursor-pointer">
                                                            <RxCross2 className="text-whtie text-xs" />
                                                        </div>
                                                    </div>
                                                ))}


                                                {/* Upload Button */}
                                                <label htmlFor="image_taker_treding_back_base_card">
                                                    <div
                                                        className="w-[54px] h-[54px] border border-gray-200 rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition"
                                                    >
                                                        <FaPlus className="text-xl text-gray-500" />
                                                    </div>
                                                </label>
                                                <input
                                                    onChange={(e) => { handleFileChangeMultipul(e, settredingBackBase, tredingBackBase) }}
                                                    id="image_taker_treding_back_base_card"
                                                    type="file"
                                                    className="hidden"
                                                    multiple
                                                    accept=" image/png, image/jpeg, image/jpg"

                                                />
                                            </div>
                                        </div>
                                    </div>

                                </>
                            )
                        }













                    </div>
                    <div className="col-span-1 md:col-span-4">
                        <div className="w-full border border-gray-300 rounded-md px-4 py-3 sticky top-[100px]">
                            <div>
                                <label className="block text-gray-700 mb-1">Product Thumbnail <span className="text-red-500 text-xl">*</span></label>
                                <label htmlFor="thamnail_image">
                                    <div className="w-full h-[180px] bg-gray-100 roundede-md flex items-center justify-center cursor-pointer relative">

                                        {productThumbnail != null ? (
                                            <Image src={productThumbnail} alt="Thumbnail_Image" width={1000} height={1000} className="absloute w-full h-full top-0 left-0 object-cover rounded-md border border-gray-200" />
                                        ) : (
                                            <CiCirclePlus className="text-8xl text-gray-300" />
                                        )}





                                    </div>
                                </label>
                                <input onChange={(e) => { handleFileChange(e, setproductThumbnail) }}
                                    id="thamnail_image"
                                    type="file"
                                    className="hidden"
                                    accept=" image/png, image/jpeg, image/jpg"
                                />

                            </div>

                            <div className="mt-6">
                                <label className="block text-gray-700 mb-1">Image Gallerys:
                                    <span className="px-1 py-0.5 text-sm rounded-md bg-sky-300 text-white">{productImages?.length}</span> <span className="text-red-500 text-xl">*</span>
                                </label>

                                <div className="w-full min-h-[220px] max-h-[300px] bg-gray-100 rounded-md p-2 overflow-y-scroll no-scrollbar">


                                    <div className="flex flex-wrap gap-2">
                                        {/* Image Previews */}
                                        {productImages?.map((src, idx) => (
                                            <div key={idx} className="relative w-[65px] h-[65px] border-gray-200 rounded-md">
                                                <Image
                                                    src={src}
                                                    alt={`Preview ${idx}`}
                                                    fill
                                                    className="object-cover rounded-md border-gray-200"
                                                />
                                                <div onClick={() => { handleRemove(idx, productImages, setproductImages) }} className="bg-sky-800 text-white w-4 h-4 rounded-full flex items-center justify-center absolute top-0 right-0 cursor-pointer">
                                                    <RxCross2 className="text-whtie text-xs" />
                                                </div>
                                            </div>
                                        ))}


                                        {/* Upload Button */}
                                        <label htmlFor="image_taker">
                                            <div
                                                className="w-[65px] h-[65px] border border-gray-200 rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition"
                                            >
                                                <FaPlus className="text-xl text-gray-500" />
                                            </div>
                                        </label>
                                        <input
                                            onChange={(e) => { handleFileChangeMultipul(e, setproductImages, productImages) }}
                                            id="image_taker"
                                            type="file"
                                            className="hidden"
                                            multiple
                                            accept=" image/png, image/jpeg, image/jpg"

                                        />
                                    </div>





                                </div>
                            </div>



                            {/* Submit */}
                            <div className="flex justify-start gap-3 mt-6">

                                <button onClick={() => { setrander(1) }}
                                    type="submit"
                                    className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition cursor-pointer"
                                >
                                    Back
                                </button>

                                <button onClick={() => { handleNext() }}
                                    type="submit"
                                    className="bg-sky-400 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition cursor-pointer flex items-center justify-center gap-2"
                                >
                                    {isLoading && <SpinLoader />}
                                    Next
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    );


}


export default Two;
