"use client";

import One from "@/app/componnent/One";
import Prograssber from "@/app/componnent/Progressbar";
import Three from "@/app/componnent/Three";
import Two from "@/app/componnent/Two";
import useProductUploadStore from "@/store/useProductUploadStore";

const ImageIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="4"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <circle cx="8.5" cy="9" r="1.5" fill="currentColor" />
    <path
      d="M4.5 16.5L9 12l3 3 3.5-3.5L19.5 16"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AdminOrders = () => {
  const { rander, setrander, productType } = useProductUploadStore();
  const isCustomizable =
    productType === "customizable" || productType === "photo";

  return (
    <div>
      <Prograssber />
      <div className="pt-6 pb-4">
        {rander === 1 && <One />}
        {rander === 2 && <Two />}
        {rander === 3 && <Three />}
      </div>
    </div>
  );
};

export default AdminOrders;
