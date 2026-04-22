"use client";
import ApplicationSkeleton from "@/app/componnent/ApplicationSkeleton";
import useDeckFinalPreview from "@/store/useDeckFinalPreview";
import usefinalCardsStore from "@/store/usefinalCardsStore";
import generateUserId from "@/utilis/helper/generateUserId";
import MakeGet from "@/utilis/requestrespose/get";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState, Fragment } from "react"; // Added Fragment here
import { GiCardAceClubs, GiCardJackClubs, GiCardJoker, GiCardKingClubs, GiCardQueenClubs } from "react-icons/gi";
import { IoIosArrowDown, IoMdCheckmark } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import CardPreview from "../../../../../componnent/CardPreview";
import CardSidebar from "../../../../../componnent/CardSidebar";
import SideController from "../../../../../componnent/SideController";

const layers = ["dresses", "skin_tones", "hairs", "crowns", "beards", "eyes", "mouths", "noses"];

const CARD_STEPS = [
    { type: "Ace_Card", label: "Ace", icon: GiCardAceClubs },
    { type: "king_Card", label: "King", icon: GiCardKingClubs },
    { type: "Queen_Card", label: "Queen", icon: GiCardQueenClubs },
    { type: "Jeck_Card", label: "Jack", icon: GiCardJackClubs },
];
const JOKER_STEP = { type: "Joker_Card", label: "Joker", icon: GiCardJoker };

const CARD_FLOW = CARD_STEPS.map((step) => step.type);
const MAX_CUSTOMIZABLE_CARDS = 5;
const CARD_TYPE_LABELS = {
    Ace_Card: "Ace",
    king_Card: "King",
    Queen_Card: "Queen",
    Jeck_Card: "Jack",
    Joker_Card: "Joker",
};

