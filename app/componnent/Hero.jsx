"use client";
import useFilterStore from "@/store/useFilterStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import hero1 from "../../public/hero1.png";

import hero3 from "../../public/hero8.png";
import hero4 from "../../public/hero7.png";
import hero5 from "../../public/hero6.png";
const cards = [
  // hero1,
  hero3,
  hero5,
  hero4,
];

const tickerItems = [
  "Easy to Customize",
  "Premium Quality",
  "Delivered to Your Door",
];

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024,
  );
  const tickerRef = useRef(null);
  const offset = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const { settype } = useFilterStore();

  const FAN_CONFIG = {
    anglePerCard: width < 768 ? 18 : 26,
    arcRadius: width < 768 ? 55 : 85,
    verticalDrop: width < 768 ? 18 : 22,
    scaleStep: 0.07,
    entranceDelayMs: 90,
  };

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

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
      <section className="h-fit lg:h-[60vh] w-screen relative bg-gray-50 overflow-hidden pt-4 pb-6 lg:pt-8 lg:pb-0">
        {/* Background */}
        <div className="absolute inset-0">
          <div className={`w-full h-full opacity-30 heroBgPataImage`} />
        </div>
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 flex flex-col-reverse lg:flex-row items-center justify-center gap-8 py-4 md:py-6">
          {/* Left Text */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start space-y-4 md:space-y-4 lg:space-y-4 text-center lg:text-left">
            <h1 className="text-5xl sm:text-7xl lg:text-6xl font-extrabold leading-[60px] md:leading-[72px] lg:leading-[68px] uppercase text-[#333333]">
              Turn Your <br />
              <span className="text-[#3CA9FF]">
                Favorite People
              </span> <br /> Into Cards
            </h1>
            <p className="text-gray-700 text-lg sm:text-xl lg:text-2xl max-w-xl mx-auto lg:mx-0">
              Create premium personalized cards for game nights, milestones,
              gifts, and unforgettable memories.
            </p>
            <Link
              onClick={() => {
                settype("all");
              }}
              href={"/shop"}
              className="bg-[#3CA9FF] text-white px-8 py-4 lg:px-8 lg:py-4 text-lg rounded-lg font-semibold shadow-lg hover:bg-[#FF6F3C] transition"
            >
              Create Your Cards
            </Link>
          </div>

          {/* Right Cards */}
          <div
            className="w-full lg:w-1/2 flex justify-center items-center relative h-[55vw] sm:h-[45vw] md:h-[32vw] lg:h-[280px]"
            style={{ perspective: "1200px" }}
          >
            {cards.map((src, index) => {
              const total = cards.length;
              const middle = (total - 1) / 2;
              const distanceFromMiddle = index - middle;
              const isCenter = distanceFromMiddle === 0;

              const targetRotate = distanceFromMiddle * FAN_CONFIG.anglePerCard;
              const xArc = distanceFromMiddle * FAN_CONFIG.arcRadius;
              const yArc =
                Math.abs(distanceFromMiddle) * FAN_CONFIG.verticalDrop;
              const scale =
                1 - Math.abs(distanceFromMiddle) * FAN_CONFIG.scaleStep;
              const depth = total - Math.abs(distanceFromMiddle);

              return (
                <div
                  key={index}
                  className="absolute bottom-5 left-1/2 lg:bottom-6 transition-all ease-[cubic-bezier(0.16,1,0.3,1)] group"
                  style={{
                    transformOrigin: "bottom center",
                    transitionDuration: "900ms",
                    transitionDelay: mounted
                      ? `${index * FAN_CONFIG.entranceDelayMs}ms`
                      : "0ms",
                    transform: mounted
                      ? `translateX(calc(-50% + ${xArc}px)) translateY(${yArc}px) rotate(${targetRotate}deg) scale(${scale})`
                      : `translateX(-50%) translateY(40px) rotate(0deg) scale(0.85)`,
                    opacity: mounted ? 1 : 0,
                    zIndex: depth,
                    willChange: "transform, opacity",
                  }}
                >
                  <div
                    className={`relative w-[35vw] sm:w-[25vw] lg:w-[200px] aspect-[3/4] transition-transform duration-500 ease-out
                                            ${isCenter ? "hover:scale-[1.04] hover:-translate-y-2" : "hover:scale-[1.03]"}
                                        `}
                    style={{
                      filter: isCenter
                        ? "drop-shadow(0 20px 35px rgba(0,0,0,0.25))"
                        : "drop-shadow(0 12px 20px rgba(0,0,0,0.18))",
                    }}
                  >
                    <Image
                      src={src}
                      alt={`Personalized trading card example ${index + 1}`}
                      fill
                      className="rounded-xl object-contain"
                      unoptimized
                      priority={isCenter}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Smooth Infinite Ticker */}
        <div className="hidden lg:block absolute bottom-0 left-0 overflow-hidden w-screen">
          <div className="block lg:block bg-[#3CA9FF] text-white overflow-hidden  py-3 relative cursor-grab">
            <div
              //ref={tickerRef}
              className="flex whitespace-nowrap select-none gap-2 lg:gap-18 justify-center items-center"
              // style={{ transform: "translateX(0)" }}
            >
              {/* Duplicate content to enable smooth infinite scroll */}
              {[...tickerItems].map((text, i) => (
                <span key={i} className="text-lg sm:text-xl lg:text-2xl">
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
