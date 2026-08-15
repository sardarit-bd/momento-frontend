"use client";
import SpinLoader from "@/app/componnent/SpingLoader";
import usePhotoFinalPreview from "@/store/usePhotoFinalPreview";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import PhotoPortraitBoxPreview from "@/app/componnent/PhotoPortraitBoxPreview";
import PhotoPortraitBoxCustomizer from "@/app/componnent/PhotoPortraitBoxCustomizer";
import useCartStore from "@/store/useCartStore";

const BoxCustomizerPage = () => {
  const router = useRouter();
  const photocart = usePhotoFinalPreview((state) => state.photocart);
  const updateCart = usePhotoFinalPreview((state) => state.updateCart);
  const addToPhotoCart = usePhotoFinalPreview((state) => state.addToCart);

  const { addToCart, cart } = useCartStore();

  const [loading, setLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [boxImages, setBoxImages] = useState([]);
  const boxPreviewRef = useRef(null);
  const boxPreviewCaptureRef = useRef(null);

  useEffect(() => {
    if (photocart && photocart[0]) {
      const savedBoxImages = photocart[0].boxImages;
      if (savedBoxImages && Array.isArray(savedBoxImages)) {
        setBoxImages(savedBoxImages);
      }
    }
  }, [photocart]);

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

  const ensureInCart = () => {
    const photoItem = photocart?.[0];
    if (!photoItem) return false;

    // Keep the photo-preview store in sync (used by the preview/box flow)
    const alreadyInPhotoCart = photocart.some(
      (item) => item?.id === photoItem?.id,
    );
    if (!alreadyInPhotoCart) addToPhotoCart(photoItem);

    // Also push into the real cart store — the checkout page reads from it
    const alreadyInCart = cart.some((item) => item?.id === photoItem?.id);
    if (!alreadyInCart) addToCart(photoItem);

    return true;
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!ensureInCart()) return;
    setCheckoutLoading(true);

    const boxImage = await captureBoxImage();

    // Capture browser-resolved frame/image geometry for each photo.
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
        boxImages: resolvedBoxImages,
      });
    }

    router.push("/my-cart/checkout");
    setCheckoutLoading(false);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!ensureInCart()) return;
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
        boxImages: resolvedBoxImages,
      });
    }

    setTimeout(() => setLoading(false), 900);
  };

  const updatePosition = (id, dxFraction, dyFraction) => {
    setBoxImages((prev) =>
      prev.map((img) =>
        img.id === id
          ? {
              ...img,
              xFraction: (img.xFraction || 0) + dxFraction,
              yFraction: (img.yFraction || 0) + dyFraction,
            }
          : img,
      ),
    );
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
          <h1 className="text-xl text-gray-600">Customize Your Box</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push("/my-cart/checkout")}
            className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-md shadow-md cursor-pointer transition duration-100 flex items-center gap-2"
          >
            Skip
          </button>
          <button
            onClick={handleAddToCart}
            className="border border-gray-200 bg-sky-400 hover:bg-sky-500 text-white p-2 rounded-md shadow-md cursor-pointer transition duration-100 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading || checkoutLoading}
          >
            {loading ? <SpinLoader /> : <IoCartOutline className="text-xl" />}
            Add to Cart
          </button>
          <button
            onClick={handleCheckout}
            className="border border-gray-200 bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-md shadow-md cursor-pointer transition duration-100 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading || checkoutLoading}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
        <div className="relative flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-6 overflow-hidden">
          <div
            ref={boxPreviewRef}
            className="inline-block"
            style={{
              transform: "scale(1.35)",
              transformOrigin: "center center",
            }}
          >
            <PhotoPortraitBoxPreview
              ref={boxPreviewCaptureRef}
              boxImages={boxImages}
              onImagePositionChange={updatePosition}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Photo Upload
          </h2>
          <PhotoPortraitBoxCustomizer
            boxImages={boxImages}
            onBoxImagesChange={setBoxImages}
          />
        </div>
      </div>
    </div>
  );
};

export default BoxCustomizerPage;
