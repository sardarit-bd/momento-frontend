import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import useCartStore from "@/store/useCartStore";
import useboxcartstore from "@/store/useboxcartstore";
import generateUserId from "@/utilis/helper/generateUserId";
import MakeGet from "@/utilis/requestrespose/get";
import ImageResize from "@/utilis/helper/ImageResize";
import captureNodeClean from "@/utilis/helper/captureNodeClean";
import captureNodeScreenshotForTranding from "@/utilis/helper/captureNodeScreenshotForTranding";

import { idbGet, idbPut, idbDelete, idbGetKeysByPrefix } from "../lib/idb";
import {
    fonts,
    cardTypeOptions,
    attributeIconOptions,
    defaultBackHighlights,
    PACKAGE_CONFIG,
    TEMPLATE_MAP
} from "../constants";

const SLOT_TTL_MS = 72 * 60 * 60 * 1000; // 72 hours

const isExpired = (savedAt) =>
    !savedAt || (Date.now() - savedAt) > SLOT_TTL_MS;

/**
 * Waits until every <img> inside `node` has fully decoded.
 * Handles Next.js <Image> which renders real <img> tags in the DOM.
 */
async function waitForImagesToLoad(node) {
    if (!node) return;

    // Give React one more tick to flush any pending renders
    await new Promise(r => setTimeout(r, 50));

    const imgs = Array.from(node.querySelectorAll("img"));

    await Promise.all(
        imgs.map(img => {
            if (img.complete && img.naturalWidth > 0) return Promise.resolve();
            return new Promise(resolve => {
                img.addEventListener("load", resolve, { once: true });
                img.addEventListener("error", resolve, { once: true });
                setTimeout(resolve, 3000);
            });
        })
    );

    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
}

