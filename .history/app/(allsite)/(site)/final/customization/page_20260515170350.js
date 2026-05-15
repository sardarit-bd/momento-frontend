"use client";
import SpinLoader from "@/app/componnent/SpingLoader";
import boxPreviewDefault from "@/public/boxpreview.png";
import useboxcartstore from "@/store/useboxcartstore";
import useCartStore from "@/store/useCartStore";
import useDeckFinalPreview from "@/store/useDeckFinalPreview";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import html2canvas from "html2canvas";
import { useRef } from "react";

const LAYER_ORDER = ["dresses", "skin_tones", "hairs", "crowns", "beards", "eyes", "mouths", "noses"];

const FinalCardsPage = () => {
    const { addToCart, cart } = useCartStore();
    const { boxs } = useboxcartstore();
    const [loading, setloading] = useState(false);
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [characterImages, setCharacterImages] = useState([]);
    const router = useRouter();
    const { deckcart } = useDeckFinalPreview();
    const boxPreviewRef = useRef(null);


    const ensureDeckInCart = () => {
        const deckItem = deckcart?.[0];
        if (!deckItem) return false;
        const alreadyInCart = cart.some((item) => item?.id === deckItem?.id);
        if (!alreadyInCart) addToCart(deckItem);
        return true;
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        if (!ensureDeckInCart()) return;
        setCheckoutLoading(true);

        // Capture box FIRST before navigating
        const boxImage = await captureAndResizeBox();
        if (boxImage && deckcart?.[0]) {
            updateCart({ ...deckcart[0], BoxImage: boxImage });
        }

        // Then navigate
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

    // const captureAndResizeBox = async () => {
    //     if (!boxPreviewRef.current) return null;
    //     try {
    //         // Capture at screen resolution
    //         const captured = await html2canvas(boxPreviewRef.current, {
    //             useCORS: true,
    //             allowTaint: true,
    //             scale: 3, // higher = better quality
    //             backgroundColor: null,
    //         });

    //         // Resize to exact TGC requirement: 2325x1950
    //         const resized = document.createElement('canvas');
    //         resized.width = 2325;
    //         resized.height = 1950;
    //         const ctx = resized.getContext('2d');
    //         ctx.drawImage(captured, 0, 0, 2325, 1950);
    //         return resized.toDataURL('image/png');
    //     } catch (err) {
    //         console.error('Box capture failed:', err);
    //         return null;
    //     }
    // };


    const captureAndResizeBox = async () => {
        if (!boxPreviewRef.current) return null;

        const rect = boxPreviewRef.current.getBoundingClientRect();
        console.log('Box preview dimensions:', {
            width: rect.width,
            height: rect.height,
            ratio: rect.width / rect.height,
        });
        console.log('TGC ratio:', 2325 / 1950);
    }

    useEffect(() => {
        const chars = deckcart[0]?.CharacterImages || [];
        setCharacterImages(chars);
    }, [deckcart]);

    const finalProductCards = deckcart[0]?.FinalProduct || [];

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
                    <div ref={boxPreviewRef} className="relative w-[280px] sm:w-[340px] md:w-[420px] rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">

                        {/* Box Template Background */}
                        <Image
                            src={boxPreviewDefault}
                            alt="Box Template"
                            width={1000}
                            height={1000}
                            className="w-full h-auto object-contain"
                            priority
                        />

                        {characterImages.length > 0 && (
                            <>
                                {/* Zone 1 — Top flap: horizontal bust row */}
                                <div
                                    className="absolute z-10 flex items-end justify-center"
                                    style={{ top: '9.5%', left: '10%', width: '36%', height: '11%', transform: 'rotate(180deg)', }}
                                >
                                    {characterImages.map((charSrc, idx) => (
                                        <div
                                            key={idx}
                                            className="relative overflow-hidden flex-shrink-0"
                                            style={{
                                                width: `${Math.min(22, 90 / characterImages.length)}%`,
                                                aspectRatio: '1 / 1',
                                                borderRadius: '50%',
                                                marginLeft: idx === 0 ? '0' : '-4px', // ← controls overlap, 0 = adjacent, negative = overlap
                                            }}
                                        >
                                            <img
                                                src={charSrc}
                                                alt={`Character bust ${idx}`}
                                                className="absolute w-full object-cover"
                                                style={{ top: '0%', left: '0%', height: '160%', objectPosition: 'top center' }}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Zone 2 — Front face: pyramid team portrait */}
                                <div
                                    className="absolute z-10"
                                    style={{ top: '43%', left: '10%', width: '36%', height: '42%' }}
                                >
                                    {(() => {
                                        const total = characterImages.length;

                                        const getLayout = () => {
                                            if (total === 1) {
                                                return [{ i: 0, x: 0, y: 0, scale: 1, z: 3, size: '55%' }];
                                            }
                                            if (total === 2) {
                                                return [
                                                    { i: 1, x: -20, y: -18, scale: 0.72, z: 1, size: '38%' },
                                                    { i: 0, x: 0, y: 0, scale: 1, z: 3, size: '55%' },
                                                ];
                                            }
                                            if (total === 3) {
                                                return [
                                                    { i: 1, x: -22, y: -18, scale: 0.72, z: 1, size: '38%' },
                                                    { i: 2, x: 22, y: -18, scale: 0.72, z: 1, size: '38%' },
                                                    { i: 0, x: 0, y: 0, scale: 1, z: 3, size: '55%' },
                                                ];
                                            }
                                            if (total === 4) {
                                                return [
                                                    { i: 0, x: -22, y: -15, scale: 0.65, z: 1, size: '95%', clip: '0% 25% 10% 23%' },
                                                    { i: 3, x: 22, y: -15, scale: 0.65, z: 1, size: '95%', clip: '0% 23% 10% 25%' },
                                                    { i: 1, x: -26, y: 10, scale: 0.78, z: 2, size: '80%', clip: '0% 27% 55% 28%' },
                                                    { i: 2, x: 26, y: 10, scale: 0.78, z: 2, size: '80%', clip: '0% 27% 55% 25%' },
                                                    { i: 0, x: 0, y: 32, scale: 1, z: 3, size: '99%', clip: '0% 25% 49.3% 25%' },
                                                ];
                                            }
                                            return [
                                                { i: 3, x: -21, y: -15, scale: 0.65, z: 1, size: '95%' },
                                                { i: 4, x: 21, y: -15, scale: 0.65, z: 1, size: '95%' },
                                                { i: 1, x: -26, y: 10, scale: 0.78, z: 2, size: '80%', clip: '0% 27% 55% 28%' },
                                                { i: 2, x: 26, y: 10, scale: 0.78, z: 2, size: '80%', clip: '0% 27% 55% 25%' },
                                                { i: 0, x: 0, y: 32, scale: 1, z: 3, size: '99%', clip: '0% 25% 49.3% 25%' },
                                            ];
                                        };

                                        return getLayout().map((slot, key) => (
                                            <div
                                                key={key}
                                                className="absolute overflow-hidden"
                                                style={{
                                                    width: slot.size,
                                                    aspectRatio: '3 / 4',
                                                    bottom: '0%',
                                                    left: '50%',
                                                    transform: `translateX(calc(-50% + ${slot.x}%)) translateY(${slot.y}%) scale(${slot.scale})`,
                                                    transformOrigin: 'bottom center',
                                                    zIndex: slot.z,
                                                    borderRadius: '4px',
                                                    clipPath: slot.clip ? `inset(${slot.clip} round 4px)` : 'none',
                                                }}
                                            >
                                                <img
                                                    src={characterImages[slot.i]}
                                                    alt={`Character ${slot.i}`}
                                                    className="absolute w-full object-cover"
                                                    style={{ top: '0%', height: '100%', objectPosition: 'top center' }}
                                                />
                                            </div>
                                        ));
                                    })()}
                                </div>

                                {/* Zone 3 — Right side strip: stacked head thumbnails */}
                                <div
                                    className="absolute z-10 flex flex-col items-center justify-start"
                                    style={{ top: '28%', left: '51%', width: '8%', height: '45%' }}
                                >
                                    {(() => {
                                        const total = characterImages.length;

                                        const getStripLayout = () => {
                                            if (total === 1) {
                                                return [
                                                    { i: 0, isLeader: true },
                                                ];
                                            }
                                            if (total === 2) {
                                                return [
                                                    { i: 1, isLeader: false },
                                                    { i: 0, isLeader: false },
                                                    { i: 0, isLeader: true },  // leader duplicated
                                                ];
                                            }
                                            if (total === 3) {
                                                return [
                                                    { i: 2, isLeader: false },
                                                    { i: 1, isLeader: false },
                                                    { i: 0, isLeader: false },
                                                    { i: 0, isLeader: true },  // leader duplicated
                                                ];
                                            }
                                            if (total === 4) {
                                                return [
                                                    { i: 3, isLeader: false },
                                                    { i: 2, isLeader: false },
                                                    { i: 1, isLeader: false },
                                                    { i: 0, isLeader: false },
                                                    { i: 0, isLeader: true },  // leader duplicated → total 5
                                                ];
                                            }
                                            // 5+ characters
                                            return [
                                                { i: 4, isLeader: false },
                                                { i: 3, isLeader: false },
                                                { i: 2, isLeader: false },
                                                { i: 1, isLeader: false },
                                                { i: 0, isLeader: true },
                                            ];
                                        };

                                        return getStripLayout().map((slot, key) => (
                                            <div
                                                key={key}
                                                className="relative flex-shrink-0 overflow-hidden"
                                                style={{
                                                    width: slot.isLeader ? '85%' : '70%',
                                                    aspectRatio: '1 / 1',
                                                    borderRadius: slot.isLeader ? '0%' : '40%',
                                                    marginTop: key === 0 ? '0' : '-12%',
                                                    transform: `translateX(${slot.isLeader ? -80 : -90}%) translateY(${slot.isLeader ? 0 : -40}%) rotate(-90deg)`,
                                                }}
                                            >
                                                <img
                                                    src={characterImages[slot.i]}
                                                    alt={`Strip character ${slot.i}`}
                                                    className="absolute object-cover"
                                                    style={{
                                                        width: '100%',
                                                        height: '250%',
                                                        top: '0%',
                                                        left: '-10%',
                                                        objectPosition: 'top center',
                                                    }}
                                                />
                                            </div>
                                        ));
                                    })()}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinalCardsPage;