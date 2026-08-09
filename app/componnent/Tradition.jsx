'use client';

import useFilterStore from "@/store/useFilterStore";
import Image from "next/image";
import Link from "next/link";
import { FaRegSquareCheck } from "react-icons/fa6";
import cardsTradition from "../../public/allcardstucture.png";

export default function Tradition() {

    const { settype } = useFilterStore();

    return (
        <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            {/* Left Content */}
            <div className="space-y-6 order-last md:order-frist">
                <h1 className="text-4xl text-center md:text-left md:text-3xl font-extrabold text-gray-800 ">
                    Momento Playing Deck Cards
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Create your own set of Momento Playing Deck Cards with fully customizable faces and themes. Perfect for game nights, gifts, or making every shuffle personal.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                    <FaRegSquareCheck className="inline mr-2 pb-1 text-[#3CA9FF]" />
                    54 premium playing cards with standard face designs <br />
                    <FaRegSquareCheck className="inline mr-2 pb-1 text-[#3CA9FF]" />
                    Smooth shuffle & durable finish for long-lasting use <br />
                    <FaRegSquareCheck className="inline mr-2 pb-1 text-[#3CA9FF]" />
                    Ideal for poker nights, magic tricks, and casual gaming
                </p>

                <div className="flex flex-col md:flex-row text-center gap-4">
                    <Link
                        onClick={() => { settype("customizable") }}
                        href="/shop"
                        className="px-3 lg:px-12 py-3 bg-[#3CA9FF] text-white font-medium rounded-md shadow hover:bg-[#FF6F3C] transform hover:scale-105 transition duration-300"
                    >
                        Start Customizing
                    </Link>
                    <Link
                        onClick={() => { settype("all") }}
                        href="/shop"
                        className="px-3 lg:px-12 py-3 text-[#3CA9FF] border border-[#3CA9FF] font-medium rounded-md shadow hover:text-[#FF6F3C] hover:border-[#FF6F3C] transform hover:scale-105 transition duration-300"
                    >
                        Explore Pre-Made Deck
                    </Link>
                </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center md:justify-end order-frist md:order-last">
                <Image
                    src={cardsTradition}
                    width={1000}
                    height={1000}
                    alt="Tradition"
                    className="rounded-lg transform hover:scale-105 transition duration-300"
                />
            </div>
        </section>
    );
}
