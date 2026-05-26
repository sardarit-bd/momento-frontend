"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { BackOne, FrontFour, FrontOne, FrontThree, FrontTwo } from "@/app/componnent/TextOverlayer";
import TradingCardApplicationSkelaton from "@/app/componnent/TradingCardApplicationSkelaton";
import TradingCardSidebar from "@/app/componnent/TradingCardSidebar";
import useCartStore from "@/store/useCartStore";
import generateUserId from "@/utilis/helper/generateUserId";
import MakeGet from "@/utilis/requestrespose/get";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { BsArrowRepeat, BsCardText, BsCheckCircleFill, BsImage, BsSuitSpade, BsSuitSpadeFill } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { Rnd } from "react-rnd";
import { toast, ToastContainer } from "react-toastify";
import { FiShoppingCart } from "react-icons/fi";
import CharactersCountComponent from "@/app/componnent/CharactersCountComponent";
import captureNodeScreenshotForTranding from "@/utilis/helper/captureNodeScreenshotForTranding";
import ImageResize from "@/utilis/helper/ImageResize";
import captureNodeClean from "@/utilis/helper/captureNodeClean";
import SpinLoader from "../../../../../componnent/SpingLoader";
import useboxcartstore from "@/store/useboxcartstore";
import TradingBoxPreview from "@/app/componnent/TradingBoxPreview/TradingBoxPreview";
import domtoimage from 'dom-to-image-more';

const fonts = ["Arial", "Poppins", "Times New Roman", "Courier New", "Comic Sans MS"];

const cardTypeOptions = [
    { value: "graduation", label: "Graduation", icon: "🎓" },
    { value: "wedding", label: "Wedding", icon: "💍" },
    { value: "birthday", label: "Birthday", icon: "🎂" },
    { value: "achievement", label: "Achievement", icon: "🏆" },
    { value: "memory", label: "Memory", icon: "📷" },
    { value: "celebration", label: "Celebration", icon: "🎉" },
];

const attributeIconOptions = [
    "/attribute-images/attribute_2.png",
    "/attribute-images/attribute_3.png",
    "/attribute-images/attribute_4.png",
    "/attribute-images/attribute_5.png",
    "/attribute-images/attribute_6.png",
    "/attribute-images/attribute_7.png",
    "/attribute-images/attribute_8.png",
    "/attribute-images/attribute_9.png",
    "/attribute-images/attribute_10.png",
    "/attribute-images/attribute_11.png",
    "/attribute-images/attribute_12.png",
    "/attribute-images/attribute_13.png",
    "/attribute-images/attribute_14.png",
    "/attribute-images/attribute_15.png",
    "/attribute-images/attribute_16.png",
    "/attribute-images/attribute_17.png",
    "/attribute-images/attribute_18.png",
];

const defaultBackHighlights = [
    { id: 1, icon: "/attribute-images/attribute_2.png", text: "Always brings energy to the room" },
    { id: 2, icon: "/attribute-images/attribute_4.png", text: "Master of organization" },
];

// ===== IndexedDB Helper =====
const IDB_DB_NAME = "tradingCardCustomizer";
const IDB_STORE = "customizations";

async function idbOpen() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(IDB_DB_NAME, 1);
        req.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(IDB_STORE)) {
                db.createObjectStore(IDB_STORE);
            }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

async function idbPut(key, value) {
    try {
        const db = await idbOpen();
        return new Promise((resolve) => {
            const tx = db.transaction(IDB_STORE, "readwrite");
            tx.objectStore(IDB_STORE).put(value, key);
            tx.oncomplete = () => resolve(true);
            tx.onerror = () => { console.warn("IDB put failed:", tx.error); resolve(false); };
        });
    } catch { return false; }
}

async function idbGet(key) {
    try {
        const db = await idbOpen();
        return new Promise((resolve) => {
            const tx = db.transaction(IDB_STORE, "readonly");
            const req = tx.objectStore(IDB_STORE).get(key);
            req.onsuccess = () => resolve(req.result ?? null);
            req.onerror = () => resolve(null);
        });
    } catch { return null; }
}

async function idbDelete(key) {
    try {
        const db = await idbOpen();
        return new Promise((resolve) => {
            const tx = db.transaction(IDB_STORE, "readwrite");
            tx.objectStore(IDB_STORE).delete(key);
            tx.oncomplete = () => resolve(true);
            tx.onerror = () => resolve(false);
        });
    } catch { return false; }
}

async function idbGetKeysByPrefix(prefix) {
    try {
        const db = await idbOpen();
        return new Promise((resolve) => {
            const tx = db.transaction(IDB_STORE, "readonly");
            const store = tx.objectStore(IDB_STORE);
            const req = store.getAllKeys();
            req.onsuccess = () => resolve(
                req.result.filter(k => typeof k === "string" && k.startsWith(prefix))
            );
            req.onerror = () => resolve([]);
        });
    } catch { return []; }
}

export default function ProductCustomizer() {

    const { slug } = useParams();
    const searchParams   = useSearchParams();
    const selectedPackage = searchParams.get("package");
    const [editingSlotId, setEditingSlotId] = useState(null);
    const { setboxs } = useboxcartstore();

    const safeLocalStorageSet = (key, value) => {
        try {
            safeLocalStorageSet(key, value);
        } catch (e) {
            console.warn("localStorage write failed:", e.message);
        }
    };

    const handleNext = async () => {
        if (editingSlotId === null && savedSlotsRef.current.length >= packageConfig.designs) {
            await goToFinalView(savedSlotsRef.current);
            return;
        }

        const updatedSlots = await handleSaveSlot();
        if (!updatedSlots) return;

        if (updatedSlots.length >= packageConfig.designs) {
            await goToFinalView(updatedSlots);
        }
    };

    const handleEditSlot = (slot) => {
    // Warn if canvas has unsaved work
    if (editingSlotId === null && hasUnsavedWork()) {
        const confirmed = window.confirm(
            "You have unsaved changes on the current design. If you continue, they will be lost. Continue?"
        );
        if (!confirmed) return;
    }

    // If clicking the slot already being edited, do nothing
    if (editingSlotId === slot.id) return;

    // Load snapshot into canvas
    const s = slot.snapshot;
    setBaseFront(s.baseFront);
    setUploads(Array.isArray(s.uploads) ? s.uploads : []);
    setTexts(Array.isArray(s.texts) ? s.texts : []);
    setcardti(s.cardti ?? "Card Title");
    setcarddes(s.carddes ?? "Created For");
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
    setActiveImage(null);
    setActiveText(null);

    // Switch to front tab
    setworkingcard("front");
    setSidebarTab("front");

    setEditingSlotId(slot.id);
};

    const hasUnsavedWork = () => {
        return (
            uploads.length > 0 ||
            texts.length > 0 ||
            cardti !== "Card Title" ||
            carddes !== "Created For" ||
            name !== "Attribute One" ||
            name2 !== "Attribute Two" ||
            name3 !== "Attribute Three"
        );
    };

    const SLOT_TTL_MS = 72 * 60 * 60 * 1000; // 72 hours

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

    const isExpired = (savedAt) =>
        !savedAt || (Date.now() - savedAt) > SLOT_TTL_MS;

    const PACKAGE_CONFIG = {
        single:     { name: "Single",     designs: 1, copiesPerDesign: 18, totalCards: 18 },
        trio:       { name: "Trio",       designs: 3, copiesPerDesign: 6,  totalCards: 18 },
        collection: { name: "Collection", designs: 6, copiesPerDesign: 3,  totalCards: 18 },
    };

    const packageConfig = PACKAGE_CONFIG[selectedPackage] ?? PACKAGE_CONFIG["single"];
    const customizationStorageKey = slug ? `tradingCustomization:${slug}` : null;
    const hasHydratedFromStorage = useRef(false);
    const canPersistCustomization = useRef(false);
    

    const previewCardNodeRef = useRef(null);
    const tradingBoxPreviewRef = useRef(null);

    const captureTradingBox = async () => {
    if (!tradingBoxPreviewRef.current) return null;
    try {
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

    // replace these with real image URLs or keep as keys and map to your assets
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
    const router = useRouter();
    const [doneloading, setdoneloading] = useState(false);
    const { addToCart } = useCartStore();



    //text state is here
    const [cardti, setcardti] = useState('Card Title');
    const [carddes, setcarddes] = useState('Created For');
    const [name, setname] = useState('Attribute One');
    const [name2, setname2] = useState('Attribute Two');
    const [name3, setname3] = useState('Attribute Three');
    const [labelone, setlabelone] = useState(69);
    const [labeltwo, setlabeltwo] = useState(55);
    const [labelthree, setlabelthree] = useState(78);
    const [acarddate, setacarddate] = useState('CLASS OF 2025');
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


    // text inputer limite
    const [cardtiltelimite, setcardtiltelimite] = useState(12);
    const [carddeslimite, setcarddeslimite] = useState(15);
    const [namelimite, setnamelimite] = useState(15);
    const [name2limite, setname2limite] = useState(15);
    const [name3limite, setname3limite] = useState(15);
    const [acarddatelimite, setacarddatelimite] = useState(10);


    // color state
    const [isblack, setisblack] = useState(false);

    const getBaseTrading = useCallback(async (slug) => {
    setfetchingDataLoading(true);
    const res = await MakeGet(`api/shop/${slug}`);

    setfrontImages(res?.data?.customizations?.trading_fronts);
    setbackImages(res?.data?.customizations?.trading_backs);
    setfetchingData(res?.data);

    const defaultFront = res?.data?.customizations?.trading_fronts?.[0]?.image || null;
    const defaultBack  = res?.data?.customizations?.trading_backs?.[0]?.image  || null;

    let restoredFromStorage = false;

    if (customizationStorageKey) {
        try {
            // =============================================
            // BLOCK A — restore canvas state from IndexedDB
            // =============================================
            const saved = await idbGet(customizationStorageKey);
            if (saved) {
                setcardfinder(saved?.cardfinder ?? 0);
                setBaseFront(saved?.baseFront || defaultFront);
                setBaseBack(saved?.baseBack   || defaultBack);
                setUploads(Array.isArray(saved?.uploads) ? saved.uploads : []);
                setTexts(Array.isArray(saved?.texts)     ? saved.texts   : []);
                setworkingcard(saved?.workingcard || "front");
                setisblack(Boolean(saved?.isblack));
                setcardti(saved?.content?.cardti             ?? "Card Title");
                setcarddes(saved?.content?.carddes           ?? "Created For");
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

            // =============================================
            // BLOCK B — restore slots from IndexedDB
            // =============================================
            const slotPrefix = `${customizationStorageKey}:slot:`;
            const allSlotKeys = await idbGetKeysByPrefix(slotPrefix);

            const restoredSlots = [];
            for (const k of allSlotKeys) {
                const slotData = await idbGet(k);
                if (!slotData) continue;
                if (isExpired(slotData.savedAt)) {
                    await idbDelete(k);    // ✅ clean up expired
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
                    setcardti(s.cardti             ?? "Card Title");
                    setcarddes(s.carddes           ?? "Created For");
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
                        frontImages?.findIndex(img => img.image === s.baseFront) ?? 0
                    );
                    restoredFromStorage = true;
                    hasHydratedFromStorage.current = true;
                }
            }

            // =============================================
            // BLOCK C — clean up legacy localStorage slot entries
            // =============================================
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

    canPersistCustomization.current = true;
    setfetchingDataLoading(false);
}, [customizationStorageKey]);
    



    function hanldeInputUpdater() {
        if (workingcard == 'front') {
            setcardti('Card Title');
            setcarddes('Created For');
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
            setcarddes('This Trading Card Customization is easy to customize, if your want the Try Out. You will enjoy!');
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
    }




    useEffect(() => {
        getBaseTrading(slug);
    }, [slug]);

    useEffect(() => {
        hasHydratedFromStorage.current = false;
        canPersistCustomization.current = false;
    }, [slug]);

    useEffect(() => {
        if (!hasHydratedFromStorage.current) {
            hanldeInputUpdater();
            hasHydratedFromStorage.current = true;
        }
    }, [workingcard]);

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
            cardti, carddes, name, name2, name3,
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
    cardti, carddes, name, name2, name3,
    labelone, labeltwo, labelthree,
    acarddate, cardType,
    attrIconOne, attrIconTwo, attrIconThree,
    backDate, backDescription,
    backHighlightsTitle, backHighlights,
    backLegacyTagline, backLegacyText,
]);

    useEffect(() => {
        if (sidebarTab === "front" || sidebarTab === "back") {
            setSidebarTab(workingcard);
        }
    }, [workingcard, sidebarTab]);

    /******** Upload Image ********/
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
        };
        setUploads((s) => [...s, item]);
        // make the newly uploaded image active
        setActiveImage(item.id);
        setActiveText(null);
    }



    /******** Helpers to update positions & sizes ********/
    function updateUploadPosition(id, x, y) {
        setUploads((prev) => prev.map((u) => (u.id === id ? { ...u, x, y } : u)));
    }
    function updateUploadSize(id, width, height) {
        setUploads((prev) => prev.map((u) => (u.id === id ? { ...u, width, height } : u)));
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
        return captureNodeClean(previewCardNodeRef.current, captureNodeScreenshotForTranding);
    };


    /******* Selected Layer Image Function ********/
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


    /******* Selected Layer Image Function ********/
    const goToFinalView = async (slotsOverride) => {
    const slots = slotsOverride ?? savedSlotsRef.current;

    if (slots.length < 1) {
        toast.warn("Please save at least one design before checking out.");
        return;
    }

    if (!cardti.trim()) {
        toast.warn("Please enter a Pack Title for your box.");
        return;
    }

    if (!carddes.trim()) {
        toast.warn("Please enter a name in the Created For field.");
        return;
    }

    setspinloading(true);

    try {
        setActiveImage(null);
        setActiveText(null);
        await new Promise(r => setTimeout(r, 200));

        setworkingcard("back");
        await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
        const backPreview = await captureNodeClean(
            previewCardNodeRef.current,
            captureNodeScreenshotForTranding
        );

        console.log('backPreview:', backPreview?.substring(0, 50));

        const FinalProduct = [];

        for (const slot of slots) {
            const pairKey = crypto.randomUUID();
            FinalProduct.push({ side: "front", image: slot.previewDataUrl, card_pair_key: pairKey, name: slot.snapshot.cardti || "Custom Design" });
            FinalProduct.push({ side: "back",  image: backPreview,          card_pair_key: pairKey, name: slot.snapshot.cardti || "Custom Design" });
        }

        // ✅ Write to IndexedDB instead of localStorage
        await idbPut(customizationStorageKey, {
            productId:      fetchingData?.id,
            productSlug:    fetchingData?.slug,
            savedAt:        Date.now(),
            selectedPackage,
            packageConfig,
            slotIds:        savedSlots.map(s => s.id),
        });

        const product = {
            id:                     generateUserId(),
            packTitle:              cardti,
            createdFor:             carddes,
            productId:              fetchingData?.id,
            productSlug:            fetchingData?.slug,
            productName:            fetchingData?.name,
            productType:            fetchingData?.type,
            productUnitPrice:       fetchingData?.offer_price > 0
                                        ? fetchingData?.offer_price
                                        : fetchingData?.price,
            productQuantity:        packageConfig.totalCards,
            productImage:           fetchingData?.image,
            productDescription:     fetchingData?.description,
            selectedPackage,
            packageConfig,
            FinalProduct,
            FinalProductImages:     [],
            FinalPDf:               null,
            customization_mode:     "trading",
            customizationStorageKey: customizationStorageKey || null,
        };
        
        const composedBoxImage = await captureTradingBox();
        setboxs([{
            BoxImage: composedBoxImage || "/tradingbox.png",
            bfor: "trading",
        }]);

        console.log('FinalProduct here:', JSON.stringify(FinalProduct, null, 2));
        await new Promise(r => setTimeout(r, 5000));

        addToCart(product);
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
            const firstTemplate = frontImages?.[0]?.image ?? null;
            setBaseFront(firstTemplate);
        }
        setUploads([]);
        setTexts([]);
        setActiveImage(null);
        setActiveText(null);
        setcardti("Card Title");
        setcarddes("Created For");
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
        setcardfinder(0); 
    }, [frontImages]); 




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

        const previewDataUrl = await captureNodeClean(
            previewCardNodeRef.current,
            captureNodeScreenshotForTranding
        );

        if (!previewDataUrl) {
            toast.error("Could not capture card preview. Please try again.");
            return null;
        }

        const snapshot = {
            baseFront, uploads, texts,
            cardti, carddes,
            name, name2, name3,
            labelone, labeltwo, labelthree,
            acarddate, cardType,
            attrIconOne, attrIconTwo, attrIconThree,
            isblack,
        };

        let updatedSlots;

        if (editingSlotId !== null) {
            const updatedSlot = { id: editingSlotId, savedAt: Date.now(), previewDataUrl, snapshot };

            // ✅ IndexedDB instead of localStorage
            await idbPut(slotStorageKey(editingSlotId), { savedAt: updatedSlot.savedAt, selectedPackage, previewDataUrl, snapshot });

            updatedSlots = savedSlotsRef.current.map(s => s.id === editingSlotId ? updatedSlot : s);
            setEditingSlotId(null);
            toast.success("Design updated!");
        } else {
            const slotId  = crypto.randomUUID();
            const savedAt = Date.now();
            const newSlot = { id: slotId, savedAt, previewDataUrl, snapshot };

            // ✅ IndexedDB instead of localStorage
            const saved = await idbPut(slotStorageKey(slotId), { savedAt, selectedPackage, previewDataUrl, snapshot });
            if (!saved) {
                toast.error("Storage full — could not save design. Please try removing an existing design.");
                return null;
            }

            updatedSlots = [...savedSlotsRef.current, newSlot];
            toast.success(`Design ${updatedSlots.length} saved!`);
        }

        // Sync ref synchronously FIRST
        savedSlotsRef.current = updatedSlots;

        // Write main snapshot explicitly — also use IndexedDB for the main key
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

        // Update React state
        setSavedSlots(updatedSlots);

        // Reset canvas for next design
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


    if (fetchingDataLoading) return <TradingCardApplicationSkelaton />

    return (
        <div className="grid grid-cols-12 grid-rows-12 gap-0 lg:gap-2 h-screen w-screen fixed bg-gray-100">
            {/* Left Sidebar (kept simple as in your last snippet) */}
            <div className="col-span-12 row-span-2 lg:row-span-12 lg:col-span-2 w-full h-full bg-white shadow-sm">
                {/* replace this with <CardSidebar /> when available */}
                <div className="w-full h-full">

                    <TradingCardSidebar
                        savedSlots={savedSlots}
                        packageConfig={packageConfig}
                        onSaveSlot={handleSaveSlot}
                        onDeleteSlot={handleDeleteSlot}
                        onEditSlot={handleEditSlot}
                        onCheckout={goToFinalView}
                        doneloading={doneloading}
                        spinloading={spinloading}
                        canSave={!!baseFront}
                        editingSlotId={editingSlotId}
                    />

                </div>
            </div>

            {/* Middle area (contains canvas and right-panel inside it like your original layout) */}
            <div className="col-span-12 row-span-10 lg:row-span-12 lg:col-span-10 h-full lg:h-screen w-full">
                <div className="grid grid-cols-10 grid-rows-10 h-full w-full mt-2 lg:mt-0 relative">
                    {/* Canvas column (middle) */}
                    <div className="col-span-10 row-span-9 lg:row-span-10 lg:col-span-6 flex items-center justify-center -translate-y-[35px] lg:-translate-y-[50px] w-screen lg:w-full z-40">
                        <div className="flex flex-col items-center gap-3">
                            <div ref={previewCardNodeRef} className="border border-gray-200 rounded-xl bg-white w-[255px] h-[370px] lg:w-[390px] lg:h-[570px] relative overflow-hidden shadow-xl ring-1 ring-gray-100">
                                {/* Uploaded images (zIndex:1) - draggable & resizable */}
                                {uploads.map((img) => (
                                    <Rnd

                                        resizeHandleStyles={{
                                            topLeft: { border: "3px solid #3b82f6", width: "10px", height: "10px", background: "white" },
                                            topRight: { border: "3px solid #3b82f6", width: "10px", height: "10px", background: "white" },
                                            bottomLeft: { border: "3px solid #3b82f6", width: "10px", height: "10px", background: "white" },
                                            bottomRight: { border: "3px solid #3b82f6", width: "10px", height: "10px", background: "white" },
                                        }}
                                        style={{
                                            border: activeText === img.id || activeImage === img?.id ? "2px dashed #3b82f6" : "none",
                                            
                                            backgroundColor: "transparent",
                                        }}


                                        key={img.id}
                                        bounds="parent"
                                        size={{ width: "100%", height: "100%" }}
                                        position={{ x: img.x, y: img.y }}
                                        onDragStop={(_, d) => updateUploadPosition(img.id, d.x, d.y)}
                                        onResizeStop={(_, __, ref, ___, pos) => {
                                            updateUploadSize(img.id, parseInt(ref.style.width, 10), parseInt(ref.style.height, 10));
                                            updateUploadPosition(img.id, pos.x, pos.y);
                                        }}
                                        onMouseDown={() => {
                                            setActiveImage(img.id);
                                            setActiveText(null);
                                        }}
                                        style={{ zIndex: 1 }}
                                    >
                                        <Image
                                            width={1000}
                                            height={1000}
                                            src={img.url}
                                            alt="upload"
                                            className="w-full h-full object-cover"
                                            draggable={false}
                                            style={{ display: 'block', backgroundColor: 'transparent' }}
                                        />
                                    </Rnd>
                                ))}

                                {/* Active base (zIndex:2) */}
                                {(workingcard === "front" ? baseFront : baseBack) && (
                                    <Image
                                        key={workingcard}
                                        src={workingcard === "front" ? baseFront : baseBack}
                                        fill
                                        sizes="(max-width: 1024px) 255px, 390px"
                                        alt={workingcard === "front" ? "front-base" : "back-base"}
                                        className="absolute inset-0 object-cover"
                                        style={{ zIndex: 2, pointerEvents: "none" }}
                                    />
                                )}

                                {/* Text layers (zIndex:4) */}


                                {/* ......................................................

...........................................................*/


                                    <div className="absolute top-0 left-0 w-full h-full z-50 pointer-events-none">

                                        {
                                            workingcard === "front" ? (
                                                <>
                                                    {cardfinder == 0 && <FrontOne cardti={cardti}  name={displayAttributeOne} name2={displayAttributeTwo} name3={displayAttributeThree} acarddate={acarddate} labelone={labelone} labeltwo={labeltwo} labelthree={labelthree} iconOne={attrIconOne} iconTwo={attrIconTwo} iconThree={attrIconThree} />}
                                                    {cardfinder == 1 && <FrontTwo cardti={cardti} carddes={carddes} name={displayAttributeOne} name2={displayAttributeTwo} name3={displayAttributeThree} acarddate={acarddate} labelone={labelone} labeltwo={labeltwo} labelthree={labelthree} iconOne={attrIconOne} iconTwo={attrIconTwo} iconThree={attrIconThree} />}
                                                    {cardfinder == 2 && <FrontThree cardti={cardti} carddes={carddes} name={displayAttributeOne} name2={displayAttributeTwo} name3={displayAttributeThree} acarddate={acarddate} labelone={labelone} labeltwo={labeltwo} labelthree={labelthree} iconOne={attrIconOne} iconTwo={attrIconTwo} iconThree={attrIconThree} />}
                                                    {cardfinder == 3 && <FrontFour cardti={cardti} carddes={carddes} name={displayAttributeOne} name2={displayAttributeTwo} name3={displayAttributeThree} acarddate={acarddate} labelone={labelone} labeltwo={labeltwo} labelthree={labelthree} iconOne={attrIconOne} iconTwo={attrIconTwo} iconThree={attrIconThree} />}
                                                </>
                                            ) : (
                                                <BackOne
                                                    dateLabel={backDateDisplay}
                                                    description={backDescription}
                                                    highlightsTitle={backHighlightsTitle}
                                                    highlights={backHighlightsPreview}
                                                    legacyTagline={backLegacyTagline}
                                                    legacyText={backLegacyText}
                                                    isblack={isblack}
                                                />
                                            )
                                        }

                                    </div>




/*......................................................................


..................................................................................... */}



                                {/* Text layers (zIndex:4) */}



                                {/* small helper overlay when nothing selected */}
                                {!uploads.length && !baseFront && !baseBack && !texts.length && (
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-300">Preview area</div>
                                )}
                            </div>
                            <button
                                onClick={() => setworkingcard((prev) => (prev === "front" ? "back" : "front"))}
                                className="relative z-[60] text-base lg:text-lg text-semibold text-white flex items-center gap-2 px-4 py-2 rounded-lg justify-center cursor-pointer bg-sky-400 w-[255px] lg:w-[160px] shadow-md hover:shadow-lg transition-all duration-200"
                            >
                                <BsArrowRepeat className="text-xl" />
                                <span>{workingcard === "front" ? "Flip to Back" : "Flip to Front"}</span>
                            </button>
                        </div>

                    </div>

                    {/* Right Controls column (inside the middle wrapper as your original) */}
                    <div className={`absolute transition-all duration-300 ${smallconOpen ? "top-px" : "top-3/4 sm:top-2/3"} lg:static lg:block col-span-10 row-span-1 lg:row-span-10 lg:col-span-4 w-full max-w-full h-full bg-white border-t border-gray-300 lg:border-l lg:border-gray-200 px-2 md:px-6 lg:px-6 mt-2 lg:mt-0 shadow-2xl lg:shadow-md z-50 overflow-x-hidden`}>


                        <div className="w-full flex lg:hidden items-center justify-center">
                            <div onClick={() => { setsmallconOpen(!smallconOpen) }} className="w-fit p-2 rounded-full cursor-pointer">
                                <div className="bg-sky-300 w-[100px] h-[10px] rounded-full flex items-center justify-center p-2">
                                    <IoIosArrowDown className={`text-white ${!smallconOpen && "rotate-180"}`} />
                                </div>
                            </div>
                        </div>



                        <div className="h-full lg:h-[83vh] overflow-y-scroll mt-2 pb-32 lg:pb-0">
                            <div className="sticky top-0 z-20 bg-white border-b border-gray-200 backdrop-blur-sm">
                                <div className="grid grid-cols-3">
                                    <button
                                        onClick={() => { setSidebarTab("front"); setworkingcard("front"); }}
                                        className={`py-4 flex flex-col items-center justify-center gap-1 border-b-2 cursor-pointer transition-all duration-200 ${sidebarTab === "front" ? "border-gray-800 text-gray-900" : "border-transparent text-gray-500"}`}
                                    >
                                        <BsSuitSpadeFill className="text-xl" />
                                        <span className="text-sm font-semibold">Front</span>
                                    </button>
                                    <button
                                        onClick={() => setSidebarTab("attributes")}
                                        className={`py-4 flex flex-col items-center justify-center gap-1 border-b-2 cursor-pointer transition-all duration-200 ${sidebarTab === "attributes" ? "border-gray-800 text-gray-900" : "border-transparent text-gray-500"}`}
                                    >
                                        <BsCardText className="text-xl" />
                                        <span className="text-sm font-semibold">Attributes</span>
                                    </button>
                                    <button
                                        onClick={() => { setSidebarTab("back"); setworkingcard("back"); }}
                                        className={`py-4 flex flex-col items-center justify-center gap-1 border-b-2 cursor-pointer transition-all duration-200 ${sidebarTab === "back" ? "border-gray-800 text-gray-900" : "border-transparent text-gray-500"}`}
                                    >
                                        <BsSuitSpade className="text-xl" />
                                        <span className="text-sm font-semibold">Back</span>
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4">

                                {/* Front Base Card */}
                                {
                                    sidebarTab === "front" && <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-2.5 shadow-sm">
                                        <div className="mb-2 flex items-center justify-between gap-2">
                                            <label className="block text-gray-800 font-semibold">Front Base Card <span className="text-red-600 text-xl">*</span></label>
                                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{frontImages?.length || 0} styles</span>
                                        </div>

                                        <p className="text-xs text-slate-500 mb-1.5">Pick a premium frame style for the front of your trading card.</p>

                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 overflow-y-auto pr-1">
                                            {frontImages?.map((img, idx) => {
                                                const isSelected = baseFront === img?.image;
                                                return (
                                                    <button
                                                        key={idx}
                                                        onClick={() => { setBaseFront(img?.image); setcardfinder(idx); }}
                                                        className={`relative overflow-hidden rounded-lg border transition-all duration-200 cursor-pointer ${isSelected
                                                            ? "border-sky-500 ring-2 ring-sky-200 shadow-md"
                                                            : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
                                                            }`}
                                                        type="button"
                                                        aria-label={`Select front base card ${idx + 1}`}
                                                    >
                                                        <Image
                                                            src={img?.image}
                                                            width={1000}
                                                            height={1000}
                                                            alt={`front-${idx}`}
                                                            className="w-full aspect-[3/4] object-contain bg-slate-100"
                                                        />
                                                        {isSelected && (
                                                            <div className="absolute top-1.5 right-1.5 rounded-full bg-white/95 p-1 shadow-sm">
                                                                <BsCheckCircleFill className="text-sky-500 text-sm" />
                                                            </div>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                }




                                {/* Back Base Card */}
                                {
                                    sidebarTab === "back" && <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4 shadow-sm">
                                        <div className="mb-3 flex items-center justify-between gap-2">
                                            <label className="block text-gray-800 font-semibold">Back Base Card <span className="text-red-600 text-xl">*</span></label>
                                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{backImages?.length || 0} styles</span>
                                        </div>

                                        <p className="text-xs text-slate-500 mb-3">Choose the back design. Preview shows full card proportion.</p>

                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {backImages?.map((img, idx) => {
                                                const isSelected = baseBack === img?.image;
                                                return (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setBaseBack(img?.image)}
                                                        className={`relative overflow-hidden rounded-xl border transition-all duration-200 cursor-pointer ${isSelected
                                                            ? "border-sky-500 ring-2 ring-sky-200 shadow-md"
                                                            : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
                                                            }`}
                                                        type="button"
                                                        aria-label={`Select back base card ${idx + 1}`}
                                                    >
                                                        <Image
                                                            src={img?.image}
                                                            width={1000}
                                                            height={1000}
                                                            alt={`back-${idx}`}
                                                            className="w-full aspect-[5/7] object-contain bg-slate-100"
                                                        />
                                                        {isSelected && (
                                                            <div className="absolute top-1.5 right-1.5 rounded-full bg-white/95 p-1 shadow-sm">
                                                                <BsCheckCircleFill className="text-sky-500 text-sm" />
                                                            </div>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                }

                                {sidebarTab === "back" && (
                                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-5">
                                        {/* <div>
                                            <label className="block text-gray-800 font-semibold mb-2">Date (Optional)</label>
                                            <input
                                                type="date"
                                                value={backDate}
                                                onChange={(e) => setBackDate(e.target.value)}
                                                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-gray-700 outline-none transition-all duration-200 focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                                            />
                                        </div> */}

                                        <div>
                                            <label className="block text-gray-800 font-semibold mb-2">Description</label>
                                            <textarea
                                                value={backDescription}
                                                onChange={(e) => setBackDescription(e.target.value)}
                                                placeholder="Add a brief description..."
                                                className="w-full h-24 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-gray-700 outline-none transition-all duration-200 focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-gray-800 font-semibold mb-2">Highlights Title</label>
                                            <input
                                                value={backHighlightsTitle}
                                                onChange={(e) => setBackHighlightsTitle(e.target.value)}
                                                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-gray-700 outline-none transition-all duration-200 focus:ring-2 focus:ring-gray-300 focus:border-gray-300 mb-4"
                                            />

                                            <div className="mb-3 flex items-center justify-between">
                                                <label className="block text-gray-800 font-semibold">Highlights (2-6)</label>
                                                <button
                                                    type="button"
                                                    onClick={addBackHighlight}
                                                    disabled={backHighlights.length >= 6}
                                                    className={`h-9 rounded-xl border px-3 text-sm font-semibold transition-all duration-200 ${backHighlights.length >= 6
                                                        ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                                                        : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                                                        }`}
                                                >
                                                    + Add
                                                </button>
                                            </div>

                                            <div className="space-y-3">
                                                {backHighlights.map((item) => (
                                                    <div key={item.id} className="relative flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => setActiveBackHighlightPicker((prev) => (prev === item.id ? null : item.id))}
                                                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-white shadow-sm"
                                                        >
                                                            {renderIconPreview(item.icon, "Selected highlight icon")}
                                                        </button>
                                                        <input
                                                            value={item.text}
                                                            onChange={(e) => updateBackHighlightText(item.id, e.target.value)}
                                                            placeholder="Highlight text"
                                                            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-100 px-3 text-gray-700 outline-none transition-all duration-200 focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeBackHighlight(item.id)}
                                                            className="h-8 w-8 shrink-0 rounded-full text-xl text-slate-600 hover:bg-slate-100"
                                                        >
                                                            ×
                                                        </button>

                                                        {activeBackHighlightPicker === item.id && (
                                                            <div className="absolute top-11 left-0 z-30 w-[255px] rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
                                                                <div className="grid grid-cols-8 gap-2">
                                                                    {attributeIconOptions.map((icon) => (
                                                                        <button
                                                                            key={`${item.id}-${icon}`}
                                                                            type="button"
                                                                            onClick={() => updateBackHighlightIcon(item.id, icon)}
                                                                            className="flex h-8 w-8 items-center justify-center rounded-md p-1 hover:bg-slate-100"
                                                                        >
                                                                            {renderIconPreview(icon, "Highlight icon option")}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="h-px w-full bg-slate-200" />

                                        <div>
                                            <label className="block text-gray-800 font-semibold mb-2">Legacy Tagline</label>
                                            <input
                                                value={backLegacyTagline}
                                                onChange={(e) => setBackLegacyTagline(e.target.value)}
                                                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-gray-700 outline-none transition-all duration-200 focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-gray-800 font-semibold mb-2">Legacy Text</label>
                                            <textarea
                                                value={backLegacyText}
                                                onChange={(e) => setBackLegacyText(e.target.value)}
                                                className="w-full h-24 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-gray-700 outline-none transition-all duration-200 focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Upload Image */}
                                {sidebarTab === "front" && <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                    <div className="mb-3 flex items-center justify-between">
                                        <label className="block text-gray-800 font-semibold">Upload Image <span className="text-red-600 text-xl">*</span></label>
                                        <span className="text-gray-600 bg-amber-100 px-2 py-1 rounded-md text-xs font-medium">Recommended: 250 x 334 px</span>
                                    </div>

                                    <label
                                        htmlFor="uploadImage"
                                        className="group flex cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/80 p-4 transition-all duration-200 hover:border-sky-400 hover:bg-sky-50"
                                    >
                                        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white shadow-sm">
                                            <CiCirclePlus className="text-5xl text-sky-400 group-hover:scale-105 transition-transform" />
                                        </div>

                                        <div className="flex-1 text-left">
                                            <div className="text-sm font-semibold text-slate-700">Click to upload a photo</div>
                                            <div className="text-xs text-slate-500">PNG, JPG or WEBP. After upload, drag and resize it on the card preview.</div>
                                        </div>

                                        <BsImage className="text-xl text-slate-400 hidden sm:block" />
                                    </label>

                                    <div className="mt-3 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">
                                        {uploads?.length > 0
                                            ? `Uploaded image${uploads?.length > 1 ? "s" : ""}: ${uploads?.length}. You can reposition it from the preview area.`
                                            : "No image uploaded yet. Add one to personalize the front design."}
                                    </div>

                                    {activeImage && (
                                        <div className="mt-2 text-xs text-emerald-700 font-medium">Image selected. You can drag and resize directly on canvas.</div>
                                    )}

                                    <input onChange={handleUpload} id="uploadImage" type="file" className="hidden" accept="image/*" />
                                </div>}

                                {/* {sidebarTab === "front" && (
                                    <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4 shadow-sm">
                                        <button
                                            type="button"
                                            onClick={() => setIsCardTypeOpen((prev) => !prev)}
                                            className="w-full mb-2 flex items-center justify-between gap-2 text-left"
                                            aria-expanded={isCardTypeOpen}
                                        >
                                            <span className="block text-gray-800 font-semibold">Card Type</span>
                                            <div className="flex items-center gap-2">
                                                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                                    {cardTypeOptions.length} options
                                                </span>
                                                <IoIosArrowDown className={`text-slate-600 transition-transform duration-200 ${isCardTypeOpen ? "rotate-180" : ""}`} />
                                            </div>
                                        </button>

                                        {isCardTypeOpen && (
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {cardTypeOptions.map((type) => {
                                                    const isSelected = cardType === type.value;
                                                    return (
                                                        <button
                                                            key={type.value}
                                                            type="button"
                                                            onClick={() => setCardType(type.value)}
                                                            className={`rounded-xl border-2 px-3 py-4 text-center transition-all duration-200 ${isSelected
                                                                ? "border-slate-700 bg-white shadow-sm"
                                                                : "border-slate-200 bg-slate-50 hover:border-slate-300"
                                                                }`}
                                                        >
                                                            <div className="text-2xl leading-none mb-2">{type.icon}</div>
                                                            <div className="text-sm font-semibold text-slate-800">{type.label}</div>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                )} */}


                                {/* text control start here */}

                                {/* Front Text Inputs moved to Attributes tab */}

                                {/* Attribute Tab Controls */}
                                {sidebarTab === "attributes" && <div className="space-y-4">
                                    <div className="border border-gray-200 p-4 md:p-5 mb-4 rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                                        <label className="block text-xl text-gray-700 mb-3 font-semibold">Card Content</label>

                                        <div className="w-full flex items-center gap-3 mb-3 rounded-lg p-1 transition-shadow duration-200 hover:shadow-sm">
                                            <div className="w-full">
                                                <label className="text-gray-500 mb-1 text-sm">Card Title: <span className="text-red-600 text-xl">*</span>
                                                    <div className="relative">
                                                        <CharactersCountComponent text={cardti} limit={cardtiltelimite} />
                                                    </div>
                                                </label>
                                                <input value={cardti} maxLength={cardtiltelimite} onChange={(e) => { setcardti(e.target.value) }} type="text" className="border border-gray-200 px-3 py-2 rounded-lg text-gray-600 outline-none w-full transition-all duration-200 focus:ring-2 focus:ring-gray-300 focus:border-gray-300" />
                                            </div>
                                        </div>

                                        <div className="w-full flex items-center gap-3 mb-3 rounded-lg p-1 transition-shadow duration-200 hover:shadow-sm">
                                            <div className="w-full">
                                                <label className="text-gray-500 mb-1 text-sm">Created For: <span className="text-red-600 text-xl">*</span>
                                                    <div className="relative">
                                                        <CharactersCountComponent text={carddes} limit={carddeslimite} />
                                                    </div>
                                                </label>
                                                <textarea maxLength={carddeslimite} value={carddes} onChange={(e) => { setcarddes(e.target.value) }} type="text" className="border border-gray-200 px-3 py-2 rounded-lg text-gray-600 outline-none w-full h-[90px] transition-all duration-200 focus:ring-2 focus:ring-gray-300 focus:border-gray-300"></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border border-gray-200 p-4 md:p-5 mb-4 rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                                        <label className="block text-xl text-gray-700 mb-3 font-semibold">Card Attributes</label>

                                        <div className="space-y-3">
                                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                                <div className="relative flex items-center gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => setActiveIconPicker((prev) => (prev === "one" ? null : "one"))}
                                                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-white shadow-sm"
                                                    >
                                                        {renderIconPreview(attrIconOne, "Attribute one icon")}
                                                    </button>
                                                    <input
                                                        value={name}
                                                        maxLength={namelimite}
                                                        onChange={(e) => { setname(e.target.value) }}
                                                        type="text"
                                                        placeholder="Attribute One"
                                                        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-gray-700 outline-none transition-all duration-200 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300"
                                                    />

                                                    {activeIconPicker === "one" && (
                                                        <div className="absolute top-14 left-0 z-30 w-[255px] rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
                                                            <div className="grid grid-cols-8 gap-2">
                                                                {attributeIconOptions.map((icon) => (
                                                                    <button
                                                                        key={`one-${icon}`}
                                                                        type="button"
                                                                        onClick={() => { setAttrIconOne(icon); setActiveIconPicker(null); }}
                                                                        className="flex h-8 w-8 items-center justify-center rounded-md p-1 hover:bg-slate-100"
                                                                    >
                                                                        {renderIconPreview(icon, "Attribute icon option")}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mt-3 mb-1 flex items-center justify-between text-sm text-slate-600">
                                                    <span>Value</span>
                                                    <span className="font-medium text-slate-800">{labelone}</span>
                                                </div>
                                                <input
                                                    min={1}
                                                    max={100}
                                                    value={labelone}
                                                    onChange={(e) => { setlabelone(e.target.value) }}
                                                    type="range"
                                                    className="h-2 w-full cursor-pointer appearance-none rounded-full"
                                                    style={getSliderTrackStyle(labelone)}
                                                />
                                            </div>

                                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                                <div className="relative flex items-center gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => setActiveIconPicker((prev) => (prev === "two" ? null : "two"))}
                                                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-white shadow-sm"
                                                    >
                                                        {renderIconPreview(attrIconTwo, "Attribute two icon")}
                                                    </button>
                                                    <input
                                                        value={name2}
                                                        maxLength={name2limite}
                                                        onChange={(e) => { setname2(e.target.value) }}
                                                        type="text"
                                                        placeholder="Attribute Two"
                                                        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-gray-700 outline-none transition-all duration-200 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300"
                                                    />

                                                    {activeIconPicker === "two" && (
                                                        <div className="absolute top-14 left-0 z-30 w-[255px] rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
                                                            <div className="grid grid-cols-8 gap-2">
                                                                {attributeIconOptions.map((icon) => (
                                                                    <button
                                                                        key={`two-${icon}`}
                                                                        type="button"
                                                                        onClick={() => { setAttrIconTwo(icon); setActiveIconPicker(null); }}
                                                                        className="flex h-8 w-8 items-center justify-center rounded-md p-1 hover:bg-slate-100"
                                                                    >
                                                                        {renderIconPreview(icon, "Attribute icon option")}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mt-3 mb-1 flex items-center justify-between text-sm text-slate-600">
                                                    <span>Value</span>
                                                    <span className="font-medium text-slate-800">{labeltwo}</span>
                                                </div>
                                                <input
                                                    min={1}
                                                    max={100}
                                                    value={labeltwo}
                                                    onChange={(e) => { setlabeltwo(e.target.value) }}
                                                    type="range"
                                                    className="h-2 w-full cursor-pointer appearance-none rounded-full"
                                                    style={getSliderTrackStyle(labeltwo)}
                                                />
                                            </div>

                                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                                <div className="relative flex items-center gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => setActiveIconPicker((prev) => (prev === "three" ? null : "three"))}
                                                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-300 bg-white shadow-sm"
                                                    >
                                                        {renderIconPreview(attrIconThree, "Attribute three icon")}
                                                    </button>
                                                    <input
                                                        value={name3}
                                                        maxLength={name3limite}
                                                        onChange={(e) => { setname3(e.target.value) }}
                                                        type="text"
                                                        placeholder="Attribute Three"
                                                        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-gray-700 outline-none transition-all duration-200 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300"
                                                    />

                                                    {activeIconPicker === "three" && (
                                                        <div className="absolute top-14 left-0 z-30 w-[255px] rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
                                                            <div className="grid grid-cols-8 gap-2">
                                                                {attributeIconOptions.map((icon) => (
                                                                    <button
                                                                        key={`three-${icon}`}
                                                                        type="button"
                                                                        onClick={() => { setAttrIconThree(icon); setActiveIconPicker(null); }}
                                                                        className="flex h-8 w-8 items-center justify-center rounded-md p-1 hover:bg-slate-100"
                                                                    >
                                                                        {renderIconPreview(icon, "Attribute icon option")}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mt-3 mb-1 flex items-center justify-between text-sm text-slate-600">
                                                    <span>Value</span>
                                                    <span className="font-medium text-slate-800">{labelthree}</span>
                                                </div>
                                                <input
                                                    min={1}
                                                    max={100}
                                                    value={labelthree}
                                                    onChange={(e) => { setlabelthree(e.target.value) }}
                                                    type="range"
                                                    className="h-2 w-full cursor-pointer appearance-none rounded-full"
                                                    style={getSliderTrackStyle(labelthree)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border border-gray-200 p-4 md:p-5 mb-4 rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
                                        <label className="block text-xl text-gray-700 mb-3 font-semibold">About Card Date</label>
                                        <div className="w-full flex items-center mb-1 rounded-lg p-1 transition-shadow duration-200 hover:shadow-sm">
                                            <div className="w-full flex flex-col">
                                                <label className="text-gray-500 mb-1 text-sm">Card Date/Tag: <span className="text-red-600 text-xl">*</span>
                                                    <div className="relative">
                                                        <CharactersCountComponent text={acarddate} limit={acarddatelimite} />
                                                    </div>
                                                </label>
                                                <input value={acarddate} maxLength={acarddatelimite} onChange={(e) => { setacarddate(e.target.value) }} type="text" className="border border-gray-300 px-3 py-2 rounded-lg text-gray-600 outline-none transition-all duration-200 focus:ring-2 focus:ring-gray-300 focus:border-gray-300" />
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                                {/* text control end here */}
                            </div>
                            
                        </div>

                        {savedSlots.length >= 0 && (
                            <button
                                onClick={handleNext}
                                disabled={spinloading || doneloading || (!baseFront && !(savedSlots.length >= packageConfig.designs && editingSlotId === null))}
                                className="w-full bg-[#00bcff] text-white text-lg font-semibold py-2.5 mt-1 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-60"
                            >
                                {doneloading || spinloading
                                    ? "Please wait..."
                                    : editingSlotId
                                        ? "Update Design"
                                        : savedSlots.length >= packageConfig.designs
                                            ? "Go to Checkout"
                                            : savedSlots.length >= packageConfig.designs - 1
                                                ? `Save & Checkout (${savedSlots.length + 1}/${packageConfig.designs})`
                                                : `Next (${savedSlots.length + 1}/${packageConfig.designs})`
                                }
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {/* Hidden trading box composite — always mounted so ref is populated at capture time */}
            <div className="absolute opacity-0 pointer-events-none" style={{ zIndex: -1 }}>
                <TradingBoxPreview
                    ref={tradingBoxPreviewRef}
                    packTitle={cardti}
                    createdFor={carddes}
                />
            </div>

            <ToastContainer position="bottom-center" />
        </div>
    );
}

