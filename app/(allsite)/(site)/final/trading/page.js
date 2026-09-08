"use client";
import SpinLoader from "@/app/componnent/SpingLoader";
import useboxcartstore from "@/store/useboxcartstore";
import useCartStore from "@/store/useCartStore";
import useTradingFinalPreview from "@/store/useTradingFinalPreview";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { FaBoxOpen, FaEdit } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const PACKAGE_LABELS = {
  single: { name: "Single", subtitle: "1 design · 18 copies", icon: "🎴" },
  trio: { name: "Trio", subtitle: "3 designs · 6 each", icon: "🎴🎴" },
  collection: {
    name: "Collection",
    subtitle: "6 designs · 3 each",
    icon: "",
  },
};

const FinalCardsPage = () => {
  const [loading, setloading] = useState(false);
  const { addToCart } = useCartStore();
  const { tradingcart } = useTradingFinalPreview();
  const { boxs } = useboxcartstore();
  const router = useRouter();

  const product = tradingcart?.[0] || null;
  const packageInfo =
    PACKAGE_LABELS[product?.selectedPackage] || PACKAGE_LABELS.single;

  const [packageTitle, setPackageTitleLocal] = useState("");
  const [showTitleModal, setShowTitleModal] = useState(false);
  const [titleDraft, setTitleDraft] = useState("");

  useEffect(() => {
    const saved =
      localStorage.getItem("persistent_packageTitle") ||
      product?.packTitle ||
      "";
    setPackageTitleLocal(saved);
    setTitleDraft(saved);
    if (!saved.trim()) {
      setShowTitleModal(true);
    }
  }, [product?.packTitle]);

  const saveTitle = () => {
    if (!titleDraft.trim()) {
      toast.warn("Please enter a title for your package.");
      return;
    }
    localStorage.setItem("persistent_packageTitle", titleDraft.trim());
    setPackageTitleLocal(titleDraft.trim());
    setShowTitleModal(false);
  };

  const tradingBoxImage = boxs?.find((b) => b?.bfor === "trading")?.BoxImage;

  async function handleContinueToCart(e) {
    e.preventDefault();

    if (!packageTitle.trim()) {
      setShowTitleModal(true);
      return;
    }

    if (!product) {
      toast.error("No customized cards found. Please go back and customize.");
      return;
    }

    setloading(true);
    try {
      const finalProduct = { ...product, packTitle: packageTitle };
      addToCart(finalProduct);
      const { saveCartImagesToIDB } = await import("@/store/useCartStore");
      await saveCartImagesToIDB([finalProduct]);
      router.push("/my-cart/checkout");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setloading(false);
    }
  }

  const frontCards = (product?.FinalProduct || []).filter(
    (c) => c?.side === "front",
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-sky-50">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <button
              onClick={() => router.back()}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium text-sm  transition-all duration-200"
            >
              <BiLeftArrowAlt className="text-xl group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">Back</span>
            </button>

            <h1 className="text-lg md:text-xl font-bold text-slate-800">
              Review Your Package
            </h1>

            <button
              onClick={handleContinueToCart}
              disabled={loading}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3CA9FF]  text-white font-semibold text-sm over:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
            >
              {loading ? (
                <SpinLoader />
              ) : (
                <>
                  <IoCartOutline className="text-xl group-hover:rotate-12 transition-transform" />
                  <span className="hidden sm:inline">Add to Cart</span>
                  <span className="sm:hidden">Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8 rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex items-start gap-3 mb-6">
              {/* <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-sky-500 to-sky-600 flex items-center justify-center text-2xl shadow-lg shadow-sky-200">
                {packageInfo.icon}
              </div> */}
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Package
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                  {packageInfo.name}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {packageInfo.subtitle}
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-linear-to-r from-slate-50 to-slate-100 border border-slate-200 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Package Title
                  </p>
                  <p className="text-lg font-semibold text-slate-800">
                    {packageTitle || (
                      <span className="text-slate-400 italic">Not set</span>
                    )}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setTitleDraft(packageTitle);
                    setShowTitleModal(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-sky-600 font-semibold text-sm  hover:shadow-md transition-all duration-200"
                >
                  <FaEdit className="text-sm" />
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>

        {frontCards.length > 0 && (
          <div className="mb-10">
            <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
              {/* <FaImage className="text-sky-500" /> */}
              Your Customized Cards
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {frontCards.map((card, idx) =>
                card.image ? (
                  <div
                    key={card.card_pair_key || idx}
                    className="group relative aspect-3/4 rounded-2xl overflow-hidden border-2 border-slate-200 bg-white shadow-md hover:shadow-xl hover:border-sky-300 transition-all duration-300 hover:-translate-y-1"
                  >
                    <Image
                      src={card.image}
                      alt={card.name || `Card ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ) : null,
              )}
            </div>
          </div>
        )}

        {tradingBoxImage && (
          <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 md:p-8 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                {/* <FaBoxOpen className="text-sky-500" /> */}
                Packaging Preview
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Your custom packaging design
              </p>
            </div>
            <div className="p-6 md:p-8 bg-linear-to-br from-slate-50 to-white">
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-2xl rounded-2xl overflow-hidden border-2 border-slate-200 shadow-lg">
                  <Image
                    src={tradingBoxImage}
                    alt="Trading card box packaging"
                    width={1000}
                    height={1000}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {!tradingBoxImage && (
          <div className="rounded-3xl bg-white border-2 border-dashed border-slate-300 p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <FaBoxOpen className="text-2xl text-slate-400" />
            </div>
            <p className="text-slate-500 font-medium">
              No packaging preview available
            </p>
          </div>
        )}
      </main>

      {showTitleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-linear-to-r from-sky-500 to-sky-600 p-6">
              <h3 className="text-2xl font-bold text-white">
                Name Your Package
              </h3>
              <p className="text-sky-100 text-sm mt-2">
                This title will appear on your packaging and help you remember
                what&apos;s inside.
              </p>
            </div>

            <div className="p-6">
              <input
                autoFocus
                value={titleDraft}
                onChange={(e) => setTitleDraft(e.target.value)}
                maxLength={30}
                placeholder="e.g., Birthday Memories, Family Reunion..."
                className="w-full h-14 rounded-xl border-2 border-slate-200 bg-slate-50 px-5 text-slate-800 placeholder-slate-400 outline-none focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100 transition-all text-base font-medium"
              />
              <div className="flex justify-end gap-3 mt-6">
                {packageTitle.trim() && (
                  <button
                    onClick={() => setShowTitleModal(false)}
                    className="px-5 py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={saveTitle}
                  className="px-6 py-3 rounded-xl bg-linear-to-r from-sky-500 to-sky-600 text-white font-semibold shadow-lg shadow-sky-200 hover:shadow-xl hover:shadow-sky-300 hover:scale-105 transition-all duration-200"
                >
                  Save Title
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinalCardsPage;
