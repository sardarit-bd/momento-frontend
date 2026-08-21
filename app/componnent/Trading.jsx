"use client";

import useFilterStore from "@/store/useFilterStore";
import Image from "next/image";
import Link from "next/link";
import { FaRegSquareCheck } from "react-icons/fa6";
import cardsTradition from "../../public/mockup7.png";

export default function Tradition() {
  const { settype } = useFilterStore();

  const features = [
    "Upload a real photo and customize the template to create a truly one-of-a-kind trading card starring someone special.",
    "Premium-printed cards with vivid colors, collector-grade finish, and a design built to last as a keepsake.",
    "The most unique personalized gift for graduations, birthdays, and every milestone worth remembering.",
  ];

  return (
    <section className="relative w-full bg-linear-to-b md:bg-linear-to-r from-[#EBF6FF] to-white py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Image Showcase */}
          {/* order-first ensures the image is on top on mobile, and on the left on desktop */}
          <div className="order-first flex justify-center lg:justify-start relative group">
            <div className="relative w-full max-w-md lg:max-w-full">
              {/* Decorative background blob for depth */}
              <div className="absolute -inset-4 bg-linear-to-tr from-[#3CA9FF]/20 to-[#FF6F3C]/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-70 transition duration-500"></div>

              <Image
                src={cardsTradition}
                alt="Momento Tradition Trading Cards"
                className="relative w-full h-auto rounded-2xl  transform transition-transform duration-700 hover:scale-[1.02]"
                placeholder="blur"
                priority
              />
            </div>
          </div>

          {/* Right: Content & Actions */}
          <div className="order-last flex flex-col space-y-8">
            <div className="space-y-4 text-center lg:text-left">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
                Momento <span className="text-[#3CA9FF]">Trading Cards</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Turn your favorite people, memories, and milestones into
                collectible personalized trading cards worth keeping forever.
              </p>
            </div>

            {/* Feature List */}
            <ul className="space-y-4">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <FaRegSquareCheck className="shrink-0 mt-1 text-[#3CA9FF] text-xl mr-4" />
                  <span className="text-lg text-gray-700 leading-relaxed font-medium">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link
                onClick={() => {
                  settype("trading");
                }}
                href="/shop"
                className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-[#3CA9FF] text-white font-semibold text-lg rounded-xl shadow-lg shadow-[#3CA9FF]/30 hover:bg-[#FF6F3C] hover:shadow-[#FF6F3C]/30 transform hover:-translate-y-1 transition-all duration-300"
              >
                Start Customizing
              </Link>
              <Link
                onClick={() => {
                  settype("all");
                }}
                href="/shop"
                className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-transparent text-[#3CA9FF] border-2 border-[#3CA9FF] font-semibold text-lg rounded-xl hover:bg-[#3CA9FF] hover:text-white transform hover:-translate-y-1 transition-all duration-300"
              >
                Explore Cards
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
