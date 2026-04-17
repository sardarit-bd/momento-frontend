"use client";
import SpinLoader from "@/app/componnent/SpingLoader";
import useboxcartstore from "@/store/useboxcartstore";
import useCartStore from "@/store/useCartStore";
import useDeckFinalPreview from "@/store/useDeckFinalPreview";
import boxPreviewDefault from "@/public/boxprevew.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";

const layers = [
    "dresses", "skin_tones", "hairs", "crowns",
    "beards", "eyes", "mouths", "noses"
];



const FinalCardsPage = () => {

    const { addToCart, cart } = useCartStore();
    const { deckcart } = useDeckFinalPreview();
    const { boxs } = useboxcartstore();
    const [loading, setloading] = useState(false);
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const router = useRouter();



    const ensureDeckInCart = () => {
        const deckItem = deckcart?.[0];
        if (!deckItem) return false;

        const alreadyInCart = cart.some((item) => item?.id === deckItem?.id);
        if (!alreadyInCart) addToCart(deckItem);
        return true;
    };

    const adddeckcart = (e) => {
        e.preventDefault();
        if (!ensureDeckInCart()) return;

        setloading(true);
        setTimeout(() => {
            setloading(false);
        }, 900);

    };

    const handleCheckout = (e) => {
        e.preventDefault();
        if (!ensureDeckInCart()) return;

        setCheckoutLoading(true);
        setTimeout(() => {
            setCheckoutLoading(false);
            router.push("/my-cart/checkout");
        }, 500);
    };



    return (
        <div className="text-black max-w-7xl mx-auto" style={{ padding: "2rem" }}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 mb-4">
                    <button onClick={() => { router.back() }} className="border border-gray-200 bg-white p-2 rounded-md shadow-md cursor-pointer hover:bg-gray-100 transition duration-100">
                        <BiLeftArrowAlt className="text-2xl" />
                    </button>
                    <h1 className="text-xl text-gray-600 hidden md:block">Your Customized Cards</h1>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={(e) => { adddeckcart(e) }} className="border border-gray-200 bg-sky-400 hover:bg-sky-500 text-white p-2 rounded-md shadow-md cursor-pointer transition duration-100 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed" disabled={loading || checkoutLoading || !deckcart?.[0]}>
                        {loading ? <SpinLoader /> : <IoCartOutline className="text-xl" />}
                        Add to Cart
                    </button>
                    <button onClick={(e) => { handleCheckout(e) }} className="border border-gray-200 bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-md shadow-md cursor-pointer transition duration-100 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed" disabled={loading || checkoutLoading || !deckcart?.[0]}>
                        {checkoutLoading ? <SpinLoader /> : <MdOutlineShoppingBag className="text-xl" />}
                        Checkout
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-2 justify-items-center gap-3 py-6 my-6 sm:grid-cols-3 md:grid-cols-5 md:gap-4">

                {
                    deckcart[0]?.FinalProduct?.map((card, idx) => (


                        <div key={idx} className="relative mx-auto w-full max-w-[170px] sm:max-w-[190px] md:max-w-[200px] lg:max-w-[220px] aspect-[5/7] overflow-hidden rounded-3xl border border-gray-100 bg-white/60">
                            {card?.baseImage && (
                                <Image
                                    width={1000} height={1000} src={card.baseImage} alt="Base Card" className="absolute inset-0 w-full h-full object-contain"
                                />
                            )}
                            {layers.map(layer =>
                                card?.selectedLayers[layer] && (
                                    <div key={layer}>
                                        <Image
                                            width={1000}
                                            height={1000}
                                            src={card.selectedLayers[layer]}
                                            alt={layer}
                                            className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-full w-[62%] h-[40%] object-contain"
                                        />
                                        <Image
                                            width={1000}
                                            height={1000}
                                            src={card.selectedLayers[layer]}
                                            alt={`${layer}-mirrored`}
                                            className="absolute left-1/2 top-[49.5%] -translate-x-1/2 scale-y-[-1] w-[62%] h-[40%] object-contain"
                                        />
                                    </div>
                                )
                            )}
                        </div>


                    ))
                }


            </div>

            <div className="pb-8">
                <h2 className="py-4 font-semibold text-gray-600">Box Preview</h2>

                <div className="flex flex-wrap gap-4">
                    {(boxs?.length > 0 ? boxs : [boxPreviewDefault]).map((item, index) => (
                        <div key={index} className="w-[220px] h-auto lg:w-[420px] lg:h-auto flex items-center justify-center rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
                            <Image className="object-contain z-10" src={item} width={1000} height={1000} alt="box-preview" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FinalCardsPage;
