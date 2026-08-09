'use client';

import CheckoutAuth from '@/app/componnent/CheckoutAuth';
import SpinLoader from '@/app/componnent/SpingLoader';
import useCartStore from '@/store/useCartStore';
import useLogedUserStore from '@/store/useLogedUser';
import getCookie from '@/utilis/helper/cookie/gettooken';
import Image from 'next/image';
import Link from 'next/link';
import { Fraunces, Inter, IBM_Plex_Mono } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ImNotification } from 'react-icons/im';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import { HiArrowRight } from 'react-icons/hi2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ── Type system ──────────────────────────────────────────────────────────
// Fraunces: headings / display copy — gives the page a "certificate" voice.
// Inter: body copy, labels, buttons.
// IBM Plex Mono: every number (prices, quantities, edition tags) — reads
// like a ledger / receipt, which fits a collectible cards product.
const fraunces = Fraunces({
    subsets: ['latin'],
    weight: ['500', '600', '700'],
    variable: '--font-display',
});
const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-body',
});
const plexMono = IBM_Plex_Mono({
    subsets: ['latin'],
    weight: ['400', '500'],
    variable: '--font-mono',
});

const MyCart = () => {
    const router = useRouter();
    const token = getCookie();
    const [isLoading, setIsLoading] = useState(false);
    const { addToCart, cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCartStore();
    const { loginUser } = useLogedUserStore();

    useEffect(() => {
        const needsUpdate = cart.some(
            (item) =>
                item.productType === 'trading' &&
                item.productQuantity > 1 &&
                (item.productQuantity === item.packageConfig?.totalCards || item.productQuantity > 10)
        );

        if (needsUpdate) {
            useCartStore.setState({
                cart: cart.map((item) => {
                    if (
                        item.productType === 'trading' &&
                        item.productQuantity > 1 &&
                        (item.productQuantity === item.packageConfig?.totalCards || item.productQuantity > 10)
                    ) {
                        return { ...item, productQuantity: 1 };
                    }
                    return item;
                }),
            });
        }
    }, [cart]);

    // ── Backend-verified pricing ──────────────────────────────────────────
    // Never trust item.productUnitPrice for display totals — it's client
    // state and can be stale or (if ever exposed to tampering) incorrect.
    // Re-price the whole cart from product_id (+ package_slug for trading
    // items) every time the cart contents change.
    const [pricing, setPricing] = useState(null); // { items, subtotal, tax, total }
    const [pricingLoading, setPricingLoading] = useState(false);
    const [pricingError, setPricingError] = useState(false);

    useEffect(() => {
        if (cart.length === 0) {
            setPricing(null);
            setPricingError(false);
            return;
        }

        const fetchPricing = async () => {
            setPricingLoading(true);
            setPricingError(false);
            try {
                const items = cart.map((item) => ({
                    product_id: parseInt(item.productId),
                    qty: parseInt(item.productQuantity) || 1,
                    package_slug: item.selectedPackage ?? null,
                    has_joker: hasJokerCard(item),
                }));

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart/price`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        ...(token && { Authorization: `Bearer ${token}` }),
                    },
                    body: JSON.stringify({ items }),
                });

                if (!res.ok) throw new Error('Failed to price cart');
                const data = await res.json();
                setPricing(data);
            } catch (err) {
                console.error('Cart pricing error:', err);
                setPricingError(true);
                setPricing(null);
            } finally {
                setPricingLoading(false);
            }
        };

        fetchPricing();
    }, [cart, token]);

    const findPricedLine = (item) => {
        if (!pricing?.items) return null;
        const itemHasJoker = hasJokerCard(item);
        return pricing.items.find(
            (line) =>
                String(line.product_id) === String(item.productId) &&
                (line.package_slug ?? null) === (item.selectedPackage ?? null) &&
                Boolean(line.has_joker) === itemHasJoker
        );
    };

    const subtotal = pricing?.subtotal ?? 0;
    const tax = pricing?.tax ?? 0;
    const total = pricing?.total ?? 0;

    const checkoutDisabled = isLoading || cart.length === 0 || pricingLoading || pricingError;

    const handleCheckout = async () => {
        if (!cart.length) {
            toast.warn('Cart is empty!');
            return;
        }
        if (pricingLoading) {
            toast.warn("Please wait, we're verifying your cart prices.");
            return;
        }
        if (pricingError || !pricing) {
            toast.error("We couldn't verify current prices. Please refresh and try again.");
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            router.push('my-cart/checkout');
        }, 900);
    };

    const hasJokerCard = (item) => {
    const productType = String(item?.productType || '').toLowerCase();
    if (productType === 'trading') return false;

    const sourceCards = Array.isArray(item?.FinalProduct) ? item.FinalProduct : [];

    return sourceCards.some((card) => {
        const rawValue = card?.rank ?? card?.editedCard ?? card?.card_type ?? card?.type ?? null;

        if (typeof rawValue === 'string') {
            const normalized = rawValue.trim().toLowerCase();
            return normalized === 'joker' || normalized === 'joker_card' || normalized.includes('joker');
        }

        return false;
    });
};

    const editionTag = (index) => `No. ${String(index + 1).padStart(3, '0')}`;

    return (
        <main
            className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} min-h-[60vh] h-fit bg-[#F3F4F6] py-6 pb-28 lg:pb-16`}
            style={{ fontFamily: 'var(--font-body)' }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6 sm:mb-8">
                    <div className="flex gap-3 sm:gap-4 items-center">
                        <button
                            onClick={() => router.back()}
                            aria-label="Go back"
                            className="bg-white hover:bg-[#1B2420]/5 text-[#1B2420] border border-[#1B2420]/10 rounded-full p-2.5 cursor-pointer transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F6F5E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F3EC]"
                        >
                            <IoMdArrowRoundBack className="text-lg" />
                        </button>
                        <h3
                            className="text-2xl sm:text-3xl font-semibold text-[#1B2420] tracking-tight"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            Shopping Cart
                        </h3>
                    </div>
                    <div
                        className="bg-white text-[#1B2420]/70 border border-[#1B2420]/10 px-3 py-1.5 rounded-full text-sm"
                        style={{ fontFamily: 'var(--font-mono)' }}
                    >
                        Items: <b className="text-[#1B2420]">{cart.length}</b>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                    {/* Cart Items Section */}
                    <div className="bg-white rounded-3xl shadow-sm border border-[#1B2420]/[0.06] col-span-1 lg:col-span-8 p-4 sm:p-6">
                        {cart.length > 0 ? (
                            <div className="divide-y divide-dashed divide-[#1B2420]/15">
                                {cart.map((item, index) => {
                                    const pricedLine = findPricedLine(item);
                                    const unitPrice = pricedLine ? Number(pricedLine.unit_price) : null;
                                    const lineTotal = pricedLine ? Number(pricedLine.line_total) : null;
                                    const showStepper = item.productType !== 'trading';

                                    return (
                                        <div
                                            key={item.id ?? index}
                                            className="relative flex flex-col sm:flex-row sm:items-center gap-4 py-5 first:pt-0 last:pb-0"
                                        >
                                            {/* Thumbnail + identity (+ price on mobile) */}
                                            <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                                                <div className="relative shrink-0">
                                                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 border-[#F7F3EC] ring-1 ring-[#1B2420]/10 bg-[#EDE7DA]">
                                                        {item?.productImage && (
                                                            <Image
                                                                src={item.productImage}
                                                                alt={item?.productName || 'Product'}
                                                                width={96}
                                                                height={96}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="min-w-0 flex-1 pt-0.5 pr-10 sm:pr-0">
                                                    <p
                                                        className="text-[#1B2420] font-semibold text-sm sm:text-base leading-snug"
                                                        style={{ fontFamily: 'var(--font-display)' }}
                                                    >
                                                        {item?.productName}
                                                    </p>
                                                    <span className="inline-block mt-1.5 text-xs bg-[#2F6F5E]/10 text-[#2F6F5E] border border-[#2F6F5E]/20 rounded-full px-2.5 py-0.5 capitalize">
                                                        {item?.productType}
                                                    </span>

                                                    {/* Price — mobile only. Lives in the same column as
                                                        the title/badge so it lines up instead of floating
                                                        in a separate indented row. */}
                                                    <div
                                                        className="sm:hidden mt-2"
                                                        style={{ fontFamily: 'var(--font-mono)' }}
                                                    >
                                                        {unitPrice !== null ? (
                                                            <>
                                                                {item.productQuantity > 1 && (
                                                                    <p className="text-xs text-[#1B2420]/45">
                                                                        {item.productQuantity} × $
                                                                        {unitPrice.toFixed(2)}
                                                                    </p>
                                                                )}
                                                                
                                                                <p className="text-[#1B2420] font-semibold text-base">
                                                                    ${lineTotal.toFixed(2)}
                                                                </p>
                                                                {Number(pricedLine?.joker_addon ?? 0) > 0 && (
                                                                    <p className="text-xs text-[#C9A227]">
                                                                        (Including joker card)
                                                                    </p>
                                                                )}
                                                            </>
                                                        ) : pricingLoading ? (
                                                            <p className="text-[#1B2420]/35 text-sm animate-pulse">
                                                                Calculating…
                                                            </p>
                                                        ) : (
                                                            <p className="text-[#B65C4D] text-sm">Unavailable</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Qty + price + remove — desktop only, right-aligned column */}
                                            <div className="hidden sm:flex items-center justify-end gap-6">
                                                {/* {showStepper && (
                                                    <div className="flex items-center gap-1 bg-[#F7F3EC] border border-[#1B2420]/10 rounded-lg p-1">
                                                        <button
                                                            onClick={() => decreaseQuantity(item?.id)}
                                                            aria-label="Decrease quantity"
                                                            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white text-[#1B2420] font-medium cursor-pointer transition"
                                                        >
                                                            −
                                                        </button>
                                                        <span
                                                            className="min-w-[1.75rem] text-center text-sm font-medium text-[#1B2420] select-none"
                                                            style={{ fontFamily: 'var(--font-mono)' }}
                                                        >
                                                            {item.productQuantity}
                                                        </span>
                                                        <button
                                                            onClick={() => increaseQuantity(item?.id)}
                                                            aria-label="Increase quantity"
                                                            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white text-[#1B2420] font-medium cursor-pointer transition"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                )} */}

                                                <div
                                                    className="text-right min-w-[5.5rem]"
                                                    style={{ fontFamily: 'var(--font-mono)' }}
                                                >
                                                    {unitPrice !== null ? (
                                                        <>
                                                            {item.productQuantity > 1 && (
                                                                <p className="text-xs text-[#1B2420]/45">
                                                                    {item.productQuantity} × ${unitPrice.toFixed(2)}
                                                                </p>
                                                            )}
                                                            {Number(pricedLine?.joker_addon ?? 0) > 0 && (
                                                                <p className="text-xs text-[#C9A227]">
                                                                    {/* + ${Number(pricedLine.joker_addon).toFixed(2)} joker */}
                                                                    (Including joker card)
                                                                </p>
                                                            )}
                                                            <p className="text-[#1B2420] font-semibold text-base">
                                                                ${lineTotal.toFixed(2)}
                                                            </p>
                                                        </>
                                                    ) : pricingLoading ? (
                                                        <p className="text-[#1B2420]/35 text-sm animate-pulse">Calculating…</p>
                                                    ) : (
                                                        <p className="text-[#B65C4D] text-sm">Unavailable</p>
                                                    )}
                                                </div>

                                                <button
                                                    onClick={() => removeFromCart(item?.id)}
                                                    aria-label="Remove item"
                                                    className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-[#1B2420]/10 text-[#1B2420]/40 hover:text-[#B65C4D] hover:border-[#B65C4D]/30 hover:bg-[#B65C4D]/5 cursor-pointer transition"
                                                >
                                                    <RxCross2 className="text-base" />
                                                </button>
                                            </div>

                                            {/* Remove button — mobile only, pinned to top-right corner */}
                                            <button
                                                onClick={() => removeFromCart(item?.id)}
                                                aria-label="Remove item"
                                                className="sm:hidden absolute top-5 right-4 shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-[#1B2420]/10 text-[#1B2420]/40 hover:text-[#B65C4D] hover:border-[#B65C4D]/30 hover:bg-[#B65C4D]/5 cursor-pointer transition"
                                            >
                                                <RxCross2 className="text-base" />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center py-14 sm:py-20">
                                <svg
                                    width="56"
                                    height="56"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="text-[#1B2420]/20 mb-4"
                                >
                                    <path
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293A1 1 0 0 0 5.414 17H17M17 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM9 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <p
                                    className="text-[#1B2420] font-semibold text-lg mb-1"
                                    style={{ fontFamily: 'var(--font-display)' }}
                                >
                                    Your cart is empty
                                </p>
                                <p className="text-[#1B2420]/50 text-sm mb-6">
                                    Nothing here yet — go find a card worth keeping.
                                </p>
                                <Link
                                    href="/shop"
                                    className="inline-flex items-center gap-2 bg-[#3CA9FF] text-[#F7F3EC] font-medium text-sm px-5 py-2.5 rounded-full transition"
                                >
                                    Browse the shop <HiArrowRight />
                                </Link>
                            </div>
                        )}

                        {cart.length > 0 && (
                            <div className="text-right mt-5">
                                <Link
                                    href="/shop"
                                    className="inline-flex items-center gap-1.5 text-sm text-[#1B2420]/60 hover:text-[#1B2420] transition underline underline-offset-4"
                                >
                                    Keep Shopping
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Order Summary Section */}
                    <div className="col-span-1 lg:col-span-4 bg-white rounded-3xl shadow-sm border border-[#1B2420]/[0.06] p-5 sm:p-6 lg:sticky lg:top-6">
                        <h3
                            className="text-xl sm:text-2xl font-semibold text-[#1B2420] mb-4"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            Order Summary
                        </h3>

                        <div className="border border-[#C9A227]/25 p-3.5 rounded-2xl mb-5 flex gap-3 items-start">
                            <ImNotification className="text-xl text-[#C9A227] mt-0.5 shrink-0" />
                            <p className="text-sm text-[#1B2420]/70 leading-relaxed">
                                <b className="text-[#1B2420]">Important:</b> after a successful order, we&apos;ll
                                contact you shortly to confirm the details.
                            </p>
                        </div>

                        {/* Ticket-stub perforation */}
                        <div className="relative my-1">
                            <div className="border-t-2 border-dashed border-[#1B2420]/15" />
                            <span className="absolute -left-8 -top-3 w-6 h-6 rounded-full bg-[#F3F4F6]" />
                            <span className="absolute -right-8 -top-3 w-6 h-6 rounded-full bg-[#F3F4F6]" />
                        </div>

                        {pricingLoading ? (
                            <p className="text-sm text-[#1B2420]/40 py-4 animate-pulse">Calculating total…</p>
                        ) : pricingError ? (
                            <p className="text-sm text-[#B65C4D] py-4">Couldn&apos;t verify prices. Please refresh.</p>
                        ) : (
                            <div style={{ fontFamily: 'var(--font-mono)' }}>
                                <div className="py-3 flex justify-between text-sm text-[#1B2420]/60 border-b border-[#1B2420]/10">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="py-3 flex justify-between text-sm text-[#1B2420]/60 border-b border-[#1B2420]/10">
                                    <span>Tax (8%)</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className="py-4 flex justify-between items-baseline">
                                    <span
                                        className="text-base font-semibold text-[#1B2420]"
                                        style={{ fontFamily: 'var(--font-display)' }}
                                    >
                                        Total
                                    </span>
                                    <span className="text-xl font-semibold text-[#1B2420]">${total.toFixed(2)}</span>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handleCheckout}
                            disabled={checkoutDisabled}
                            className="hidden lg:flex w-full mt-2 bg-[#3CA9FF] text-[#F7F3EC] font-semibold text-base py-3.5 rounded-xl shadow-md shadow-[#2F6F5E]/20 transition items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                        >
                            {isLoading && <SpinLoader />}
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile sticky checkout bar */}
            {cart.length > 0 && (
                <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-[#1B2420]/10 px-4 py-3 shadow-[0_-6px_20px_rgba(0,0,0,0.06)]">
                    <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                        <div>
                            <p className="text-[11px] uppercase tracking-wide text-[#1B2420]/45">Total</p>
                            <p
                                className="text-lg font-semibold text-[#1B2420]"
                                style={{ fontFamily: 'var(--font-mono)' }}
                            >
                                {pricingLoading ? '—' : `$${total.toFixed(2)}`}
                            </p>
                        </div>
                        <button
                            onClick={handleCheckout}
                            disabled={checkoutDisabled}
                            className="flex items-center justify-center gap-2 bg-[#3CA9FF] text-[#F7F3EC] font-semibold px-6 py-3 rounded-xl transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading && <SpinLoader />}
                            Checkout
                        </button>
                    </div>
                </div>
            )}

            <ToastContainer autoClose={2000} />

            {!loginUser?.token && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#1B2420]/70 backdrop-blur-sm pb-10 z-50">
                    <div className="shadow-2xl w-fit h-fit">
                        <CheckoutAuth />
                    </div>
                </div>
            )}
        </main>
    );
};

export default MyCart;