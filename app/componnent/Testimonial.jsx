"use client";

import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote, Star } from "lucide-react";
import hero1 from "../../public/hero1.png";

export default function Testimonial() {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: "start" },
        [Autoplay({ delay: 4000, stopOnInteraction: false })]
    );

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState([]);

    const testimonials = [
        { id: 1, name: "Alice Johnson", position: "Creative Designer", feedback: "An absolutely amazing experience! I was blown away by the quality, the attention to detail, and the beautiful design of the cards.", rating: 5 },
        { id: 2, name: "Mark Williams", position: "Event Organizer", feedback: "The customer service was fantastic from start to finish. Everything arrived on time and exceeded our expectations. Highly recommend!", rating: 5 },
        { id: 3, name: "Sophia Lee", position: "Photographer", feedback: "These cards were stunning. Every single one of my clients loved them. They add such a professional touch to my deliveries.", rating: 5 },
        { id: 4, name: "John Doe", position: "Lead Architect", feedback: "High-quality prints, incredibly fast delivery, and a seamless ordering process. I will definitely be a returning customer.", rating: 5 },
    ];

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
        onSelect();
    }, [emblaApi, onSelect]);

    const scrollTo = useCallback(
        (index) => emblaApi && emblaApi.scrollTo(index),
        [emblaApi]
    );

    return (
        <section className="bg-gradient-to-b from-slate-50 to-[#F2F9FF] py-24 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
                <div className="absolute top-40 -left-20 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-sm font-semibold tracking-wide uppercase mb-6 shadow-sm">
                        <Star className="w-4 h-4 fill-current" />
                        Testimonials
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        Real Stories. <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-[#3CA9FF]">
                            Real Moments. Real Cards.
                        </span>
                    </h2>
                </div>

                {/* Embla Carousel */}
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {testimonials.map((t) => (
                            <div
                                key={t.id}
                                // 👇 This controls how many cards show per row
                                className="flex-none w-full sm:w-1/2 lg:w-1/3 px-3"
                            >
                                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col group relative">

                                    <Quote className="absolute top-6 right-6 w-12 h-12 text-blue-50 rotate-180 group-hover:scale-110 transition-transform duration-500" />

                                    {/* Stars */}
                                    <div className="flex gap-1 mb-6 z-10 relative">
                                        {[...Array(t.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>

                                    {/* Feedback */}
                                    <p className="text-slate-600 leading-relaxed mb-8 flex-grow relative z-10 text-base md:text-lg">
                                        "{t.feedback}"
                                    </p>

                                    {/* Author */}
                                    <div className="flex items-center gap-4 mt-auto border-t border-slate-50 pt-6 relative z-10">
                                        <div>
                                            <h3 className="font-bold text-slate-900">{t.name}</h3>
                                            <p className="text-sm font-medium text-blue-600">{t.position}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {scrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                index === selectedIndex
                                    ? "bg-blue-500 w-6"
                                    : "bg-slate-300"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}