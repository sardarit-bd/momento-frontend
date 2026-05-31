"use client";
import useFilterStore from "@/store/useFilterStore";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import hero1 from "../../public/hero1.png";
import hero2 from "../../public/hero2.png";
import hero3 from "../../public/hero3.png";
import hero4 from "../../public/hero4.png";
import hero5 from "../../public/hero5.png";
const cards = [
    hero5,
    hero4,
    hero3,
    hero2,
    hero1,
];
const tickerItems = ["Designed to Be Remembered", "Fully Custom, Down to the Detail", "Premium Print Quality",];



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



    return (
        <>
            <section className="h-fit min-h-[80vh] w-screen relative bg-white py-16 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0">
                    <div className={`w-full h-full opacity-90 heroBgPataImage`}/>
                </div>
                {/* Content */}
                <div className="relative max-w-7xl mx-auto px-4 flex items-center justify-start h-fit min-h-[60vh]">
                    {/* Left Text */}
                    <div className="w-full space-y-6">
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase lg:text-[#333333]">
                            Turn Your <br />
                            <span className="text-[#3CA9FF]">Favorite People</span> <br /> Into Cards
                        </h1>
                        <p className="text-gray-700 text-base sm:text-lg lg:text-xl max-w-xl mx-0 lg:mx-0">
                            Create premium personalized cards for game nights, milestones, gifts, and unforgettable memories.
                        </p>
                        <Link onClick={() => { settype("all") }} href={'/shop'} className="bg-[#3CA9FF] text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-[#FF6F3C] transition">
                            Create Your Cards
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero;
