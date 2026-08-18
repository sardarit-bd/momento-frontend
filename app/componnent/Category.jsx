"use client";

import useFilterStore from "@/store/useFilterStore";
import Image from "next/image";
import Link from "next/link";

import TredingOne from "../../public/mockup4.png";
import TredingTwo from "../../public/mockup9.webp";
import TredingThree from "../../public/mockup7.png";

export default function Category() {
  const { settype } = useFilterStore();

  const categories = [
    {
      title: "Momento Photo Deck",
      description:
        "Upload your favorite photos and turn them into a premium deck of personalized playing cards.",
      image: TredingTwo,
      href: "/shop",
      type: "customizable",
      cta: "Start Customizing",
    },
    {
      title: "Momento Trading Cards",
      description:
        "Create personalized trading cards celebrating people, memories, achievements, milestones, and the moments that matter most.",
      image: TredingThree,
      href: "/shop",
      type: "trading",
      cta: "Build Your Collection",
    },
    {
      title: "Momento Portrait Deck",
      description:
        "Create a premium deck featuring fully customizable characters inspired by your favorite people.",
      image: TredingOne,
      href: "/shop",
      type: "customizable",
      cta: "Build Your Deck",
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-12 w-full bg-linear-to-b from-gray-50 to-white">
      <div className="text-center px-4 mb-10 md:mb-12">
        <h2 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-5">
          Turn Meaningful Moments <br className="hidden sm:block" />
          <span className="text-[#3CA9FF]">Into Custom Cards</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
          Create personalized cards designed around the people and memories that
          matter most.
        </p>
      </div>
      <div className="w-full container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="relative w-full aspect-4/3 overflow-hidden bg-[#d9eefd]">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  placeholder="blur"
                />
              </div>

              <div className="flex flex-col grow p-6 lg:p-8">
                <div className="grow text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {cat.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-6 mt-auto">
                  <Link
                    onClick={() => {
                      settype(cat.type);
                    }}
                    href={cat.href}
                    className="group/btn relative w-full inline-flex items-center justify-center bg-[#3CA9FF] hover:bg-[#FF6F3C] text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3CA9FF]"
                  >
                    <span>{cat.cta}</span>
                    <svg
                      className="ml-2 w-5 h-5 transform transition-transform group-hover/btn:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
