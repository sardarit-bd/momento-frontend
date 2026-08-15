"use client";

import DeckBoxPreview from "@/app/componnent/DeckBoxPreview";
import PhotoPortraitBoxPreview from "@/app/componnent/PhotoPortraitBoxPreview";
import useCartStore from "@/store/useCartStore";
import usePhotoFinalPreview from "@/store/usePhotoFinalPreview";
import useDeckFinalPreview from "@/store/useDeckFinalPreview";
import useboxcartstore from "@/store/useboxcartstore";
import getId from "@/utilis/helper/cookie/getid";
import getCookie from "@/utilis/helper/cookie/gettooken";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ── Type system — shared with the cart page ─────────────────────────────
// Fraunces: headings / display copy. Inter: body copy, labels, buttons.
// IBM Plex Mono: every number (prices, quantities).
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const inputStyle =
  "w-full bg-[#F3F4F6] text-[#1B2420] placeholder-[#1B2420]/40 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3CA9FF] transition-all text-sm border border-[#1B2420]/10";

const deckPreviewLayers = [
  "dresses",
  "skin_tones",
  "hairs",
  "crowns",
  "beards",
  "eyes",
  "mouths",
  "noses",
];
const DECK_RANK_MAP = {
  Ace_Card: "ace",
  king_Card: "king",
  Queen_Card: "queen",
  Jeck_Card: "jack",
  Joker_Card: "joker",
};
const DECK_RANK_ORDER = ["king", "queen", "jack", "ace", "joker"];

