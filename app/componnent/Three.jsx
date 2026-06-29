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
        setrander, productType, productName, productPrice,
        productDescription, productShortDescription, productofferPrice,
        productCategory, productStatus, productThumbnail, productImages,
        layerBaseCard, layerSkinTone, layerHair, layerNose, layerEyes,
        layerMouth, layerDress, layerCrown, layerBeard,
        tredingFrontBase, tredingBackBase,
    } = useProductUploadStore();

    const onConfirm = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let parsedCategory = {};
            try {
                parsedCategory = typeof productCategory === "string"
                    ? JSON.parse(productCategory)
                    : (productCategory || {});
            } catch { parsedCategory = {}; }

            const categoryId  = Number(parsedCategory?.id);
            const price       = Number(productPrice);
            const offerPrice  = productofferPrice ? Number(productofferPrice) : null;
            const status      = String(productStatus) === "true" ? 1 : 0;

            const base = {
                name: productName, slug: null, type: productType,
                price, status, offer_price: offerPrice,
                category_id: categoryId,
                short_description: productShortDescription,
                description: productDescription,
                image: productThumbnail, images: productImages,
            };

            const flattenedBaseCards = layerBaseCard?.flatMap(group =>
                group?.images?.map(imgObj => ({
                    image: imgObj.base64, filename: imgObj.filename,
                    card_type: group?.card_type, name: imgObj.name,
                }))
            ) ?? [];

            const payload = productType === "simple" ? base : {
                ...base,
                base_cards: flattenedBaseCards,
                skin_tones: layerSkinTone, hairs: layerHair,
                noses: layerNose, eyes: layerEyes, mouths: layerMouth,
                dresses: layerDress, crowns: layerCrown,
                custom_sets: layerBaseCard, beards: layerBeard,
                trading_fronts: tredingFrontBase, trading_backs: tredingBackBase,
            };

            const response = await MakePost(`api/cardproduct`, payload, token);
            if (response?.success) {
                toast.success(response?.message);
                setTimeout(() => router.push('/deshboard/admin/allproducts'), 1000);
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const parsedCategory = (() => {
        try { return JSON.parse(productCategory); } catch { return {}; }
    })();

    const ImageGrid = ({ images, getKey }) => (
        <div className="flex flex-wrap gap-2">
            {images.map((img, idx) => (
                <Image
                    key={idx}
                    src={getKey ? getKey(img) : img}
                    alt={`img-${idx}`}
                    width={80} height={80}
                    className="rounded-md border h-[60px] w-[60px] sm:w-[80px] sm:h-[80px] object-cover"
                />
            ))}
        </div>
    );

    const Section = ({ title, children }) => (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4">
            <h3 className="font-bold text-gray-800 mb-3">{title}</h3>
            {children}
        </div>
    );

    return (
        <div className="px-4 pb-10">

            {/* ── Header ── */}
            <div className="flex flex-col gap-2 sticky top-0 md:top-[70px] z-30 bg-white border-b border-gray-100 shadow-sm px-0 py-3 mb-6">
                <span className="text-lg font-bold text-gray-800">Product Preview</span>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setrander(2)}
                        className="bg-sky-100 hover:bg-sky-200 text-sky-700 font-semibold text-xs px-3 py-2 rounded-lg transition cursor-pointer"
                    >
                        Back
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-sky-400 hover:bg-sky-500 text-white font-semibold text-xs px-3 py-2 rounded-lg transition flex items-center gap-2 cursor-pointer"
                    >
                        {isLoading && <SpinLoader />}
                        Confirm & Submit
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                {/* ── Details ── */}
                <div className="col-span-1 md:col-span-3 space-y-4">

                    {/* Thumbnail on mobile */}
                    <div className="block md:hidden">
                        <Section title="Thumbnail">
                            {productThumbnail ? (
                                <Image src={productThumbnail} alt="Thumbnail" width={1000} height={1000}
                                    className="w-full rounded-lg object-cover max-h-[220px]" />
                            ) : <p className="text-gray-400 text-sm">No Thumbnail</p>}
                        </Section>
                    </div>

                    <Section title="Product Info">
                        {[
                            { label: "Name",              value: productName },
                            { label: "Type",              value: productType },
                            { label: "Price",             value: `$${productPrice}` },
                            { label: "Offer Price",       value: productofferPrice ? `$${productofferPrice}` : "—" },
                            { label: "Status",            value: String(productStatus) === "true" ? "Published" : "Draft" },
                            { label: "Category",          value: parsedCategory?.name },
                            { label: "Short Description", value: productShortDescription },
                            { label: "Description",       value: productDescription },
                        ].map(({ label, value }) => (
                            <div key={label} className="flex flex-col sm:flex-row sm:gap-2 py-1 border-b border-gray-50 last:border-0">
                                <span className="font-semibold text-gray-700 text-sm min-w-[130px]">{label}:</span>
                                <span className="text-gray-600 text-sm">{value ?? "—"}</span>
                            </div>
                        ))}
                    </Section>

                    <Section title="Gallery Images">
                        {productImages?.length > 0
                            ? <ImageGrid images={productImages} />
                            : <p className="text-gray-400 text-sm">No gallery images</p>}
                    </Section>

                    {productType === "customizable" && (
                        <>
                            <Section title="Base Cards">
                                {layerBaseCard?.length > 0
                                    ? <ImageGrid images={layerBaseCard.flatMap(g => g?.images ?? [])} getKey={i => i.base64} />
                                    : <p className="text-gray-400 text-sm">None</p>}
                            </Section>
                            {[
                                { title: "Skin Tone",   data: layerSkinTone },
                                { title: "Hair Layer",  data: layerHair },
                                { title: "Nose Layer",  data: layerNose },
                                { title: "Eyes Layer",  data: layerEyes },
                                { title: "Mouth Layer", data: layerMouth },
                                { title: "Dress Layer", data: layerDress },
                                { title: "Crown Layer", data: layerCrown },
                                { title: "Beard Layer", data: layerBeard },
                            ].map(({ title, data }) => (
                                <Section key={title} title={title}>
                                    {data?.length > 0
                                        ? <ImageGrid images={data} />
                                        : <p className="text-gray-400 text-sm">None</p>}
                                </Section>
                            ))}
                        </>
                    )}

                    {productType === "trading" && (
                        <>
                            <Section title="Trading Card Front Base">
                                {tredingFrontBase?.length > 0
                                    ? <ImageGrid images={tredingFrontBase} />
                                    : <p className="text-gray-400 text-sm">None</p>}
                            </Section>
                            <Section title="Trading Card Back Base">
                                {tredingBackBase?.length > 0
                                    ? <ImageGrid images={tredingBackBase} />
                                    : <p className="text-gray-400 text-sm">None</p>}
                            </Section>
                        </>
                    )}
                </div>

                {/* ── Thumbnail desktop ── */}
                <div className="hidden md:block col-span-1">
                    <div className="sticky top-[140px]">
                        <Section title="Thumbnail">
                            {productThumbnail ? (
                                <Image src={productThumbnail} alt="Thumbnail" width={1000} height={1000}
                                    className="w-full rounded-lg object-cover" />
                            ) : <p className="text-gray-400 text-sm">No Thumbnail</p>}
                        </Section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Three;