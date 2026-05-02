'use client'

import useProductUploadStore from "@/store/useProductUploadStore";
import getCookie from "@/utilis/helper/cookie/gettooken";
import MakePost from "@/utilis/requestrespose/post";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import SpinLoader from "./SpingLoader";

const Three = () => {

    const router = useRouter();
    const token = getCookie();
    const [isLoading, setLoading] = useState(false);

    const {
        rander, setrander,
        productType,
        productName,
        productPrice,
        productDescription,
        productShortDescription,
        productofferPrice,
        productCategory,
        productTags,
        productStatus,
        productThumbnail,
        productSingleImage,
        productImages,
        layerBaseCard,
        layerSkinTone,
        layerHair,
        layerNose,
        layerEyes,
        layerMouth,
        layerDress,
        layerCrown,
        layerBeard,
        tredingFrontBase,
        tredingBackBase
    } = useProductUploadStore();



    /************* add new Product functionality *************/
    const onConfirm = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let parsedCategory = {};
            try {
                parsedCategory = typeof productCategory === "string"
                    ? JSON.parse(productCategory)
                    : (productCategory || {});
            } catch (parseError) {
                parsedCategory = {};
            }

            const categoryId = Number(parsedCategory?.id);
            const price = Number(productPrice);
            const offerPrice = Number(productofferPrice);
            const status = String(productStatus) === "true";

            const productStateSimple = {
                name: productName,
                slug: null,
                type: productType,
                price,
                status,
                offer_price: offerPrice,
                category_id: categoryId,
                short_description: productShortDescription,
                description: productDescription,
                image: productThumbnail,
                images: productImages,
            };


            const productStateCustomizable = {
                name: productName,
                slug: null,
                type: productType,
                price,
                status,
                offer_price: offerPrice,
                category_id: categoryId,
                short_description: productShortDescription,
                description: productDescription,
                image: productThumbnail,
                images: productImages,
                skin_tones: layerSkinTone,
                hairs: layerHair,
                noses: layerNose,
                eyes: layerEyes,
                mouths: layerMouth,
                dresses: layerDress,
                crowns: layerCrown,
                custom_sets: layerBaseCard,
                beards: layerBeard,
                trading_fronts: tredingFrontBase,
                trading_backs: tredingBackBase
            };

            const payload = productType === "simple" ? productStateSimple : productStateCustomizable;
            const payloadSizeInKB = (new Blob([JSON.stringify(payload)]).size / 1024).toFixed(2);
            const clientValidation = {
                name: Boolean(payload?.name),
                type: Boolean(payload?.type),
                price_is_number: Number.isFinite(payload?.price),
                offer_price_is_number: Number.isFinite(payload?.offer_price),
                category_id_is_number: Number.isFinite(payload?.category_id),
                image_exists: Boolean(payload?.image),
                images_is_non_empty_array: Array.isArray(payload?.images) && payload?.images.length > 0
            };

            if (Object.values(clientValidation).includes(false)) {
                console.error("[Card Product Debug] Payload validation failed before API call", clientValidation);
                toast.error("Validation failed. Check browser console for exact invalid fields.");
                return;
            }


            // api/products
            const response = await MakePost(`api/cardproduct`, payload, token);



            if (response?.success) {
                toast.success(response?.message);

                setTimeout(() => {
                    router.push('/deshboard/admin/allproducts');
                }, 1000);


            } else {
                console.error("[Card Product Debug] API error response", response);
                console.error("[Card Product Debug] API error JSON", JSON.stringify(response?.error || {}, null, 2));
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    }



    const handlePreview = (e) => {
        e.preventDefault();
        setShowPreview(true);
    };




    console.log(layerBaseCard);



    return (
        <div className="">
            <div className="mb-7 items-center flex justify-between sticky top-[70px] bg-white py-4 pt-0">
                <span className="text-2xl font-bold ">Product Preview</span>
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        onClick={() => { setrander(2) }}
                        className="bg-sky-200 px-4 py-2 rounded-lg hover:bg-sky-300 transition cursor-pointer"
                    >
                        Back
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-sky-400 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition flex items-center gap-2 justify-center cursor-pointer"
                    >
                        {isLoading && <SpinLoader />}
                        Confirm & Submit
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-4 col-span-3">
                    <p><strong>Name:</strong> {productName}</p>
                    <p><strong>Type:</strong> {productType}</p>
                    <p><strong>Price:</strong> ${productPrice}</p>
                    <p><strong>Offer Price:</strong> ${productofferPrice}</p>
                    <p><strong>Status:</strong> {productStatus === "true" ? "Published" : "Draft"}</p>
                    <p><strong>Category:</strong> {JSON.parse(productCategory)?.name}</p>
                    <p><strong>Short Description:</strong> {productShortDescription}</p>
                    <p><strong>Description:</strong> {productDescription}</p>


                    <h3 className="font-bold mt-4 mb-2">Gallery Images</h3>
                    {productImages?.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {productImages.map((img, idx) => (
                                <Image
                                    key={idx}
                                    src={img}
                                    alt={`Gallery ${idx}`}
                                    width={80}
                                    height={80}
                                    className="rounded-md border h-[60px] w-[80px]"
                                />
                            ))}
                        </div>
                    ) : (
                        <p>No Gallery Images</p>
                    )}



                </div>

                <div className="w-full col-span-1">


                    <h3 className="font-bold mb-2">Thumbnail</h3>
                    {productThumbnail ? (
                        <Image
                            src={productThumbnail}
                            alt="Thumbnail"
                            width={1000}
                            height={1000}
                            className="w-full rounded-md border border-gray-200 h-[150px] object-cover"
                        />
                    ) : (
                        <p>No Thumbnail</p>
                    )}


                </div>





                {
                    productType === "customizable" && (
                        <>


                            <div className="w-full col-span-4">
                                <h3 className="font-bold mt-4 mb-2">Base Cards</h3>
                                {layerBaseCard?.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {layerBaseCard.map((img) => (
                                            img?.images?.map((im, idx) => {
                                                return (
                                                    <Image
                                                        key={idx}
                                                        src={im}
                                                        alt={`Gallery ${idx}`}
                                                        width={80}
                                                        height={80}
                                                        className="rounded-md border h-[60px] w-[80px]"
                                                    />
                                                )
                                            })
                                        ))}
                                    </div>
                                ) : (
                                    <p>No Gallery Images</p>
                                )}
                            </div>



                            <div className="w-full col-span-4">
                                <h3 className="font-bold mt-4 mb-2">Skin Tone</h3>
                                {layerSkinTone?.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {layerSkinTone.map((img, idx) => (
                                            <Image
                                                key={idx}
                                                src={img}
                                                alt={`Gallery ${idx}`}
                                                width={80}
                                                height={80}
                                                className="rounded-md border h-[60px] w-[80px]"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <p>No Gallery Images</p>
                                )}
                            </div>



                            <div className="w-full col-span-4">
                                <h3 className="font-bold mt-4 mb-2">Hair Layer</h3>
                                {layerHair?.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {layerHair.map((img, idx) => (
                                            <Image
                                                key={idx}
                                                src={img}
                                                alt={`Gallery ${idx}`}
                                                width={80}
                                                height={80}
                                                className="rounded-md border h-[60px] w-[80px]"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <p>No Gallery Images</p>
                                )}
                            </div>



                            <div className="w-full col-span-4">
                                <h3 className="font-bold mt-4 mb-2">Nose Layer</h3>
                                {layerNose?.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {layerNose.map((img, idx) => (
                                            <Image
                                                key={idx}
                                                src={img}
                                                alt={`Gallery ${idx}`}
                                                width={80}
                                                height={80}
                                                className="rounded-md border h-[60px] w-[80px]"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <p>No Gallery Images</p>
                                )}
                            </div>




                            <div className="w-full col-span-4">
                                <h3 className="font-bold mt-4 mb-2">Eyes Layer</h3>
                                {layerEyes?.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {layerEyes.map((img, idx) => (
                                            <Image
                                                key={idx}
                                                src={img}
                                                alt={`Gallery ${idx}`}
                                                width={80}
                                                height={80}
                                                className="rounded-md border h-[60px] w-[80px]"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <p>No Gallery Images</p>
                                )}
                            </div>




                            <div className="w-full col-span-4">
                                <h3 className="font-bold mt-4 mb-2">Mouth Layer</h3>
                                {layerMouth?.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {layerMouth.map((img, idx) => (
                                            <Image
                                                key={idx}
                                                src={img}
                                                alt={`Gallery ${idx}`}
                                                width={80}
                                                height={80}
                                                className="rounded-md border h-[60px] w-[80px]"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <p>No Gallery Images</p>
                                )}
                            </div>




                            <div className="w-full col-span-4">
                                <h3 className="font-bold mt-4 mb-2">Dress Layer</h3>
                                {layerDress?.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {layerDress.map((img, idx) => (
                                            <Image
                                                key={idx}
                                                src={img}
                                                alt={`Gallery ${idx}`}
                                                width={80}
                                                height={80}
                                                className="rounded-md border h-[60px] w-[80px]"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <p>No Gallery Images</p>
                                )}
                            </div>





                            <div className="w-full col-span-4">
                                <h3 className="font-bold mt-4 mb-2">Crown Layer</h3>
                                {layerCrown?.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {layerCrown.map((img, idx) => (
                                            <Image
                                                key={idx}
                                                src={img}
                                                alt={`Gallery ${idx}`}
                                                width={80}
                                                height={80}
                                                className="rounded-md border h-[60px] w-[80px]"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <p>No Gallery Images</p>
                                )}
                            </div>





                            <div className="w-full col-span-4">
                                <h3 className="font-bold mt-4 mb-2">Beard Layer</h3>
                                {layerHair?.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {layerBeard.map((img, idx) => (
                                            <Image
                                                key={idx}
                                                src={img}
                                                alt={`Gallery ${idx}`}
                                                width={80}
                                                height={80}
                                                className="rounded-md border h-[60px] w-[80px]"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <p>No Gallery Images</p>
                                )}
                            </div>



                        </>
                    )
                }



                {
                    productType === "trading" && (
                        <>

                            <div className="w-full col-span-4">
                                <h3 className="font-bold mt-4 mb-2">Treding Card Front Base Card</h3>
                                {tredingFrontBase?.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {tredingFrontBase.map((img, idx) => (
                                            <Image
                                                key={idx}
                                                src={img}
                                                alt={`Gallery ${idx}`}
                                                width={80}
                                                height={80}
                                                className="rounded-md border h-[60px] w-[80px]"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <p>No Gallery Images</p>
                                )}
                            </div>

                            <div className="w-full col-span-4">
                                <h3 className="font-bold mt-4 mb-2">Treding Card Back Base Card</h3>
                                {tredingBackBase?.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {tredingBackBase.map((img, idx) => (
                                            <Image
                                                key={idx}
                                                src={img}
                                                alt={`Gallery ${idx}`}
                                                width={80}
                                                height={80}
                                                className="rounded-md border h-[60px] w-[80px]"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <p>No Gallery Images</p>
                                )}
                            </div>

                        </>
                    )
                }


            </div>
        </div>
    )
}

export default Three;
