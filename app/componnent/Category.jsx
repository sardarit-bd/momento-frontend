'use client';

import useFilterStore from "@/store/useFilterStore";
import Image from "next/image";
import Link from "next/link";
import TredingOne from "../../public/tranding.png";
import TredingThree from "../../public/TredingThree.png";
import TredingTwo from "../../public/tredingTwo.png";

export default function Category() {

    const { settype } = useFilterStore();

    const categories = [
        {
            title: "Momento Play Deck",
            description: "Classic playing cards with personalized faces and themes",
            image: TredingOne,
            href: "/shop",
            type: "customizable"
        },

        {
            title: "Momento Trading Cards",
            description: "Custom collectibles designed for creators, fans, and collectors.",
            image: TredingThree,
            href: "/shop",
            type: "trading"
        },

        {
            title: "Momento Game Deck",
            description: "Tailor-made for unique gameplay, strategy, and storytelling",
            image: TredingTwo,
            href: "/shop",
            type: "all"
        },
    ];
    return (
        <section className="py-16 w-full">
            <div className="text-center text-[#333333] font-bold mb-12">
                <h2 className="text-5xl mb-3">
                    Turn Meaningful Moments <br />into Stunning Cards
                </h2>
                <span className="text-gray-500 text-lg">
                    Explore the three types of Momento Cards
                </span>
            </div>
            <div className="w-full max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {categories.map((cat, idx) => (
                    <div
                        key={idx}
                        className="w-full text-center bg-white rounded-xl shadow-lg overflow-hidden hover:scale-102 transform transition duration-300"
                    >
                        <div className="relative w-full h-64">
                            <Image
                                src={cat.image}
                                alt={cat.title}
                                className="w-full h-full object-cover bg-[#d9eefd]"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold mb-2 text-[#333333]">{cat.title}</h3>
                            <p className="text-gray-600">{cat.description}</p>
                        </div>
                        <div className="p-6">
                            <Link
                                onClick={() => { settype(cat.type) }}
                                href={cat.href}
                                className="inline-block bg-[#3CA9FF] hover:bg-[#FF6F3C] text-white py-3 px-5 rounded-lg"
                            >
                                Explore Cards
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}