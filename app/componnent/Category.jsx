'use client';

import useFilterStore from "@/store/useFilterStore";
import Image from "next/image";
import Link from "next/link";
import TredingOne from "../../public/portaitdeck.png";
import TredingThree from "../../public/tradingcard.png";

export default function Category() {

    const { settype } = useFilterStore();

    const categories = [
        {
            title: "Momento Portrait Deck",
            description: "A fully playable custom deck featuring personalized Kings, Queens, Jacks, Aces, and optional custom Jokers designed around you and your favorite people.",
            image: TredingOne,
            href: "/shop",
            type: "customizable"
        },

        {
            title: "Momento Trading Cards",
            description: "Turn your favorite people, memories, and milestones into collectible personalized trading cards worth keeping forever.",
            image: TredingThree,
            href: "/shop",
            type: "trading"
        }
    ];
    return (
        <section className="py-16 w-screen">
            <div className="text-center text-[#333333] font-bold mb-12">
                <h2 className="text-5xl mb-3">
                    Turn Meaningful Moments <br /> Into Custom Cards
                </h2>
                <span className="text-gray-500 text-lg">
                    Create personalized cards designed around the people and memories that matter most.
                </span>
            </div>
            <div className="w-full max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
                {categories.map((cat, idx) => (
                    <div
                        key={idx}
                        className="w-full text-center bg-white rounded-xl shadow-lg overflow-hidden hover:scale-102 transform transition duration-300"
                    >
                        <div className="relative w-full h-76">
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