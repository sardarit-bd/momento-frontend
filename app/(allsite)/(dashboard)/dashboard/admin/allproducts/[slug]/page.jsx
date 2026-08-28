"use client";

import SingleProductSkeleton from "@/app/componnent/skelaton/SingleProductSkeleton ";
import getCookie from "@/utilis/helper/cookie/gettooken";
import MakeDelete from "@/utilis/requestrespose/delete";
import MakeGet from "@/utilis/requestrespose/get";
import MakePost from "@/utilis/requestrespose/post";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

const SingleProduct = () => {
  const { slug } = useParams();
  const router = useRouter();
  const token = getCookie();
  const [fetchloading, setfetchloading] = useState(true);
  const [data, setdata] = useState(null);

  const fetching = useCallback(
    async (slug, token) => {
      try {
        const response = await MakeGet(`api/cardproduct/${slug}`, token);
        setdata(response?.data);
        setfetchloading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setfetchloading(false);
      }
    },
    [slug, token],
  );

  useEffect(() => {
    fetching(slug, token);
  }, []);

  const handleDelect = async (e, id) => {
    e.preventDefault();
    try {
      setfetchloading(true);
      const response = await MakeDelete(`api/products/${id}`, token);
      if (response?.success) {
        router.push("/dashboard/admin/allproducts");
        toast.success(response?.message);
      } else {
        toast.error("Something Went Wrong");
      }
      setfetchloading(false);
    } catch (error) {
      console.error("Error deleting product:", error);
      setfetchloading(false);
    }
  };

  const handleStatusUpdater = async (e, id, status) => {
    e.preventDefault();
    try {
      setfetchloading(true);
      const response = await MakePost(
        `api/updateproduct`,
        {
          id,
          status: status ? 0 : 1,
        },
        token,
      );
      if (response?.success) {
        toast.success(response?.message);
        fetching(slug, token);
      } else {
        toast.error("Something Went Wrong");
      }
      setfetchloading(false);
    } catch (error) {
      console.error("Error updating status:", error);
      setfetchloading(false);
    }
  };

  if (fetchloading) return <SingleProductSkeleton />;

  const layerSections = [
    { label: "Base Cards", items: data?.customizations?.custom_sets },
    { label: "Skin Tone", items: data?.customizations?.skin_tones },
    { label: "Hair Layer", items: data?.customizations?.hairs },
    { label: "Nose Layer", items: data?.customizations?.noses },
    { label: "Eyes Layer", items: data?.customizations?.eyes },
    { label: "Mouth Layer", items: data?.customizations?.mouths },
    { label: "Dress Layer", items: data?.customizations?.dresses },
    { label: "Crown Layer", items: data?.customizations?.crowns },
    { label: "Beard Layer", items: data?.customizations?.beards },
  ];

  return (
    <div className="pb-10">
      <div className="sticky top-0 md:top-17.5 z-30 bg-white border-b border-gray-100 shadow-sm px-4 py-3 mb-6">
        <div className="flex flex-col gap-2">
          <span className="text-lg font-bold text-gray-800">
            Product Overview
          </span>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/admin/allproducts"
              className="flex items-center gap-1 bg-sky-100 hover:bg-sky-200 text-sky-700 font-semibold text-xs px-3 py-2 rounded-lg transition"
            >
              <FaArrowLeft className="text-xs" />
              <span className="hidden sm:inline">Back</span>
            </Link>

            <button
              onClick={(e) => handleStatusUpdater(e, data?.id, data?.status)}
              className="bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs px-3 py-2 rounded-lg transition cursor-pointer whitespace-nowrap"
            >
              {data?.status ? "Draft" : "Publish"}
            </button>

            <button
              onClick={(e) => handleDelect(e, data?.id)}
              className="flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-600 font-semibold text-xs px-3 py-2 rounded-lg transition cursor-pointer"
            >
              <MdDelete className="text-sm" />
              <span className="hidden sm:inline">Delete</span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="col-span-1 md:col-span-3 space-y-3">
            <div className="block md:hidden rounded-xl overflow-hidden border border-gray-100 shadow-sm mb-4">
              {data?.image ? (
                <Image
                  src={data?.image}
                  alt="Thumbnail"
                  width={800}
                  height={800}
                  className="w-full object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                  No Thumbnail
                </div>
              )}
            </div>

            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 space-y-2.5">
              {[
                { label: "Name", value: data?.name },
                { label: "Type", value: data?.type, capitalize: true },
                { label: "Price", value: `$${data?.price}` },
                {
                  label: "Offer Price",
                  value: data?.offer_price ? `$${data?.offer_price}` : "—",
                },
                {
                  label: "Status",
                  value: data?.status ? "Published" : "Draft",
                },
                { label: "Category", value: data?.category?.name },
                {
                  label: "Short Description",
                  value: data?.short_description,
                },
                { label: "Description", value: data?.description },
              ].map(({ label, value, capitalize }) => (
                <div key={label} className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-semibold text-gray-700 text-sm min-w-32.5">
                    {label}:
                  </span>
                  <span
                    className={`text-gray-600 text-sm ${capitalize ? "capitalize" : ""}`}
                  >
                    {value ?? "—"}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4">
              <h3 className="font-bold text-gray-800 mb-3">Gallery Images</h3>
              {data?.gallery_images?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {data.gallery_images.map((img, idx) => (
                    <Image
                      key={idx}
                      src={img?.url}
                      alt={`Gallery ${idx}`}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover w-16 h-16 sm:w-20 sm:h-20 border border-gray-100"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No gallery images</p>
              )}
            </div>

            {data?.type === "customizable" && (
              <div className="space-y-4">
                {layerSections.map(({ label, items }) => (
                  <div
                    key={label}
                    className="bg-white border border-gray-100 rounded-xl shadow-sm p-4"
                  >
                    <h3 className="font-bold text-gray-800 mb-3">{label}</h3>
                    {items?.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {items.map((img, idx) => (
                          <Image
                            key={idx}
                            src={img?.image}
                            alt={`${label} ${idx}`}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover w-16 h-16 sm:w-20 sm:h-20 border border-gray-100"
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 text-sm">
                        No {label.toLowerCase()} available
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="hidden md:block col-span-1">
            <div className="sticky top-35">
              <h3 className="font-bold text-gray-800 mb-2">Thumbnail</h3>
              {data?.image ? (
                <Image
                  src={data?.image}
                  alt="Thumbnail"
                  width={1000}
                  height={1000}
                  className="w-full rounded-xl border border-gray-100 shadow-sm"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-sm">
                  No Thumbnail
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default SingleProduct;
