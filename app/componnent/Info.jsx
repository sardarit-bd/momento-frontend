import Image from "next/image";
import club from "../../public/club.png";
import dice from "../../public/dice.png";
import heart from "../../public/heart.png";
import spade from "../../public/spade.png";
export default function Info() {
    const cards = [
        {
            title: "Limitless creativity",
            description: "Build a deck that’s uniquely yours.",
            image: spade,
        },
        {
            title: "Premium materials",
            description: "Durable, high-quality finishes for long-lasting play",
            image: dice,
        },
        {
            title: "Effortless customization",
            description: "No complicated tools, just pure creative freedom",
            image: heart,
        },
        {
            title: "Designed for moments",
            description: "Whether for play, collections, or special occasions.",
            image: club,
        },
    ];
    return (
        <section className="bg-[#EBF6FF] py-16 mt-12 w-screen">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {cards.map((card, idx) => (
                    <div
                        key={idx}
                        className="rounded-xl  p-3 flex flex-col items-center text-center transform transition duration-300"
                    >
                        <div className="w-70 h-30 mb-4 relative">
                            <Image
                                src={card.image}
                                alt={card.title}
                                fill
                                draggable={false}
                                className="object-contain"
                            />
                        </div>
                        <h3 className="text-xl text-[#333333] font-semibold mb-2">{card.title}</h3>
                        <p className="text-gray-600">{card.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}