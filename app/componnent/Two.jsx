"use client";

import useProductUploadStore from "@/store/useProductUploadStore";
import getCookie from "@/utilis/helper/cookie/gettooken";
import handleFileChange from "@/utilis/helper/handlefilechange";
import handleFileChangeMultipul from "@/utilis/helper/handlefilechangemultipul";
import handlemultipulfilechangeForcustomaizationbaseUrl from "@/utilis/helper/handlemultipulfilechangeForcustomaizationbaseUrl";
import MakeGet from "@/utilis/requestrespose/get";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import SpinLoader from "./SpingLoader";

// Slot definitions per card type
const CARD_SLOTS = {
  Ace_Card: ["Clubs_Ace", "Diamonds_Ace", "Hearts_Ace", "Spades_Ace"],
  Jeck_Card: [
    "Clubs_Face_Jack",
    "Diamonds_Face_Jack",
    "Hearts_Face_Jack",
    "Spades_Face_Jack",
  ],
  Queen_Card: [
    "Clubs_Face_Queen",
    "Diamonds_Face_Queen",
    "Hearts_Face_Queen",
    "Spades_Face_Queen",
  ],
  king_Card: [
    "Clubs_Face_King",
    "Diamonds_Face_King",
    "Hearts_Face_King",
    "Spades_Face_King",
  ],
  Joker_Card: ["Joker_1", "Joker_2"],
};

const CARD_LABELS = {
  Ace_Card: "Ace Card",
  Jeck_Card: "Jack Card",
  Queen_Card: "Queen Card",
  king_Card: "King Card",
  Joker_Card: "Joker Card",
};

const DROPDOWN_ITEM_HEIGHT = 32;
const DROPDOWN_HEADER_HEIGHT = 24;

