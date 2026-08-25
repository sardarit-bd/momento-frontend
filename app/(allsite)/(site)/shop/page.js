"use client";

import ShopCardSkeleton from "@/app/componnent/ShopCardSkeleton";
import MakeGet from "@/utilis/requestrespose/get";
import { useEffect, useState } from "react";
import ShopCard from "../../../componnent/ShopCard";

const About = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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

  if (loading) return <ShopCardSkeleton />;

  return (
    <div>
      <div className="text-gray-900 px-8 container mx-auto pt-9 lg:pt-16 flex items-center justify-between"></div>
      <div className="py-14 flex flex-wrap gap-6 px-8 container mx-auto">
        {products.map((product) => (
          <ShopCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default About;