export function useTradingCardState() {
    const { slug } = useParams();
    const searchParams = useSearchParams();
    const selectedPackage = searchParams.get("package");
    const selectedTemplate = searchParams.get("template");
    const router = useRouter();

    const { addToCart } = useCartStore();
    const { setboxs } = useboxcartstore();

    const templateConfig = TEMPLATE_MAP[selectedTemplate] || null;
    const [editingSlotId, setEditingSlotId] = useState(null);

    const hasUnsavedWork = () => {
        return (
            uploads.length > 0 ||
            texts.length > 0 ||
            cardti !== "Title" ||
            carddes !== "Created For" ||
            name !== "Attribute One" ||
            name2 !== "Attribute Two" ||
            name3 !== "Attribute Three"
        );
    };

    const safeSet = (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.warn("localStorage write failed:", e.message);
            return false;
        }
    };

    const safeGet = (key) => {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    };

    const safeRemove = (key) => {
        try { localStorage.removeItem(key); } catch {}
    };

    const slotStorageKey = (slotId) =>
        `${customizationStorageKey}:slot:${slotId}`;

    const packageConfig = PACKAGE_CONFIG[selectedPackage] ?? PACKAGE_CONFIG["single"];
    const customizationStorageKey = slug ? `tradingCustomization:${slug}` : null;
    const hasHydratedFromStorage = useRef(false);
    const canPersistCustomization = useRef(false);
    const getBaseTradingDone = useRef(false);

    const previewCardNodeRef = useRef(null);
    const captureNodeRef = useRef(null);
    const tradingBoxPreviewRef = useRef(null);

    const captureTradingBox = async () => {
        if (!tradingBoxPreviewRef.current) return null;
        try {
            const domtoimage = (await import("dom-to-image-more")).default;

            const dataUrl = await domtoimage.toPng(tradingBoxPreviewRef.current, {
                width:  tradingBoxPreviewRef.current.offsetWidth,
                height: tradingBoxPreviewRef.current.offsetHeight,
                style:  { transform: "scale(1)" },
            });
            const img = new window.Image();
            await new Promise((resolve) => { img.onload = resolve; img.src = dataUrl; });
            const resized = document.createElement("canvas");
            resized.width  = 2325;
            resized.height = 1950;
            const ctx = resized.getContext("2d");
            ctx.drawImage(img, 0, 0, 2325, 1950);
            return resized.toDataURL("image/png");
        } catch (err) {
            console.error("Trading box capture failed:", err);
            return null;
        }
    };

    const [smallconOpen, setsmallconOpen] = useState(false);
    const [sidebarTab, setSidebarTab] = useState("front");
    const [isCardTypeOpen, setIsCardTypeOpen] = useState(false);

    const [frontImages, setfrontImages] = useState(null);
    const [backImages, setbackImages] = useState(null);

    const [baseFront, setBaseFront] = useState(null);
    const [baseBack, setBaseBack] = useState(null);
    const [uploads, setUploads] = useState([]);
    const [texts, setTexts] = useState([]); 

    const [activeText, setActiveText] = useState(null);
    const [activeImage, setActiveImage] = useState(null);
    const [workingcard, setworkingcard] = useState("front");
    const [fetchingData, setfetchingData] = useState(null);
    const [fetchingDataLoading, setfetchingDataLoading] = useState(false);

    const [savedSlots, setSavedSlots] = useState([]);
    const savedSlotsRef = useRef([]);

    useEffect(() => {
        savedSlotsRef.current = savedSlots;
    }, [savedSlots]);

    const [spinloading, setspinloading] = useState(false);
    const [doneloading, setdoneloading] = useState(false);

    // text state
    const [cardti, setcardti] = useState('Title');
    // const [carddes, setcarddes] = useState('Created For');
    const [carddes, setcarddes] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("persistent_carddes") ?? "Created For";
        }
        return "Created For";
    });

    const [packageTitle, setPackageTitle] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("persistent_packageTitle") ?? "";
        }
        return "";
    });

    const [name, setname] = useState('Attribute One');
    const [name2, setname2] = useState('Attribute Two');
    const [name3, setname3] = useState('Attribute Three');
    const [attributeName, setAttributeName] = useState('');
    const [labelone, setlabelone] = useState(69);
    const [labeltwo, setlabeltwo] = useState(55);
    const [labelthree, setlabelthree] = useState(78);
    const [acarddate, setacarddate] = useState('CLASS OF 2026');
    const [cardType, setCardType] = useState("graduation");
    const [attrIconOne, setAttrIconOne] = useState("/attribute-images/attribute_2.png");
    const [attrIconTwo, setAttrIconTwo] = useState("/attribute-images/attribute_3.png");
    const [attrIconThree, setAttrIconThree] = useState("/attribute-images/attribute_4.png");
    const [activeIconPicker, setActiveIconPicker] = useState(null);
    const [backDate, setBackDate] = useState("");
    const [backDescription, setBackDescription] = useState("");
    const [backHighlightsTitle, setBackHighlightsTitle] = useState("Highlights");
    const [backHighlights, setBackHighlights] = useState(defaultBackHighlights);
    const [backLegacyTagline, setBackLegacyTagline] = useState("A moment");
    const [backLegacyText, setBackLegacyText] = useState("This card celebrates a special person and a special time. May it remind you of all the great memories we've shared.");
    const [activeBackHighlightPicker, setActiveBackHighlightPicker] = useState(null);

    const [cardfinder, setcardfinder] = useState(0);

    // text input limit states
    const [cardtiltelimite, setcardtiltelimite] = useState(8);
    const [carddeslimite, setcarddeslimite] = useState(15);
    const [packageTitlelimite, setpackageTitlelimite] = useState(15);
    const [namelimite, setnamelimite] = useState(15);
    const [name2limite, setname2limite] = useState(15);
    const [name3limite, setname3limite] = useState(15);
    const [acarddatelimite, setacarddatelimite] = useState(15);

    // color state
    const [isblack, setisblack] = useState(false);

    const getBaseTrading = useCallback(async (slug) => {
        // At the top of getBaseTrading:
        const persistedCarddes = localStorage.getItem("persistent_carddes") ?? "Created For";
        setcarddes(persistedCarddes);

        const persistedPackageTitle = localStorage.getItem("persistent_packageTitle") ?? "";
        setPackageTitle(persistedPackageTitle);

        setfetchingDataLoading(true);
        const res = await MakeGet(`api/shop/${slug}`);
        const apiFronts = res?.data?.customizations?.trading_fronts;

        setfrontImages(apiFronts);
        setbackImages(res?.data?.customizations?.trading_backs);
        setfetchingData(res?.data);

        const defaultFront = templateConfig?.image || (res?.data?.customizations?.trading_fronts?.[0]?.image ?? null);
        const defaultBack  = res?.data?.customizations?.trading_backs?.[0]?.image  || null;

        let restoredFromStorage = false;

        if (customizationStorageKey) {
            try {
                // BLOCK A — restore canvas state from IndexedDB
                const saved = await idbGet(customizationStorageKey);
                const persistedCarddes = localStorage.getItem("persistent_carddes") ?? "Created For";

                setcarddes(persistedCarddes);

                if (saved) {
                    setcardfinder(saved?.cardfinder ?? 0);
                    setBaseFront(saved?.baseFront || defaultFront);
                    setBaseBack(saved?.baseBack   || defaultBack);
                    setUploads(Array.isArray(saved?.uploads) ? saved.uploads : []);
                    setTexts(Array.isArray(saved?.texts)     ? saved.texts   : []);
                    setworkingcard(saved?.workingcard || "front");
                    setisblack(Boolean(saved?.isblack));
                    setcardti(saved?.content?.cardti             ?? "Title");
                    setname(saved?.content?.name                 ?? "Attribute One");
                    setname2(saved?.content?.name2               ?? "Attribute Two");
                    setname3(saved?.content?.name3               ?? "Attribute Three");
                    setlabelone(saved?.content?.labelone         ?? 69);
                    setlabeltwo(saved?.content?.labeltwo         ?? 55);
                    setlabelthree(saved?.content?.labelthree     ?? 78);
                    setacarddate(saved?.content?.acarddate       ?? "CLASS OF 2026");
                    setCardType(saved?.content?.cardType         ?? "graduation");
                    setAttrIconOne(saved?.content?.attrIconOne   ?? "/attribute-images/attribute_2.png");
                    setAttrIconTwo(saved?.content?.attrIconTwo   ?? "/attribute-images/attribute_3.png");
                    setAttrIconThree(saved?.content?.attrIconThree ?? "/attribute-images/attribute_4.png");
                    setBackDate(saved?.content?.backDate         ?? "");
                    setBackDescription(saved?.content?.backDescription ?? "");
                    setBackHighlightsTitle(saved?.content?.backHighlightsTitle ?? "Highlights");
                    setBackLegacyTagline(saved?.content?.backLegacyTagline ?? "A moment");
                    setBackLegacyText(saved?.content?.backLegacyText ?? "This card celebrates a special person and a special time. May it remind you of all the great memories we've shared.");
                    const rh = Array.isArray(saved?.content?.backHighlights)
                        ? saved.content.backHighlights.slice(0, 6)
                        : defaultBackHighlights;
                    setBackHighlights(rh.length >= 2 ? rh : defaultBackHighlights);
                    restoredFromStorage = true;
                    hasHydratedFromStorage.current = true;
                }

                // BLOCK B — restore slots from IndexedDB
                const slotPrefix = `${customizationStorageKey}:slot:`;
                const allSlotKeys = await idbGetKeysByPrefix(slotPrefix);

                const restoredSlots = [];
                for (const k of allSlotKeys) {
                    const slotData = await idbGet(k);
                    if (!slotData) continue;
                    if (isExpired(slotData.savedAt)) {
                        await idbDelete(k);    // clean up expired
                        continue;
                    }
                    if (slotData.selectedPackage && selectedPackage &&
                        slotData.selectedPackage !== selectedPackage) continue;

                    restoredSlots.push({
                        id:             k.replace(slotPrefix, ""),
                        savedAt:        slotData.savedAt,
                        previewDataUrl: slotData.previewDataUrl,
                        snapshot:       slotData.snapshot,
                    });
                }

                restoredSlots.sort((a, b) => a.savedAt - b.savedAt);
                const validSlots = restoredSlots.slice(0, packageConfig.designs);

                if (validSlots.length > 0) {
                    setSavedSlots(validSlots);
                    savedSlotsRef.current = validSlots;

                    const allDone = validSlots.length >= packageConfig.designs;
                    const lastSlot = validSlots[validSlots.length - 1];
                    const s = lastSlot.snapshot;

                    if (allDone) {
                        setBaseFront(s.baseFront       ?? defaultFront);
                        setUploads(Array.isArray(s.uploads) ? s.uploads : []);
                        setTexts(Array.isArray(s.texts)     ? s.texts   : []);
                        setcardti(s.cardti             ?? "Title");
                        setname(s.name                 ?? "Attribute One");
                        setname2(s.name2               ?? "Attribute Two");
                        setname3(s.name3               ?? "Attribute Three");
                        setlabelone(s.labelone         ?? 69);
                        setlabeltwo(s.labeltwo         ?? 55);
                        setlabelthree(s.labelthree     ?? 78);
                        setacarddate(s.acarddate       ?? "CLASS OF 2026");
                        setCardType(s.cardType         ?? "graduation");
                        setAttrIconOne(s.attrIconOne   ?? "/attribute-images/attribute_2.png");
                        setAttrIconTwo(s.attrIconTwo   ?? "/attribute-images/attribute_3.png");
                        setAttrIconThree(s.attrIconThree ?? "/attribute-images/attribute_4.png");
                        setisblack(Boolean(s.isblack));
                        setcardfinder(
                            apiFronts?.findIndex(img => img.image === s.baseFront) ?? 0
                        );
                        restoredFromStorage = true;
                        hasHydratedFromStorage.current = true;
                    }
                }

                // BLOCK C — clean up legacy localStorage slot entries
                const legacyKeysToRemove = [];
                for (let i = 0; i < localStorage.length; i++) {
                    const k = localStorage.key(i);
                    if (k?.startsWith(slotPrefix)) {
                        legacyKeysToRemove.push(k);
                    }
                }
                legacyKeysToRemove.forEach(k => safeRemove(k));

            } catch (err) {
                console.error("Failed to restore trading customization state:", err);
            }
        }

        if (!restoredFromStorage) {
            setBaseFront(defaultFront);
            setBaseBack(defaultBack);
        }

        // Always apply the user-chosen template (overrides any restored state)
        if (templateConfig) {
            setBaseFront(templateConfig.image);
            setcardfinder(templateConfig.cardfinder);
        }
        canPersistCustomization.current = true;
        getBaseTradingDone.current = true;
        setfetchingDataLoading(false);
    }, [customizationStorageKey, templateConfig, selectedPackage, packageConfig.designs]);

    const hanldeInputUpdater = useCallback(() => {

        if (workingcard == 'front') {
            setcardti('Title');
            setname('Attribute One');
            setname2('Attribute Two');
            setname3('Attribute Three');
            setAttrIconOne("/attribute-images/attribute_2.png");
            setAttrIconTwo("/attribute-images/attribute_3.png");
            setAttrIconThree("/attribute-images/attribute_4.png");
            setacarddate('CLASS OF 2026');

            setcardtiltelimite(15);
            setcarddeslimite(15);
            setnamelimite(15);
            setname2limite(15);
            setname3limite(15);
            setacarddatelimite(15);

            setcardfinder(0);

        } else {
            setcardti('Profile');
            setname('Achievements');
            setname2('Lorem Ipsum 10, This Momento card Customization One of the best Placeform');
            setname3('Awards');
            setAttrIconOne("/attribute-images/attribute_10.png");
            setAttrIconTwo("/attribute-images/attribute_4.png");
            setAttrIconThree("/attribute-images/attribute_15.png");
            setacarddate('Lorem Ipsum 10, This Momento card Customization One of the best Placeform');

            setcardtiltelimite(15);
            setcarddeslimite(15);
            setnamelimite(15);
            setname2limite(95);
            setname3limite(15);
            setacarddatelimite(95);

            setcardfinder(0);
        }
    }, [workingcard]);

    useEffect(() => {
        if (typeof window !== "undefined" && carddes && carddes !== "Created For") {
            localStorage.setItem("persistent_carddes", carddes);
        }
    }, [carddes]);


    useEffect(() => {
        if (typeof window !== "undefined" && packageTitle) {
            localStorage.setItem("persistent_packageTitle", packageTitle);
        }
    }, [packageTitle]);

    useEffect(() => {
        getBaseTrading(slug);
    }, [slug, getBaseTrading]);

    useEffect(() => {
        hasHydratedFromStorage.current = false;
        canPersistCustomization.current = false;
        getBaseTradingDone.current = false;
    }, [slug]);

    useEffect(() => {
        if (!hasHydratedFromStorage.current && getBaseTradingDone.current) {
            hanldeInputUpdater();
            hasHydratedFromStorage.current = true;
        }
    }, [workingcard, hanldeInputUpdater, fetchingDataLoading]);

    useEffect(() => {
        if (!customizationStorageKey) return;
        if (!canPersistCustomization.current) return;

        idbPut(customizationStorageKey, {
            productId:   fetchingData?.id,
            productSlug: fetchingData?.slug || slug,
            savedAt:     Date.now(),
            selectedPackage,
            cardfinder,  baseFront, baseBack,
            uploads,     texts,     workingcard, isblack,
            slotIds:     savedSlots.map(s => s.id),
            content: {
                cardti, carddes, packageTitle, name, name2, name3,
                labelone, labeltwo, labelthree,
                acarddate, cardType,
                attrIconOne, attrIconTwo, attrIconThree,
                backDate, backDescription,
                backHighlightsTitle, backHighlights,
                backLegacyTagline, backLegacyText,
            },
        });
    }, [
        customizationStorageKey, slug,
        fetchingData?.id, fetchingData?.slug,
        cardfinder, baseFront, baseBack,
        uploads, texts, savedSlots, workingcard, isblack,
        cardti, carddes, packageTitle, name, name2, name3,
        labelone, labeltwo, labelthree,
        acarddate, cardType,
        attrIconOne, attrIconTwo, attrIconThree,
        backDate, backDescription,
        backHighlightsTitle, backHighlights,
        backLegacyTagline, backLegacyText,
        selectedPackage
    ]);

    useEffect(() => {
        if (sidebarTab === "front" || sidebarTab === "back") {
            setSidebarTab(workingcard);
        }
    }, [workingcard, sidebarTab]);

    async function handleUpload(e) {
        const f = e.target.files?.[0];
        const file = await ImageResize(f);
        if (!file) return;
        const url = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

        const item = {
            id: Date.now(),
            url,
            x: 20,
            y: 20,
            width: 120,
            height: 120,
            scale: 1,
        };
        setUploads((s) => [...s, item]);
        setActiveImage(item.id);
        setActiveText(null);
    }

    function updateUploadPosition(id, x, y) {
        setUploads((prev) => prev.map((u) => (u.id === id ? { ...u, x, y } : u)));
    }
    function updateUploadSize(id, width, height) {
        setUploads((prev) => prev.map((u) => (u.id === id ? { ...u, width, height } : u)));
    }
    function updateUploadScale(id, scale) {
        const clamped = Math.min(3, Math.max(0.2, scale));
        setUploads((prev) => prev.map((u) => (u.id === id ? { ...u, scale: clamped } : u)));
    }
    function updateTextPosition(id, x, y) {
        setTexts((prev) => prev.map((t) => (t.id === id ? { ...t, x, y } : t)));
    }
    function updateTextSize(id, width) {
        setTexts((prev) => prev.map((t) => (t.id === id ? { ...t, width } : t)));
    }

    const captureCardSide = async (side) => {
        setworkingcard(side);
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        return captureNodeClean(
            previewCardNodeRef.current,
            (node) => captureNodeScreenshotForTranding(
                node,
                side === "front" ? baseFront : baseBack,
                uploads
            )
        );
    };

    // Unused in main flow, but kept to prevent breakage
    const [cards, setCards] = useState([]);
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    const selectLayerImage = (layer, url) => {
        setCards(prev =>
            prev.map((card, i) => {
                if (i !== activeCardIndex) return card;
                const updatedLayers = { ...card.selectedLayers };
                if (updatedLayers[layer] === url) delete updatedLayers[layer];
                else updatedLayers[layer] = url;
                return { ...card, selectedLayers: updatedLayers };
            })
        );
    };

    const handleDeleteSlot = (slotId) => {
        idbDelete(slotStorageKey(slotId)); 
        safeRemove(slotStorageKey(slotId)); 

        setSavedSlots(prev => prev.filter(s => s.id !== slotId));

        if (editingSlotId === slotId) {
            setEditingSlotId(null);
            resetCanvas();
        }

        toast.info("Design removed.");
    };

    const goToFinalView = async (slotsOverride) => {
        const slots = slotsOverride ?? savedSlotsRef.current;

        if (slots.length < 1) {
            toast.warn("Please save at least one design before checking out.");
            return;
        }

        // ✅ Read fresh from localStorage to avoid stale closure
        const freshPackageTitle = localStorage.getItem("persistent_packageTitle") ?? packageTitle ?? "";
        const freshCarddes = localStorage.getItem("persistent_carddes") ?? carddes ?? "";

        // ✅ Validate packageTitle not cardti
        if (!freshPackageTitle.trim()) {
            toast.warn("Please enter a Pack Title for your box.");
            return;
        }

        if (!freshCarddes.trim()) {
            toast.warn("Please enter a name in the Created For field.");
            return;
        }

        setspinloading(true);

        try {
            setActiveImage(null);
            setActiveText(null);
            await new Promise(r => setTimeout(r, 200));

            const html2canvas = (await import("html2canvas")).default;

            setworkingcard("back");
            await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
            const backNode = captureNodeRef.current;
            const backCanvas = await html2canvas(backNode, {
                width: 390,
                height: 570,
                scale: 3,
                useCORS: true,
                allowTaint: false,
                backgroundColor: "#ffffff",
                logging: false,
            });
            const backPreview = backCanvas.toDataURL("image/png");

            const FinalProduct = [];

            for (const slot of slots) {
                const pairKey = crypto.randomUUID();
                FinalProduct.push({ side: "front", image: slot.previewDataUrl, card_pair_key: pairKey, name: slot.snapshot.cardti || "Custom Design" });
                FinalProduct.push({ side: "back",  image: backPreview,          card_pair_key: pairKey, name: slot.snapshot.cardti || "Custom Design" });
            }

            await idbPut(customizationStorageKey, {
                productId:      fetchingData?.id,
                productSlug:    fetchingData?.slug,
                savedAt:        Date.now(),
                selectedPackage,
                packageConfig,
                slotIds:        savedSlots.map(s => s.id),
            });

            const product = {
                id:                      generateUserId(),
                packTitle:               freshPackageTitle,  // ✅ fresh value
                createdFor:              freshCarddes,        // ✅ fresh value
                productId:               fetchingData?.id,
                productSlug:             fetchingData?.slug,
                productName:             fetchingData?.name,
                productType:             fetchingData?.type,
                productUnitPrice:        fetchingData?.offer_price > 0
                                            ? fetchingData?.offer_price
                                            : fetchingData?.price,
                productQuantity:         1,
                productImage:            fetchingData?.image,
                productDescription:      fetchingData?.description,
                selectedPackage,
                packageConfig,
                FinalProduct,
                FinalProductImages:      [],
                FinalPDf:                null,
                customization_mode:      "trading",
                customizationStorageKey: customizationStorageKey || null,
            };

            const composedBoxImage = await captureTradingBox();
            setboxs([{
                BoxImage: composedBoxImage || "/tradingbox.png",
                bfor: "trading",
            }]);

            await new Promise(r => setTimeout(r, 5000));

            // addToCart(product);
            // router.push("/my-cart/checkout");
            addToCart(product);
            const { saveCartImagesToIDB } = await import("@/store/useCartStore");
            await saveCartImagesToIDB([product]);
            router.push("/my-cart/checkout");

        } catch (err) {
            console.error(err);
            toast.error("Failed to prepare cart. Please try again.");
        } finally {
            setspinloading(false);
        }
    };

    const resetCanvas = useCallback((keepTemplate = false) => {
        if (!keepTemplate) {
            const firstTemplate = templateConfig?.image || (frontImages?.[0]?.image ?? null);
            setBaseFront(firstTemplate);
        }
        setUploads([]);
        setTexts([]);
        setActiveImage(null);
        setActiveText(null);
        setcardti("Title");
        setname("Attribute One");
        setname2("Attribute Two");
        setname3("Attribute Three");
        setlabelone(69);
        setlabeltwo(55);
        setlabelthree(78);
        setacarddate("CLASS OF 2026");
        setCardType("graduation");
        setAttrIconOne("/attribute-images/attribute_2.png");
        setAttrIconTwo("/attribute-images/attribute_3.png");
        setAttrIconThree("/attribute-images/attribute_4.png");
        setisblack(false);
        setcardfinder(templateConfig?.cardfinder ?? 0); 
    }, [frontImages, templateConfig]); 

    const handleSaveSlot = async () => {
        if (!baseFront) {
            toast.warn("Please select a front template first.");
            return null;
        }
        if (editingSlotId === null && savedSlotsRef.current.length >= packageConfig.designs) {
            toast.warn(`Your ${packageConfig.name} package only allows ${packageConfig.designs} design(s).`);
            return null;
        }

        setdoneloading(true);

        try {
            setworkingcard("front");

            await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
            await waitForImagesToLoad(previewCardNodeRef.current);

            const html2canvas = (await import("html2canvas")).default;
            const node = captureNodeRef.current;
            if (!node) throw new Error("Capture node not found");

            await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

            const capturedCanvas = await html2canvas(node, {
                width: 390,
                height: 570,
                scale: 3,
                useCORS: true,
                allowTaint: false,
                backgroundColor: "#ffffff",
                logging: false,
            });

            const previewDataUrl = capturedCanvas.toDataURL("image/png");

            const snapshot = {
                baseFront, uploads, texts,
                cardfinder,
                cardti, carddes, packageTitle,
                name, name2, name3,
                attributeName,
                labelone, labeltwo, labelthree,
                acarddate, cardType,
                attrIconOne, attrIconTwo, attrIconThree,
                isblack,
            };

            let updatedSlots;

            if (editingSlotId !== null) {
                const updatedSlot = { id: editingSlotId, savedAt: Date.now(), previewDataUrl, snapshot };

                await idbPut(slotStorageKey(editingSlotId), { savedAt: updatedSlot.savedAt, selectedPackage, previewDataUrl, snapshot });

                updatedSlots = savedSlotsRef.current.map(s => s.id === editingSlotId ? updatedSlot : s);
                setEditingSlotId(null);
                toast.success("Design updated!");
            } else {
                const slotId  = crypto.randomUUID();
                const savedAt = Date.now();
                const newSlot = { id: slotId, savedAt, previewDataUrl, snapshot };

                const saved = await idbPut(slotStorageKey(slotId), { savedAt, selectedPackage, previewDataUrl, snapshot });
                if (!saved) {
                    toast.error("Storage full — could not save design. Please try removing an existing design.");
                    return null;
                }

                updatedSlots = [...savedSlotsRef.current, newSlot];
                toast.success(`Design ${updatedSlots.length} saved!`);
            }

            savedSlotsRef.current = updatedSlots;

            await idbPut(customizationStorageKey, {
                productId:   fetchingData?.id,
                productSlug: fetchingData?.slug || slug,
                savedAt:     Date.now(),
                cardfinder,  baseFront, baseBack,
                uploads,     texts,     workingcard, isblack,
                slotIds:     updatedSlots.map(s => s.id),
                selectedPackage,
                content: {
                    cardti, carddes, name, name2, name3,
                    labelone, labeltwo, labelthree,
                    acarddate, cardType,
                    attrIconOne, attrIconTwo, attrIconThree,
                    backDate, backDescription,
                    backHighlightsTitle, backHighlights,
                    backLegacyTagline, backLegacyText,
                },
            });

            setSavedSlots(updatedSlots);
            resetCanvas();

            return updatedSlots;

        } catch (err) {
            console.error(err);
            toast.error("Failed to save design. Please try again.");
            return null;
        } finally {
            setdoneloading(false);
        }
    };

    const handleEditSlot = (slot) => {
        if (editingSlotId === null && hasUnsavedWork()) {
            const confirmed = window.confirm(
                "You have unsaved changes on the current design. If you continue, they will be lost. Continue?"
            );
            if (!confirmed) return;
        }

        if (editingSlotId === slot.id) return;

        const s = slot.snapshot;
        setBaseFront(s.baseFront);
        setUploads(Array.isArray(s.uploads) ? s.uploads : []);
        setTexts(Array.isArray(s.texts) ? s.texts : []);
        setcardti(s.cardti ?? "Title");
        setcarddes(localStorage.getItem("persistent_carddes") ?? s.carddes ?? "Created For");
        setPackageTitle(localStorage.getItem("persistent_packageTitle") ?? s.packageTitle ?? "");
        setname(s.name ?? "Attribute One");
        setname2(s.name2 ?? "Attribute Two");
        setname3(s.name3 ?? "Attribute Three");
        setlabelone(s.labelone ?? 69);
        setlabeltwo(s.labeltwo ?? 55);
        setlabelthree(s.labelthree ?? 78);
        setacarddate(s.acarddate ?? "CLASS OF 2026");
        setCardType(s.cardType ?? "graduation");
        setAttrIconOne(s.attrIconOne ?? "/attribute-images/attribute_2.png");
        setAttrIconTwo(s.attrIconTwo ?? "/attribute-images/attribute_3.png");
        setAttrIconThree(s.attrIconThree ?? "/attribute-images/attribute_4.png");
        setisblack(Boolean(s.isblack));
        setcardfinder(s.cardfinder ?? 0);
        setActiveImage(null);
        setActiveText(null);

        setworkingcard("front");
        setSidebarTab("front");

        setEditingSlotId(slot.id);
    };

    const handleNext = async () => {
        if (editingSlotId === null && savedSlotsRef.current.length >= packageConfig.designs) {
            if (workingcard === "front") {
                setworkingcard("back");
                setSidebarTab("back");
                return;
            }
            await goToFinalView(savedSlotsRef.current);
            return;
        }

        const updatedSlots = await handleSaveSlot();
        if (!updatedSlots) return;

        if (updatedSlots.length >= packageConfig.designs) {
            setworkingcard("back");
            setSidebarTab("back");
        }
    };

    const renderIconPreview = (iconValue, altText) => {
        if (typeof iconValue === "string" && iconValue.startsWith("/attribute-images/")) {
            return <img src={iconValue} alt={altText} className="h-7 w-7 object-contain" />;
        }
        return <span className="text-xl leading-none">{iconValue}</span>;
    };

    const displayAttributeOne = name;
    const displayAttributeTwo = name2;
    const displayAttributeThree = name3;

    const backHighlightsPreview = backHighlights
        .map((item) => ({
            icon: item?.icon,
            text: item?.text?.trim() || "",
        }))
        .filter((item) => item.text);

    const backDateDisplay = backDate
        ? new Date(backDate).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })
        : "";

    const getSliderTrackStyle = (value) => {
        const numericValue = Number(value) || 0;
        return {
            background: `linear-gradient(90deg, #10b981 0%, #10b981 ${numericValue}%, #e5e7eb ${numericValue}%, #e5e7eb 100%)`,
        };
    };

    const addBackHighlight = () => {
        if (backHighlights.length >= 6) {
            toast.warn("Maximum 6 highlights allowed.");
            return;
        }
        setBackHighlights((prev) => [
            ...prev,
            { id: Date.now(), icon: "/attribute-images/attribute_2.png", text: "" },
        ]);
    };

    const removeBackHighlight = (id) => {
        if (backHighlights.length <= 2) {
            toast.warn("At least 2 highlights are required.");
            return;
        }
        setBackHighlights((prev) => prev.filter((item) => item.id !== id));
    };

    const updateBackHighlightText = (id, text) => {
        setBackHighlights((prev) => prev.map((item) => (item.id === id ? { ...item, text } : item)));
    };

    const updateBackHighlightIcon = (id, icon) => {
        setBackHighlights((prev) => prev.map((item) => (item.id === id ? { ...item, icon } : item)));
        setActiveBackHighlightPicker(null);
    };

    return {
        slug,
        selectedPackage,
        selectedTemplate,
        templateConfig,
        packageConfig,
        customizationStorageKey,

        // refs
        previewCardNodeRef,
        tradingBoxPreviewRef,

        // states
        smallconOpen, setsmallconOpen,
        sidebarTab, setSidebarTab,
        isCardTypeOpen, setIsCardTypeOpen,
        frontImages, setfrontImages,
        backImages, setbackImages,
        baseFront, setBaseFront,
        baseBack, setBaseBack,
        uploads, setUploads,
        texts, setTexts,
        activeText, setActiveText,
        activeImage, setActiveImage,
        workingcard, setworkingcard,
        fetchingData, setfetchingData,
        fetchingDataLoading, setfetchingDataLoading,
        savedSlots, setSavedSlots,
        spinloading, setspinloading,
        doneloading, setdoneloading,
        cardti, setcardti,
        carddes, setcarddes,
        packageTitle, setPackageTitle,
        name, setname,
        name2, setname2,
        name3, setname3,
        attributeName, setAttributeName,
        labelone, setlabelone,
        labeltwo, setlabeltwo,
        labelthree, setlabelthree,
        acarddate, setacarddate,
        cardType, setCardType,
        attrIconOne, setAttrIconOne,
        attrIconTwo, setAttrIconTwo,
        attrIconThree, setAttrIconThree,
        activeIconPicker, setActiveIconPicker,
        backDate, setBackDate,
        backDescription, setBackDescription,
        backHighlightsTitle, setBackHighlightsTitle,
        backHighlights, setBackHighlights,
        backLegacyTagline, setBackLegacyTagline,
        backLegacyText, setBackLegacyText,
        activeBackHighlightPicker, setActiveBackHighlightPicker,
        cardfinder, setcardfinder,
        cardtiltelimite,
        carddeslimite,
        packageTitlelimite,
        namelimite,
        name2limite,
        name3limite,
        acarddatelimite,
        isblack, setisblack,
        editingSlotId, setEditingSlotId,

        // computed
        displayAttributeOne,
        displayAttributeTwo,
        displayAttributeThree,
        backHighlightsPreview,
        backDateDisplay,

        // functions
        handleNext,
        handleEditSlot,
        handleDeleteSlot,
        handleUpload,
        updateUploadPosition,
        updateUploadSize,
        updateUploadScale,
        updateTextPosition,
        updateTextSize,
        captureCardSide,
        selectLayerImage,
        goToFinalView,
        resetCanvas,
        handleSaveSlot,
        captureNodeRef,
        renderIconPreview,
        getSliderTrackStyle,
        addBackHighlight,
        removeBackHighlight,
        updateBackHighlightText,
        updateBackHighlightIcon
    };
}
