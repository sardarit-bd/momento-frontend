import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';


export default function Hero() {


    const [activeCard, setActiveCard] = useState(0);


    useEffect(() => {
        const interval = setInterval(() => {
            setActiveCard((prev) => (prev + 1) % 3);
        }, 3000);
        return () => clearInterval(interval);
    }, []);





    const cardExamples = [
        {
            name: "Sarah",
            trait: "The Adventurer",
            color: "from-amber-400 to-orange-500",
            image: "hero1.png",
        },
        {
            name: "Mike",
            trait: "Comedy King",
            color: "from-blue-400 to-indigo-500",
            image: "hero2.png",
        },
        {
            name: "Luna",
            trait: "Night Owl",
            color: "from-purple-400 to-pink-500",
            image: "hero3.png",
        },
        {
            name: "Mike",
            trait: "Comedy King",
            color: "from-blue-400 to-indigo-500",
            image: "hero4.png",
        },
        {
            name: "Luna",
            trait: "Night Owl",
            color: "from-purple-400 to-pink-500",
            image: "hero5.png",
        },
    ];





    return (
        <>
            {/* Hero Section */}
            <section className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Text Section */}
                    <div className="space-y-8 text-center lg:text-left" style={{ animation: 'fadeInUp 0.8s ease-out' }}>
                        <div className="inline-block px-4 py-2 bg-amber-100 rounded-full border-2 border-amber-300">
                            <span className="text-amber-800 font-bold text-sm tracking-wide uppercase">
                                ✨ Turn Memories Into Cards
                            </span>
                        </div>

                        <h1 className="text-6xl lg:text-7xl font-black leading-none tracking-tight">
                            <span className="block text-slate-900">Your Deck.</span>
                            <span className="block text-slate-900">Your Characters.</span>
                            <span className="block bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                                Your Memories.
                            </span>
                        </h1>

                        <p className="text-xl text-slate-700 leading-relaxed max-w-xl">
                            Momento turns real people into playable cards. Not just photos on a card — fully customizable characters designed for unforgettable game nights, gifts, and keepsakes.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link href={'/shop'} className="w-full lg:w-fit text-center flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform flex items-center gap-2 text-lg">
                                Create Your Cards
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link href={'/howitwork#video'} className="w-full lg:w-fit text-center flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-bold rounded-xl border-2 border-slate-200 hover:border-amber-400 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 text-lg">
                                <Play className="w-5 h-5" />
                                Watch Demo
                            </Link>
                        </div>
                    </div>

                    {/* Animated Card Stack */}
                    <div className="hidden lg:flex relative h-[600px] items-center justify-center" style={{ animation: 'fadeInUp 0.8s ease-out 0.2s backwards' }}>
                        {cardExamples.map((card, index) => (
                            <div
                                key={index}
                                className="absolute w-64 h-96 rounded-3xl shadow-2xl transition-all duration-700 border-4 border-white cursor-pointer overflow-hidden"
                                style={{
                                    transform: `
                    translateX(${index === activeCard ? 0 : (index - activeCard) * 30}px)
                    translateY(${index === activeCard ? 0 : Math.abs(index - activeCard) * 20}px)
                    scale(${index === activeCard ? 1 : 0.9})
                    rotate(${(index - activeCard) * 8}deg)
                  `,
                                    zIndex: index === activeCard ? 30 : 30 - Math.abs(index - activeCard),
                                    opacity: index === activeCard ? 1 : 0.7,
                                }}
                                onMouseEnter={() => setActiveCard(index)}
                            >
                                <div className="relative h-full">
                                    {/* Background Image */}
                                    <img
                                        src={card.image}
                                        alt={card.name}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />


                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