const hasJokerCard = (item) => {
  const productType = String(item?.productType || "").toLowerCase();
  if (productType === "trading") return false;

  const sourceCards = Array.isArray(item?.FinalProduct)
    ? item.FinalProduct
    : [];

  return sourceCards.some((card) => {
    const rawValue =
      card?.rank ?? card?.editedCard ?? card?.card_type ?? card?.type ?? null;

    if (typeof rawValue === "string") {
      const normalized = rawValue.trim().toLowerCase();
      return (
        normalized === "joker" ||
        normalized === "joker_card" ||
        normalized.includes("joker")
      );
    }

    return false;
  });
};

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
    { code: "YE", name: "Yemen" },
  ];

  // Deck Customization State
  const [deckFinish, setDeckFinish] = useState("prism");
  const { deckcart } = useDeckFinalPreview();

  const { cart } = useCartStore();
  // Photo portrait box data lives in its own preview store (it persists the
  // full base64 + user positions without the size-stripping the real cart
  // store applies). Read it directly here so the checkout payload carries the
  // exact box the user composed, including drag/zoom positions.
  const { photocart } = usePhotoFinalPreview();
  const [hydratedCart, setHydratedCart] = useState([]);
  const [hydrating, setHydrating] = useState(true);

  useEffect(() => {
    if (cart.length === 0) {
      setHydrating(false);
      return;
    }

    const restore = async () => {
      try {
        const {
          restoreCartImagesFromIDB,
          restoreDeckCartImagesFromIDB,
          restorePhotoCartImagesFromIDB,
        } = await import("@/store/useCartStore");

        // Step 1: restore trading card images (existing logic — unchanged)
        const tradingRestored = await restoreCartImagesFromIDB(cart);

        // Step 2: restore deck card images on top
        const deckRestored =
          await restoreDeckCartImagesFromIDB(tradingRestored);

        // Step 3: restore photo portrait images on top
        const fullyRestored = await restorePhotoCartImagesFromIDB(deckRestored);

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
        (item.productQuantity === item.packageConfig?.totalCards ||
          item.productQuantity > 10),
    );

    if (needsUpdate) {
      useCartStore.setState({
        cart: cart.map((item) => {
          if (
            item.productType === "trading" &&
            item.productQuantity > 1 &&
            (item.productQuantity === item.packageConfig?.totalCards ||
              item.productQuantity > 10)
          ) {
            return { ...item, productQuantity: 1 };
          }
          return item;
        }),
      });
    }
  }, [cart]);

  const { boxs, setboxs } = useboxcartstore();

  // ── Backend-verified pricing ──────────────────────────────────────────
  // The cart's own `productUnitPrice` is client-side state and must never
  // be trusted for the actual total shown or charged. As soon as the cart
  // is hydrated, we ask the backend to price every line from product_id
  // (+ package_slug for trading cards) so what's displayed here always
  // matches what checkout will actually charge.
  const [pricing, setPricing] = useState(null); // { items, subtotal, tax, total }
  const [pricingLoading, setPricingLoading] = useState(false);
  const [pricingError, setPricingError] = useState(false);

  useEffect(() => {
    if (hydrating) return;

    if (hydratedCart.length === 0) {
      setPricing(null);
      setPricingError(false);
      return;
    }

    const fetchPricing = async () => {
      setPricingLoading(true);
      setPricingError(false);
      try {
        const items = hydratedCart.map((item) => ({
          product_id: parseInt(item.productId),
          qty: parseInt(item.productQuantity) || 1,
          // Trading-card items store the chosen package slug under
          // `selectedPackage` (set from ?package= in useTradingCardState.js).
          package_slug: item.selectedPackage ?? null,
          has_joker: hasJokerCard(item),
        }));

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart/price`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify({ items }),
          },
        );

        if (!res.ok) throw new Error("Failed to price cart");
        const data = await res.json();
        setPricing(data);
      } catch (err) {
        console.error("Cart pricing error:", err);
        setPricingError(true);
        setPricing(null);
      } finally {
        setPricingLoading(false);
      }
    };

    fetchPricing();
    // Re-price whenever the cart contents actually change, not on every render
  }, [hydrating, hydratedCart, token]);

  const findPricedLine = (item) => {
    if (!pricing?.items) return null;
    const itemHasJoker = hasJokerCard(item);
    return pricing.items.find(
      (line) =>
        String(line.product_id) === String(item.productId) &&
        (line.package_slug ?? null) === (item.selectedPackage ?? null) &&
        Boolean(line.has_joker) === itemHasJoker,
    );
  };

  const subtotal = pricing?.subtotal ?? 0;
  const tax = pricing?.tax ?? 0;
  const total = pricing?.total ?? 0;

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
      const localPreviews = [
        snapshot?.previews?.front,
        snapshot?.previews?.back,
      ].filter(Boolean);
      if (localPreviews.length > 0) return localPreviews;
    }

    if (
      Array.isArray(item?.FinalProductImages) &&
      item.FinalProductImages.length > 0
    ) {
      return item.FinalProductImages.filter(Boolean);
    }

    if (Array.isArray(item?.FinalProduct) && item.FinalProduct.length > 0) {
      return item.FinalProduct.map((card) => {
        if (typeof card === "string") return card;
        if (card && typeof card === "object")
          return card.image || card.baseImage || null;
        return null;
      }).filter(Boolean);
    }

    return item?.productImage ? [item.productImage] : [];
  };

  const isDeckCustomizedCard = (card) => {
    return Boolean(card && typeof card === "object" && card.rank && card.image);
  };

  const isDeckLayeredCard = (card) => {
    return Boolean(
      card &&
      typeof card === "object" &&
      card.baseImage &&
      card.selectedLayers &&
      typeof card.selectedLayers === "object",
    );
  };

  const isJokerRankValue = (value) => {
    if (typeof value !== "string") return false;
    const normalized = value.trim().toLowerCase();
    return (
      normalized === "joker" ||
      normalized === "joker_card" ||
      normalized.includes("joker")
    );
  };

  const getItemPreviewCards = (item) => {
    // ── Deck card restored from IDB: has rank + image (composited base64) ──
    if (
      item?.customization_mode === "deck" &&
      Array.isArray(item?.FinalProduct) &&
      item.FinalProduct.some(isDeckCustomizedCard)
    ) {
      return item.FinalProduct.filter(isDeckCustomizedCard).map((card) => ({
        type: "image",
        src: card.image,
        isJoker: isJokerRankValue(card.rank),
      }));
    }

    // ── Photo Portrait card restored from IDB: same rank + image shape as deck ──
    if (
      item?.customization_mode === "photo" &&
      Array.isArray(item?.FinalProduct) &&
      item.FinalProduct.some(isDeckCustomizedCard)
    ) {
      return item.FinalProduct.filter(isDeckCustomizedCard).map((card) => ({
        type: "image",
        src: card.image,
        isJoker: isJokerRankValue(card.rank),
      }));
    }

    // ── Deck card in-memory (not refreshed): has baseImage + selectedLayers ──
    if (
      Array.isArray(item?.FinalProduct) &&
      item.FinalProduct.some(isDeckLayeredCard)
    ) {
      return item.FinalProduct.filter(isDeckLayeredCard).map((card) => ({
        type: "deck",
        card,
        isJoker: isJokerRankValue(
          card?.editedCard || card?.card_type || card?.type,
        ),
      }));
    }

    // ── Trading card: has {side, image, card_pair_key} structure ──
    if (
      item?.customization_mode === "trading" &&
      Array.isArray(item?.FinalProduct)
    ) {
      const fronts = item.FinalProduct.filter(
        (c) => c?.side === "front" && c?.image,
      ).map((c) => ({ type: "image", src: c.image, isJoker: false }));

      const back = item.FinalProduct.find(
        (c) => c?.side === "back" && c?.image,
      );

      const cards = [...fronts];
      if (back) cards.push({ type: "image", src: back.image, isJoker: false });

      if (cards.length > 0) return cards;
    }

    // ── Fallback ──
    return getItemPreviewImages(item).map((src) => ({
      type: "image",
      src,
      isJoker: false,
    }));
  };

  const handleEditCustomization = () => {
    const editableItem = cart.find(
      (item) =>
        item?.productSlug &&
        (item?.productType === "trading" ||
          item?.productType === "customizable" ||
          item?.productType === "photo"),
    );

    if (!editableItem?.productSlug) {
      toast.warn("No customizable item found to edit.");
      return;
    }

    if (editableItem?.productType === "trading") {
      router.push(`/application/tradingcard/${editableItem.productSlug}`);
      return;
    }

    if (editableItem?.productType === "photo") {
      router.push(`/application/photoportrait/${editableItem.productSlug}`);
      return;
    }

    router.push(`/application/deckcard/${editableItem.productSlug}`);
  };

  const isDataUrlImage = (value) =>
    typeof value === "string" &&
    /^data:image\/[a-zA-Z0-9.+-]+;base64,/.test(value);

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
    const sourceCards = Array.isArray(item?.FinalProduct)
      ? item.FinalProduct
      : [];
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
    const sourceCards = Array.isArray(item?.FinalProduct)
      ? item.FinalProduct
      : [];
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
      const rawType =
        card?.editedCard || card?.card_type || card?.type || card?.rank || null;
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
      (a, b) =>
        DECK_RANK_ORDER.indexOf(a.rank) - DECK_RANK_ORDER.indexOf(b.rank),
    );
  };

  const deriveCustomizationMode = (item) => {
    // customization_mode is set explicitly at cart-item creation time and
    // survives sanitizeForStorage/IDB restoration — trust it first.
    if (item?.customization_mode === "deck") return "deck";
    if (item?.customization_mode === "photo") return "photo";
    if (item?.customization_mode === "trading") return "trading";

    // Fallback heuristics only for legacy/unlabeled items.
    const type = String(item?.productType || "").toLowerCase();
    if (type === "trading") return "trading";
    if (type === "customizable") return "deck";
    if (type === "photo") return "photo";
    if (
      Array.isArray(item?.FinalProduct) &&
      item.FinalProduct.some((card) => card?.editedCard)
    )
      return "deck";
    if (
      Array.isArray(item?.FinalProduct) &&
      item.FinalProduct.some((card) => card?.rank && card?.image)
    )
      return "deck";
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

    const invalidItems = hydratedCart.filter(
      (item) => !item.productId || !item.productQuantity,
    );

    if (invalidItems.length > 0) {
      toast.error(
        "Some items in your cart are invalid. Please refresh and try again.",
      );
      return;
    }

    // Never submit while prices haven't been verified against the backend,
    // and never submit if verification failed — otherwise we'd be sending
    // an order with no reliable idea of what it should cost.
    if (pricingLoading) {
      toast.warn("Please wait, we're verifying your cart prices.");
      return;
    }
    if (pricingError || !pricing) {
      toast.error(
        "We couldn't verify current prices. Please refresh and try again.",
      );
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
                const base64 = reader.result.split(",")[1];
                resolve(base64);
              };
              reader.onerror = reject;
              reader.readAsDataURL(item.FinalPDf);
            });
          }

          const customization_mode = deriveCustomizationMode(item);
          const FinalProduct =
            customization_mode === "deck" || customization_mode === "photo"
              ? await normalizeDeckFinalProduct(item)
              : await normalizeTradingFinalProduct(item);

          return {
            product_id: parseInt(item.productId),
            qty: parseInt(item.productQuantity),
            // Price is deliberately NOT sent here. The checkout-session
            // endpoint must re-resolve the authoritative price itself
            // from product_id (+ package_slug) using CartPriceResolver —
            // never trust a client-supplied amount for the actual charge.
            package_slug: item.selectedPackage ?? null,
            has_joker: hasJokerCard(item),
            name: item.productName || "Product",
            customization_mode,
            FinalProduct,
            FinalPDF: pdfData ? { data: pdfData } : null,
            boxImages: item.boxImages ?? [],
            photo_box_images: item.boxImages ?? [],
          };
        }),
      );

      const checkoutEmail = `${id || "guest"}@example.com`;

      const tradingItem = hydratedCart.find(
        (item) => item.productType === "trading",
      );

      const persistedPackageTitle =
        typeof window !== "undefined"
          ? (localStorage.getItem("persistent_packageTitle") ??
            tradingItem?.packTitle ??
            null)
          : (tradingItem?.packTitle ?? null);

      const deckItem = hydratedCart.find(
        (item) =>
          item.customization_mode === "deck" ||
          item.customization_mode === "photo",
      );
      const characterImages =
        deckItem?.CharacterImages ?? deckcart?.[0]?.CharacterImages ?? [];

      // ── Photo portrait box ──────────────────────────────────────────────
      // The photo preview store holds the user-composed box: `BoxImage` is the
      // already-composited PNG (positions baked in) and `boxImages` are the
      // source photos with their drag/zoom positions. We send both so the
      // backend can either display the composite directly or regenerate the
      // box from source images + positions.
      const photoPreviewItem = photocart?.[0];
      const photoBoxImage = photoPreviewItem?.BoxImage ?? null;
      const photoBoxImages = Array.isArray(photoPreviewItem?.boxImages)
        ? photoPreviewItem.boxImages.map((img) => ({
            id: img?.id ?? null,
            src: img?.src ?? null,
            frame: img?.frame ?? null,
            image: img?.image ?? null,
          }))
        : [];

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
        // Composited box PNG (positions baked in) — used directly by the
        // backend for display and as the TGC tuckbox outside face.
        tuckbox_image: photoBoxImage,
        tuckbox_characters: characterImages,
        // Source box photos + their drag/zoom positions, so the backend can
        // regenerate the photo portrait box on its template if desired.
        photo_box_images: photoBoxImages,
        trading_box_pack_title: persistedPackageTitle,
        trading_box_created_for:
          localStorage.getItem("persistent_carddes") ??
          tradingItem?.createdFor ??
          null,
      };

      const checkoutEndpoint =
        process.env.NEXT_PUBLIC_CHECKOUT_SESSION_ENDPOINT ||
        "/api/create-checkout-session";

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
        },
      );

      const result = await response.json();

      if (result?.success && result?.checkout_url) {
        if (typeof window !== "undefined") {
          window.location.href = result.checkout_url;
        }
      } else {
        const errorMessage =
          result?.message ||
          result?.error ||
          "Failed to create checkout session";
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
    <label className="block text-sm font-medium text-[#1B2420]/70 mb-1">
      {label}
      {required && <span className="text-[#B65C4D] ml-1">*</span>}
    </label>
  );

  // Deck box preview data — shared by both the mobile-inline copy (rendered
  // inside the deck item's row) and the desktop-only full-width copy below.
  const deckBoxCharacterImages =
    deckcart?.[0]?.CharacterImages?.length > 0
      ? deckcart[0].CharacterImages
      : (hydratedCart.find(
          (item) =>
            item.customization_mode === "deck" ||
            item.customization_mode === "photo",
        )?.CharacterImages ?? []);

  const hasDeckItemForBoxPreview = cart.some(
    (item) =>
      item.productType === "customizable" ||
      item.productType === "photo" ||
      item.customization_mode === "deck" ||
      item.customization_mode === "photo",
  );

  const showDeckBoxPreview =
    hasDeckItemForBoxPreview && deckBoxCharacterImages.length > 0;

  return (
    <section
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} min-h-screen bg-[#F3F4F6] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 text-[#1B2420]`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      <ToastContainer />

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* LEFT COLUMN - Order Summary & Details */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Your Deck */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-[#1B2420]/[0.06]">
            <div className="flex justify-between items-center mb-5">
              <h2
                className="text-xl sm:text-2xl font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {cart.some((item) => item?.productType === "trading")
                  ? "Your Trading Card"
                  : cart.some((item) => item?.productType === "photo")
                    ? "Your Photo Portrait"
                    : "Your Deck Card"}
              </h2>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-[#C9A227]/10 text-[#1B2420] border border-[#C9A227]/25 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C9A227"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
              Premium Packaging
            </div>

            {/* Display Cart Items visually */}
            <div className="mb-3 lg:mb-6 space-y-5">
              {hydrating ? (
                <div className="text-[#1B2420]/45 text-sm py-4 animate-pulse">
                  Loading…
                </div>
              ) : hydratedCart.length === 0 ? (
                <div className="text-[#1B2420]/45 text-sm py-4">
                  Your cart is empty
                </div>
              ) : (
                hydratedCart.map((item, idx) => {
                  const allPreviewCards = getItemPreviewCards(item);
                  const jokerCard =
                    allPreviewCards.find((c) => c.isJoker) ?? null;
                  const previewCards = allPreviewCards.filter(
                    (c) => !c.isJoker,
                  );
                  const customizedCount = allPreviewCards.length;
                  const pricedLine = findPricedLine(item);
                  const jokerPrice = Number(pricedLine?.joker_addon ?? 0);
                  const packagePrice = Number(pricedLine?.base_unit_price ?? 0);
                  // Price breakdown is deck-only — trading cards just
                  // show their card art, no per-line price panel.
                  const isDeckItem =
                    deriveCustomizationMode(item) === "deck" ||
                    deriveCustomizationMode(item) === "photo";

                  return (
                    <div
                      key={idx}
                      className="pb-6 border-b border-dashed border-[#1B2420]/12 last:border-0 last:pb-0"
                    >
                      {/* Product identity + card visuals + price + (mobile) box preview,
                          all stacked in one column on every breakpoint. */}
                      <div className="min-w-0">
                        <div className="flex items-baseline justify-between gap-3 mb-3">
                          <p
                            className="text-sm font-semibold"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {item.productName}
                          </p>
                          <p className="text-xs text-[#1B2420]/50 whitespace-nowrap">
                            Qty: {item.productQuantity}
                            {customizedCount > 1
                              ? ` · ${customizedCount} cards`
                              : ""}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-start gap-3">
                          {previewCards.map((previewCard, imageIndex) =>
                            renderCardThumb(
                              item,
                              previewCard,
                              imageIndex,
                              "w-[88px] h-[123px] sm:w-24 sm:h-32 md:w-28 md:h-40",
                            ),
                          )}

                          {previewCards.length === 0 && !jokerCard && (
                            <div className="w-[88px] h-[123px] sm:w-24 sm:h-32 md:w-28 md:h-40 bg-[#F7F3EC] rounded-xl border border-[#1B2420]/10 overflow-hidden relative flex items-center justify-center text-[#1B2420]/20">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <rect
                                  x="3"
                                  y="3"
                                  width="18"
                                  height="18"
                                  rx="2"
                                  ry="2"
                                ></rect>
                                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                <polyline points="21 15 16 10 5 21"></polyline>
                              </svg>
                            </div>
                          )}

                          {jokerCard && (
                            <div className="flex flex-col items-center gap-1.5 pl-3 border-l border-[#1B2420]/10">
                              <div className="relative">
                                {renderCardThumb(
                                  item,
                                  jokerCard,
                                  "joker",
                                  "w-[88px] h-[123px] sm:w-24 sm:h-32 md:w-28 md:h-40",
                                )}
                              </div>
                              <span className="text-[11px] text-[#1B2420]/50">
                                Joker card
                              </span>
                            </div>
                          )}
                        </div>

                        {isDeckItem &&
                          (deriveCustomizationMode(item) === "photo" ? (
                            <div className="mt-4">
                              <h3
                                className="text-sm font-semibold text-[#1B2420]/80 mb-3"
                                style={{ fontFamily: "var(--font-display)" }}
                              >
                                Box Preview
                              </h3>
                              <div className="flex flex-wrap gap-3">
                                <PhotoPortraitBoxPreview
                                  boxImages={
                                    photocart?.[0]?.boxImages?.map((img) => ({
                                      id: img?.id ?? null,
                                      src: img?.src ?? null,
                                      zoom: img?.zoom ?? 1,
                                      xFraction: img?.xFraction ?? 0,
                                      yFraction: img?.yFraction ?? 0,
                                    })) ?? []
                                  }
                                />
                              </div>
                            </div>
                          ) : (
                            showDeckBoxPreview && (
                              <div className="mt-4">
                                <h3
                                  className="text-sm font-semibold text-[#1B2420]/80 mb-3"
                                  style={{ fontFamily: "var(--font-display)" }}
                                >
                                  Box Preview
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                  <DeckBoxPreview
                                    characterImages={deckBoxCharacterImages}
                                  />
                                </div>
                              </div>
                            )
                          ))}

                        {/* Price breakdown — horizontal strip, full width, directly
                              under the card art. Same markup on every breakpoint. */}
                        {isDeckItem && (
                          <div
                            className="mt-4 pt-4 pb-1 border-t border-dashed border-[#1B2420]/10 space-y-2 text-sm"
                            style={{ fontFamily: "var(--font-mono)" }}
                          >
                            {pricedLine ? (
                              <>
                                <div className="flex justify-between text-[#1B2420]/60">
                                  <span
                                    style={{ fontFamily: "var(--font-body)" }}
                                  >
                                    Package
                                  </span>
                                  <span>${packagePrice.toFixed(2)}</span>
                                </div>
                                {jokerCard && jokerPrice > 0 && (
                                  <div className="flex justify-between text-[#C9A227]">
                                    <span
                                      style={{ fontFamily: "var(--font-body)" }}
                                    >
                                      Joker add-on
                                    </span>
                                    <span>${jokerPrice.toFixed(2)}</span>
                                  </div>
                                )}
                                <div className="flex justify-between font-semibold pt-2 border-t border-[#1B2420]/10">
                                  <span
                                    style={{ fontFamily: "var(--font-body)" }}
                                  >
                                    Item total
                                  </span>
                                  <span>
                                    $
                                    {Number(pricedLine.line_total ?? 0).toFixed(
                                      2,
                                    )}
                                  </span>
                                </div>
                              </>
                            ) : pricingLoading ? (
                              <p className="text-xs text-[#1B2420]/40 animate-pulse">
                                Calculating price…
                              </p>
                            ) : pricingError ? (
                              <p className="text-xs text-[#B65C4D]">
                                Price unavailable
                              </p>
                            ) : null}
                          </div>
                        )}
                      </div>

                      {/* Mobile-only Box Preview — sits between the price strip and
                            the next item on narrow screens. Hidden at lg: and up,
                            where the full-width Box Preview below the cart-item
                            list (see the IIFE block further down) takes over. */}
                    </div>
                  );
                })
              )}
            </div>

            {/* Trading Card Box Preview — completely isolated from deck card logic */}
            {cart.some((item) => item.productType === "trading") &&
              boxs?.some((b) => b?.bfor === "trading") && (
                <div className="mb-6">
                  <h3
                    className="text-sm font-semibold text-[#1B2420]/80 mb-3"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Trading Card Box Preview
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <div className="w-[240px] sm:w-[300px] md:w-[360px] rounded-2xl border border-[#1B2420]/10 bg-white p-3 shadow-sm">
                      <HoverZoomImage
                        src={boxs.find((b) => b?.bfor === "trading")?.BoxImage}
                        alt="trading-card-box-preview"
                        zoom={2.5}
                      />
                    </div>
                  </div>
                </div>
              )}

            <div
              className="lg:border-t lg:border-dashed lg:border-[#1B2420]/12 pt-2 lg:pt-4 space-y-3"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {pricingLoading ? (
                <p
                  className="text-sm text-[#1B2420]/40 animate-pulse"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Calculating total…
                </p>
              ) : pricingError ? (
                <p
                  className="text-sm text-[#B65C4D]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Couldn&apos;t verify prices. Please refresh the page.
                </p>
              ) : (
                <>
                  <div className="hidden lg:flex justify-between text-sm text-[#1B2420]/60">
                    <span style={{ fontFamily: "var(--font-body)" }}>
                      Subtotal
                    </span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#1B2420]/60">
                    <span style={{ fontFamily: "var(--font-body)" }}>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-baseline font-semibold text-lg pt-2">
                    <span style={{ fontFamily: "var(--font-display)" }}>
                      Total
                    </span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Payment Details Form */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl shadow-sm border border-[#1B2420]/[0.06] p-5 sm:p-6 md:p-8 lg:sticky lg:top-6">
            <h2
              className="text-xl sm:text-2xl font-semibold mb-6 flex items-center gap-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <svg
                className="text-[#2F6F5E]"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
              Shipping Information
            </h2>

            <form onSubmit={handleCheckout} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <FieldLabel label="First Name" required />
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                      className={inputStyle}
                      required
                    />
                  </div>
                  <div>
                    <FieldLabel label="Last Name" required />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                      className={inputStyle}
                      required
                    />
                  </div>
                </div>

                <div>
                  <FieldLabel label="Company" />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company (optional)"
                    className={inputStyle}
                  />
                </div>

                <div>
                  <FieldLabel label="Phone Number" required />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                    placeholder="Phone Number"
                    className={inputStyle}
                    required
                  />
                </div>

                <div>
                  <FieldLabel label="Address 1" required />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                    placeholder="Address 1"
                    className={inputStyle}
                    required
                  />
                </div>

                <div>
                  <FieldLabel label="Address 2" />
                  <input
                    type="text"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    className={inputStyle}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <FieldLabel label="City" required />
                    <input
                      type="text"
                      value={City}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      className={inputStyle}
                      required
                    />
                  </div>
                  <div>
                    <FieldLabel label="State / Province" required />
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="State / Province"
                      className={inputStyle}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <FieldLabel label="Zip / Postal Code" required />
                    <input
                      type="text"
                      value={zipcode}
                      onChange={(e) => setzipcode(e.target.value)}
                      placeholder="Zip / Postal Code"
                      className={inputStyle}
                      required
                    />
                  </div>
                  <div>
                    <FieldLabel label="Country" required />
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className={inputStyle}
                      required
                    >
                      <option value="">Select Country</option>
                      {countries.map((item) => (
                        <option key={item.code} value={item.code}>
                          {item.name} ({item.code})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={
                  loading || cart.length === 0 || pricingLoading || pricingError
                }
                className="w-full bg-[#3CA9FF] text-[#F7F3EC] font-semibold py-3.5 rounded-xl shadow-md shadow-[#2F6F5E]/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none mt-2 cursor-pointer"
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

// Renders a single card thumbnail (rank card or Joker) at a given size.
// Defined at module level (not inside CheckoutPage) so it isn't
// recreated on every render of every cart line.
function renderCardThumb(item, previewCard, imageIndex, sizeClass) {
  return (
    <div
      key={imageIndex}
      className={`${sizeClass} bg-[#F7F3EC] rounded-xl border border-[#1B2420]/10 overflow-hidden relative`}
    >
      {previewCard.type === "deck" ? (
        <div className="relative w-full h-full bg-white">
          <img
            src={previewCard.card.baseImage}
            alt={`${item?.productName || "Product"} customized card ${imageIndex + 1}`}
            className="w-full h-full object-cover bg-white"
          />
          {deckPreviewLayers.map((layer) =>
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
            ) : null,
          )}
        </div>
      ) : (
        <img
          src={previewCard.src}
          alt={`${item?.productName || "Product"} preview ${imageIndex + 1}`}
          className="w-full h-full object-cover bg-white"
        />
      )}
    </div>
  );
}

// Ecommerce-style magnifier: the region under the cursor zooms in and pans
// as the cursor moves, rather than a uniform CSS scale-on-hover. Works by
// overlaying a second copy of the same image, sized up by `zoom`, whose
// background-position is driven by the cursor's relative position inside
// the container — so it looks like you're "moving a magnifying glass"
// over the image.
function HoverZoomImage({ src, alt, zoom = 2.5, className = "" }) {
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [bgPos, setBgPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setBgPos({
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
    });
  };

  if (!src) return null;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-zoom-in select-none ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Base image — always visible, defines the box's natural size */}
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="h-auto w-full object-contain block"
      />

      {/* Zoomed overlay — only rendered while hovering, panned to follow cursor */}
      {isHovering && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${zoom * 100}%`,
            backgroundPosition: `${bgPos.x}% ${bgPos.y}%`,
          }}
        />
      )}
    </div>
  );
}
