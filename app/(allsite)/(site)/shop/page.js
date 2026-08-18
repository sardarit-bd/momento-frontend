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
    try {
      const res = await MakeGet("api/shop");

      if (!res?.success) {
        console.error("Failed to fetch products");
        setLoading(false);
        return;
      }

      const productOrder = {
        "Momento Photo Deck": 1,
        "Momento Trading Cards": 2,
        "Momento Portrait Deck": 3,
      };

      const productData = Array.isArray(res?.data?.data) ? res.data.data : [];

      const sortedProducts = productData.sort(
        (a, b) => (productOrder[a.name] ?? 999) - (productOrder[b.name] ?? 999),
      );

      setProducts(sortedProducts);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products?.filter((p) => {
    if (type === "all") return true;
    if (type === "photo") return p?.type === "photo";
    return p?.type === type;
  });

  console.log(filteredProducts, "filteredProducts");

  if (loading) return <ShopCardSkeleton />;

  return (
    <div>
      <div className="text-gray-900 px-8 container mx-auto pt-9 lg:pt-16 flex items-center justify-between">
        <h3 className="text-gray-700 text-lg lg:text-3xl font-bold">
          {type === "trading"
            ? "Trading Cards"
            : type === "customizable"
              ? "Deck Cards"
              : type === "photo"
                ? "Photo Portrait"
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
          <option value={"photo"}>Photo Portrait</option>
          {/* <option value={"simple"}>Simple Cards</option> */}
        </select>
      </div>
      <div className="py-14 flex flex-wrap gap-6 px-8 container mx-auto">
        {filteredProducts.map((product) => (
          <ShopCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default About;
