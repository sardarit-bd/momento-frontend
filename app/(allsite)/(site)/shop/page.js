"use client";

import ShopCardSkeleton from "@/app/componnent/ShopCardSkeleton";
import useFilterStore from "@/store/useFilterStore";
import MakeGet from "@/utilis/requestrespose/get";
import { useEffect, useState } from "react";
import ShopCard from "../../../componnent/ShopCard";

const About = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { type, settype } = useFilterStore();

  const fetchProducts = async () => {
    const res = await MakeGet(`api/shop`);

    if (res.success) {
      setProducts(res?.data);
      setLoading(false);
    } else {
      setLoading(false);
      console.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(products);
  const filteredProducts = products?.data?.filter((p) => {
    if (type === "all") return true;
    return p.type === type;
  });

  if (loading) return <ShopCardSkeleton />;

  return (
    <div>
      <div className="text-gray-900 px-8 max-w-7xl mx-auto pt-9 lg:pt-16 flex items-center justify-between">
        <h3 className="text-gray-700 text-lg lg:text-3xl font-bold">
          {type === "trading"
            ? "Trading Cards"
            : type === "customizable"
              ? "Deck Cards"
              : type === "simple"
                ? "Simple Cards"
                : "All Products"}
        </h3>
        <select
          value={type}
          onChange={(e) => {
            settype(e.target.value);
          }}
          className="border border-gray-400 w-fit  px-1 lg:px-3 py-1 font-medium text-md lg:text-lg rounded-lg cursor-pointer outline-none focus:outline-none bg-gray-50"
        >
          <option value={"all"}>Select Card Type</option>
          <option value={"trading"}>Trading Cards</option>
          <option value={"customizable"}>Deck Cards</option>
          <option value={"simple"}>Simple Cards</option>
        </select>
      </div>
      {filteredProducts?.length != 0 ? (
        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 max-w-7xl mx-auto ">
          {filteredProducts?.map((product) => (
            <ShopCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="h-120 flex items-center justify-center text-center text-gray-500 text-lg font-medium w-full ">
          No Product Found
        </div>
      )}
    </div>
  );
};

export default About;
