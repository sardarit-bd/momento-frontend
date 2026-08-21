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
import { FiCheck, FiShoppingCart } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import { RiArrowLeftFill, RiArrowRightFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { toast, ToastContainer } from "react-toastify";

const DESIRED_ORDER = [
  2, 3, 1, 0, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 16, 14, 13, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 28, 29, 27, 26, 30, 31, 32, 33, 34, 35, 36, 37, 38, 41, 42,
  40, 39, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53,
];

const getSortedGalleryImages = (images = []) => {
  if (images.length !== DESIRED_ORDER.length) return images;
  return DESIRED_ORDER.map((i) => images[i]);
};

const SingleProduct = () => {
  const { slug } = useParams();
  const router = useRouter();
  const [subcribeloading, setsubcribeloading] = useState(false);
  const [modelopen, setmodelopen] = useState(false);
  const [subemail, setsubemail] = useState("");
  const [SubcriptionModal, setSubcriptionModal] = useState(false);
  const [fetchloading, setfetchloading] = useState(true);
  const [data, setdata] = useState(null);
  const [btnLoading, setbtnLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart } = useCartStore();
  const fetching = useCallback(async (productSlug) => {
    try {
      const response = await MakeGet(`api/shop/${productSlug}`);
      setdata(response?.data);
      setfetchloading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setfetchloading(false);
    }
  }, []);

  useEffect(() => {
    if (slug) {
      fetching(slug);
    }
  }, [slug, fetching]);

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

  const handleaddToCustomizable = (e, type, productSlug) => {
    e.preventDefault();
    setbtnLoading(true);

    setTimeout(() => {
      setbtnLoading(false);

      if (data?.status) {
        if (type === "customizable") {
          router.push(`/application/deckcard/${productSlug}`);
        } else if (type === "photo") {
          router.push(`/application/photoportrait/${productSlug}`);
        } else {
          router.push(`/shop/${productSlug}/select`);
        }
      } else {
        setSubcriptionModal(true);
      }
    }, 1000);
  };

  const handleCustomizerNav = (e, path) => {
    e.preventDefault();
    setbtnLoading(true);

    setTimeout(() => {
      setbtnLoading(false);

      if (data?.status) {
        router.push(path);
      } else {
        setSubcriptionModal(true);
      }
    }, 1000);
  };

  const subcribes = async (e) => {
    e.preventDefault();

    if (subemail) {
      setsubcribeloading(true);

      const res = await MakePost("api/subscribers", {
        email: subemail,
      });

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

  if (fetchloading) {
    return <SingleProductSkeleton />;
  }

  const galleryImages = getSortedGalleryImages(data?.gallery_images);

  const productTypeLabel =
    data?.type === "trading"
      ? "Trading Card"
      : data?.type === "customizable"
        ? "Customizable Card"
        : data?.type === "photo"
          ? "Photo Portrait"
          : "Simple Card";

  const features =
    data?.type === "trading"
      ? ["Perfect for gifting", "Fully customizable", "Made to be shared"]
      : data?.type === "customizable" || data?.type === "photo"
        ? ["Preview before you order", "Premium quality", "Made on demand"]
        : ["Simple and easy to order"];

  const buttonLabel =
    data?.type === "photo"
      ? "Create Your Photo Deck"
      : data?.type === "customizable"
        ? "Create Your Deck"
        : data?.type === "trading"
          ? "Create Your Momento"
          : "Add to Cart";

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className=" border-gray-100 bg-white">
        <div className="mx-auto flex h-19 container items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
          >
            <FaArrowLeft className="text-sm transition-transform duration-200 group-hover:-translate-x-0.5" />
            Back to Shop
          </Link>

          <ViewCart />
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 ">
        <div className="grid items-start gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div className="min-w-0">
            <div className="relative flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-3xl bg-[#f5f6f7]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.95),rgba(245,246,247,0.8))]" />

              <Image
                src={data?.image}
                alt={data?.name || "Product"}
                width={1200}
                height={1000}
                priority
                className="relative z-10 h-full w-full object-contain p-6 transition-transform duration-500 hover:scale-[1.015] sm:p-10"
              />
            </div>

            {galleryImages?.length > 0 && (
              <div className="mt-5">
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setCurrentIndex(idx + 1);
                        setmodelopen(true);
                      }}
                      className={`group relative h-19 w-19 shrink-0 overflow-hidden rounded-xl border bg-gray-50 transition-all duration-200 ${
                        currentIndex === idx + 1 && modelopen
                          ? "border-sky-500 ring-2 ring-sky-100"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <Image
                        src={img?.url}
                        alt={`Product preview ${idx + 1}`}
                        fill
                        sizes="76px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:pt-2">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-sky-600">
                {productTypeLabel}
              </span>
            </div>

            <h1 className="max-w-2xl text-3xl font-semibold leading-[1.1] tracking-tight text-gray-950 sm:text-4xl lg:text-[44px]">
              {data?.name}
            </h1>

            <p className="mt-1 max-w-xl text-base leading-7 text-gray-500 sm:text-[17px]">
              {data?.short_description}
            </p>

            {data?.category?.name && (
              <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-gray-50 px-3.5 py-2 text-sm text-gray-600">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                {data?.category?.name}
              </div>
            )}

            <div className="mt-2  py-4">
              <div className="flex items-end gap-3">
                {data?.offer_price ? (
                  <>
                    <span className="text-4xl font-bold tracking-tight text-gray-950">
                      ${data?.offer_price}
                    </span>

                    <span className="mb-1 text-base text-gray-400 line-through">
                      ${data?.price}
                    </span>
                  </>
                ) : (
                  <span className="text-4xl font-bold tracking-tight text-gray-950">
                    ${data?.price}
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm text-gray-400">
                Premium personalized product
              </p>
            </div>

            <div className="">
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-sm text-gray-600 sm:text-[15px]"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-500">
                      <FiCheck className="text-sm" />
                    </span>

                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-9">
              {data?.type === "photo" ? (
                <button
                  onClick={(e) =>
                    handleCustomizerNav(
                      e,
                      `/application/photoportrait/${data?.slug}`,
                    )
                  }
                  disabled={btnLoading}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-sky-500 px-6 py-4 text-base font-semibold text-white shadow-[0_8px_25px_rgba(14,165,233,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-600 hover:shadow-[0_12px_30px_rgba(14,165,233,0.28)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {btnLoading ? (
                    <SpinLoader />
                  ) : (
                    <BsStars className="text-xl transition-transform duration-300 group-hover:rotate-12" />
                  )}

                  {buttonLabel}
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    if (
                      data?.type === "customizable" ||
                      data?.type === "trading"
                    ) {
                      handleaddToCustomizable(e, data?.type, data?.slug);
                    } else {
                      handleaddToCart(e);
                    }
                  }}
                  disabled={btnLoading}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-sky-500 px-6 py-4 text-base font-semibold text-white shadow-[0_8px_25px_rgba(14,165,233,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-600 hover:shadow-[0_12px_30px_rgba(14,165,233,0.28)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {btnLoading ? (
                    <SpinLoader />
                  ) : data?.type === "customizable" ||
                    data?.type === "trading" ? (
                    <BsStars className="text-xl transition-transform duration-300 group-hover:rotate-12" />
                  ) : (
                    <FiShoppingCart className="text-xl transition-transform duration-300 group-hover:scale-110" />
                  )}

                  {buttonLabel}
                </button>
              )}

              <p className="mt-3 text-center text-xs text-gray-400">
                Create yours in under 2 minutes
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3  text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <FiCheck className="text-sky-500" />
                Preview before ordering
              </span>

              <span className="flex items-center gap-1.5">
                <FiCheck className="text-sky-500" />
                Premium quality
              </span>
            </div>
          </div>
        </div>
      </section>

      <ToastContainer />

      {modelopen && galleryImages?.length > 0 && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setmodelopen(false)}
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-800 shadow-lg transition-all duration-200 hover:rotate-90 hover:bg-sky-500 hover:text-white"
          >
            <RxCross2 className="text-xl" />
          </button>

          <div className="absolute left-1/2 top-5 -translate-x-1/2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-lg">
            {currentIndex} / {galleryImages.length}
          </div>

          <button
            type="button"
            onClick={() => {
              if (currentIndex > 1) {
                setCurrentIndex(currentIndex - 1);
              }
            }}
            disabled={currentIndex <= 1}
            className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-800 shadow-lg transition-all hover:bg-sky-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RiArrowLeftFill className="text-xl" />
          </button>

          <div className="flex h-[85vh] w-full max-w-5xl items-center justify-center">
            {galleryImages.map(
              (img, idx) =>
                currentIndex - 1 === idx && (
                  <Image
                    key={idx}
                    src={img?.url}
                    alt={`Gallery ${idx + 1}`}
                    width={1000}
                    height={1000}
                    className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl"
                  />
                ),
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              if (currentIndex < galleryImages.length) {
                setCurrentIndex(currentIndex + 1);
              }
            }}
            disabled={currentIndex >= galleryImages.length}
            className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-800 shadow-lg transition-all hover:bg-sky-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RiArrowRightFill className="text-xl" />
          </button>
        </div>
      )}

      {SubcriptionModal && (
        <div className="fixed inset-0 z-110 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-7 text-center shadow-2xl">
            <button
              type="button"
              onClick={() => {
                setSubcriptionModal(false);
              }}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-800"
            >
              <ImCross className="text-xs" />
            </button>

            <div className="mx-auto mb-5 inline-flex rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-600">
              Coming Soon
            </div>

            <h3 className="text-2xl font-semibold tracking-tight text-gray-900">
              Stay Updated
            </h3>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
              Enter your email below and we&apos;ll let you know as soon as this
              product is available.
            </p>

            <form
              onSubmit={subcribes}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <input
                value={subemail}
                onChange={(e) => {
                  setsubemail(e.target.value);
                }}
                type="email"
                className="h-11 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-50"
                placeholder="Your email address"
              />

              <button
                type="submit"
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 text-sm font-semibold text-white transition hover:bg-sky-600"
              >
                {subcribeloading && <SpinLoader />}
                Notify Me
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default SingleProduct;
