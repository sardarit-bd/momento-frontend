"use client";
import SpinLoader from "@/app/componnent/SpingLoader";
import useboxcartstore from "@/store/useboxcartstore";
import useCartStore from "@/store/useCartStore";
import useDeckFinalPreview from "@/store/useDeckFinalPreview";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import DeckBoxPreview from "@/app/componnent/DeckBoxPreview";

const FinalCardsPage = () => {
    const { addToCart, cart } = useCartStore();
    const { boxs } = useboxcartstore();
    const deckcart = useDeckFinalPreview((state) => state.deckcart);
    const updateCart = useDeckFinalPreview((state) => state.updateCart);

    const [loading, setloading] = useState(false);
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [characterImages, setCharacterImages] = useState([]);
    const router = useRouter();
    const boxPreviewRef = useRef(null);

    // ── Cursor-following zoom, e-commerce style ──
    const zoomStageRef = useRef(null);
    const [isZooming, setIsZooming] = useState(false);
    const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
    const ZOOM_SCALE = 2.4; // bump to 3+ for a more aggressive zoom

    const handleZoomMove = (e) => {
        const stage = zoomStageRef.current;
        if (!stage) return;
        const rect = stage.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomOrigin({
            x: Math.min(100, Math.max(0, x)),
            y: Math.min(100, Math.max(0, y)),
        });
    };

    const handleZoomEnter = () => setIsZooming(true);
    const handleZoomLeave = () => {
        setIsZooming(false);
        setZoomOrigin({ x: 50, y: 50 });
    };

    const ensureDeckInCart = () => {
        const deckItem = deckcart?.[0];
        if (!deckItem) return false;
        const alreadyInCart = cart.some((item) => item?.id === deckItem?.id);
        if (!alreadyInCart) addToCart(deckItem);
        return true;
    };

    const captureAndResizeBox = async () => {
        if (!boxPreviewRef.current) return null;

        try {
            const domToImageModule = await import("dom-to-image-more");
            const domtoimage = domToImageModule.default ?? domToImageModule;

            if (typeof domtoimage.toPng !== "function") {
                console.error("toPng is not a function. Module shape:", domToImageModule);
                return null;
            }

            const dataUrl = await domtoimage.toPng(boxPreviewRef.current, {
                width: boxPreviewRef.current.offsetWidth,
                height: boxPreviewRef.current.offsetHeight,
                style: { transform: "scale(1)" },
            });

            const img = new window.Image();
            await new Promise((resolve) => {
                img.onload = resolve;
                img.src = dataUrl;
            });

            const resized = document.createElement("canvas");
            resized.width = 2325;
            resized.height = 1950;

            const ctx = resized.getContext("2d");
            if (!ctx) return null;

            ctx.drawImage(img, 0, 0, 2325, 1950);
            return resized.toDataURL("image/png");

        } catch (err) {
            console.error("Box capture failed:", err);
            return null;
        }
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        if (!ensureDeckInCart()) return;
        setCheckoutLoading(true);

        const boxImage = await captureAndResizeBox();
        if (boxImage && deckcart?.[0]) {
            updateCart({ ...deckcart[0], BoxImage: boxImage });
        }

        router.push("/my-cart/checkout");
        setCheckoutLoading(false);
    };

    const adddeckcart = async (e) => {
        e.preventDefault();
        if (!ensureDeckInCart()) return;
        setloading(true);

        const boxImage = await captureAndResizeBox();
        if (boxImage && deckcart?.[0]) {
            updateCart({ ...deckcart[0], BoxImage: boxImage });
        }

        setTimeout(() => setloading(false), 900);
    };

    useEffect(() => {
        const chars = deckcart[0]?.CharacterImages || [];
        setCharacterImages(chars);
    }, [deckcart]);

    const finalProductCards = deckcart[0]?.FinalProduct || [];

    return (
        <div className="text-black max-w-7xl mx-auto" style={{ padding: "2rem" }}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 mb-4">
                    <button
                        onClick={() => router.back()}
                        className="border border-gray-200 bg-white p-2 rounded-md shadow-md cursor-pointer hover:bg-gray-100 transition duration-100"
                    >
                        <BiLeftArrowAlt className="text-2xl" />
                    </button>
                    <h1 className="text-xl text-gray-600 hidden md:block">Your Customized Cards</h1>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => adddeckcart(e)}
                        className="border border-gray-200 bg-sky-400 hover:bg-sky-500 text-white p-2 rounded-md shadow-md cursor-pointer transition duration-100 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        disabled={loading || checkoutLoading || !deckcart?.[0]}
                    >
                        {loading ? <SpinLoader /> : <IoCartOutline className="text-xl" />}
                        Add to Cart
                    </button>
                    <button
                        onClick={(e) => handleCheckout(e)}
                        className="border border-gray-200 bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-md shadow-md cursor-pointer transition duration-100 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        disabled={loading || checkoutLoading || !deckcart?.[0]}
                    >
                        {checkoutLoading ? <SpinLoader /> : <MdOutlineShoppingBag className="text-xl" />}
                        Checkout
                    </button>
                </div>
            </div>

            {/* Individual Full Card Previews */}
            <div className="grid grid-cols-2 justify-items-center gap-3 py-6 my-6 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
                {finalProductCards.map((card, idx) => (
                    <div key={idx} className="relative mx-auto w-full max-w-[170px] sm:max-w-[190px] md:max-w-[200px] lg:max-w-[220px] aspect-[5/7] overflow-hidden rounded-3xl border border-gray-100 bg-white/60 shadow-md">
                        <img
                            src={card.image}
                            alt={`Card ${card.rank || idx}`}
                            className="absolute inset-0 w-full h-full object-contain"
                        />
                    </div>
                ))}
            </div>

            {/* Dynamic Box Preview */}
            <div className="pb-8">
                <h2 className="py-4 font-semibold text-gray-600">Box Preview</h2>
                <div className="flex flex-wrap gap-6">
                    <div
                        ref={zoomStageRef}
                        onMouseEnter={handleZoomEnter}
                        onMouseLeave={handleZoomLeave}
                        onMouseMove={handleZoomMove}
                        className="relative inline-block overflow-hidden cursor-zoom-in"
                    >
                        <div
                            ref={boxPreviewRef}
                            className="inline-block"
                            style={{
                                transform: isZooming ? `scale(${ZOOM_SCALE})` : "scale(1)",
                                transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                                transition: isZooming
                                    ? "transform 0.1s ease-out"
                                    : "transform 0.3s ease-out",
                            }}
                        >
                            <DeckBoxPreview characterImages={characterImages} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinalCardsPage;