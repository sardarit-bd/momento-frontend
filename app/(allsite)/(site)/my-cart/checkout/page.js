"use client";

import DeckBoxPreview from "@/app/componnent/DeckBoxPreview";
import useCartStore from "@/store/useCartStore";
import useDeckFinalPreview from "@/store/useDeckFinalPreview";
import useboxcartstore from "@/store/useboxcartstore";
import getId from "@/utilis/helper/cookie/getid";
import getCookie from "@/utilis/helper/cookie/gettooken";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inputStyle =
  "w-full bg-[#F3F4F6] text-gray-900 placeholder-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all text-sm border border-transparent";

const deckPreviewLayers = ["dresses", "skin_tones", "hairs", "crowns", "beards", "eyes", "mouths", "noses"];
const DECK_RANK_MAP = {
  Ace_Card: "ace",
  king_Card: "king",
  Queen_Card: "queen",
  Jeck_Card: "jack",
  Joker_Card: "joker",
};
const DECK_RANK_ORDER = ["ace", "king", "queen", "jack", "joker"];

export default function CheckoutPage() {
  const id = getId();
  const token = getCookie();
  const router = useRouter();

  const [loading, setloading] = useState(false);

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setphone] = useState("");
  const [City, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipcode, setzipcode] = useState("");
  const [address, setaddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [company, setCompany] = useState("");

  const countries = [
    { code: "AF", name: "Afghanistan" },
    { code: "AX", name: "Åland Islands" },
    { code: "AL", name: "Albania" },
    { code: "DZ", name: "Algeria" },
    { code: "AD", name: "Andorra" },
    { code: "AO", name: "Angola" },
    { code: "AR", name: "Argentina" },
    { code: "AM", name: "Armenia" },
    { code: "AW", name: "Aruba" },
    { code: "AU", name: "Australia" },
    { code: "AT", name: "Austria" },
    { code: "AZ", name: "Azerbaijan" },
    { code: "PT", name: "Portugal" },
    { code: "BS", name: "Bahamas" },
    { code: "BH", name: "Bahrain" },
    { code: "BD", name: "Bangladesh" },
    { code: "BB", name: "Barbados" },
    { code: "BY", name: "Belarus" },
    { code: "BE", name: "Belgium" },
    { code: "BZ", name: "Belize" },
    { code: "BJ", name: "Benin" },
    { code: "BM", name: "Bermuda" },
    { code: "BT", name: "Bhutan" },
    { code: "BO", name: "Bolivia" },
    { code: "BA", name: "Bosnia and Herzegovina" },
    { code: "BW", name: "Botswana" },
    { code: "BR", name: "Brazil" },
    { code: "BN", name: "Brunei" },
    { code: "BG", name: "Bulgaria" },
    { code: "BF", name: "Burkina Faso" },
    { code: "BI", name: "Burundi" },
    { code: "KH", name: "Cambodia" },
    { code: "CM", name: "Cameroon" },
    { code: "CA", name: "Canada" },
    { code: "CV", name: "Cape Verde" },
    { code: "KY", name: "Cayman Islands" },
    { code: "CF", name: "Central African Republic" },
    { code: "TS", name: "Unknown (Invalid ISO Code)" },
    { code: "CL", name: "Chile" },
    { code: "CN", name: "China" },
    { code: "CO", name: "Colombia" },
    { code: "CU", name: "Cuba" },
    { code: "ZR", name: "Zaire (Historical, now DR Congo)" },
    { code: "CG", name: "Republic of the Congo" },
    { code: "FR", name: "France" },
    { code: "CR", name: "Costa Rica" },
    { code: "HR", name: "Croatia" },
    { code: "CY", name: "Cyprus" },
    { code: "CZ", name: "Czech Republic" },
    { code: "DK", name: "Denmark" },
    { code: "DJ", name: "Djibouti" },
    { code: "DO", name: "Dominican Republic" },
    { code: "EC", name: "Ecuador" },
    { code: "EG", name: "Egypt" },
    { code: "SV", name: "El Salvador" },
    { code: "GQ", name: "Equatorial Guinea" },
    { code: "ER", name: "Eritrea" },
    { code: "EE", name: "Estonia" },
    { code: "ET", name: "Ethiopia" },
    { code: "FO", name: "Faroe Islands" },
    { code: "FJ", name: "Fiji" },
    { code: "FI", name: "Finland" },
    { code: "FM", name: "Micronesia" },
    { code: "GF", name: "French Guiana" },
    { code: "PF", name: "French Polynesia" },
    { code: "GA", name: "Gabon" },
    { code: "GE", name: "Georgia" },
    { code: "DE", name: "Germany" },
    { code: "GH", name: "Ghana" },
    { code: "GL", name: "Greenland" },
    { code: "GI", name: "Gibraltar" },
    { code: "GR", name: "Greece" },
    { code: "GD", name: "Grenada" },
    { code: "GP", name: "Guadeloupe" },
    { code: "GT", name: "Guatemala" },
    { code: "GN", name: "Guinea" },
    { code: "GW", name: "Guinea-Bissau" },
    { code: "GY", name: "Guyana" },
    { code: "HT", name: "Haiti" },
    { code: "HN", name: "Honduras" },
    { code: "HK", name: "Hong Kong" },
    { code: "HU", name: "Hungary" },
    { code: "IS", name: "Iceland" },
    { code: "IN", name: "India" },
    { code: "ID", name: "Indonesia" },
    { code: "IR", name: "Iran" },
    { code: "IQ", name: "Iraq" },
    { code: "IE", name: "Ireland" },
    { code: "IL", name: "Israel" },
    { code: "IT", name: "Italy" },
    { code: "CI", name: "Ivory Coast" },
    { code: "JM", name: "Jamaica" },
    { code: "JP", name: "Japan" },
    { code: "JO", name: "Jordan" },
    { code: "KZ", name: "Kazakhstan" },
    { code: "KE", name: "Kenya" },
    { code: "KR", name: "South Korea" },
    { code: "KW", name: "Kuwait" },
    { code: "KG", name: "Kyrgyzstan" },
    { code: "LA", name: "Laos" },
    { code: "LB", name: "Lebanon" },
    { code: "LV", name: "Latvia" },
    { code: "LS", name: "Lesotho" },
    { code: "LR", name: "Liberia" },
    { code: "LI", name: "Liechtenstein" },
    { code: "LT", name: "Lithuania" },
    { code: "LY", name: "Libya" },
    { code: "LU", name: "Luxembourg" },
    { code: "MO", name: "Macau" },
    { code: "MK", name: "North Macedonia" },
    { code: "MG", name: "Madagascar" },
    { code: "MW", name: "Malawi" },
    { code: "MY", name: "Malaysia" },
    { code: "MV", name: "Maldives" },
    { code: "ML", name: "Mali" },
    { code: "MT", name: "Malta" },
    { code: "MQ", name: "Martinique" },
    { code: "MR", name: "Mauritania" },
    { code: "MU", name: "Mauritius" },
    { code: "MX", name: "Mexico" },
    { code: "MD", name: "Moldova" },
    { code: "MN", name: "Mongolia" },
    { code: "MC", name: "Monaco" },
    { code: "ME", name: "Montenegro" },
    { code: "MA", name: "Morocco" },
    { code: "MZ", name: "Mozambique" },
    { code: "NA", name: "Namibia" },
    { code: "NR", name: "Nauru" },
    { code: "NP", name: "Nepal" },
    { code: "NL", name: "Netherlands" },
    { code: "AN", name: "Netherlands Antilles (Historical)" },
    { code: "KN", name: "Saint Kitts and Nevis" },
    { code: "NC", name: "New Caledonia" },
    { code: "NZ", name: "New Zealand" },
    { code: "NI", name: "Nicaragua" },
    { code: "NE", name: "Niger" },
    { code: "NG", name: "Nigeria" },
    { code: "NU", name: "Niue" },
    { code: "MP", name: "Northern Mariana Islands" },
    { code: "NO", name: "Norway" },
    { code: "OM", name: "Oman" },
    { code: "PK", name: "Pakistan" },
    { code: "PA", name: "Panama" },
    { code: "PG", name: "Papua New Guinea" },
    { code: "PY", name: "Paraguay" },
    { code: "PE", name: "Peru" },
    { code: "PH", name: "Philippines" },
    { code: "PL", name: "Poland" },
    { code: "QA", name: "Qatar" },
    { code: "RO", name: "Romania" },
    { code: "RU", name: "Russia" },
    { code: "RW", name: "Rwanda" },
    { code: "LC", name: "Saint Lucia" },
    { code: "VC", name: "Saint Vincent and the Grenadines" },
    { code: "SM", name: "San Marino" },
    { code: "SA", name: "Saudi Arabia" },
    { code: "SN", name: "Senegal" },
    { code: "RS", name: "Serbia" },
    { code: "YU", name: "Yugoslavia (Historical)" },
    { code: "SC", name: "Seychelles" },
    { code: "SL", name: "Sierra Leone" },
    { code: "SG", name: "Singapore" },
    { code: "SK", name: "Slovakia" },
    { code: "SI", name: "Slovenia" },
    { code: "SB", name: "Solomon Islands" },
    { code: "SO", name: "Somalia" },
    { code: "ZA", name: "South Africa" },
    { code: "SS", name: "South Sudan" },
    { code: "ES", name: "Spain" },
    { code: "LK", name: "Sri Lanka" },
    { code: "SD", name: "Sudan" },
    { code: "SZ", name: "Eswatini" },
    { code: "SE", name: "Sweden" },
    { code: "CH", name: "Switzerland" },
    { code: "SY", name: "Syria" },
    { code: "TW", name: "Taiwan" },
    { code: "TJ", name: "Tajikistan" },
    { code: "TZ", name: "Tanzania" },
    { code: "TH", name: "Thailand" },
    { code: "TG", name: "Togo" },
    { code: "TT", name: "Trinidad and Tobago" },
    { code: "TN", name: "Tunisia" },
    { code: "TR", name: "Turkey" },
    { code: "TM", name: "Turkmenistan" },
    { code: "UG", name: "Uganda" },
    { code: "UA", name: "Ukraine" },
    { code: "AE", name: "United Arab Emirates" },
    { code: "GB", name: "United Kingdom" },
    { code: "US", name: "United States" },
    { code: "UY", name: "Uruguay" },
    { code: "UZ", name: "Uzbekistan" },
    { code: "VU", name: "Vanuatu" },
    { code: "VA", name: "Vatican City" },
    { code: "VE", name: "Venezuela" },
    { code: "VN", name: "Vietnam" },
    { code: "WS", name: "Samoa" },
    { code: "YE", name: "Yemen" }
  ];

  // Deck Customization State
  const [deckFinish, setDeckFinish] = useState("prism");
  const { deckcart } = useDeckFinalPreview();

  const { cart } = useCartStore();
  const [hydratedCart, setHydratedCart] = useState([]);
  const [hydrating, setHydrating] = useState(true);

  useEffect(() => {
    if (cart.length === 0) {
      setHydrating(false);
      return;
    }

    const restore = async () => {
      try {
        const { restoreCartImagesFromIDB, restoreDeckCartImagesFromIDB } = await import("@/store/useCartStore");

        // Step 1: restore trading card images (existing logic — unchanged)
        const tradingRestored = await restoreCartImagesFromIDB(cart);

        // Step 2: restore deck card images on top
        const fullyRestored = await restoreDeckCartImagesFromIDB(tradingRestored);

        setHydratedCart(fullyRestored);
      } catch (e) {
        console.error("IDB restore failed:", e);
        setHydratedCart(cart);
      } finally {
        setHydrating(false);
      }
    };

    restore();
  }, [cart.length]);

  useEffect(() => {
    const needsUpdate = cart.some(
      (item) =>
        item.productType === "trading" &&
        item.productQuantity > 1 &&
        (item.productQuantity === item.packageConfig?.totalCards || item.productQuantity > 10)
    );

    if (needsUpdate) {
      useCartStore.setState({
        cart: cart.map((item) => {
          if (
            item.productType === "trading" &&
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

  const { boxs, setboxs } = useboxcartstore();

  const getSavedCustomization = (item) => {
    if (!item?.customizationStorageKey) return null;
    try {
      const saved = localStorage.getItem(item.customizationStorageKey);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  };

  const getItemPreviewImages = (item) => {
    const snapshot = getSavedCustomization(item);
    if (snapshot?.previews) {
      const localPreviews = [snapshot?.previews?.front, snapshot?.previews?.back].filter(Boolean);
      if (localPreviews.length > 0) return localPreviews;
    }

    if (Array.isArray(item?.FinalProductImages) && item.FinalProductImages.length > 0) {
      return item.FinalProductImages.filter(Boolean);
    }

    if (Array.isArray(item?.FinalProduct) && item.FinalProduct.length > 0) {
      return item.FinalProduct
        .map((card) => {
          if (typeof card === "string") return card;
          if (card && typeof card === "object") return card.image || card.baseImage || null;
          return null;
        })
        .filter(Boolean);
    }

    return item?.productImage ? [item.productImage] : [];
  };

  const isDeckCustomizedCard = (card) => {
    return Boolean(
      card &&
      typeof card === "object" &&
      card.rank &&
      card.image
    );
  };

  const isDeckLayeredCard = (card) => {
    return Boolean(
      card &&
      typeof card === "object" &&
      card.baseImage &&
      card.selectedLayers &&
      typeof card.selectedLayers === "object"
    );
  };

  const getItemPreviewCards = (item) => {
    // ── Deck card restored from IDB: has rank + image (composited base64) ──
    if (
      item?.customization_mode === "deck" &&
      Array.isArray(item?.FinalProduct) &&
      item.FinalProduct.some(isDeckCustomizedCard)
    ) {
      return item.FinalProduct
        .filter(isDeckCustomizedCard)
        .map((card) => ({ type: "image", src: card.image }));
    }

    // ── Deck card in-memory (not refreshed): has baseImage + selectedLayers ──
    if (Array.isArray(item?.FinalProduct) && item.FinalProduct.some(isDeckLayeredCard)) {
      return item.FinalProduct
        .filter(isDeckLayeredCard)
        .map((card) => ({ type: "deck", card }));
    }

    // ── Trading card: has {side, image, card_pair_key} structure ──
    if (item?.customization_mode === "trading" && Array.isArray(item?.FinalProduct)) {
      const fronts = item.FinalProduct
        .filter(c => c?.side === "front" && c?.image)
        .map(c => ({ type: "image", src: c.image }));

      const back = item.FinalProduct
        .find(c => c?.side === "back" && c?.image);

      const cards = [...fronts];
      if (back) cards.push({ type: "image", src: back.image });

      if (cards.length > 0) return cards;
    }

    // ── Fallback ──
    return getItemPreviewImages(item).map((src) => ({ type: "image", src }));
  };

  // Calculations
  const calculateSubTotal = () => {
    return cart.reduce((total, item) => total + Number(item.productUnitPrice) * Number(item.productQuantity), 0);
  };

  const subtotal = calculateSubTotal();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleEditCustomization = () => {
    const editableItem = cart.find(
      (item) =>
        item?.productSlug &&
        (item?.productType === "trading" || item?.productType === "customizable")
    );

    if (!editableItem?.productSlug) {
      toast.warn("No customizable item found to edit.");
      return;
    }

    if (editableItem?.productType === "trading") {
      router.push(`/application/tradingcard/${editableItem.productSlug}`);
      return;
    }

    router.push(`/application/deckcard/${editableItem.productSlug}`);
  };

  const isDataUrlImage = (value) =>
    typeof value === "string" && /^data:image\/[a-zA-Z0-9.+-]+;base64,/.test(value);

  const blobToDataUrl = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  const ensureImageDataUrl = async (value) => {
    if (!value || typeof value !== "string") return null;
    if (isDataUrlImage(value)) return value;

    try {
      const response = await fetch(value);
      if (!response.ok) return null;
      const blob = await response.blob();
      const dataUrl = await blobToDataUrl(blob);
      return typeof dataUrl === "string" ? dataUrl : null;
    } catch {
      return null;
    }
  };

  const normalizeTradingFinalProduct = async (item) => {
    const sourceCards = Array.isArray(item?.FinalProduct) ? item.FinalProduct : [];
    const normalized = [];

    for (const card of sourceCards) {
      if (!card?.side || !card?.image) continue;
      normalized.push({
        side: card.side,
        image: card.image,
        card_pair_key: card.card_pair_key ?? null,
        name: card.name ?? null,
      });
    }

    return normalized;
  };

  const normalizeDeckFinalProduct = async (item) => {
    const sourceCards = Array.isArray(item?.FinalProduct) ? item.FinalProduct : [];
    const normalized = [];

    for (let index = 0; index < sourceCards.length; index += 1) {
      const card = sourceCards[index];

      // Cards restored from IDB already have rank + image — use directly
      if (card?.rank && card?.image && isDataUrlImage(card.image)) {
        normalized.push({
          rank: card.rank,
          image: card.image,
          name: card?.name ?? null,
          character_image: card?.character_image ?? null,
        });
        continue;
      }

      // Fallback: derive rank and fetch/convert image
      const rawType = card?.editedCard || card?.card_type || card?.type || card?.rank || null;
      const rank =
        DECK_RANK_MAP[rawType] ||
        (typeof rawType === "string" ? rawType.toLowerCase() : null);
      const imageSource =
        typeof card === "string"
          ? card
          : card?.image || card?.baseImage || card?.src || null;
      const image = await ensureImageDataUrl(imageSource);

      if (!image || !rank) continue;
      normalized.push({
        rank,
        image,
        name: card?.name ?? null,
        character_image: card?.character_image ?? null,
      });
    }

    return normalized.sort(
      (a, b) => DECK_RANK_ORDER.indexOf(a.rank) - DECK_RANK_ORDER.indexOf(b.rank)
    );
  };

  const deriveCustomizationMode = (item) => {
    const type = String(item?.productType || "").toLowerCase();
    if (type === "trading") return "trading";
    if (type === "customizable") return "deck";
    if (Array.isArray(item?.FinalProduct) && item.FinalProduct.some((card) => card?.editedCard)) {
      return "deck";
    }
    // Also detect deck from IDB-restored structure
    if (Array.isArray(item?.FinalProduct) && item.FinalProduct.some((card) => card?.rank && card?.image)) {
      return "deck";
    }
    return "trading";
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !phone ||
      !City ||
      !state ||
      !country ||
      !address ||
      !zipcode
    ) {
      toast.warn("All shipping fields are required");
      return;
    }

    if (hydratedCart.length === 0) {
      toast.warn("Your cart is empty");
      return;
    }

    const invalidItems = hydratedCart.filter(item =>
      !item.productId || !item.productQuantity || !item.productUnitPrice
    );

    if (invalidItems.length > 0) {
      toast.error("Some items in your cart are invalid. Please refresh and try again.");
      return;
    }

    setloading(true);

    try {
      const cartItems = await Promise.all(
        hydratedCart.map(async (item) => {
          let pdfData = null;
          if (item.FinalPDf && item.FinalPDf instanceof Blob) {
            pdfData = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                const base64 = reader.result.split(',')[1];
                resolve(base64);
              };
              reader.onerror = reject;
              reader.readAsDataURL(item.FinalPDf);
            });
          }

          const customization_mode = deriveCustomizationMode(item);
          const FinalProduct =
            customization_mode === "deck"
              ? await normalizeDeckFinalProduct(item)
              : await normalizeTradingFinalProduct(item);

          return {
            product_id: parseInt(item.productId),
            qty: parseInt(item.productQuantity),
            price: parseFloat(item.productUnitPrice),
            name: item.productName || 'Product',
            customization_mode,
            FinalProduct,
            FinalPDF: pdfData ? { data: pdfData } : null,
          };
        })
      );

      const checkoutEmail = `${id || "guest"}@example.com`;

      const tradingItem = hydratedCart.find(item => item.productType === "trading");

      const persistedPackageTitle = typeof window !== "undefined"
        ? localStorage.getItem("persistent_packageTitle") ?? tradingItem?.packTitle ?? null
        : tradingItem?.packTitle ?? null;
      
      const deckItem = hydratedCart.find(item => item.customization_mode === 'deck');
      const characterImages = deckItem?.CharacterImages ?? deckcart?.[0]?.CharacterImages ?? [];

      const checkoutData = {
        first_name: firstName,
        last_name: lastName,
        email: checkoutEmail,
        phone,
        address1: address,
        address2,
        city: City,
        state,
        country,
        zipcode,
        gateway: "stripe",
        items: cartItems,
        userID: id,
        tuckbox_image: null,
        tuckbox_characters: characterImages,  
        // tuckbox_image: deckcart?.[0]?.BoxImage || null,
        trading_box_pack_title: persistedPackageTitle,
        trading_box_created_for: localStorage.getItem("persistent_carddes") ?? tradingItem?.createdFor ?? null,
      };

      const checkoutEndpoint =
        process.env.NEXT_PUBLIC_CHECKOUT_SESSION_ENDPOINT || "/api/create-checkout-session";

      const response = await fetch(
        checkoutEndpoint.startsWith("http")
          ? checkoutEndpoint
          : `${process.env.NEXT_PUBLIC_API_BASE_URL}${checkoutEndpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(checkoutData),
        }
      );

      const result = await response.json();

      if (result?.success && result?.checkout_url) {
        if (typeof window !== "undefined") {
          window.location.href = result.checkout_url;
        }
      } else {
        const errorMessage = result?.message || result?.error || "Failed to create checkout session";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Checkout error full:", error);
      toast.error("Failed to initiate checkout. Please try again.");
    } finally {
      setloading(false);
    }
  };

  const FieldLabel = ({ label, required = false }) => (
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );

  return (
    <section className="min-h-screen bg-[#fafafa] py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-900">
      <ToastContainer />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

        {/* LEFT COLUMN - Order Summary & Details */}
        <div className="lg:col-span-7 space-y-6">

          {/* Card 1: Your Deck */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {cart.some(item => item?.productType === "trading") ? "Your Trading Card" : "Your Deck Card"}
              </h2>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              Premium Packaging
            </div>

            {/* Display Cart Items visually */}
            <div className="mb-6 space-y-4">
              {hydrating ? (
                <div className="text-gray-500 text-sm py-4">Loading...</div>
              ) : hydratedCart.length === 0 ? (
                <div className="text-gray-500 text-sm py-4">Your cart is empty</div>
              ) : (
                hydratedCart.map((item, idx) => {
                  const previewCards = getItemPreviewCards(item);
                  const hasManyCards = previewCards.length > 2;
                  const customizedCount = item?.customization_mode === "trading" && Array.isArray(item?.FinalProduct)
                    ? item.FinalProduct.filter(c => c?.side === "front" && c?.image).length
                    : previewCards.length;
                  return (
                    <div key={idx} className="flex flex-col sm:flex-row gap-4 sm:items-center">
                      <div className={`${hasManyCards ? "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5" : "flex"} gap-2`}>
                        {previewCards.map((previewCard, imageIndex) => (
                          <div
                            key={imageIndex}
                            className={`${hasManyCards ? "w-[68px] h-[96px] sm:w-[76px] sm:h-[108px] md:w-[82px] md:h-[116px]" : "w-[88px] h-[123px] sm:w-24 sm:h-32 md:w-28 md:h-40"} bg-gray-100 rounded-lg border border-gray-200 overflow-hidden relative`}
                          >
                            {previewCard.type === "deck" ? (
                              // In-memory layered preview (not refreshed)
                              <div className="relative w-full h-full bg-white">
                                <img
                                  src={previewCard.card.baseImage}
                                  alt={`${item?.productName || "Product"} customized card ${imageIndex + 1}`}
                                  className="w-full h-full object-cover bg-white"
                                />
                                {deckPreviewLayers.map((layer) => (
                                  previewCard.card?.selectedLayers?.[layer] ? (
                                    <div key={`${imageIndex}-${layer}`}>
                                      <img
                                        src={previewCard.card.selectedLayers[layer]}
                                        alt={`${layer} top`}
                                        className="absolute left-1/2 -translate-x-1/2 top-[8%] w-[64%] h-[43%] object-contain"
                                      />
                                      <img
                                        src={previewCard.card.selectedLayers[layer]}
                                        alt={`${layer} bottom`}
                                        className="absolute left-1/2 -translate-x-1/2 bottom-[8%] w-[64%] h-[43%] object-contain scale-y-[-1]"
                                      />
                                    </div>
                                  ) : null
                                ))}
                              </div>
                            ) : (
                              // Composited image from IDB restore or trading card
                              <img
                                src={previewCard.src}
                                alt={`${item?.productName || "Product"} preview ${imageIndex + 1}`}
                                className="w-full h-full object-cover bg-white"
                              />
                            )}
                          </div>
                        ))}
                        {previewCards.length === 0 && (
                          <div className="w-[88px] h-[123px] sm:w-24 sm:h-32 md:w-28 md:h-40 bg-gray-100 rounded-lg border border-gray-200 overflow-hidden relative flex items-center justify-center text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.productName}</p>
                        <p className="text-xs text-gray-500">Qty: {item.productQuantity}</p>
                        {customizedCount > 1 && (
                          <p className="text-xs text-gray-500 mt-0.5">{customizedCount} customized cards</p>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {(() => {
              const characterImages =
                deckcart?.[0]?.CharacterImages?.length > 0
                  ? deckcart[0].CharacterImages
                  : hydratedCart.find(item => item.customization_mode === 'deck')?.CharacterImages ?? [];

              // ✅ Guard: only render if cart actually has a deck/customizable product
              const hasDeckItem = cart.some(
                item => item.productType === "customizable" || item.customization_mode === "deck"
              );

              return hasDeckItem && characterImages.length > 0 ? (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Box Preview</h3>
                  <div className="flex flex-wrap gap-3">
                    <DeckBoxPreview characterImages={characterImages} />
                  </div>
                </div>
              ) : null;
            })()}

            {/* Trading Card Box Preview — completely isolated from deck card logic */}
            {cart.some((item) => item.productType === "trading") &&
              boxs?.some((b) => b?.bfor === "trading") && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Trading Card Box Preview
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <div className="w-[160px] sm:w-[190px] md:w-[220px] rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
                      <img
                        className="h-auto w-full object-contain"
                        src={boxs.find((b) => b?.bfor === "trading")?.BoxImage}
                        alt="trading-card-box-preview"
                      />
                    </div>
                  </div>
                </div>
              )}

            <div className="border-t border-gray-100 pt-4 space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Items ({cart.length})</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-gray-900 pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN - Payment Details Form */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 p-5 sm:p-6 md:p-8 lg:sticky lg:top-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <svg className="text-sky-600" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
              Shipping Information
            </h2>

            <form onSubmit={handleCheckout} className="space-y-6">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 mt-4">
                  Shipping Information
                </label>

                <div className="space-y-4">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <FieldLabel label="First Name" required />
                      <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className={inputStyle} required />
                    </div>
                    <div>
                      <FieldLabel label="Last Name" required />
                      <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className={inputStyle} required />
                    </div>
                  </div>

                  <div>
                    <FieldLabel label="Company" />
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company (optional)" className={inputStyle} />
                  </div>

                  <div>
                    <FieldLabel label="Phone Number" required />
                    <input type="tel" value={phone} onChange={(e) => setphone(e.target.value)} placeholder="Phone Number" className={inputStyle} required />
                  </div>

                  <div>
                    <FieldLabel label="Address 1" required />
                    <input type="text" value={address} onChange={(e) => setaddress(e.target.value)} placeholder="Address 1" className={inputStyle} required />
                  </div>

                  <div>
                    <FieldLabel label="Address 2" />
                    <input type="text" value={address2} onChange={(e) => setAddress2(e.target.value)} placeholder="Apartment, suite, unit, etc. (optional)" className={inputStyle} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <FieldLabel label="City" required />
                      <input type="text" value={City} onChange={(e) => setCity(e.target.value)} placeholder="City" className={inputStyle} required />
                    </div>
                    <div>
                      <FieldLabel label="State / Province" required />
                      <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State / Province" className={inputStyle} required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <FieldLabel label="Zip / Postal Code" required />
                      <input type="text" value={zipcode} onChange={(e) => setzipcode(e.target.value)} placeholder="Zip / Postal Code" className={inputStyle} required />
                    </div>
                    <div>
                      <FieldLabel label="Country" required />
                      <select value={country} onChange={(e) => setCountry(e.target.value)} className={inputStyle} required>
                        <option value="">Select Country</option>
                        {countries.map((item) => (
                          <option key={item.code} value={item.code}>{item.name} ({item.code})</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || cart.length === 0}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-sky-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed mt-6 cursor-pointer"
              >
                Continue
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}