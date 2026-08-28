"use client";
import SpinLoader from "@/app/componnent/SpingLoader";
import usePhotoFinalPreview from "@/store/usePhotoFinalPreview";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import PhotoPortraitBoxPreview from "@/app/componnent/PhotoPortraitBoxPreview";
import useCartStore from "@/store/useCartStore";
import Image from "next/image";
const FinalCardsPage = () => {
  const router = useRouter();
  const photocart = usePhotoFinalPreview((state) => state.photocart);
  const updateCart = usePhotoFinalPreview((state) => state.updateCart);
  const addToPhotoCart = usePhotoFinalPreview((state) => state.addToCart);

  const { addToCart, cart } = useCartStore();

  const [loading, setLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const boxPreviewRef = useRef(null);
  const boxPreviewCaptureRef = useRef(null);

  const [isZooming, setIsZooming] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const ZOOM_SCALE = 2.4;

  const zoomStageRef = useRef(null);

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

  const finalProductCards = photocart[0]?.FinalProduct || [];
  const boxImages = photocart[0]?.boxImages || [];

  const ensurePhotoInCart = () => {
    const photoItem = photocart?.[0];
    if (!photoItem) return false;
    const alreadyInPhotoCart = photocart.some(
      (item) => item?.id === photoItem?.id,
    );
    if (!alreadyInPhotoCart) addToPhotoCart(photoItem);
    const alreadyInCart = cart.some((item) => item?.id === photoItem?.id);
    if (!alreadyInCart) addToCart(photoItem);
    return true;
  };

  const captureBoxImage = async () => {
    if (!boxPreviewRef.current) return null;
    try {
      const domToImageModule = await import("dom-to-image-more");
      const domtoimage = domToImageModule.default ?? domToImageModule;
      if (typeof domtoimage.toPng !== "function") {
        console.error("toPng is not a function");
        return null;
      }
      const dataUrl = await domtoimage.toPng(boxPreviewRef.current, {
        width: boxPreviewRef.current.offsetWidth,
        height: boxPreviewRef.current.offsetHeight,
        style: { transform: "scale(1)" },
      });
      return dataUrl;
    } catch (err) {
      console.error("Box capture failed:", err);
      return null;
    }
  };

  const handleBoxCustomization = () => {
    router.push("/final/box-customizer");
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!ensurePhotoInCart()) return;
    setCheckoutLoading(true);
    const boxImage = await captureBoxImage();
    const captured =
      boxPreviewCaptureRef.current?.captureResolvedRects?.() ?? [];
    let resolvedBoxImages = boxImages;
    if (captured.length) {
      const byId = Object.fromEntries(captured.map((c) => [String(c.id), c]));
      resolvedBoxImages = boxImages.map((img) =>
        byId[String(img.id)]
          ? {
              ...img,
              frame: byId[String(img.id)].frame,
              image: byId[String(img.id)].image,
            }
          : img,
      );
    }

    if (boxImage && photocart?.[0]) {
      updateCart({
        ...photocart[0],
        BoxImage: boxImage,
        boxPreviewWidth: boxPreviewRef.current?.offsetWidth ?? null,
        boxImages: resolvedBoxImages,
      });
    }
    router.push("/my-cart/checkout");
    setCheckoutLoading(false);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!ensurePhotoInCart()) return;
    setLoading(true);
    const boxImage = await captureBoxImage();
    const captured =
      boxPreviewCaptureRef.current?.captureResolvedRects?.() ?? [];
    let resolvedBoxImages = boxImages;
    if (captured.length) {
      const byId = Object.fromEntries(captured.map((c) => [String(c.id), c]));
      resolvedBoxImages = boxImages.map((img) =>
        byId[String(img.id)]
          ? {
              ...img,
              frame: byId[String(img.id)].frame,
              image: byId[String(img.id)].image,
            }
          : img,
      );
    }

    if (boxImage && photocart?.[0]) {
      updateCart({
        ...photocart[0],
        BoxImage: boxImage,
        boxPreviewWidth: boxPreviewRef.current?.offsetWidth ?? null,
        boxImages: resolvedBoxImages,
      });
    }

    setTimeout(() => setLoading(false), 900);
  };

  return (
    <div className="text-black container mx-auto" style={{ padding: "2rem" }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => router.back()}
            className="border border-gray-200 bg-white p-2 rounded-md shadow-md cursor-pointer hover:bg-gray-100 transition duration-100"
          >
            <BiLeftArrowAlt className="text-2xl" />
          </button>
          <h1 className="text-xl text-gray-600 hidden md:block">
            Your Customized Cards
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => handleAddToCart(e)}
            className="border border-gray-200 bg-sky-400 hover:bg-sky-500 text-white p-2 rounded-md shadow-md cursor-pointer transition duration-100 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading || checkoutLoading || !photocart?.[0]}
          >
            {loading ? <SpinLoader /> : <IoCartOutline className="text-xl" />}
            Add to Cart
          </button>
          <button
            onClick={(e) => handleCheckout(e)}
            className="border border-gray-200 bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-md shadow-md cursor-pointer transition duration-100 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading || checkoutLoading || !photocart?.[0]}
          >
            {checkoutLoading ? (
              <SpinLoader />
            ) : (
              <MdOutlineShoppingBag className="text-xl" />
            )}
            Checkout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 justify-items-center gap-3 py-6 my-6 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
        {finalProductCards.map((card, idx) => (
          <div
            key={idx}
            className="relative mx-auto w-full max-w-42.5 sm:max-w-47.5 md:max-w-50 lg:max-w-55 aspect-11/15 overflow-hidden rounded-3xl border border-gray-100 bg-white/60 shadow-md"
          >
            <Image
              src={card.image}
              alt={`Card ${card.rank || idx}`}
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

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
              <PhotoPortraitBoxPreview
                ref={boxPreviewCaptureRef}
                boxImages={boxImages}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalCardsPage;