const ProductCustomizer = () => {
    const { slug } = useParams();
    const customCardsStorageKey = `customCards:${slug}`;
    const customCardsActiveIndexStorageKey = `customCardsActiveIndex:${slug}`;
    const previewCardNodeRef = useRef(null);

    const [product, setProduct] = useState(null);
    const [cards, setCards] = useState([]);
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const router = useRouter();
    const [spinloading, setspinloading] = useState(false);
    const [doneloading, setdoneloading] = useState(false);
    const { addToCart, clearCart } = useDeckFinalPreview();
    const [smallconOpen, setsmallconOpen] = useState(false);
    const [editedCard, seteditedCard] = useState("king_Card");
    const [activebaseEditCard, setactivebaseEditCard] = useState([]);
    const [showJokerUpsell, setshowJokerUpsell] = useState(false);
    const { setfinalCards } = usefinalCardsStore();

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await MakeGet(`api/shop/${slug}`);

            if (!res.success) {
                toast.error("There was a server side Problem");
                return;
            }

            setProduct(res?.data);

            const savedCards = localStorage.getItem(customCardsStorageKey) || localStorage.getItem("customCards");
            if (savedCards) {
                let parsedCards = [];
                try {
                    parsedCards = JSON.parse(savedCards);
                } catch {
                    parsedCards = [];
                }

                if (!Array.isArray(parsedCards) || parsedCards.length === 0) {
                    parsedCards = [];
                }

                if (parsedCards.length > 0) {
                    // Migrate legacy storage key to product-scoped key.
                    localStorage.setItem(customCardsStorageKey, JSON.stringify(parsedCards));
                }

                const initialType = CARD_FLOW.find((type) => parsedCards?.some((card) => card?.editedCard === type)) || parsedCards?.[0]?.editedCard;
                const storedActiveIndex = Number(localStorage.getItem(customCardsActiveIndexStorageKey));
                const initialIndex = Number.isInteger(storedActiveIndex) && storedActiveIndex >= 0 && storedActiveIndex < parsedCards.length
                    ? storedActiveIndex
                    : parsedCards?.findIndex((card) => card?.editedCard === initialType);

                if (parsedCards.length > 0) {
                    setCards(parsedCards);
                    setActiveCardIndex(initialIndex >= 0 ? initialIndex : 0);
                    if (initialType) seteditedCard(initialType);
                    return;
                }
            }

            const baseForFirstStep = res?.data?.customizations?.custom_sets?.find((item) => item?.card_type === CARD_FLOW[0])?.image;
            const fallbackBase = res?.data?.customizations?.custom_sets?.[0]?.image;
            const initialLayers = {};

            layers.forEach((layer) => {
                if (layer === "beards") return;
                const items = res?.data?.customizations?.[layer];
                if (items?.length > 0) initialLayers[layer] = items[0]?.image;
            });

            setCards([{ editedCard: CARD_FLOW[0], baseImage: baseForFirstStep || fallbackBase, selectedLayers: initialLayers }]);
            setActiveCardIndex(0);
            seteditedCard(CARD_FLOW[0]);
        };

        fetchProduct();
    }, [slug, customCardsStorageKey, customCardsActiveIndexStorageKey]);

    useEffect(() => {
        if (!slug || !cards?.length) return;

        localStorage.setItem(customCardsStorageKey, JSON.stringify(cards));
        localStorage.setItem("customCards", JSON.stringify(cards)); // keep legacy key in sync
        localStorage.setItem(customCardsActiveIndexStorageKey, String(activeCardIndex));
    }, [cards, activeCardIndex, slug, customCardsStorageKey, customCardsActiveIndexStorageKey]);

    useEffect(() => {
        const currentCardType = cards?.[activeCardIndex]?.editedCard;
        if (!currentCardType || currentCardType === "Joker_Card") return;
        if (currentCardType !== editedCard) {
            seteditedCard(currentCardType);
        }
    }, [cards, activeCardIndex, editedCard]);

    if (!product) return <ApplicationSkeleton />;

    const activeCard = cards[activeCardIndex];
    const activeType = activeCard?.editedCard;
    const jokerPreviewImage =
        product?.customizations?.custom_sets?.find((item) => item?.card_type === "Joker_Card")?.image ||
        product?.customizations?.custom_sets?.[0]?.image;

    const selectLayerImage = (layer, url) => {
        setCards((prev) =>
            prev.map((card, i) => {
                if (i !== activeCardIndex) return card;
                const updatedLayers = { ...card.selectedLayers };
                if (updatedLayers[layer] === url) delete updatedLayers[layer];
                else updatedLayers[layer] = url;
                return { ...card, selectedLayers: updatedLayers };
            })
        );
    };

    const selectBaseImage = (url, type) => {
        setCards((prev) => prev.map((card, i) => (i === activeCardIndex ? { ...card, editedCard: type, baseImage: url } : card)));
    };

    const addNewCard = (cardType = editedCard, shouldSetActive = true) => {
        if (cards.length >= MAX_CUSTOMIZABLE_CARDS) {
            toast.warn(`You can customize up to ${MAX_CUSTOMIZABLE_CARDS} cards only.`);
            return;
        }

        const baseForType = product?.customizations?.custom_sets?.find((item) => item?.card_type === cardType)?.image;
        const fallbackBase = product?.customizations?.custom_sets?.[0]?.image;
        const initialLayersTwo = {};

        layers.forEach((layer) => {
            if (layer === "beards") return;
            const items = product?.customizations?.[layer];
            if (items?.length > 0) initialLayersTwo[layer] = items[0]?.image;
        });

        setCards((prev) => {
            const nextCards = [...prev, { editedCard: cardType, baseImage: baseForType || fallbackBase, selectedLayers: initialLayersTwo }];
            if (shouldSetActive) {
                setActiveCardIndex(nextCards.length - 1);
            }
            return nextCards;
        });
    };

    const removeCard = (index) => {
        if (cards.length <= 1) return;
        if (cards[index]?.editedCard === "Ace_Card") return;

        const updatedCards = cards.filter((_, i) => i !== index);
        setCards(updatedCards);

        let nextActiveIndex = activeCardIndex;
        if (index < activeCardIndex) nextActiveIndex = activeCardIndex - 1;
        if (index === activeCardIndex) nextActiveIndex = Math.min(activeCardIndex, updatedCards.length - 1);

        setActiveCardIndex(nextActiveIndex);
        const nextEdited = updatedCards[nextActiveIndex]?.editedCard;
        if (nextEdited) seteditedCard(nextEdited);
    };

    const goToFinalView = async ({ redirectToCheckout = false } = {}) => {
        const requiredCards = ["Ace_Card", "Queen_Card", "king_Card", "Jeck_Card"];
        const hasAllCards = requiredCards.every((req) => cards.some((item) => item.editedCard === req));

        if (!hasAllCards) {
            toast.warn("Must Be Design at Least Ace Card, Queen Card, King Card, Jeck Card Cards");
            return;
        }

        setspinloading(true);

        const finalCardImages = cards.map((item) => item?.baseImage).filter(Boolean);

        setfinalCards(finalCardImages);
        clearCart();

        const hasJokerCard = cards.some((card) => card?.editedCard === "Joker_Card");
        const unitBasePrice = Number(product?.offer_price > 0 ? product?.offer_price : product?.price) || 0;
        const producted = {
            id: generateUserId(),
            productId: product?.id,
            productSlug: product?.slug,
            productName: product?.name,
            productType: product?.type,
            productUnitPrice: hasJokerCard ? unitBasePrice + 7 : unitBasePrice,
            productQuantity: 1,
            productImage: product?.image,
            productGalary: product?.images,
            productDescription: product?.description,
            FinalProduct: cards,
            FinalProductImages: finalCardImages,
            jokerAdded: hasJokerCard,
        };

        addToCart(producted);
        setspinloading(false);
        router.push(redirectToCheckout ? "/my-cart/checkout" : "/final/customization");
    };

    const Done = async () => {
        // Keep the bottom toolbar button, but collapse the panel after tapping Next.
        setsmallconOpen(false);
        setdoneloading(true);

        const hasJokerCardNow = cards.some((card) => card?.editedCard === "Joker_Card");
        if (hasJokerCardNow) {
            await goToFinalView();
            setTimeout(() => setdoneloading(false), 500);
            return;
        }

        const currentStep = CARD_FLOW.indexOf(activeType);
        const currentIndex = currentStep >= 0 ? currentStep : CARD_FLOW.findIndex((type) => !cards.some((card) => card.editedCard === type)) - 1;
        const nextStepIndex = currentIndex + 1;

        if (nextStepIndex >= CARD_FLOW.length) {
            const hasJokerCard = cards.some((card) => card?.editedCard === "Joker_Card");
            if (!hasJokerCard) {
                setshowJokerUpsell(true);
                setdoneloading(false);
                return;
            }

            await goToFinalView();
            setTimeout(() => setdoneloading(false), 500);
            return;
        }

        const nextCardType = CARD_FLOW[nextStepIndex];
        const existingCardIndex = cards.findIndex((item) => item?.editedCard === nextCardType);

        if (existingCardIndex >= 0) {
            setActiveCardIndex(existingCardIndex);
            seteditedCard(nextCardType);
        } else {
            seteditedCard(nextCardType);
            addNewCard(nextCardType);
        }

        setTimeout(() => setdoneloading(false), 500);
    };

    const handleSkipJokerUpsell = async () => {
        setshowJokerUpsell(false);
        await goToFinalView();
    };

    const handleAddJokerCard = () => {
        const jokerBase =
            product?.customizations?.custom_sets?.find((item) => item?.card_type === "Joker_Card")?.image ||
            product?.customizations?.custom_sets?.[0]?.image;

        const initialLayers = {};
        layers.forEach((layer) => {
            if (layer === "beards") return;
            const items = product?.customizations?.[layer];
            if (items?.length > 0) initialLayers[layer] = items[0]?.image;
        });

        setCards((prev) => {
            const existingJokerIndex = prev.findIndex((card) => card?.editedCard === "Joker_Card");
            if (existingJokerIndex >= 0) {
                setActiveCardIndex(existingJokerIndex);
                return prev;
            }

            if (prev.length >= MAX_CUSTOMIZABLE_CARDS) {
                toast.warn(`You can customize up to ${MAX_CUSTOMIZABLE_CARDS} cards only.`);
                return prev;
            }

            const nextCards = [
                ...prev,
                {
                    editedCard: "Joker_Card",
                    baseImage: jokerBase,
                    selectedLayers: initialLayers,
                },
            ];

            setActiveCardIndex(nextCards.length - 1);
            return nextCards;
        });
        setshowJokerUpsell(false);
    };

    const hasJokerCard = cards.some((card) => card?.editedCard === "Joker_Card");
    const visibleSteps = hasJokerCard ? [...CARD_STEPS, JOKER_STEP] : CARD_STEPS;
    const doneButtonLabel = doneloading || spinloading ? "Loading..." : "Next Card";
    const activeCardLabel = CARD_TYPE_LABELS[activeType] || "Ace / King / Queen / Jack";

    const handleStepClick = (stepType) => {
        const targetCardIndex = cards.findIndex((card) => card?.editedCard === stepType);
        if (targetCardIndex < 0) return;

        setActiveCardIndex(targetCardIndex);
        seteditedCard(stepType);
    };

    return (
        <>
            <div className="bg-[#f2f4f8]">
                {showJokerUpsell ? (
                    <main
                        className="relative mx-auto flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-5 sm:px-6 sm:py-8"
                        style={{
                            background: "linear-gradient(135deg, #3CA9FF 0%, #8CCEFF 35%, #D9EEFD 62%, #EBF6FF 82%, #F3F4F6 100%)",
                        }}
                    >
                        <div className="pointer-events-none absolute -left-16 top-10 h-44 w-44 rounded-[28px] opacity-80" style={{ background: "linear-gradient(140deg, #3CA9FF, #7DC8FF)" }} />
                        <div className="pointer-events-none absolute right-[-52px] top-[18%] h-36 w-36 rounded-[24px] opacity-70" style={{ background: "#D9EEFD" }} />
                        <div className="pointer-events-none absolute bottom-[-28px] left-[18%] h-40 w-40 rounded-[30px] opacity-60" style={{ background: "#EBF6FF" }} />
                        <div className="pointer-events-none absolute bottom-10 right-[10%] h-28 w-28 rounded-[20px] opacity-75" style={{ background: "linear-gradient(145deg, #3CA9FF, #B3DEFF)" }} />
                        <div
                            className="relative z-10 w-full max-w-[700px] overflow-hidden rounded-[30px] border p-4 shadow-2xl sm:p-6 md:p-8"
                            style={{
                                background: "linear-gradient(180deg, rgba(243,244,246,0.96) 0%, rgba(235,246,255,0.98) 100%)",
                                borderColor: "#BFE2FF",
                                boxShadow: "0 32px 80px rgba(60, 169, 255, 0.22)",
                            }}
                        >
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_1.1fr] md:gap-7">
                                <div className="order-2 space-y-4 md:order-1 md:space-y-5">
                                    <div className="rounded-2xl p-4 sm:p-5" style={{ background: "#F3F4F6", border: "1px solid #D9EEFD" }}>
                                        <h2 className="text-center text-2xl font-bold leading-tight text-sky-800 sm:text-3xl md:text-left">
                                            Add a Wild Card to Your Deck
                                        </h2>
                                        <p className="mt-2 text-center text-sm leading-relaxed text-slate-600 sm:text-base md:text-left">
                                            The Joker brings unpredictability and extra personality
                                        </p>
                                    </div>

                                    <div className="rounded-2xl p-4 sm:p-5" style={{ backgroundColor: "#EBF6FF", border: "1px solid #D9EEFD" }}>
                                        <p className="flex items-start gap-2 text-sm text-slate-700 sm:text-base">
                                            <IoMdCheckmark className="mt-0.5 shrink-0 text-lg" style={{ color: "#3CA9FF" }} />
                                            Unique design that stands out
                                        </p>
                                        <p className="mt-2 flex items-start gap-2 text-sm text-slate-700 sm:text-base">
                                            <IoMdCheckmark className="mt-0.5 shrink-0 text-lg" style={{ color: "#3CA9FF" }} />
                                            Extra customization options
                                        </p>
                                        <p className="mt-2 flex items-start gap-2 text-sm text-slate-700 sm:text-base">
                                            <IoMdCheckmark className="mt-0.5 shrink-0 text-lg" style={{ color: "#3CA9FF" }} />
                                            Complete your deck perfectly
                                        </p>
                                    </div>

                                    <div className="space-y-2.5 rounded-2xl p-3 sm:p-4" style={{ background: "#F3F4F6", border: "1px solid #D9EEFD" }}>
                                        <button
                                            type="button"
                                            onClick={handleAddJokerCard}
                                            className="flex h-12 w-full items-center justify-center rounded-xl text-base font-semibold text-white transition hover:opacity-95 sm:h-14 sm:rounded-2xl sm:text-lg"
                                            style={{
                                                background: "linear-gradient(90deg, #3CA9FF 0%, #6AC0FF 100%)",
                                                boxShadow: "0 14px 30px rgba(60, 169, 255, 0.35)",
                                            }}
                                        >
                                            Add Joker for $7
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleSkipJokerUpsell}
                                            className="flex h-11 w-full items-center justify-center rounded-xl text-sm font-semibold text-slate-700 transition sm:h-12 sm:rounded-2xl sm:text-base"
                                            style={{ backgroundColor: "#F3F4F6", border: "1px solid #D9EEFD" }}
                                        >
                                            Skip for Now
                                        </button>
                                    </div>
                                </div>

                                <div className="order-1 flex flex-col items-center md:order-2">
                                    <div
                                        className="flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg sm:h-20 sm:w-20 sm:rounded-3xl"
                                        style={{
                                            background: "linear-gradient(135deg, #3CA9FF 0%, #6AC0FF 100%)",
                                            boxShadow: "0 14px 35px rgba(60, 169, 255, 0.34)",
                                        }}
                                    >
                                        <GiCardJoker className="text-3xl sm:text-4xl" />
                                    </div>

                                    <div
                                        className="mt-4 flex w-full justify-center rounded-2xl p-3 sm:mt-5 sm:p-4"
                                        style={{ background: "linear-gradient(160deg, #D9EEFD 0%, #EBF6FF 100%)", border: "1px solid #BFE2FF" }}
                                    >
                                        {jokerPreviewImage ? (
                                            <img
                                                src={jokerPreviewImage}
                                                alt="Joker card preview"
                                                className="h-[200px] w-[145px] rounded-xl object-cover shadow-md sm:h-[240px] sm:w-[175px]"
                                                style={{
                                                    border: "1px solid #3CA9FF",
                                                    boxShadow: "0 12px 24px rgba(60, 169, 255, 0.24)",
                                                }}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                ) : (
                    <>
                {/* 1. Header changed to sticky to naturally flow without a gap */}
                <header className="sticky top-[68px] z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur md:top-[76px]">
                    <div className="grid w-full grid-cols-1 xl:grid-cols-[260px_minmax(0,1fr)_350px]">
                        <div className="hidden xl:block" />
                        <div className="w-full px-3 py-2 md:px-6 md:py-2.5">
                            <div className="mx-auto w-full max-w-[980px]">
                                {/* 2. Changed inner container to a flex row that manages lines cleanly */}
                                <div className="flex w-full items-start justify-between">
                            {visibleSteps.map((step, index) => {
                                const Icon = step.icon;
                                const isActive = activeType === step.type;
                                const isCompleted = cards.some((card) => card?.editedCard === step.type) && !isActive;
                                const isSelectable = cards.some((card) => card?.editedCard === step.type);

                                return (
                                    <Fragment key={step.type}>
                                        {/* Step Circle & Text */}
                                        <button
                                            type="button"
                                            onClick={() => handleStepClick(step.type)}
                                            disabled={!isSelectable}
                                            className={`relative z-10 flex flex-col items-center gap-1.5 ${isSelectable ? "cursor-pointer" : "cursor-not-allowed"}`}
                                        >
                                            <div
                                                className={`flex h-10 w-10 items-center justify-center rounded-full border text-lg transition-all md:h-11 md:w-11 md:text-xl ${
                                                    isActive
                                                        ? "border-[#3CA9FF] bg-[#3CA9FF] text-white shadow-lg shadow-indigo-300"
                                                        : isCompleted
                                                        ? "border-indigo-200 bg-[#B8E6FE] text-indigo-700"
                                                        : "border-gray-300 bg-gray-100 text-gray-400"
                                                }`}
                                            >
                                                {isCompleted ? <IoMdCheckmark className="text-lg" /> : <Icon />}
                                            </div>
                                            <p className={`text-xs font-semibold md:text-sm ${isActive ? "text-[#3CA9FF]" : "text-gray-500"}`}>{step.label}</p>
                                        </button>

                                        {/* Flexible Connecting Line */}
                                        {index !== visibleSteps.length - 1 && (
                                            <div
                                                className={`mt-5 h-[2px] flex-1 mx-2 md:mx-3 md:mt-6 ${
                                                    isCompleted ? "bg-[#3CA9FF]" : "bg-[#B8E6FE]"
                                                }`}
                                            />
                                        )}
                                    </Fragment>
                                );
                            })}
                                </div>
                            </div>
                        </div>
                        <div className="hidden xl:block" />
                    </div>
                </header>

                {/* 3. Removed pt-[128px] and md:pt-[142px] from <main> so it perfectly hugs the sticky header */}
                <main className="grid w-full grid-cols-1 items-start xl:grid-cols-[260px_minmax(0,1fr)_350px] xl:h-[calc(100dvh-148px)]">
                    <aside className="hidden border-r border-gray-200 bg-white xl:sticky xl:top-[148px] xl:block xl:h-[calc(100dvh-148px)] xl:overflow-hidden">
                        <CardSidebar
                            cards={cards}
                            activeIndex={activeCardIndex}
                            setActiveIndex={setActiveCardIndex}
                            addCard={addNewCard}
                            removeCard={removeCard}
                            Done={Done}
                            doneloading={doneloading || spinloading}
                        />
                    </aside>

                    <section className="relative flex min-h-[460px] self-start items-center justify-center overflow-hidden px-3 pt-0 pb-2 md:px-6 md:pt-0 md:pb-4 xl:pt-0 xl:pb-4">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.92),rgba(242,244,248,0.7)_60%,rgba(242,244,248,1))]" />
                        <div className="relative z-10 flex w-full max-w-[980px] flex-col items-center">
                            <div className="relative flex min-h-[520px] w-full items-center justify-center md:min-h-[650px]">
                                <CardPreview activeCard={activeCard} previewCardNodeRef={previewCardNodeRef} />
                            </div>
                        </div>
                    </section>

                    <aside className="hidden border-l border-gray-200 bg-white xl:sticky xl:top-[148px] xl:flex xl:flex-col xl:h-[calc(100dvh-148px)] xl:overflow-hidden">
                        <div className="min-h-0 flex-1 overflow-y-auto px-5">
                            <SideController
                                product={product}
                                cards={cards}
                                activeCard={activeCard}
                                selectBase={selectBaseImage}
                                selectLayer={selectLayerImage}
                                editedCard={editedCard}
                                seteditedCard={seteditedCard}
                                activebaseEditCard={activebaseEditCard}
                                setactivebaseEditCard={setactivebaseEditCard}
                            />
                        </div>
                        <div className="border-t border-gray-200 p-5">
                            <button
                                onClick={Done}
                                className="flex h-14 w-full items-center justify-center rounded-2xl bg-[#3CA9FF] px-4 text-lg font-semibold text-white shadow-lg shadow-indigo-200 transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-75"
                                disabled={doneloading || spinloading}
                            >
                                {doneButtonLabel}
                            </button>
                        </div>
                    </aside>
                </main>

                <div className="fixed inset-x-0 bottom-0 z-50 px-2 pb-2 xl:hidden">
                    <div className={`rounded-3xl border border-gray-200 bg-white shadow-2xl transition-transform duration-300 ${smallconOpen ? "translate-y-0" : "translate-y-[calc(100%-62px)]"}`}>
                        <button
                            onClick={() => setsmallconOpen(!smallconOpen)}
                            className="flex w-full items-center justify-center py-3"
                        >
                            <span className="flex h-2 w-24 items-center justify-center rounded-full bg-sky-300">
                                <IoIosArrowDown className={`text-white transition-transform ${smallconOpen ? "rotate-0" : "rotate-180"}`} />
                            </span>
                        </button>

                        <div className="max-h-[65vh] overflow-y-auto px-3 pb-3">
                            <SideController
                                product={product}
                                cards={cards}
                                activeCard={activeCard}
                                selectBase={selectBaseImage}
                                selectLayer={selectLayerImage}
                                editedCard={editedCard}
                                seteditedCard={seteditedCard}
                                activebaseEditCard={activebaseEditCard}
                                setactivebaseEditCard={setactivebaseEditCard}
                            />
                        </div>

                        <div className="border-t border-gray-200 p-3">
                            <button
                                onClick={Done}
                                className="flex h-12 w-full items-center justify-center rounded-xl bg-indigo-600 px-4 text-base font-semibold text-white shadow-lg shadow-indigo-200"
                                disabled={doneloading || spinloading}
                            >
                                {doneButtonLabel}
                            </button>
                        </div>
                    </div>
                </div>

                    </>
                )}

                <ToastContainer position="bottom-center" />
            </div>

        </>
    );
};

export default ProductCustomizer;
