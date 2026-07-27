"use client";
import ApplicationSkeleton from "@/app/componnent/ApplicationSkeleton";
import useboxcartstore from "@/store/useboxcartstore";
import usePhotoFinalPreview from "@/store/usePhotoFinalPreview";
import usefinalCardsStore from "@/store/usefinalCardsStore";
import generateUserId from "@/utilis/helper/generateUserId";
import MakeGet from "@/utilis/requestrespose/get";
import { useParams, useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { GiCardAceClubs, GiCardJackClubs, GiCardJoker, GiCardKingClubs, GiCardQueenClubs } from "react-icons/gi";
import { IoMdCheckmark } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import PhotoCardPreview from "../../../../../componnent/PhotoCardPreview";
import PhotoCardSidebar from "../../../../../componnent/PhotoCardSidebar";
import PhotoSideController from "../../../../../componnent/PhotoSideController";
import PhotoMobileCustomizerSheet from "../../../../../componnent/PhotoMobileCustomizerSheet";
import PhotoPortraitBoxPreview from "../../../../../componnent/PhotoPortraitBoxPreview";
import PhotoPortraitBoxCustomizer from "../../../../../componnent/PhotoPortraitBoxCustomizer";
import PhotoBoxMobileCustomizerSheet from "../../../../../componnent/PhotoBoxMobileCustomizerSheet";
import { GiCardboardBox } from "react-icons/gi";
import { JOKER_SLOT_RECT, JOKER_SLOT_CLIP_POLYGON } from "@/app/componnent/jokerSlotGeometry";

const layers = ["dresses", "skin_tones", "hairs", "crowns", "beards", "eyes", "mouths", "noses"];

const CARD_STEPS = [
    { type: "king_Card", label: "King", icon: GiCardKingClubs },
    { type: "Queen_Card", label: "Queen", icon: GiCardQueenClubs },
    { type: "Jeck_Card", label: "Jack", icon: GiCardJackClubs },
    { type: "Ace_Card", label: "Ace", icon: GiCardAceClubs },
];

const JOKER_STEP = { type: "Joker_Card", label: "Joker", icon: GiCardJoker };
const BOX_STEP = { type: "Box_Customization", label: "Box", icon: GiCardboardBox };

const getSortedInsertIndex = (currentCards, cardType) => {
    const order = [...CARD_FLOW, "Joker_Card"];
    const targetOrder = order.indexOf(cardType);
    const insertAt = currentCards.findIndex(
        (card) => order.indexOf(card.editedCard) > targetOrder
    );
    return insertAt === -1 ? currentCards.length : insertAt;
};

const CARD_FLOW = CARD_STEPS.map((step) => step.type);
const MAX_CUSTOMIZABLE_CARDS = 5;
const CARD_TYPE_LABELS = {
    Ace_Card: "Ace",
    king_Card: "King",
    Queen_Card: "Queen",
    Jeck_Card: "Jack",
    Joker_Card: "Joker",
};

// Wayfinding copy, keyed the same way as CARD_TYPE_LABELS so the two stay in sync.
const STEP_COPY = {
    king_Card: {
        heading: "Create Your King",
    },
    Queen_Card: {
        heading: "Create Your Queen",
    },
    Jeck_Card: {
        heading: "Create Your Jack",
    },
    Ace_Card: {
        heading: "Create Your Ace",
    },
    Joker_Card: {
        heading: "Create Your Joker",
    },
    Box_Customization: {
        heading: "Customize Your Box",
    },
};

const normalizeCardType = (value = "") => String(value).toLowerCase();
const getCanonicalCardType = (value = "") => {
    const normalized = normalizeCardType(value);
    if (normalized.includes("ace")) return "Ace_Card";
    if (normalized.includes("king")) return "king_Card";
    if (normalized.includes("queen")) return "Queen_Card";
    if (normalized.includes("jeck") || normalized.includes("jack")) return "Jeck_Card";
    if (normalized.includes("joker")) return "Joker_Card";
    return null;
};

const DECK_RANK_MAP = {
    Ace_Card: 'ace',
    king_Card: 'king',
    Queen_Card: 'queen',
    Jeck_Card: 'jack',
    Joker_Card: 'joker',
};

// Renders the "Create Your King" style heading above the card canvas.
const StepHeading = ({ activeType, activeIndex, totalSteps }) => {
    const copy = STEP_COPY[activeType] ?? { heading: "Customize Your Card", subtext: "" };

    return (
        <div className="relative z-10 w-full max-w-[980px] mx-auto text-center px-4 mb-4" aria-live="polite">
            <h1 className="text-2xl md:text-3xl font-bold text-black mt-1">
                {copy.heading}
            </h1>
            {copy.subtext && (
                <p className="text-sm text-gray-500 mt-1">{copy.subtext}</p>
            )}
        </div>
    );
};

const ProductCustomizer = () => {
    const { slug } = useParams();
    const customCardsStorageKey = `photoCustomCards:${slug}`;
    const customCardsActiveIndexStorageKey = `photoCustomCardsActiveIndex:${slug}`;
    const boxImagesStorageKey = `photoBoxImages:${slug}`;
    const previewCardNodeRef = useRef(null);
    const boxPreviewRef = useRef(null);

    const [product, setProduct] = useState(null);
    const [cards, setCards] = useState([]);
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const router = useRouter();
    const [spinloading, setspinloading] = useState(false);
    const [doneloading, setdoneloading] = useState(false);
    const { addToCart, clearCart } = usePhotoFinalPreview();
    const [editedCard, seteditedCard] = useState(CARD_FLOW[0]);
    const [activebaseEditCard, setactivebaseEditCard] = useState([]);
    const [showJokerUpsell, setshowJokerUpsell] = useState(false);
    const [activeStep, setActiveStep] = useState("card");
    const [boxImages, setBoxImages] = useState(() => {
        if (typeof window === "undefined") return [];
        try {
            const saved = localStorage.getItem(`photoBoxImages:${slug}`);
            const parsed = saved ? JSON.parse(saved) : null;
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    });
    const { setfinalCards } = usefinalCardsStore();
    const { setboxs } = useboxcartstore();

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await MakeGet(`api/shop/${slug}`);

            if (!res.success) {
                toast.error("There was a server side Problem");
                return;
            }

            setProduct(res?.data);

            const savedCards = localStorage.getItem(customCardsStorageKey) || localStorage.getItem("photoCustomCards");
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

                const baseCards = res?.data?.customizations?.base_cards || [];
                const firstBaseImageByType = baseCards.reduce((acc, item) => {
                    const canonicalType = getCanonicalCardType(item?.card_type);
                    if (!canonicalType || acc[canonicalType]) return acc;
                    acc[canonicalType] = item?.image;
                    return acc;
                }, {});
                const validBaseByType = baseCards.reduce((acc, item) => {
                    const canonicalType = getCanonicalCardType(item?.card_type);
                    if (!canonicalType || !item?.image) return acc;
                    if (!acc[canonicalType]) acc[canonicalType] = new Set();
                    acc[canonicalType].add(item.image);
                    return acc;
                }, {});
                const firstBaseNameByType = baseCards.reduce((acc, item) => {
                    const canonicalType = getCanonicalCardType(item?.card_type);
                    if (!canonicalType || acc[canonicalType]) return acc;
                    acc[canonicalType] = item?.name;
                    return acc;
                }, {});

                const sanitizedCards = parsedCards.map((card) => {
                    const canonicalType = getCanonicalCardType(card?.editedCard);
                    if (!canonicalType) return card;
                    const hasValidBase = validBaseByType[canonicalType]?.has(card?.baseImage);
                    const shared = {
                        userPhotoZoom: card?.userPhotoZoom || 1,
                        userPhotoOffset: card?.userPhotoOffset || { x: 0, y: 0 }, // ← add
                    };
                    if (hasValidBase) return { ...card, editedCard: canonicalType, slotName: card?.slotName || firstBaseNameByType[canonicalType] || null, ...shared };
                    return { ...card, editedCard: canonicalType, baseImage: firstBaseImageByType[canonicalType] || card?.baseImage, slotName: card?.slotName || firstBaseNameByType[canonicalType] || null, ...shared };
                });

                // Re-sort against the current King → Queen → Jack → Ace → Joker order.
                const flowOrder = [...CARD_FLOW, "Joker_Card"];
                sanitizedCards.sort(
                    (a, b) => flowOrder.indexOf(a.editedCard) - flowOrder.indexOf(b.editedCard)
                );

                if (sanitizedCards.length > 0) {
                    localStorage.setItem(customCardsStorageKey, JSON.stringify(sanitizedCards));
                }

                const initialType = CARD_FLOW.find((type) => sanitizedCards?.some((card) => card?.editedCard === type)) || sanitizedCards?.[0]?.editedCard;
                const storedActiveIndex = Number(localStorage.getItem(customCardsActiveIndexStorageKey));
                const initialIndex = Number.isInteger(storedActiveIndex) && storedActiveIndex >= 0 && storedActiveIndex < sanitizedCards.length
                    ? storedActiveIndex
                    : sanitizedCards?.findIndex((card) => card?.editedCard === initialType);

                if (sanitizedCards.length > 0) {
                    setCards(sanitizedCards);
                    setActiveCardIndex(initialIndex >= 0 ? initialIndex : 0);
                    if (initialType) seteditedCard(initialType);
                    return;
                }
            }

            const customSets = res?.data?.customizations?.custom_sets || [];
            const baseCards = res?.data?.customizations?.base_cards || [];

            const baseForFirstStep = customSets.find(
                (item) => getCanonicalCardType(item?.card_type) === CARD_FLOW[0]
            )?.image || baseCards.find(
                (item) => getCanonicalCardType(item?.card_type) === CARD_FLOW[0]
            )?.image;

            const fallbackBase = customSets[0]?.image || baseCards[0]?.image;

            const initialLayers = {};
            layers.forEach((layer) => {
                if (layer === "beards") return;
                const items = res?.data?.customizations?.[layer];
                if (items?.length > 0) initialLayers[layer] = items[0]?.image;
            });

            const firstBaseCard = baseCards.find(
                (item) => getCanonicalCardType(item?.card_type) === CARD_FLOW[0]
            );

            setCards([{
                editedCard: CARD_FLOW[0],
                baseImage: firstBaseCard?.image || baseForFirstStep || fallbackBase,
                slotName: firstBaseCard?.name || null,
                selectedLayers: initialLayers,
                userPhoto: null,
                userPhotoZoom: 1,
                userPhotoOffset: { x: 0, y: 0 },
            }]);
            setActiveCardIndex(0);
            seteditedCard(CARD_FLOW[0]);
        };

        fetchProduct();
    }, [slug, customCardsStorageKey, customCardsActiveIndexStorageKey]);

    useEffect(() => {
        if (!slug || !cards?.length) return;
        localStorage.setItem(customCardsStorageKey, JSON.stringify(cards));
        localStorage.setItem("photoCustomCards", JSON.stringify(cards));
        localStorage.setItem(customCardsActiveIndexStorageKey, String(activeCardIndex));
    }, [cards, activeCardIndex, slug, customCardsStorageKey, customCardsActiveIndexStorageKey]);

    useEffect(() => {
        if (!slug) return;
        localStorage.setItem(boxImagesStorageKey, JSON.stringify(boxImages));
    }, [boxImages, slug, boxImagesStorageKey]);

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
        product?.customizations?.custom_sets?.find(
            (item) => item?.card_type === "Joker_Card" || item?.name === "Joker_Card"
        )?.image || null;

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

    const selectPhotoImage = (dataUrl) => {
        setCards((prev) =>
            prev.map((card, i) =>
                i !== activeCardIndex
                    ? card
                    : { ...card, userPhoto: dataUrl || null, userPhotoZoom: 1, userPhotoOffset: { x: 0, y: 0 } }
            )
        );
    };

    const setUserPhotoZoom = (zoom) => {
        setCards((prev) =>
            prev.map((card, i) =>
                i !== activeCardIndex ? card : { ...card, userPhotoZoom: zoom }
            )
        );
    };

    const setUserPhotoOffset = (offset) => {
        setCards((prev) =>
            prev.map((card, i) =>
                i !== activeCardIndex ? card : { ...card, userPhotoOffset: offset }
            )
        );
    };

    const selectBaseImage = (url, type, slotName = null) => {
        const indexAtClick = activeCardIndex;
        const currentCard = cards[indexAtClick];

        // Same type, just swapping the base art -> no duplication risk
        if (currentCard?.editedCard === type) {
            setCards((prev) => prev.map((card, i) =>
                i === indexAtClick ? { ...card, baseImage: url, slotName } : card
            ));
            return;
        }

        // Block switching to a type that's already used by another slot
        const isDuplicate = cards.some((card, i) => i !== indexAtClick && card.editedCard === type);
        if (isDuplicate) {
            toast.warn(`${CARD_TYPE_LABELS[type] || "This card"} is already added. Remove it first if you want to change this slot to ${CARD_TYPE_LABELS[type] || "this type"}.`);
            return;
        }

        setCards((prev) => {
            const updated = prev.map((card, i) =>
                i === indexAtClick
                    ? { ...card, editedCard: type, baseImage: url, slotName }
                    : card
            );

            // Keep deck ordered King -> Queen -> Jack -> Ace -> Joker
            const order = [...CARD_FLOW, "Joker_Card"];
            const changedCard = updated[indexAtClick];
            const sorted = [...updated].sort(
                (a, b) => order.indexOf(a.editedCard) - order.indexOf(b.editedCard)
            );
            const newActiveIndex = sorted.indexOf(changedCard);
            setActiveCardIndex(newActiveIndex);
            seteditedCard(type);
            return sorted;
        });
    };

    const addNewCard = (cardType = editedCard, shouldSetActive = true) => {
        if (cards.length >= MAX_CUSTOMIZABLE_CARDS) {
            toast.warn(`You can customize up to ${MAX_CUSTOMIZABLE_CARDS} cards only.`);
            return;
        }

        const baseCard = product?.customizations?.base_cards?.find(
            (item) => getCanonicalCardType(item?.card_type) === cardType
        );
        const baseForType = product?.customizations?.custom_sets?.find(
            (item) => getCanonicalCardType(item?.card_type) === cardType
        )?.image;

        const initialLayersTwo = {};
        layers.forEach((layer) => {
            if (layer === "beards") return;
            const items = product?.customizations?.[layer];
            if (items?.length > 0) initialLayersTwo[layer] = items[0]?.image;
        });

        setCards((prev) => {
            const newCard = {
                editedCard: cardType,
                baseImage: baseCard?.image || baseForType,
                slotName: baseCard?.name || null,
                selectedLayers: initialLayersTwo,
                userPhoto: null,
                userPhotoZoom: 1,
                userPhotoOffset: { x: 0, y: 0 },
            };
            const insertAt = getSortedInsertIndex(prev, cardType);
            const newCards = [...prev.slice(0, insertAt), newCard, ...prev.slice(insertAt)];
            if (shouldSetActive) setActiveCardIndex(insertAt);
            return newCards;
        });
    };

    const removeCard = (index) => {
        if (cards.length <= 1) return;
        if (cards[index]?.editedCard === CARD_FLOW[0]) return;

        const updatedCards = cards.filter((_, i) => i !== index);
        setCards(updatedCards);

        let nextActiveIndex = activeCardIndex;
        if (index < activeCardIndex) nextActiveIndex = activeCardIndex - 1;
        if (index === activeCardIndex) nextActiveIndex = Math.min(activeCardIndex, updatedCards.length - 1);

        setActiveCardIndex(nextActiveIndex);
        const nextEdited = updatedCards[nextActiveIndex]?.editedCard;
        if (nextEdited) seteditedCard(nextEdited);
    };

    const compositeCardToBase64 = async (card) => {
        const canvas = document.createElement('canvas');
        canvas.width = 750;
        canvas.height = 1050;
        const ctx = canvas.getContext('2d');

        const loadImage = (src) => new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });

        if (card.baseImage) {
            const base = await loadImage(card.baseImage);
            ctx.drawImage(base, 0, 0, 750, 1050);
        }

        // User photo overrides the layered character when present.
        if (card.userPhoto) {
            const img = await loadImage(card.userPhoto);
            const isJoker = card.editedCard === "Joker_Card";

            if (isJoker) {
                const { x: boxX, y: boxY, w: boxW, h: boxH } = JOKER_SLOT_RECT;
                const zoom = card.userPhotoZoom || 1;
                const offset = card.userPhotoOffset || { x: 0, y: 0 };
                const ratio = Math.min(boxW / img.width, boxH / img.height);
                const dw = img.width * ratio * zoom, dh = img.height * ratio * zoom;

                ctx.save();
                ctx.beginPath();
                JOKER_SLOT_CLIP_POLYGON.forEach((pt, i) => {
                    const x = boxX + pt.x * boxW;
                    const y = boxY + pt.y * boxH;
                    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                });
                ctx.closePath();
                ctx.clip();

                ctx.drawImage(
                    img,
                    boxX + (boxW - dw) / 2 + offset.x * boxW,
                    boxY + (boxH - dh) / 2 + offset.y * boxH,
                    dw, dh
                );
                ctx.restore();
            } else {
                const boxX = 750 * 0.07, boxY = 1050 * 0.07;
                const boxW = 750 * 0.88, boxH = 1050 * 0.86;

                const pts = [
                    [0.38, 0], [0.96, 0], [0.96, 0.746],
                    [0.578, 1], [0.01, 1], [0.01, 0.274],
                ];
                ctx.save();
                ctx.beginPath();
                pts.forEach(([fx, fy], i) => {
                    const x = boxX + fx * boxW, y = boxY + fy * boxH;
                    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                });
                ctx.closePath();
                ctx.clip();

                const zoom = card.userPhotoZoom || 1;
                const offset = card.userPhotoOffset || { x: 0, y: 0 };
                const ratio = Math.max(boxW / img.width, boxH / img.height);
                const dw = img.width * ratio * zoom, dh = img.height * ratio * zoom;
                ctx.drawImage(
                    img,
                    boxX + (boxW - dw) / 2 + offset.x * boxW,
                    boxY + (boxH - dh) / 2 + offset.y * boxH,
                    dw, dh
                );
            }
        } else {
            const layerOrder = ["dresses", "skin_tones", "hairs", "crowns", "beards", "eyes", "mouths", "noses"];
            for (const layer of layerOrder) {
                const src = card.selectedLayers?.[layer];
                if (!src) continue;
                try {
                    const img = await loadImage(src);
                    const x = (750 - 750 * 0.64) / 2;
                    const w = 750 * 0.64;
                    const h = 1050 * 0.43;
                    const yTop = 1050 * 0.07;
                    const yBot = 1050 - yTop - h;

                    ctx.drawImage(img, x, yTop, w, h);
                    ctx.save();
                    ctx.translate(x + w / 2, yBot + h / 2);
                    ctx.scale(1, -1);
                    ctx.drawImage(img, -w / 2, -h / 2, w, h);
                    ctx.restore();
                } catch { }
            }
        }

        return canvas.toDataURL('image/png');
    };

    const compositeCharacterOnly = async (card) => {
        const canvas = document.createElement('canvas');
        canvas.width = 750;
        canvas.height = 1050;
        const ctx = canvas.getContext('2d');

        const loadImage = (src) => new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });

        // User photo overrides the layered character when present.
        if (card.userPhoto) {
            const img = await loadImage(card.userPhoto);
            const boxW = 750 * 0.64, boxH = 1050 * 0.6;
            const boxX = (750 - boxW) / 2, boxY = (1050 - boxH) / 2;
            const ratio = Math.min(boxW / img.width, boxH / img.height) || 1;
            const zoom = card.userPhotoZoom || 1;
            const offset = card.userPhotoOffset || { x: 0, y: 0 };
            const dw = img.width * ratio * zoom, dh = img.height * ratio * zoom;
            ctx.save();
            ctx.beginPath();
            ctx.rect(boxX, boxY, boxW, boxH);
            ctx.clip();
            ctx.drawImage(
                img,
                boxX + (boxW - dw) / 2 + offset.x * boxW,
                boxY + (boxH - dh) / 2 + offset.y * boxH,
                dw, dh
            );
            ctx.restore();
            return canvas.toDataURL('image/png');
        }

        const layerOrder = ["dresses", "skin_tones", "hairs", "crowns", "beards", "eyes", "mouths", "noses"];
        for (const layer of layerOrder) {
            const src = card.selectedLayers?.[layer];
            if (!src) continue;
            try {
                const img = await loadImage(src);
                const x = (750 - 750 * 0.64) / 2;
                const w = 750 * 0.64;
                const h = 1050 * 0.43;
                const yTop = 1050 * 0.07;
                ctx.drawImage(img, x, yTop, w, h);
            } catch { }
        }

        return canvas.toDataURL('image/png');
    };

    const goToFinalView = async ({ redirectToCheckout = false, boxImages: passedBoxImages = [] } = {}) => {
        const hasAllCards = CARD_FLOW.every((req) => cards.some((item) => item.editedCard === req));

        if (!hasAllCards) {
            toast.warn("Must Design at Least King, Queen, Jack, and Ace Cards");
            return;
        }

        setspinloading(true);

        let compositeImages = [];
        let characterOnlyImages = [];

        try {
            compositeImages = await Promise.all(cards.map(card => compositeCardToBase64(card)));
        } catch (err) {
            setspinloading(false);
            return;
        }

        try {
            characterOnlyImages = await Promise.all(cards.map(card => compositeCharacterOnly(card)));
        } catch (err) {
            console.error('Character composite failed:', err);
        }

        const hasJokerCard = cards.some(c => c.editedCard === 'Joker_Card');
        const unitBasePrice = Number(product?.offer_price > 0 ? product?.offer_price : product?.price) || 0;

        const FinalProduct = cards.map((card, i) => ({
            rank: DECK_RANK_MAP[card.editedCard] || null,
            image: compositeImages[i],
            name: card.slotName ?? null,
            character_image: characterOnlyImages[i] ?? null,
        }));

        clearCart();

        // Capture the browser-resolved frame/image geometry for each photo so
        // the backend composites from real rendered rects instead of replaying
        // a drag-delta transform. Attached to whatever boxImages we already have.
        let resolvedBoxImages = passedBoxImages || [];
        try {
            const captured = boxPreviewRef.current?.captureResolvedRects?.() ?? [];
            if (captured.length) {
                const byId = Object.fromEntries(captured.map((c) => [String(c.id), c]));
                resolvedBoxImages = resolvedBoxImages.map((img) =>
                    byId[String(img.id)]
                        ? { ...img, frame: byId[String(img.id)].frame, image: byId[String(img.id)].image }
                        : img
                );
            }
        } catch (err) {
            console.warn('Failed to capture resolved box rects:', err);
        }

        const cartItem = {
            id: generateUserId(),
            productId: product?.id,
            productSlug: product?.slug,
            productName: product?.name,
            productType: "photo",
            productUnitPrice: hasJokerCard ? unitBasePrice + 7 : unitBasePrice,
            productQuantity: 1,
            productImage: product?.image,
            FinalProduct,
            FinalProductImages: compositeImages,
            CharacterImages: characterOnlyImages,
            BoxImage: null,
            boxImages: resolvedBoxImages,
            jokerAdded: hasJokerCard,
            customization_mode: 'photo',
        };

        // ── Save composited images to IDB so checkout page survives refresh ──
        try {
            const { savePhotoCartImagesToIDB } = await import("@/store/useCartStore");
            await savePhotoCartImagesToIDB([cartItem]);
        } catch (err) {
            console.warn('Failed to save photo images to IDB:', err);
        }

        addToCart(cartItem);
        setspinloading(false);
        router.push(redirectToCheckout ? '/my-cart/checkout' : '/final/photoportrait');
    };

    const Done = async () => {
        setdoneloading(true);

        const firstMissingType = CARD_FLOW.find(
            (type) => !cards.some((card) => card.editedCard === type)
        );

        if (firstMissingType) {
            seteditedCard(firstMissingType);

            const baseCard = product?.customizations?.base_cards?.find(
                (item) => getCanonicalCardType(item?.card_type) === firstMissingType
            );
            const baseForType = product?.customizations?.custom_sets?.find(
                (item) => getCanonicalCardType(item?.card_type) === firstMissingType
            )?.image;

            const initialLayers = {};
            layers.forEach((layer) => {
                if (layer === "beards") return;
                const items = product?.customizations?.[layer];
                if (items?.length > 0) initialLayers[layer] = items[0]?.image;
            });

            setCards((prev) => {
                const newCard = {
                    editedCard: firstMissingType,
                    baseImage: baseCard?.image || baseForType,
                    slotName: baseCard?.name || null,
                    selectedLayers: initialLayers,
                    userPhoto: null,
                    userPhotoZoom: 1,
                };
                const insertAt = getSortedInsertIndex(prev, firstMissingType);
                const newCards = [...prev.slice(0, insertAt), newCard, ...prev.slice(insertAt)];
                setActiveCardIndex(insertAt);
                return newCards;
            });

            setTimeout(() => setdoneloading(false), 500);
            return;
        }


        const hasJokerCardNow = cards.some((card) => card?.editedCard === "Joker_Card");
        if (hasJokerCardNow) {
            setActiveStep("box");
            setTimeout(() => setdoneloading(false), 500);
            return;
        }

        setshowJokerUpsell(true);
        setdoneloading(false);
    };

    const handleSkipJokerUpsell = async () => {
        setshowJokerUpsell(false);
        setActiveStep("box");
    };

    const handleFinishBox = async () => {
        setdoneloading(true);
        await goToFinalView({ boxImages });
        setTimeout(() => setdoneloading(false), 500);
    };

    const updateBoxImagePosition = (id, dxFraction, dyFraction) => {
        setBoxImages((prev) => prev.map((img) =>
            img.id === id ? { ...img, xFraction: (img.xFraction || 0) + dxFraction, yFraction: (img.yFraction || 0) + dyFraction } : img
        ));
    };

    const handleAddJokerCard = () => {
        const jokerBase =
            product?.customizations?.custom_sets?.find(
                (item) => item?.card_type === "Joker_Card" || item?.name === "Joker_Card"
            )?.image || null;

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

            const newCard = { editedCard: "Joker_Card", baseImage: jokerBase, selectedLayers: initialLayers, userPhoto: null, userPhotoZoom: 1 };
            const insertAt = getSortedInsertIndex(prev, "Joker_Card");
            const newCards = [...prev.slice(0, insertAt), newCard, ...prev.slice(insertAt)];
            setActiveCardIndex(insertAt);
            return newCards;
        });

        setshowJokerUpsell(false);
    };

    const hasJokerCard = cards.some((card) => card?.editedCard === "Joker_Card");
    const allCardsDone = CARD_FLOW.every((req) => cards.some((item) => item.editedCard === req));
    const visibleSteps = hasJokerCard ? [...CARD_STEPS, JOKER_STEP] : CARD_STEPS;
    const stepFlow = allCardsDone ? [...visibleSteps, BOX_STEP] : visibleSteps;
    const doneButtonLabel = doneloading || spinloading ? "Loading..." : (activeStep === "box" ? "Finish" : "Next Card");
    const activeCardLabel = CARD_TYPE_LABELS[activeType] || "Card";

    const activeStepIndex = activeStep === "box"
        ? stepFlow.length - 1
        : (CARD_FLOW.indexOf(activeType) >= 0
            ? CARD_FLOW.indexOf(activeType)
            : visibleSteps.findIndex((s) => s.type === activeType));

    const handleStepClick = (stepType) => {
        if (stepType === "Box_Customization") {
            if (allCardsDone) setActiveStep("box");
            return;
        }
        const targetCardIndex = cards.findIndex((card) => card?.editedCard === stepType);
        if (targetCardIndex < 0) return;
        setActiveStep("card");
        setActiveCardIndex(targetCardIndex);
        seteditedCard(stepType);
    };

    const MOBILE_SHEET_PEEK = 80;

    return (
        <>
            <div className="bg-[#f2f4f8]">
                {showJokerUpsell ? (
                    <main
                        className="relative mx-auto flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-5 sm:px-6 sm:py-8"
                        style={{ background: "linear-gradient(135deg, #3CA9FF 0%, #8CCEFF 35%, #D9EEFD 62%, #EBF6FF 82%, #F3F4F6 100%)" }}
                    >
                        <div className="pointer-events-none absolute -left-16 top-10 h-44 w-44 rounded-[28px] opacity-80" style={{ background: "linear-gradient(140deg, #3CA9FF, #7DC8FF)" }} />
                        <div className="pointer-events-none absolute right-[-52px] top-[18%] h-36 w-36 rounded-[24px] opacity-70" style={{ background: "#D9EEFD" }} />
                        <div className="pointer-events-none absolute bottom-[-28px] left-[18%] h-40 w-40 rounded-[30px] opacity-60" style={{ background: "#EBF6FF" }} />
                        <div className="pointer-events-none absolute bottom-10 right-[10%] h-28 w-28 rounded-[20px] opacity-75" style={{ background: "linear-gradient(145deg, #3CA9FF, #B3DEFF)" }} />
                        <div
                            className="relative z-10 w-full max-w-[700px] overflow-hidden rounded-[30px] border p-4 shadow-2xl sm:p-6 md:p-8"
                            style={{ background: "linear-gradient(180deg, rgba(243,244,246,0.96) 0%, rgba(235,246,255,0.98) 100%)", borderColor: "#BFE2FF", boxShadow: "0 32px 80px rgba(60, 169, 255, 0.22)" }}
                        >
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_1.1fr] md:gap-7">
                                <div className="order-2 space-y-4 md:order-1 md:space-y-5">
                                    <div className="rounded-2xl p-4 sm:p-5" style={{ background: "#F3F4F6", border: "1px solid #D9EEFD" }}>
                                        <h2 className="text-center text-2xl font-bold leading-tight text-sky-800 sm:text-3xl md:text-left">Add a Wild Card to Your Deck</h2>
                                        <p className="mt-2 text-center text-sm leading-relaxed text-slate-600 sm:text-base md:text-left">The Joker brings unpredictability and extra personality</p>
                                    </div>
                                    <div className="rounded-2xl p-4 sm:p-5" style={{ backgroundColor: "#EBF6FF", border: "1px solid #D9EEFD" }}>
                                        <p className="flex items-start gap-2 text-sm text-slate-700 sm:text-base"><IoMdCheckmark className="mt-0.5 shrink-0 text-lg" style={{ color: "#3CA9FF" }} />Unique design that stands out</p>
                                        <p className="mt-2 flex items-start gap-2 text-sm text-slate-700 sm:text-base"><IoMdCheckmark className="mt-0.5 shrink-0 text-lg" style={{ color: "#3CA9FF" }} />Extra customization options</p>
                                        <p className="mt-2 flex items-start gap-2 text-sm text-slate-700 sm:text-base"><IoMdCheckmark className="mt-0.5 shrink-0 text-lg" style={{ color: "#3CA9FF" }} />Complete your deck perfectly</p>
                                    </div>
                                    <div className="space-y-2.5 rounded-2xl p-3 sm:p-4" style={{ background: "#F3F4F6", border: "1px solid #D9EEFD" }}>
                                        <button type="button" onClick={handleAddJokerCard} className="flex h-12 w-full items-center justify-center rounded-xl text-base font-semibold text-white transition hover:opacity-95 sm:h-14 sm:rounded-2xl sm:text-lg" style={{ background: "linear-gradient(90deg, #3CA9FF 0%, #6AC0FF 100%)", boxShadow: "0 14px 30px rgba(60, 169, 255, 0.35)" }}>Add Joker for $7</button>
                                        <button type="button" onClick={handleSkipJokerUpsell} className="flex h-11 w-full items-center justify-center rounded-xl text-sm font-semibold text-slate-700 transition sm:h-12 sm:rounded-2xl sm:text-base" style={{ backgroundColor: "#F3F4F6", border: "1px solid #D9EEFD" }}>Skip for Now</button>
                                    </div>
                                </div>
                                <div className="order-1 flex flex-col items-center md:order-2">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg sm:h-20 sm:w-20 sm:rounded-3xl" style={{ background: "linear-gradient(135deg, #3CA9FF 0%, #6AC0FF 100%)", boxShadow: "0 14px 35px rgba(60, 169, 255, 0.34)" }}>
                                        <GiCardJoker className="text-3xl sm:text-4xl" />
                                    </div>
                                    <div className="mt-4 flex w-full justify-center rounded-2xl p-3 sm:mt-5 sm:p-4" style={{ background: "linear-gradient(160deg, #D9EEFD 0%, #EBF6FF 100%)", border: "1px solid #BFE2FF" }}>
                                        {jokerPreviewImage ? (
                                            <img src={jokerPreviewImage} alt="Joker card preview" className="h-[200px] w-[145px] rounded-xl object-cover shadow-md sm:h-[240px] sm:w-[175px]" style={{ border: "1px solid #3CA9FF", boxShadow: "0 12px 24px rgba(60, 169, 255, 0.24)" }} />
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                ) : (
                    <>
                        <header className="sticky top-[68px] z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur md:top-[76px]">
                            <div className="grid w-full grid-cols-1 xl:grid-cols-[260px_minmax(0,1fr)_350px]">
                                <div className="hidden xl:block" />
                                <div className="w-full px-3 py-2 md:px-6 md:py-2.5">
                                    <div className="mx-auto w-full max-w-[980px]">
                                        <div className="flex w-full items-start justify-between">
                                            {stepFlow.map((step, index) => {
                                                const Icon = step.icon;
                                                const isBoxStep = step.type === "Box_Customization";
                                                const isActive = isBoxStep ? activeStep === "box" : activeType === step.type;
                                                const isCompleted = isBoxStep
                                                    ? activeStep === "box"
                                                    : cards.some((card) => card?.editedCard === step.type) && !isActive;
                                                const isSelectable = isBoxStep ? allCardsDone : cards.some((card) => card?.editedCard === step.type);
                                                return (
                                                    <Fragment key={step.type}>
                                                        <button type="button" onClick={() => handleStepClick(step.type)} disabled={!isSelectable} className={`relative z-10 flex flex-col items-center gap-1.5 ${isSelectable ? "cursor-pointer" : "cursor-not-allowed"}`}>
                                                            <div className={`flex h-10 w-10 items-center justify-center rounded-full border text-lg transition-all md:h-11 md:w-11 md:text-xl ${isActive ? "border-[#3CA9FF] bg-[#3CA9FF] text-white shadow-lg shadow-indigo-300" : isCompleted ? "border-indigo-200 bg-[#B8E6FE] text-indigo-700" : "border-gray-300 bg-gray-100 text-gray-400"}`}>
                                                                {isCompleted ? <IoMdCheckmark className="text-lg" /> : <Icon />}
                                                            </div>
                                                            <p className={`text-xs font-semibold md:text-sm ${isActive ? "text-[#3CA9FF]" : "text-gray-500"}`}>{step.label}</p>
                                                        </button>
                                                        {index !== stepFlow.length - 1 && (
                                                            <div className={`mt-5 h-[2px] flex-1 mx-2 md:mx-3 md:mt-6 ${isCompleted ? "bg-[#3CA9FF]" : "bg-[#B8E6FE]"}`} />
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

                        <main className="grid w-full grid-cols-1 items-start xl:grid-cols-[260px_minmax(0,1fr)_350px] xl:h-[calc(100dvh-148px)]">

                            <aside className="hidden border-r border-gray-200 bg-white xl:sticky xl:top-[148px] xl:block xl:h-[calc(100dvh-148px)] xl:overflow-hidden">
                                <PhotoCardSidebar
                                    cards={cards}
                                    activeIndex={activeCardIndex}
                                    setActiveIndex={setActiveCardIndex}
                                    addCard={addNewCard}
                                    removeCard={removeCard}
                                    Done={Done}
                                    doneloading={doneloading || spinloading}
                                    lockedCardType={CARD_FLOW[0]}
                                    onSelectCard={() => setActiveStep("card")}
                                />
                            </aside>

                            <section className="relative flex flex-col self-start items-center justify-center overflow-hidden px-3 pt-4 pb-2 md:px-6 md:pt-6 md:pb-4 xl:pt-6 xl:pb-4">
                                <StepHeading
                                    activeType={activeStep === "box" ? "Box_Customization" : activeType}
                                    activeIndex={activeStepIndex}
                                    totalSteps={stepFlow.length}
                                />

                                {activeStep === "box" ? (
                                    <>
                                        {/* Box customization center */}
                                        <div className="xl:hidden w-full" style={{ paddingBottom: `${MOBILE_SHEET_PEEK + 8}px`, minHeight: `calc(100dvh - 68px)`, background: "#f2f4f8" }}>
                                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.92),rgba(242,244,248,0.7)_60%,rgba(242,244,248,1))]" />
                                            <div className="relative z-10 flex w-full max-w-[980px] flex-col items-center mx-auto">
                                                <div className="relative flex min-h-[420px] w-full items-center justify-center">
                                                    <PhotoPortraitBoxPreview ref={boxPreviewRef} boxImages={boxImages} onImagePositionChange={updateBoxImagePosition} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden xl:block w-full">
                                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.92),rgba(242,244,248,0.7)_60%,rgba(242,244,248,1))]" />
                                            <div className="relative z-10 flex w-full max-w-[980px] flex-col items-center mx-auto">
                                                <div className="relative flex min-h-[650px] w-full items-center justify-center">
                                                    <PhotoPortraitBoxPreview ref={boxPreviewRef} boxImages={boxImages} onImagePositionChange={updateBoxImagePosition} />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                {/* Mobile: push card above bottom sheet peek */}
                                <div
                                    className="xl:hidden"
                                    style={{
                                        paddingBottom: `${MOBILE_SHEET_PEEK + 8}px`,
                                        width: "100%",
                                        minHeight: `calc(100dvh - 68px)`,
                                        background: "#f2f4f8",
                                    }}
                                >
                                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.92),rgba(242,244,248,0.7)_60%,rgba(242,244,248,1))]" />
                                    <div className="relative z-10 flex w-full max-w-[980px] flex-col items-center mx-auto">
                                        <div className="relative flex min-h-[420px] w-full items-center justify-center">
                                            <PhotoCardPreview
                                                activeCard={activeCard}
                                                previewCardNodeRef={previewCardNodeRef}
                                                onSelectPhoto={selectPhotoImage}
                                                onPhotoOffsetChange={setUserPhotoOffset}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Desktop: original layout */}
                                <div className="hidden xl:block w-full">
                                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.92),rgba(242,244,248,0.7)_60%,rgba(242,244,248,1))]" />
                                    <div className="relative z-10 flex w-full max-w-[980px] flex-col items-center mx-auto">
                                        <div className="relative flex min-h-[650px] w-full items-center justify-center">
                                            <PhotoCardPreview
                                                activeCard={activeCard}
                                                previewCardNodeRef={previewCardNodeRef}
                                                onSelectPhoto={selectPhotoImage}
                                                onPhotoOffsetChange={setUserPhotoOffset}
                                            />
                                        </div>
                                    </div>
                                </div>
                                </>
                                )}
                            </section>

                            <aside className="hidden border-l border-gray-200 bg-white xl:sticky xl:top-[148px] xl:flex xl:flex-col xl:h-[calc(100dvh-148px)] xl:overflow-hidden">
                                {activeStep === "box" ? (
                                    <div className="min-h-0 flex-1 overflow-y-auto px-5">
                                        <h2 className="py-4 font-semibold text-gray-700">Upload Image</h2>
                                        <PhotoPortraitBoxCustomizer
                                            boxImages={boxImages}
                                            onBoxImagesChange={setBoxImages}
                                        />
                                    </div>
                                ) : (
                                <div className="min-h-0 flex-1 overflow-y-auto px-5">
                                <PhotoSideController
                                    product={product}
                                    cards={cards}
                                    activeCard={activeCard}
                                    selectBase={selectBaseImage}
                                    selectLayer={selectLayerImage}
                                    selectPhoto={selectPhotoImage}
                                    editedCard={editedCard}
                                    seteditedCard={seteditedCard}
                                    activebaseEditCard={activebaseEditCard}
                                    setactivebaseEditCard={setactivebaseEditCard}
                                    userPhotoZoom={activeCard?.userPhotoZoom || 1}
                                    setUserPhotoZoom={setUserPhotoZoom}
                                />
                                </div>
                                )}
                                <div className="border-t border-gray-200 p-5">
                                    <button
                                        onClick={activeStep === "box" ? handleFinishBox : Done}
                                        className="flex h-14 w-full items-center justify-center rounded-2xl bg-[#3CA9FF] px-4 text-lg font-semibold text-white shadow-lg shadow-indigo-200 transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-75"
                                        disabled={doneloading || spinloading}
                                    >
                                        {doneButtonLabel}
                                    </button>
                                </div>
                            </aside>
                        </main>

                        {activeStep === "box" ? (
                            <PhotoBoxMobileCustomizerSheet
                                boxImages={boxImages}
                                onBoxImagesChange={setBoxImages}
                                handleFinishBox={handleFinishBox}
                                doneloading={doneloading || spinloading}
                                doneButtonLabel={doneButtonLabel}
                            />
                        ) : (
                            <PhotoMobileCustomizerSheet
                                product={product}
                                cards={cards}
                                activeCard={activeCard}
                                activeCardLabel={activeCardLabel}
                                selectBase={selectBaseImage}
                                selectLayer={selectLayerImage}
                                selectPhoto={selectPhotoImage}
                                editedCard={editedCard}
                                seteditedCard={seteditedCard}
                                activebaseEditCard={activebaseEditCard}
                                setactivebaseEditCard={setactivebaseEditCard}
                                Done={Done}
                                doneloading={doneloading || spinloading}
                                doneButtonLabel={doneButtonLabel}
                                userPhotoZoom={activeCard?.userPhotoZoom || 1}
                                setUserPhotoZoom={setUserPhotoZoom}
                            />
                        )}
                    </>
                )}

                <ToastContainer position="bottom-center" />
            </div>
        </>
    );
};

export default ProductCustomizer;
