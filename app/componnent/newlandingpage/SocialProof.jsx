"use client";

import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

const testimonials = [
  {
    quote:
      "We ended up playing way longer than usual because everyone kept pulling cards with themselves on them.",
    author: "Amor Young",
    initials: "AY",
  },
  {
    quote: "I thought it would be a funny gift, but it became our go-to deck.",
    author: "Michelle Wadowski",
    initials: "MW",
  },
  {
    quote: "Watching everyone react was the best part.",
    author: "Jose Martinez",
    initials: "JM",
  },
  {
    quote:
      "The quality is incredible. These cards feel premium and look amazing.",
    author: "Issac Barker",
    initials: "IB",
  },
  {
    quote: "Best gift I've ever given. Everyone talks about it.",
    author: "Brianna Gilligan",
    initials: "BG",
  },
];

export default function SocialProof() {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-24 px-4 bg-slate-50 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-4 md:px-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              People Get It Instantly
            </h2>
            <p className="text-lg text-slate-600">
              See why game night will never be the same.
            </p>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="p-3 rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-sky-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 shadow-sm"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="p-3 rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-sky-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 shadow-sm"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Swipeable Slider Container */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 px-4 md:px-8 -mx-4 md:-mx-8 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="relative flex-none w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] snap-center sm:snap-start group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl border border-slate-200 hover:border-sky-200 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Background Watermark */}
              <Quote className="absolute top-6 right-6 w-16 h-16 text-slate-50 opacity-50 rotate-12 transition-transform duration-300 group-hover:rotate-0" />

              <div className="relative z-10">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <blockquote className="text-lg text-slate-700 leading-relaxed mb-8">
                  "{testimonial.quote}"
                </blockquote>
              </div>

              <div className="relative z-10 flex items-center gap-4 pt-6 border-t border-slate-100">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-sky-100 text-sky-600 font-bold text-sm">
                  {testimonial.initials}
                </div>
                <p className="font-semibold text-slate-900">
                  {testimonial.author}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <div className="text-center">
            <Link
              href="/shop"
              className="bg-sky-400 hover:bg-primary/90 text-gray-100 px-6 py-4 text-lg rounded-full"
            >
              Create Your Deck
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