const Two = () => {
  const token = getCookie();
  const [isLoading, setLoading] = useState(false);
  const [data, setdata] = useState(null);
  const [activeSlotSelector, setActiveSlotSelector] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({
    top: 0,
    left: 0,
    openUpward: false,
  });
  const pendingSlotRef = useRef({});

  const {
    rander,
    setrander,
    productType,
    setproductType,
    productName,
    setproductName,
    productPrice,
    setproductPrice,
    productDescription,
    setproductDescription,
    productShortDescription,
    setproductShortDescription,
    productofferPrice,
    setproductofferPrice,
    productCategory,
    setproductCategory,
    productCategoryName,
    setproductCategoryName,
    productTags,
    setproductTags,
    productStatus,
    setproductStatus,
    productThumbnail,
    setproductThumbnail,
    productSingleImage,
    setproductSingleImage,
    productImages,
    setproductImages,
    layerBaseCard,
    setlayerBaseCard,
    layerSkinTone,
    setlayerSkinTone,
    layerHair,
    setlayerHair,
    layerNose,
    setlayerNose,
    layerEyes,
    setlayerEyes,
    layerMouth,
    setlayerMouth,
    layerDress,
    setlayerDress,
    layerCrown,
    setlayerCrown,
    layerBeard,
    setlayerBeard,
    tredingFrontBase,
    settredingFrontBase,
    tredingBackBase,
    settredingBackBase,
  } = useProductUploadStore();

  // ─── FIX: keep a ref always pointing at the latest layerBaseCard ───
  const layerBaseCardRef = useRef(layerBaseCard);
  useEffect(() => {
    layerBaseCardRef.current = layerBaseCard;
  }, [layerBaseCard]);
  // ──────────────────────────────────────────────────────────────────

  const fetching = useCallback(
    async (token) => {
      try {
        const response = await MakeGet(`api/categories`, token);
        setdata(response?.data?.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    [token],
  );

  useEffect(() => {
    fetching(token);
  }, [fetching]);

  /* ── helpers ── */
  const handleRemove = (index, images, seterImages) => {
    seterImages(images?.filter((_, i) => i !== index));
  };

  const handleRemoveForcustomaizationBaseURl = (
    index,
    images,
    seterImages,
    Type,
  ) => {
    const updated = images?.map((item) => {
      if (item.card_type === Type) {
        return { ...item, images: item?.images?.filter((_, i) => i !== index) };
      }
      return item;
    });
    seterImages(updated);
  };

  const getAssignedSlots = (cardType) => {
    const group = layerBaseCard?.find((item) => item.card_type === cardType);
    return group?.images?.map((img) => img.name).filter(Boolean) || [];
  };

  const getAvailableSlots = (cardType) => {
    const allSlots = CARD_SLOTS[cardType] || [];
    const assigned = getAssignedSlots(cardType);
    return allSlots.filter((slot) => !assigned.includes(slot));
  };

  const calculateDropdownPosition = (buttonEl, slotCount) => {
    const rect = buttonEl.getBoundingClientRect();
    const dropdownHeight =
      slotCount * DROPDOWN_ITEM_HEIGHT + DROPDOWN_HEADER_HEIGHT + 8;
    const spaceBelow = window.innerHeight - rect.bottom - 8;
    const spaceAbove = rect.top - 8;
    const openUpward = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;

    return {
      top: openUpward ? rect.top - dropdownHeight : rect.bottom + 4,
      left: Math.min(rect.left, window.innerWidth - 180),
      openUpward,
    };
  };

  /* ── card section renderer ── */
  const renderCardSection = (cardType) => {
    const availableSlots = getAvailableSlots(cardType);
    const isActive = activeSlotSelector === cardType;
    const label = CARD_LABELS[cardType];

    const handlePlusClick = (e) => {
      if (availableSlots.length === 0) return;
      if (isActive) {
        setActiveSlotSelector(null);
        return;
      }
      const pos = calculateDropdownPosition(
        e.currentTarget,
        availableSlots.length,
      );
      setDropdownPos(pos);
      setActiveSlotSelector(cardType);
    };

    return (
      <div key={cardType} className="flex items-start gap-3">
        {/* Label */}
        <div className="w-16 pt-2 shrink-0">
          <h2 className="text-gray-600 text-xs font-medium">{label}</h2>
        </div>

        <div className="flex flex-wrap gap-2 items-start">
          {/* Uploaded previews */}
          {layerBaseCard
            ?.filter((t) => t?.card_type === cardType)
            ?.map((t, idx) =>
              t?.images?.map((imgObj, i) => (
                <div key={`${idx}-${i}`} className="flex flex-col items-center">
                  <div className="relative w-[54px] h-[54px] border border-gray-200 rounded-md">
                    <Image
                      src={imgObj.base64}
                      alt={imgObj.name || "Preview"}
                      fill
                      className="object-cover rounded-md"
                    />
                    <div
                      onClick={() =>
                        handleRemoveForcustomaizationBaseURl(
                          i,
                          layerBaseCard,
                          setlayerBaseCard,
                          cardType,
                        )
                      }
                      className="bg-sky-800 text-white w-4 h-4 rounded-full flex items-center justify-center absolute top-0 right-0 cursor-pointer"
                    >
                      <RxCross2 className="text-white text-xs" />
                    </div>
                  </div>
                  <span className="text-[9px] text-gray-500 mt-0.5 max-w-[54px] truncate text-center leading-tight">
                    {imgObj.name
                      ? imgObj.name.replace(/_/g, " ")
                      : imgObj.filename}
                  </span>
                </div>
              )),
            )}

          {/* + button — only when slots remain */}
          {availableSlots.length > 0 && (
            <div className="flex flex-col items-center gap-0.5">
              <div
                onClick={handlePlusClick}
                className="w-[54px] h-[54px] border border-gray-200 rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition"
              >
                <FaPlus className="text-xl text-gray-500" />
              </div>
              <span className="text-[9px] text-transparent leading-tight">
                spacer
              </span>
            </div>
          )}
        </div>

        {/* Hidden file input — uses ref to avoid stale closure */}
        <input
          id={`file_input_${cardType}`}
          type="file"
          className="hidden"
          accept="image/png, image/jpeg, image/jpg"
          onChange={(e) => {
            const slotName = pendingSlotRef.current[cardType];
            if (!slotName) {
              e.target.value = "";
              return;
            }

            // ← layerBaseCardRef.current is always fresh (stale closure fix)
            handlemultipulfilechangeForcustomaizationbaseUrl(
              e,
              setlayerBaseCard,
              layerBaseCardRef.current,
              cardType,
              slotName,
            );

            pendingSlotRef.current[cardType] = "";
          }}
        />
      </div>
    );
  };

  /* ── next step validation ── */
  const handleNext = () => {
    console.log(productType);
    if (productType === "customizable" || productType === "photo") {
      if (
        productName &&
        productPrice > 0 &&
        productShortDescription &&
        productCategory &&
        productThumbnail &&
        productImages?.length > 0 &&
        layerBaseCard?.length > 0 &&
        layerSkinTone?.length > 0
      ) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setrander(3);
        }, 900);
      } else {
        toast.warn("Please Fill Up All Required Fields d");
      }
    } else if (productType === "trading") {
      if (
        productName &&
        productPrice > 0 &&
        productShortDescription &&
        productCategory &&
        productThumbnail &&
        productImages?.length > 0 &&
        tredingFrontBase?.length > 0 &&
        tredingBackBase?.length > 0
      ) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setrander(3);
        }, 900);
      } else {
        toast.warn("Please Fill Up All Required Fields");
      }
    } else {
      if (
        productName &&
        productPrice > 0 &&
        productShortDescription &&
        productCategory &&
        productThumbnail &&
        productImages?.length > 0
      ) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setrander(3);
        }, 900);
      } else {
      }
    }
  };

  /* ══════════════════════════════════════════════════════════════════
       RENDER
    ══════════════════════════════════════════════════════════════════ */
  return (
    <div className="flex justify-center px-2">
      <div className="w-full bg-white rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* ── Left column ── */}
          <div className="space-y-5 col-span-1 md:col-span-8 border border-gray-300 rounded-md px-4 py-3">
            {/* Name */}
            <div>
              <label className="block text-gray-700 mb-1">
                Name <span className="text-red-500 text-xl">*</span>
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setproductName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-gray-700 mb-1">
                Type <span className="text-red-500 text-xl">*</span>
              </label>
              <input
                disabled
                type="text"
                value={
                  productType === "simple"
                    ? "Simple"
                    : productType === "trading"
                      ? "Trading"
                      : "Customizable"
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-gray-700 mb-1">
                Price <span className="text-red-500 text-xl">*</span>
              </label>
              <input
                type="number"
                value={productPrice}
                onChange={(e) => setproductPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
              />
            </div>

            {/* Offer Price */}
            <div>
              <label className="block text-gray-700 mb-1">Offer Price</label>
              <input
                type="number"
                value={productofferPrice}
                onChange={(e) => setproductofferPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 mb-1">
                Category <span className="text-red-500 text-xl">*</span>
              </label>
              <select
                value={productCategory}
                onChange={(e) => setproductCategory(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select Category</option>
                {data?.map((item, index) => (
                  <option
                    key={index}
                    value={JSON.stringify({ id: item?.id, name: item?.name })}
                  >
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-gray-700 mb-1">Status</label>
              <select
                value={productStatus}
                onChange={(e) => setproductStatus(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value={true}>Publish</option>
                <option value={false}>Draft</option>
              </select>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-gray-700 mb-1">
                Short Description{" "}
                <span className="text-red-500 text-xl">*</span>
              </label>
              <textarea
                value={productShortDescription}
                onChange={(e) => setproductShortDescription(e.target.value)}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 mb-1">Description</label>
              <textarea
                value={productDescription}
                onChange={(e) => setproductDescription(e.target.value)}
                rows="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* ══ CUSTOMIZABLE LAYERS ══ */}
            {(productType === "customizable" || productType === "photo") && (
              <>
                {/* Base Cards */}
                <div className="mt-6">
                  <label className="block text-gray-700 mb-1">
                    Base Card:&nbsp;
                    <span className="px-1 py-0.5 text-sm rounded-md bg-sky-300 text-white">
                      {layerBaseCard?.length}
                    </span>
                    &nbsp;<span className="text-red-500 text-xl">*</span>
                    &nbsp;
                    <span className="text-xs text-gray-400">
                      Select a slot, then pick an image
                    </span>
                  </label>
                  <div className="w-full h-fit bg-gray-100 rounded-md p-3 flex flex-col gap-3">
                    {renderCardSection("Ace_Card")}
                    {renderCardSection("Jeck_Card")}
                    {renderCardSection("Queen_Card")}
                    {renderCardSection("king_Card")}
                    {renderCardSection("Joker_Card")}
                  </div>
                </div>

                {/* Skin Tone */}
                <div className="mt-6">
                  <label className="block text-gray-700 mb-1">
                    Skin Tone:
                    <span className="px-1 py-0.5 text-sm rounded-md bg-sky-300 text-white ml-1">
                      {layerSkinTone?.length}
                    </span>
                    <span className="text-red-500 text-xl ml-1">*</span>
                  </label>
                  <div className="w-full min-h-15 max-h-50 bg-gray-100 rounded-md p-2 overflow-y-scroll no-scrollbar">
                    <div className="flex flex-wrap gap-2">
                      {layerSkinTone?.map((src, idx) => (
                        <div
                          key={idx}
                          className="relative w-13.5 h-13.5 border-gray-200 rounded-md"
                        >
                          <Image
                            src={src}
                            alt={`skin-${idx}`}
                            fill
                            className="object-cover rounded-md"
                          />
                          <div
                            onClick={() =>
                              handleRemove(idx, layerSkinTone, setlayerSkinTone)
                            }
                            className="bg-sky-800 text-white w-4 h-4 rounded-full flex items-center justify-center absolute top-0 right-0 cursor-pointer"
                          >
                            <RxCross2 className="text-white text-xs" />
                          </div>
                        </div>
                      ))}
                      <label htmlFor="image_taker_skin_tone">
                        <div className="w-13.5 h-13.5 border border-gray-200 rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition">
                          <FaPlus className="text-xl text-gray-500" />
                        </div>
                      </label>
                      <input
                        onChange={(e) =>
                          handleFileChangeMultipul(
                            e,
                            setlayerSkinTone,
                            layerSkinTone,
                          )
                        }
                        id="image_taker_skin_tone"
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/png, image/jpeg, image/jpg"
                      />
                    </div>
                  </div>
                </div>

                {/* Hair */}
                <div className="mt-6">
                  <label className="block text-gray-700 mb-1">
                    Hair:
                    <span className="px-1 py-0.5 text-sm rounded-md bg-sky-300 text-white ml-1">
                      {layerHair?.length}
                    </span>
                    <span className="text-red-500 text-xl ml-1">*</span>
                  </label>
                  <div className="w-full min-h-[60px] max-h-[200px] bg-gray-100 rounded-md p-2 overflow-y-scroll no-scrollbar">
                    <div className="flex flex-wrap gap-2">
                      {layerHair?.map((src, idx) => (
                        <div
                          key={idx}
                          className="relative w-[54px] h-[54px] border-gray-200 rounded-md"
                        >
                          <Image
                            src={src}
                            alt={`hair-${idx}`}
                            fill
                            className="object-cover rounded-md"
                          />
                          <div
                            onClick={() =>
                              handleRemove(idx, layerHair, setlayerHair)
                            }
                            className="bg-sky-800 text-white w-4 h-4 rounded-full flex items-center justify-center absolute top-0 right-0 cursor-pointer"
                          >
                            <RxCross2 className="text-white text-xs" />
                          </div>
                        </div>
                      ))}
                      <label htmlFor="image_taker_Hair">
                        <div className="w-[54px] h-[54px] border border-gray-200 rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition">
                          <FaPlus className="text-xl text-gray-500" />
                        </div>
                      </label>
                      <input
                        onChange={(e) =>
                          handleFileChangeMultipul(e, setlayerHair, layerHair)
                        }
                        id="image_taker_Hair"
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/png, image/jpeg, image/jpg"
                      />
                    </div>
                  </div>
                </div>

                {/* Nose */}
                <div className="mt-6">
                  <label className="block text-gray-700 mb-1">
                    Nose:
                    <span className="px-1 py-0.5 text-sm rounded-md bg-sky-300 text-white ml-1">
                      {layerNose?.length}
                    </span>
                    <span className="text-red-500 text-xl ml-1">*</span>
                  </label>
                  <div className="w-full min-h-[60px] max-h-[200px] bg-gray-100 rounded-md p-2 overflow-y-scroll no-scrollbar">
                    <div className="flex flex-wrap gap-2">
                      {layerNose?.map((src, idx) => (
                        <div
                          key={idx}
                          className="relative w-[54px] h-[54px] border-gray-200 rounded-md"
                        >
                          <Image
                            src={src}
                            alt={`nose-${idx}`}
                            fill
                            className="object-cover rounded-md"
                          />
                          <div
                            onClick={() =>
                              handleRemove(idx, layerNose, setlayerNose)
                            }
                            className="bg-sky-800 text-white w-4 h-4 rounded-full flex items-center justify-center absolute top-0 right-0 cursor-pointer"
                          >
                            <RxCross2 className="text-white text-xs" />
                          </div>
                        </div>
                      ))}
                      <label htmlFor="image_taker_nose_card">
                        <div className="w-[54px] h-[54px] border border-gray-200 rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition">
                          <FaPlus className="text-xl text-gray-500" />
                        </div>
                      </label>
                      <input
                        onChange={(e) =>
                          handleFileChangeMultipul(e, setlayerNose, layerNose)
                        }
                        id="image_taker_nose_card"
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/png, image/jpeg, image/jpg"
                      />
                    </div>
                  </div>
                </div>

                {/* Eyes */}
                <div className="mt-6">
                  <label className="block text-gray-700 mb-1">
                    Eyes:
                    <span className="px-1 py-0.5 text-sm rounded-md bg-sky-300 text-white ml-1">
                      {layerEyes?.length}
                    </span>
                    <span className="text-red-500 text-xl ml-1">*</span>
                  </label>
                  <div className="w-full min-h-[60px] max-h-[200px] bg-gray-100 rounded-md p-2 overflow-y-scroll no-scrollbar">
                    <div className="flex flex-wrap gap-2">
                      {layerEyes?.map((src, idx) => (
                        <div
                          key={idx}
                          className="relative w-[54px] h-[54px] border-gray-200 rounded-md"
                        >
                          <Image
                            src={src}
                            alt={`eyes-${idx}`}
                            fill
                            className="object-cover rounded-md"
                          />
                          <div
                            onClick={() =>
                              handleRemove(idx, layerEyes, setlayerEyes)
                            }
                            className="bg-sky-800 text-white w-4 h-4 rounded-full flex items-center justify-center absolute top-0 right-0 cursor-pointer"
                          >
                            <RxCross2 className="text-white text-xs" />
                          </div>
                        </div>
                      ))}
                      <label htmlFor="image_taker_Eyes_card">
                        <div className="w-[54px] h-[54px] border border-gray-200 rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition">
                          <FaPlus className="text-xl text-gray-500" />
                        </div>
                      </label>
                      <input
                        onChange={(e) =>
                          handleFileChangeMultipul(e, setlayerEyes, layerEyes)
                        }
                        id="image_taker_Eyes_card"
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/png, image/jpeg, image/jpg"
                      />
                    </div>
                  </div>
                </div>

                {/* Mouth */}
                <div className="mt-6">
                  <label className="block text-gray-700 mb-1">
                    Mouth:
                    <span className="px-1 py-0.5 text-sm rounded-md bg-sky-300 text-white ml-1">
                      {layerMouth?.length}
                    </span>
                    <span className="text-red-500 text-xl ml-1">*</span>
                  </label>
                  <div className="w-full min-h-[60px] max-h-[200px] bg-gray-100 rounded-md p-2 overflow-y-scroll no-scrollbar">
                    <div className="flex flex-wrap gap-2">
                      {layerMouth?.map((src, idx) => (
                        <div
                          key={idx}
                          className="relative w-[54px] h-[54px] border-gray-200 rounded-md"
                        >
                          <Image
                            src={src}
                            alt={`mouth-${idx}`}
                            fill
                            className="object-cover rounded-md"
                          />
                          <div
                            onClick={() =>
                              handleRemove(idx, layerMouth, setlayerMouth)
                            }
                            className="bg-sky-800 text-white w-4 h-4 rounded-full flex items-center justify-center absolute top-0 right-0 cursor-pointer"
                          >
                            <RxCross2 className="text-white text-xs" />
                          </div>
                        </div>
                      ))}
                      <label htmlFor="image_taker_mouth_Card">
                        <div className="w-[54px] h-[54px] border border-gray-200 rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition">
                          <FaPlus className="text-xl text-gray-500" />
                        </div>
                      </label>
                      <input
                        onChange={(e) =>
                          handleFileChangeMultipul(e, setlayerMouth, layerMouth)
                        }
                        id="image_taker_mouth_Card"
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/png, image/jpeg, image/jpg"
                      />
                    </div>
                  </div>
                </div>

                {/* Dress */}
                <div className="mt-6">
                  <label className="block text-gray-700 mb-1">
                    Dress:
                    <span className="px-1 py-0.5 text-sm rounded-md bg-sky-300 text-white ml-1">
                      {layerDress?.length}
                    </span>
                    <span className="text-red-500 text-xl ml-1">*</span>
                  </label>
                  <div className="w-full min-h-[60px] max-h-[200px] bg-gray-100 rounded-md p-2 overflow-y-scroll no-scrollbar">
                    <div className="flex flex-wrap gap-2">
                      {layerDress?.map((src, idx) => (
                        <div
                          key={idx}
                          className="relative w-[54px] h-[54px] border-gray-200 rounded-md"
                        >
                          <Image
                            src={src}
                            alt={`dress-${idx}`}
                            fill
                            className="object-cover rounded-md"
                          />
                          <div
                            onClick={() =>
                              handleRemove(idx, layerDress, setlayerDress)
                            }
                            className="bg-sky-800 text-white w-4 h-4 rounded-full flex items-center justify-center absolute top-0 right-0 cursor-pointer"
                          >
                            <RxCross2 className="text-white text-xs" />
                          </div>
                        </div>
                      ))}
                      <label htmlFor="image_taker_dress_card">
                        <div className="w-[54px] h-[54px] border border-gray-200 rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition">
                          <FaPlus className="text-xl text-gray-500" />
                        </div>
                      </label>
                      <input
                        onChange={(e) =>
                          handleFileChangeMultipul(e, setlayerDress, layerDress)
                        }
                        id="image_taker_dress_card"
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/png, image/jpeg, image/jpg"
                      />
                    </div>
                  </div>
                </div>

                {/* Crown */}
                <div className="mt-6">
                  <label className="block text-gray-700 mb-1">
                    Crown:
                    <span className="px-1 py-0.5 text-sm rounded-md bg-sky-300 text-white ml-1">
                      {layerCrown?.length}
                    </span>
                    <span className="text-red-500 text-xl ml-1">*</span>
                  </label>
                  <div className="w-full min-h-[60px] max-h-[200px] bg-gray-100 rounded-md p-2 overflow-y-scroll no-scrollbar">
                    <div className="flex flex-wrap gap-2">
                      {layerCrown?.map((src, idx) => (
                        <div
                          key={idx}
                          className="relative w-[54px] h-[54px] border-gray-200 rounded-md"
                        >
                          <Image
                            src={src}
                            alt={`crown-${idx}`}
                            fill
                            className="object-cover rounded-md"
                          />
                          <div
                            onClick={() =>
                              handleRemove(idx, layerCrown, setlayerCrown)
                            }
                            className="bg-sky-800 text-white w-4 h-4 rounded-full flex items-center justify-center absolute top-0 right-0 cursor-pointer"
                          >
                            <RxCross2 className="text-white text-xs" />
                          </div>
                        </div>
                      ))}
                      <label htmlFor="image_taker_crown_card">
                        <div className="w-[54px] h-[54px] border border-gray-200 rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition">
                          <FaPlus className="text-xl text-gray-500" />
                        </div>
                      </label>
                      <input
                        onChange={(e) =>
                          handleFileChangeMultipul(e, setlayerCrown, layerCrown)
                        }
                        id="image_taker_crown_card"
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/png, image/jpeg, image/jpg"
                      />
                    </div>
                  </div>
                </div>

                {/* Beard */}
                <div className="mt-6">
                  <label className="block text-gray-700 mb-1">
                    Beard:
                    <span className="px-1 py-0.5 text-sm rounded-md bg-sky-300 text-white ml-1">
                      {layerBeard?.length}
                    </span>
                    <span className="text-red-500 text-xl ml-1">*</span>
                  </label>
                  <div className="w-full min-h-[60px] max-h-[200px] bg-gray-100 rounded-md p-2 overflow-y-scroll no-scrollbar">
                    <div className="flex flex-wrap gap-2">
                      {layerBeard?.map((src, idx) => (
                        <div
                          key={idx}
                          className="relative w-[54px] h-[54px] border-gray-200 rounded-md"
                        >
                          <Image
                            src={src}
                            alt={`beard-${idx}`}
                            fill
                            className="object-cover rounded-md"
                          />
                          <div
                            onClick={() =>
                              handleRemove(idx, layerBeard, setlayerBeard)
                            }
                            className="bg-sky-800 text-white w-4 h-4 rounded-full flex items-center justify-center absolute top-0 right-0 cursor-pointer"
                          >
                            <RxCross2 className="text-white text-xs" />
                          </div>
                        </div>
                      ))}
                      <label htmlFor="image_taker_bread_card">
                        <div className="w-[54px] h-[54px] border border-gray-200 rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition">
                          <FaPlus className="text-xl text-gray-500" />
                        </div>
                      </label>
                      <input
                        onChange={(e) =>
                          handleFileChangeMultipul(e, setlayerBeard, layerBeard)
                        }
                        id="image_taker_bread_card"
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/png, image/jpeg, image/jpg"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ══ TRADING LAYERS ══ */}
            {productType === "trading" && (
              <>
                {/* Trading Front */}
                <div className="mt-6">
                  <label className="block text-gray-700 mb-1">
                    Trading Card Front Base:
                    <span className="px-1 py-0.5 text-sm rounded-md bg-sky-300 text-white ml-1">
                      {tredingFrontBase?.length}
                    </span>
                    <span className="text-red-500 text-xl ml-1">*</span>
                  </label>
                  <div className="w-full min-h-[60px] max-h-[200px] bg-gray-100 rounded-md p-2 overflow-y-scroll no-scrollbar">
                    <div className="flex flex-wrap gap-2">
                      {tredingFrontBase?.map((src, idx) => (
                        <div
                          key={idx}
                          className="relative w-[54px] h-[54px] border-gray-200 rounded-md"
                        >
                          <Image
                            src={src}
                            alt={`front-${idx}`}
                            fill
                            className="object-cover rounded-md"
                          />
                          <div
                            onClick={() =>
                              handleRemove(
                                idx,
                                tredingFrontBase,
                                settredingFrontBase,
                              )
                            }
                            className="bg-sky-800 text-white w-4 h-4 rounded-full flex items-center justify-center absolute top-0 right-0 cursor-pointer"
                          >
                            <RxCross2 className="text-white text-xs" />
                          </div>
                        </div>
                      ))}
                      <label htmlFor="image_taker_treding_front_base_card">
                        <div className="w-[54px] h-[54px] border border-gray-200 rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition">
                          <FaPlus className="text-xl text-gray-500" />
                        </div>
                      </label>
                      <input
                        onChange={(e) =>
                          handleFileChangeMultipul(
                            e,
                            settredingFrontBase,
                            tredingFrontBase,
                          )
                        }
                        id="image_taker_treding_front_base_card"
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/png, image/jpeg, image/jpg"
                      />
                    </div>
                  </div>
                </div>

                {/* Trading Back */}
                <div className="mt-6">
                  <label className="block text-gray-700 mb-1">
                    Trading Card Back Base:
                    <span className="px-1 py-0.5 text-sm rounded-md bg-sky-300 text-white ml-1">
                      {tredingBackBase?.length}
                    </span>
                    <span className="text-red-500 text-xl ml-1">*</span>
                  </label>
                  <div className="w-full min-h-[60px] max-h-[200px] bg-gray-100 rounded-md p-2 overflow-y-scroll no-scrollbar">
                    <div className="flex flex-wrap gap-2">
                      {tredingBackBase?.map((src, idx) => (
                        <div
                          key={idx}
                          className="relative w-[54px] h-[54px] border-gray-200 rounded-md"
                        >
                          <Image
                            src={src}
                            alt={`back-${idx}`}
                            fill
                            className="object-cover rounded-md"
                          />
                          <div
                            onClick={() =>
                              handleRemove(
                                idx,
                                tredingBackBase,
                                settredingBackBase,
                              )
                            }
                            className="bg-sky-800 text-white w-4 h-4 rounded-full flex items-center justify-center absolute top-0 right-0 cursor-pointer"
                          >
                            <RxCross2 className="text-white text-xs" />
                          </div>
                        </div>
                      ))}
                      <label htmlFor="image_taker_treding_back_base_card">
                        <div className="w-[54px] h-[54px] border border-gray-200 rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition">
                          <FaPlus className="text-xl text-gray-500" />
                        </div>
                      </label>
                      <input
                        onChange={(e) =>
                          handleFileChangeMultipul(
                            e,
                            settredingBackBase,
                            tredingBackBase,
                          )
                        }
                        id="image_taker_treding_back_base_card"
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/png, image/jpeg, image/jpg"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* end left column */}

          {/* ── Right column ── */}
          <div className="col-span-1 md:col-span-4">
            <div className="w-full border border-gray-300 rounded-md px-4 py-3 sticky top-[100px]">
              {/* Thumbnail */}
              <div>
                <label className="block text-gray-700 mb-1">
                  Product Thumbnail{" "}
                  <span className="text-red-500 text-xl">*</span>
                </label>
                <label htmlFor="thamnail_image">
                  <div className="w-full h-[180px] bg-gray-100 rounded-md flex items-center justify-center cursor-pointer relative overflow-hidden">
                    {productThumbnail ? (
                      <Image
                        src={productThumbnail}
                        alt="Thumbnail"
                        width={1000}
                        height={1000}
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <CiCirclePlus className="text-8xl text-gray-300" />
                    )}
                  </div>
                </label>
                <input
                  onChange={(e) => handleFileChange(e, setproductThumbnail)}
                  id="thamnail_image"
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpeg, image/jpg"
                />
              </div>

              {/* Gallery */}
              <div className="mt-6">
                <label className="block text-gray-700 mb-1">
                  Image Gallery:
                  <span className="px-1 py-0.5 text-sm rounded-md bg-sky-300 text-white ml-1">
                    {productImages?.length}
                  </span>
                  <span className="text-red-500 text-xl ml-1">*</span>
                </label>
                <div className="w-full min-h-[220px] max-h-[300px] bg-gray-100 rounded-md p-2 overflow-y-scroll no-scrollbar">
                  <div className="flex flex-wrap gap-2">
                    {productImages?.map((src, idx) => (
                      <div
                        key={idx}
                        className="relative w-[65px] h-[65px] border-gray-200 rounded-md"
                      >
                        <Image
                          src={src}
                          alt={`gallery-${idx}`}
                          fill
                          className="object-cover rounded-md"
                        />
                        <div
                          onClick={() =>
                            handleRemove(idx, productImages, setproductImages)
                          }
                          className="bg-sky-800 text-white w-4 h-4 rounded-full flex items-center justify-center absolute top-0 right-0 cursor-pointer"
                        >
                          <RxCross2 className="text-white text-xs" />
                        </div>
                      </div>
                    ))}
                    <label htmlFor="image_taker">
                      <div className="w-[65px] h-[65px] border border-gray-200 rounded-md flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-200 transition">
                        <FaPlus className="text-xl text-gray-500" />
                      </div>
                    </label>
                    <input
                      onChange={(e) =>
                        handleFileChangeMultipul(
                          e,
                          setproductImages,
                          productImages,
                        )
                      }
                      id="image_taker"
                      type="file"
                      className="hidden"
                      multiple
                      accept="image/png, image/jpeg, image/jpg"
                    />
                  </div>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-start gap-3 mt-6">
                <button
                  onClick={() => setrander(1)}
                  className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="bg-sky-400 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  {isLoading && <SpinLoader />}
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ Global slot-selection dropdown ══ */}
      {activeSlotSelector && (
        <>
          <div
            className="fixed inset-0 z-[9998]"
            onClick={() => setActiveSlotSelector(null)}
          />
          <div
            className="fixed z-[9999] bg-white border border-gray-200 rounded-md shadow-lg min-w-[170px] max-w-[220px] py-1"
            style={{
              top: dropdownPos.openUpward ? undefined : dropdownPos.top,
              bottom: dropdownPos.openUpward
                ? window.innerHeight - dropdownPos.top
                : undefined,
              left: dropdownPos.left,
            }}
          >
            <div className="px-3 py-1 text-[10px] text-gray-400 font-medium uppercase tracking-wide border-b border-gray-100">
              Select slot
            </div>
            {getAvailableSlots(activeSlotSelector).map((slot) => (
              <div
                key={slot}
                onClick={() => {
                  pendingSlotRef.current[activeSlotSelector] = slot;
                  setActiveSlotSelector(null);
                  setTimeout(() => {
                    document
                      .getElementById(`file_input_${activeSlotSelector}`)
                      ?.click();
                  }, 50);
                }}
                className="px-3 py-1.5 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer whitespace-nowrap transition"
              >
                {slot.replace(/_/g, " ")}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Two;
