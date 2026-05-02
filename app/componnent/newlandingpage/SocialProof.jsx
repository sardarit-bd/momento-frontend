'use client';

import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const testimonials = [
    {
        quote: 'We ended up playing way longer than usual because everyone kept pulling cards with themselves on them.',
        author: 'Amor Young'
    },
    {
        quote: 'I thought it would be a funny gift, but it became our go-to deck.',
        author: 'Michelle Wadowski'
    },
    {
        quote: 'Watching everyone react was the best part.',
        author: 'Jose Martinez'
    },
    {
        quote: 'The quality is incredible. These cards feel premium and look amazing.',
        author: 'Issac Barker'
    },
    {
        quote: 'Best gift I\'ve ever given. Everyone talks about it.',
        author: 'Brianna Gilligan'
    }
];

export default function SocialProof() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerView = 3;
    const maxIndex = Math.max(0, testimonials.length - itemsPerView);

    const goToPrevious = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    };

    const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerView);

    return (
        <section className="py-20 md:py-24 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-700 mb-6 text-balance">
                        People Get It Instantly
                    </h2>
                </div>

                {/* Slider Wrapper */}
                <div className="relative mb-12">
                    {/* Cards Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {visibleTestimonials.map((testimonial, idx) => (
                            <div
                                key={currentIndex + idx}
                                className="group relative bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border-2 border-sky-200 hover:border-accent/50 animate-fadeIn"
                            >
                                {/* Decorative accent */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="relative space-y-6">
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>

                                    <blockquote className="text-lg text-gray-400 italic leading-relaxed">
                                        "{testimonial.quote}"
                                    </blockquote>

                                    <p className="font-semibold text-sky-400">
                                        — {testimonial.author}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    {testimonials.length > itemsPerView && (
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={goToPrevious}
                                disabled={currentIndex === 0}
                                className="flex items-center justify-center w-12 h-12 rounded-full bg-sky-400 cursor-pointer hover:bg-accent/90 disabled:bg-accent/30 disabled:cursor-not-allowed text-white transition-all duration-200 hover:scale-110 active:scale-95"
                                aria-label="Previous testimonials"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>

                            {/* Indicator Dots */}
                            <div className="flex gap-2">
                                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                            ? 'bg-sky-400 w-8'
                                            : 'bg-sky-400/30 w-2 hover:bg-accent/50'
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={goToNext}
                                disabled={currentIndex === maxIndex}
                                className="flex items-center justify-center w-12 h-12 rounded-full bg-sky-400 cursor-pointer hover:bg-accent/90 disabled:bg-accent/30 disabled:cursor-not-allowed text-white transition-all duration-200 hover:scale-110 active:scale-95"
                                aria-label="Next testimonials"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    )}
                </div>

                <div className="text-center">
                    <Link href="/shop" className="bg-sky-400 hover:bg-primary/90 text-gray-100 px-6 py-4 text-lg rounded-full">
                        Create Your Deck
                    </Link>
                </div>
            </div>
        </section>
    );
}
