"use client";
import useFilterStore from "@/store/useFilterStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import hero1 from "../../../public/hero1.png";
import hero2 from "../../../public/hero2.png";
import hero3 from "../../../public/hero3.png";
import hero4 from "../../../public/hero4.png";
import hero5 from "../../../public/hero5.png";
const cards = [
    hero5,
    hero4,
    hero3,
    hero2,
    hero1,
];
const tickerItems = ["Free Delivery", "Premium Quality", "Long Lasting", "Easily Customizable"];



const Hero = () => {


    const [mounted, setMounted] = useState(false);
    const tickerRef = useRef(null);
    const offset = useRef(0);
    const dragging = useRef(false);
    const lastX = useRef(0);
    const { settype } = useFilterStore();


    useEffect(() => {
        setTimeout(() => setMounted(true), 100);
    }, []);
    useEffect(() => {
        let animFrame;
        const animate = () => {
            if (tickerRef.current && !dragging.current) {
                offset.current -= 1; // speed of the ticker
                const width = tickerRef.current.scrollWidth / 2; // half of duplicated content
                if (Math.abs(offset.current) >= width) {
                    offset.current = 0; // reset smoothly
                }
                tickerRef.current.style.transform = `translateX(${offset.current}px)`;
            }
            animFrame = requestAnimationFrame(animate);
        };
        animate();
        const handleMouseDown = (e) => {
            dragging.current = true;
            lastX.current = e.clientX;
        };
        const handleMouseMove = (e) => {
            if (!dragging.current) return;
            const delta = e.clientX - lastX.current;
            lastX.current = e.clientX;
            offset.current += delta;
            tickerRef.current.style.transform = `translateX(${offset.current}px)`;
        };
        const handleMouseUp = () => (dragging.current = false);
        const ticker = tickerRef.current;
        if (ticker) ticker.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            cancelAnimationFrame(animFrame);
            if (ticker) ticker.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);









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
            <section className="h-fit lg:h-[100vh] w-screen relative bg-gray-50 py-6 overflow-hidden pb-6 lg:pb-0">
                {/* Background */}
                <div className="absolute inset-0">
                    <div
                        className={`w-full h-full opacity-10 heroBgPataImage`}
                    />
                </div>
                {/* Content */}
                <div className="relative max-w-6xl mx-auto px-4 flex flex-col-reverse lg:flex-col-reverse items-center justify-center gap-10">
                    {/* Left Text */}
                    <div className="w-full lg:w-2/2 flex flex-col items-center lg:items-center space-y-6 md:space-y-4 lg:space-y-6 text-center lg:text-left">
                        <div className="text-sky-400 bg-white border border-sky-400/30 px-3 py-1 rounded-full flex items-center gap-2">
                            <span className="animate-bounce">✨</span>
                            <span>Game night, made personal.</span>
                        </div>
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[50px] md:leading-[60px] lg:leading-[75px] uppercase text-[#333333] text-center">
                            Your people  <br />
                            <span className="text-[#3CA9FF]">Your deck</span> <br /> Your game
                        </h1>
                        <p className="text-gray-700 text-base sm:text-lg lg:text-xl max-w-xl mx-auto lg:mx-0">
                            Turn friends, family, and inside jokes into a custom playing card experience you’ll want to use again and again.
                        </p>
                        <div className="w-full flex items-center flex-col md:flex-row justify-center md:justify-cener gap-4">
                            <Link onClick={() => { settype("all") }} href={'/shop'} className="bg-[#3CA9FF] text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-[#FF6F3C] transition w-full md:w-fit">
                                Create Your Deck
                            </Link>
                            <Link onClick={() => { settype("all") }} href={'/landing#how-it-works'} className="bg-white text-[#3CA9FF] border border-[#3CA9FF] px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-[#FF6F3C] hover:text-white transition w-full md:w-fit">
                                See how it works →
                            </Link>
                        </div>
                    </div>
                    {/* Right Cards */}
                    <div className="w-fit flex justify-center items-center relative h-[150px] md:h-[220px] lg:h-[370px] translate-x-[65px] lg:translate-x-[100px]">
                        {cards.map((src, index) => {
                            const isLast = index === cards.length - 1;
                            const targetRotate = isLast ? 0 : -(cards.length - 1 - index) * 13;
                            const step = typeof window !== "undefined" && window.innerWidth < 640 ? 0.03 : 0.05;
                            // const scale = 1 - ((cards.length - 1 - index) * step);
                            const scale = 1 - ((cards.length - 1 + index) * .2 * step);
                            return (
                                <div
                                    key={index}
                                    className="absolute h-full -bottom-8 lg:bottom-5 left-[65%] lg:left-[70%] xl:left-[75%] transition-transform duration-700 ease-out"
                                    style={{
                                        transformOrigin: "bottom left",
                                        transform: mounted
                                            ? `translateX(-50%) rotate(${targetRotate}deg) scale(${scale})`
                                            : `translateX(-50%) rotate(0deg) scale(1)`,
                                        zIndex: index,
                                    }}
                                >
                                    <div className="relative h-full w-[35vw] sm:w-[25vw] lg:w-[200px] aspect-[3/4]">
                                        <Image
                                            src={src}
                                            alt={`Card ${index + 1}`}
                                            fill
                                            className="rounded-xl object-contain full"
                                            unoptimized
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero;