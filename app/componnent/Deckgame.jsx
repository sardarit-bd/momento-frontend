"use client";

import Image from "next/image";
import Link from "next/link";
import { FaRegSquareCheck } from "react-icons/fa6";

// Ensure your file paths align with your project structure
import deckGame from "../../public/mockup4.png";

export default function Tradition() {
  const features = [
    "54 premium playing cards with standard face designs.",
    "Smooth shuffle & durable finish for long-lasting use.",
    "Ideal for poker nights, magic tricks, and casual gaming.",
  ];

  return (
    // Using a clean white background creates a beautiful alternating effect if placed under the previous section
    <section className="relative w-full bg-white py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content & Actions */}
          {/* lg:order-first keeps the text on the left for desktop, order-last puts it under the image on mobile */}
          <div className="order-last lg:order-first flex flex-col space-y-8">
            <div className="space-y-4 text-center lg:text-left">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
                Momento <span className="text-[#3CA9FF]">Portrait Deck</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                A fully playable custom deck featuring personalized Kings,
                Queens, Jacks, Aces, and optional custom Jokers designed around
                you and your favorite people.
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
                href="/shop"
                className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-[#3CA9FF] text-white font-semibold text-lg rounded-xl shadow-lg shadow-[#3CA9FF]/30 hover:bg-[#FF6F3C] hover:shadow-[#FF6F3C]/30 transform hover:-translate-y-1 transition-all duration-300"
              >
                Start Customizing
              </Link>
              <Link
                href="/shop"
                className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-transparent text-[#3CA9FF] border-2 border-[#3CA9FF] font-semibold text-lg rounded-xl hover:bg-[#3CA9FF] hover:text-white transform hover:-translate-y-1 transition-all duration-300"
              >
                See Example Decks
              </Link>
            </div>
          </div>

          {/* Right: Image Showcase */}
          {/* order-first ensures the image is on top on mobile, lg:order-last keeps it on the right on desktop */}
          <div className="order-first lg:order-last flex justify-center lg:justify-end relative group">
            <div className="relative w-full max-w-md lg:max-w-full">
              {/* Decorative background blob for depth - reversed to top-left for right-side balance */}
              <div className="absolute -inset-4 bg-linear-to-tl from-[#3CA9FF]/20 to-[#FF6F3C]/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-70 transition duration-500"></div>

              <Image
                src={deckGame}
                alt="Traditional Playing Cards"
                className="relative w-full h-auto rounded-2xl  transform transition-transform duration-700 hover:scale-[1.02]"
                placeholder="blur"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
