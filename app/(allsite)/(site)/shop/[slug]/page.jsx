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
        } else if (type == "photo") {
          router.push(`/application/photoportrait/${slug}`);
        } else {
          router.push(`/shop/${slug}/select`);
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

  if (fetchloading) return <SingleProductSkeleton />;

  return (
    <div className="h-fit w-full container mx-auto my-8  border border-gray-200 rounded-lg relative">
      <div>
        <div className="pb-8 items-center flex justify-between sticky top-17.5 bg-white py-2 px-5 rounded-lg border">
          <div className="flex justify-between gap-4 mt-3 w-full">
            <Link
              href={"/shop"}
              className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-sky-300 transition cursor-pointer flex items-center gap-1 justify-center"
            >
              <FaArrowLeft />
              Back
            </Link>

            <ViewCart />
          </div>
        </div>

        <div className="grid bg-white grid-cols-1 md:grid-cols-5 gap-8 px-8 text-gray-700 pb-8 pt-5">
          <div className="w-full col-span-2 flex justify-center">
            <Image
              src={data?.image}
              alt="Thumbnail"
              width={1000}
              height={900}
              className="w-auto h-auto bg-gray-200 border border-gray-200 rounded-md"
            />
          </div>
          <div className="col-span-3 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold tracking-wide uppercase text-sky-600">
                {data?.type === "trading" && "Trading Card"}
                {data?.type === "customizable" && "Customizable Card"}
                {data?.type === "photo" && "Photo Portrait"}
                {data?.type === "simple" && "Simple Card"}
              </span>
              <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                {data?.name}
              </h2>
              <p className="text-gray-500 leading-relaxed line-clamp-2 pt-1">
                {data?.short_description}
              </p>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 bg-gray-50">
              <div className="flex items-baseline gap-2">
                {data?.offer_price ? (
                  <>
                    <span className="text-3xl font-extrabold text-gray-900">
                      ${data?.offer_price}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ${data?.price}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-extrabold text-gray-900">
                    ${data?.price}
                  </span>
                )}
              </div>
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  data?.status
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {data?.status ? "Published" : "Draft"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              {data?.category?.name}
            </div>

            <ul className="space-y-1.5">
              {(data?.type === "trading"
                ? [
                    "Perfect for gifting",
                    "Fully customizable",
                    "Made to be shared",
                  ]
                : data?.type === "customizable" || data?.type === "photo"
                  ? [
                      "Preview before you order",
                      "Premium quality",
                      "Made on demand",
                    ]
                  : ["Simple"]
              ).map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <BsStars className="text-sky-500 text-xs shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="space-y-2 pt-1">
              {data?.type === "photo" ? (
                <button
                  onClick={(e) =>
                    handleCustomizerNav(
                      e,
                      `/application/photoportrait/${data?.slug}`,
                    )
                  }
                  disabled={btnLoading}
                  className="w-full inline-flex justify-center items-center gap-2 rounded-lg bg-linear-to-r from-sky-500 to-sky-600 text-white py-3 px-4 text-md font-semibold shadow-md hover:shadow-lg hover:brightness-105 transition cursor-pointer"
                >
                  {btnLoading ? (
                    <SpinLoader />
                  ) : (
                    <BsStars className="text-white text-xl" />
                  )}
                  Create Your Photo Portrait
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    {
                      data?.type === "customizable" || data?.type === "trading"
                        ? handleaddToCustomizable(e, data?.type, data?.slug)
                        : handleaddToCart(e);
                    }
                  }}
                  disabled={btnLoading}
                  className="w-full inline-flex justify-center items-center gap-2 rounded-lg bg-linear-to-r from-sky-500 to-sky-600 text-white py-3 px-4 text-md font-semibold shadow-md hover:shadow-lg hover:brightness-105 transition cursor-pointer"
                >
                  {btnLoading ? (
                    <SpinLoader />
                  ) : data?.type === "customizable" ||
                    data?.type === "trading" ? (
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
              )}
              <p className="text-xs text-gray-400 text-center">
                Create yours in under 2 minutes
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white py-2 pb-6 px-5 rounded-b-lg">
          <div className="flex flex-wrap gap-6 mt-4">
            {getSortedGalleryImages(data?.gallery_images)?.map((img, idx) => (
              <Image
                onClick={() => {
                  (setmodelopen(true), setCurrentIndex(idx + 1));
                }}
                key={idx}
                src={img?.url}
                alt={`Gallery ${idx}`}
                width={70}
                height={80}
                className="rounded-md bg-gray-200 cursor-pointer border border-gray-200"
              />
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />

      <div
        className={`${modelopen ? "block" : "hidden"} text-black w-full h-full absolute top-0 left-0 rounded-lg bg-[#0000009c] select-none`}
      >
        <div
          onClick={() => setmodelopen(false)}
          className="absolute -top-3 -right-3 bg-sky-400 text-whtie w-8.75 h-8.75 rounded-full flex items-center justify-center text-white cursor-pointer border border-sky-400 hover:border hover:border-white transition-all duration-300 ease-in-out hover:rotate-360"
        >
          <RxCross2 className="text-2xl" />
        </div>

        <div className="absolute -top-3 left-[50%] bg-sky-400 text-whtie rounded-xl flex items-center justify-center text-white cursor-pointer border border-sky-400 hover:border hover:border-white transition-all duration-300 ease-in-out px-1 py-0">
          {currentIndex}/{data?.gallery_images?.length}
        </div>

        <div className="w-full h-full rounded-lg flex items-center justify-between px-3 py-6 gap-2">
          <div
            onClick={() => {
              currentIndex > 1 && setCurrentIndex(currentIndex - 1);
            }}
            className="bg-sky-400 text-whtie w-8.75 h-8.75 rounded-full flex items-center justify-center text-white cursor-pointer"
          >
            <RiArrowLeftFill className="text-xl" />
          </div>
          <div className="w-full h-full rounded-lg flex items-center justify-center">
            {getSortedGalleryImages(data?.gallery_images)?.map(
              (img, idx) =>
                currentIndex - 1 === idx && (
                  <Image
                    key={idx}
                    src={img?.url}
                    alt={`Gallery ${idx}`}
                    width={250}
                    height={300}
                    className="rounded-md cursor-pointer w-auto h-auto object-contain"
                  />
                ),
            )}
          </div>
          <div
            onClick={() => {
              currentIndex < data?.gallery_images?.length &&
                setCurrentIndex(currentIndex + 1);
            }}
            className="bg-sky-400 text-whtie w-8.75 h-8.75 rounded-full flex items-center justify-center text-white cursor-pointer"
          >
            <RiArrowRightFill className="text-xl" />
          </div>
        </div>
      </div>

      {SubcriptionModal && (
        <div className="absolute top-0 left-0 w-full rounded-md h-full bg-[#0000006e] z-50 flex items-center justify-center">
          <div className="bg-white text-gray-800  px-6 w-fit h-fit rounded-md shadow-md text-center flex flex-col items-center py-6 relative">
            <div
              onClick={() => {
                setSubcriptionModal(false);
              }}
              className="absolute -top-2.5 cursor-pointer -right-2.5 bg-sky-400 text-white p-1 rounded-full"
            >
              <ImCross className="text-sm" />
            </div>
            <div className="px-2 py-1 bg-red-100 border border-red-200 rounded-md mb-4">
              <h4>This product isn’t Opened yet</h4>
            </div>
            <h3 className="text-2xl font-semibold mb-2">Stay Updated!</h3>
            <p className="text-gray-500 text-sm mb-6">
              Enter your email below to get notified as soon as this product
              goes live.
            </p>
            <div className="flex item-center gap-2 h-10 mt-3">
              <input
                onChange={(e) => {
                  setsubemail(e.target.value);
                }}
                type="email"
                className="border border-gray-200 p-2 rounded-md h-full"
                placeholder="Your Email"
              />
              <button
                onClick={(e) => {
                  subcribes(e);
                }}
                className="text-white bg-sky-400 px-3 py-2 rounded-md cursor-pointer flex items-center gap-2"
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
