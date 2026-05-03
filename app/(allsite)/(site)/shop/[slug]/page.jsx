"use client";

import SingleProductSkeleton from "@/app/componnent/skelaton/SingleProductSkeleton ";
import SpinLoader from "@/app/componnent/SpingLoader";
import ViewCart from "@/app/componnent/ViewCart";
import useCartStore from "@/store/useCartStore";
import generateUserId from "@/utilis/helper/generateUserId";
import MakeGet from "@/utilis/requestrespose/get";
import MakePost from "@/utilis/requestrespose/post";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BsStars } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import { RiArrowLeftFill, RiArrowRightFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { toast, ToastContainer } from "react-toastify";

const SingleProduct = () => {
  const { slug } = useParams();
  const router = useRouter();
  const [subcribeloading, setsubcribeloading] = useState(false);
  const [modelopen, setmodelopen] = useState(false);
  const [subemail, setsubemail] = useState("");
  const [SubcriptionModal, setSubcriptionModal] = useState(false);
  const [fetchloading, setfetchloading] = useState(true);
  const [isedit, setisedit] = useState(false);
  const [name, setname] = useState("");
  const [image, setimage] = useState("");
  const [des, setdes] = useState("");
  const [data, setdata] = useState(null);
  const [btnLoading, setbtnLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart, cart, removeFromCart } = useCartStore();

  const fetching = useCallback(
    async (slug) => {
      try {
        const response = await MakeGet(`api/shop/${slug}`);
        setdata(response?.data);
        setfetchloading(false);
      } catch (error) {
        console.error("Error fetching All Products:", error);
        setfetchloading(false);
      }
    },
    [slug],
  );

  useEffect(() => {
    fetching(slug);
  }, []);

  console.log(data);

  const handleaddToCart = (e) => {
    e.preventDefault();
    setTimeout(() => {
      if (data?.status) {
        setbtnLoading(true);
        const product = {
          id: generateUserId(),
          productId: data?.id,
          productSlug: data?.slug,
          productName: data?.name,
          productType: data?.type,
          productUnitPrice:
            data?.offer_price > 0 ? data?.offer_price : data?.price,
          productQuantity: 1,
          productImage: data?.image,
          productDescription: data?.description,
          FinalProduct: data?.images,
        };
        addToCart(product);
        setbtnLoading(false);
      } else {
        setSubcriptionModal(true);
      }
    }, 1000);
  };

  const handleaddToCustomizable = (e, type, slug) => {
    e.preventDefault();
    setbtnLoading(true);
    setTimeout(() => {
      setbtnLoading(false);
      if (data?.status) {
        if (type == "customizable") {
          router.push(`/application/deckcard/${slug}`);
        } else {
          router.push(`/application/tradingcard/${slug}`);
        }
      } else {
        setSubcriptionModal(true);
      }
    }, 1000);
  };

  const subcribes = async (e) => {
    e.preventDefault();
    if (subemail) {
      setsubcribeloading(true);
      const res = await MakePost("api/subscribers", { email: subemail });
      setsubcribeloading(false);
      if (res?.success) {
        setSubcriptionModal(false);
        toast.success("Thank you for Subscribe.");
      } else {
        toast.error("Something Went Wrong! Please Try Again.");
      }
    } else {
      toast.warn("Email is Required");
    }
  };

  console.log(data);

  if (fetchloading) return <SingleProductSkeleton />;

  const typeLabel =
    data?.type === "trading"
      ? "Trading Card"
      : data?.type === "customizable"
        ? "Customizable Card"
        : "Simple Card";

  const typeTagColor =
    data?.type === "trading"
      ? "bg-amber-50 text-amber-600 border-amber-200"
      : data?.type === "customizable"
        ? "bg-sky-50 text-sky-600 border-sky-200"
        : "bg-gray-50 text-gray-600 border-gray-200";

  const subText =
    data?.type === "trading"
      ? "Perfect for gifting • Fully customizable • Made to be shared"
      : data?.type === "customizable"
        ? "Preview before you order • Premium quality • Made on demand"
        : "Simple";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Nav Bar */}
        <div className="flex items-center justify-between mb-8 sticky top-0 z-30 bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl px-5 py-3 shadow-sm">
          <Link
            href={"/shop"}
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-600 text-sm font-semibold py-2.5 px-5 rounded-xl border border-gray-200 hover:border-gray-300 hover:text-gray-800 hover:bg-gray-50 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
          >
            <FaArrowLeft />
            Back
          </Link>
          <ViewCart />
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
            <div className="md:col-span-2 bg-linear-to-br from-sky-50 to-blue-50 flex items-center justify-center p-10 min-h-85 relative">
              <div className="absolute inset-6 rounded-2xl border border-sky-100 opacity-60 pointer-events-none" />
              <Image
                src={data?.image}
                alt="Thumbnail"
                width={250}
                height={300}
                className="w-auto h-auto max-h-80 rounded-2xl object-contain drop-shadow-lg relative z-10"
              />
            </div>

            <div className="md:col-span-3 p-8 flex flex-col justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full border ${typeTagColor}`}
                  >
                    {typeLabel}
                  </span>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full border ${data?.status ? "bg-green-50 text-green-600 border-green-200" : "bg-red-50 text-red-500 border-red-200"}`}
                  >
                    {data?.status ? "Available" : "Draft"}
                  </span>
                  {data?.category?.name && (
                    <span className="text-xs font-semibold px-3 py-1 rounded-full border bg-violet-50 text-violet-600 border-violet-200">
                      {data.category.name}
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                  {data?.name}
                </h1>

                {data?.short_description && (
                  <p className="text-sm text-gray-500  leading-relaxed">
                    {data.short_description}
                  </p>
                )}
              </div>

              {/* Pricing */}
              <div className="flex items-end gap-3">
                <span className="text-3xl font-extrabold text-sky-500 tracking-tight">
                  $
                  {parseFloat(
                    data?.offer_price > 0
                      ? data?.offer_price
                      : data?.price || 0,
                  ).toFixed(2)}
                </span>
                {parseFloat(data?.offer_price) > 0 && (
                  <span className="text-base text-gray-400 line-through font-medium mb-1">
                    ${parseFloat(data?.price).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Divider */}
              <div className="h-px bg-linear-to-r from-sky-100 via-gray-100 to-transparent" />

              {/* CTA Area */}
              <div className="space-y-3">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">
                  Create yours in under 2 minutes
                </p>
                <button
                  onClick={(e) => {
                    data?.type === "customizable" || data?.type === "trading"
                      ? handleaddToCustomizable(e, data?.type, data?.slug)
                      : handleaddToCart(e);
                  }}
                  disabled={btnLoading}
                  className="flex items-center justify-center gap-2 bg-linear-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white text-sm sm:text-base font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-sky-300 active:scale-95 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {btnLoading ? (
                    <SpinLoader />
                  ) : data?.type === "customizable" ? (
                    <BsStars className="text-white text-xl" />
                  ) : (
                    <FiShoppingCart className="text-xl text-white" />
                  )}
                  {data?.type === "customizable"
                    ? "Create Your Deck"
                    : data?.type === "trading"
                      ? "Create Your Momento"
                      : "Add to Cart"}
                </button>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {subText}
                </p>
              </div>
            </div>
          </div>

          {/* Gallery Strip */}
          {data?.gallery_images?.length > 0 && (
            <div className="border-t border-gray-100 px-4 lg:px-8 py-6 bg-gray-50/50">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                Gallery
              </p>
              <div className="flex flex-wrap gap-3">
                {data.gallery_images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setmodelopen(true);
                      setCurrentIndex(idx + 1);
                    }}
                    className="group relative rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-sky-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  >
                    <Image
                      src={img?.url}
                      alt={`Gallery ${idx}`}
                      width={80}
                      height={90}
                      className="rounded-xl object-cover w-18 h-20 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-sky-500/0 group-hover:bg-sky-500/10 transition-all duration-200 rounded-xl" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <ToastContainer />

      {/* Image Lightbox Modal */}
      <div
        className={`${modelopen ? "flex" : "hidden"} fixed inset-0 z-50 bg-black/70 backdrop-blur-sm items-center justify-center`}
      >
        <div className="relative w-full max-w-2xl mx-4">
          {/* Close */}
          <button
            onClick={() => setmodelopen(false)}
            className="absolute -top-4 -right-4 z-10 bg-sky-400 text-white w-9 h-9 rounded-full flex items-center justify-center border-2 border-white hover:bg-sky-500 transition-all duration-200 shadow-lg"
          >
            <RxCross2 className="text-lg" />
          </button>

          {/* Counter */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 bg-sky-400 text-white text-xs font-semibold px-3 py-1 rounded-full border-2 border-white shadow">
            {currentIndex} / {data?.gallery_images?.length}
          </div>

          {/* Image Viewer */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-6 gap-4 min-h-100">
              <button
                onClick={() =>
                  currentIndex > 1 && setCurrentIndex(currentIndex - 1)
                }
                className={`bg-sky-400 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${currentIndex <= 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-sky-500 cursor-pointer"}`}
              >
                <RiArrowLeftFill className="text-xl" />
              </button>

              <div className="flex-1 flex items-center justify-center min-h-80">
                {data?.gallery_images?.map(
                  (img, idx) =>
                    currentIndex - 1 === idx && (
                      <Image
                        key={idx}
                        src={img?.url}
                        alt={`Gallery ${idx}`}
                        width={400}
                        height={500}
                        className="rounded-xl object-contain max-h-100 w-auto h-auto"
                      />
                    ),
                )}
              </div>

              <button
                onClick={() =>
                  currentIndex < data?.gallery_images?.length &&
                  setCurrentIndex(currentIndex + 1)
                }
                className={`bg-sky-400 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${currentIndex >= data?.gallery_images?.length ? "opacity-40 cursor-not-allowed" : "hover:bg-sky-500 cursor-pointer"}`}
              >
                <RiArrowRightFill className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Modal */}
      {SubcriptionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 relative text-center">
            <button
              onClick={() => setSubcriptionModal(false)}
              className="absolute -top-3 -right-3 bg-sky-400 text-white p-1.5 rounded-full shadow-md hover:bg-sky-500 transition-colors cursor-pointer"
            >
              <ImCross className="text-xs" />
            </button>

            {/* Icon */}
            <div className="w-14 h-14 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-400"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-red-50 border border-red-100 text-red-500 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              Not available yet
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Stay Updated!
            </h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Enter your email below to get notified as soon as this product
              goes live.
            </p>

            <div className="flex items-center gap-2">
              <input
                onChange={(e) => setsubemail(e.target.value)}
                type="email"
                className="flex-1 border border-gray-200 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all placeholder-gray-400"
                placeholder="your@email.com"
              />
              <button
                onClick={(e) => subcribes(e)}
                className="text-white bg-sky-400 hover:bg-sky-500 px-4 py-2.5 rounded-xl cursor-pointer flex items-center gap-2 font-semibold text-sm transition-colors shrink-0"
              >
                {subcribeloading && <SpinLoader />}
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
