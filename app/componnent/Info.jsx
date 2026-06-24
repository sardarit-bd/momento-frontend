'use client';

import Image from "next/image";

// Ensure your file paths align with your project structure
import club from "../../public/club.png";
import dice from "../../public/dice.png";
import heart from "../../public/heart.png";
import spade from "../../public/spade.png";

export default function Info() {
    const cards = [
        {
            title: "Limitless Creativity",
            description: "Design cards that feel personal, unique, and completely your own.",
            image: spade,
        },
        {
            title: "Premium Quality",
            description: "Durable premium materials and finishes designed to look and feel collectible.",
            image: dice,
        },
        {
            title: "Easy Customization",
            description: "No complicated tools — create your cards in just a few minutes.",
            image: heart,
        },
        {
            title: "Fast & Easy Ordering",
            description: "Customize your cards, place your order, and let Momento handle the rest with an easy delivery process right to your door.",
            image: club,
        },
    ];

    return (
        <section className="relative w-full py-20 lg:py-32 bg-gradient-to-b from-[#EBF6FF] to-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                    {cards.map((card, idx) => (
                        <div
                            key={idx}
                            className="group relative flex flex-col items-center text-center p-8 rounded-[2rem] bg-white/60 backdrop-blur-sm border border-white/80 shadow-sm hover:shadow-2xl hover:bg-white transform transition-all duration-500 hover:-translate-y-2"
                        >
                            {/* Icon/Image Wrapper - Frames the image perfectly */}
                            <div className="relative flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-[#EBF6FF] shadow-inner transform transition-transform duration-500 group-hover:scale-110 group-hover:bg-[#d9eefd]">
                                <div className="relative w-12 h-12">
                                    <Image
                                        src={card.image}
                                        alt={card.title}
                                        fill
                                        draggable={false}
                                        className="object-contain drop-shadow-sm"
                                        sizes="(max-width: 768px) 48px, 48px"
                                    />
                                </div>
                            </div>
                            
                            {/* Typography */}
                            <h3 className="text-xl font-bold text-gray-900 mb-4 transition-colors duration-300 group-hover:text-[#3CA9FF]">
                                {card.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed text-base font-medium">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}