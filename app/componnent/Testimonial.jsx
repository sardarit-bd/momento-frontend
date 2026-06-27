"use client";

import Image from "next/image";
import Slider from "react-slick";
import { Quote, Star } from "lucide-react";

// Ensure you have these imported in your layout or component
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Dummy image import based on your original code
import hero1 from "../../public/hero1.png";

export default function Testimonial() {
    // We use react-slick's native responsive settings instead of manual window listeners
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        cssEase: "cubic-bezier(0.87, 0, 0.13, 1)",
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2, slidesToScroll: 1 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1, slidesToScroll: 1 }, // ✅ one card at a time
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1, slidesToScroll: 1 }, // ✅ small phones too
            },
        ],
    };

    const testimonials = [
        { id: 1, name: "Alice Johnson", position: "Creative Designer", feedback: "An absolutely amazing experience! I was blown away by the quality, the attention to detail, and the beautiful design of the cards.", img: hero1, rating: 5 },
        { id: 2, name: "Mark Williams", position: "Event Organizer", feedback: "The customer service was fantastic from start to finish. Everything arrived on time and exceeded our expectations. Highly recommend!", img: hero1, rating: 5 },
        { id: 3, name: "Sophia Lee", position: "Photographer", feedback: "These cards were stunning. Every single one of my clients loved them. They add such a professional touch to my deliveries.", img: hero1, rating: 5 },
        { id: 4, name: "John Doe", position: "Lead Architect", feedback: "High-quality prints, incredibly fast delivery, and a seamless ordering process. I will definitely be a returning customer.", img: hero1, rating: 5 },
    ];

    return (
        <section className="bg-gradient-to-b from-slate-50 to-[#F2F9FF] py-24 relative overflow-hidden">
            {/* Optional: Subtle background decorative elements for a premium feel */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
                <div className="absolute top-40 -left-20 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

                <div className="w-full pb-10">
                    <Slider {...settings} className="testimonial-slider">
                        {testimonials.map((t) => (
                            <div key={t.id} className="px-2 h-full">
                                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 h-full flex flex-col group relative">
                                    
                                    {/* Quote Icon Background */}
                                    <Quote className="absolute top-6 right-6 w-12 h-12 text-blue-50 rotate-180 transition-transform duration-500 group-hover:scale-110" />

                                    {/* Rating */}
                                    <div className="flex gap-1 mb-6 relative z-10">
                                        {[...Array(t.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>

                                    {/* Feedback text */}
                                    <p className="text-slate-600 leading-relaxed mb-8 flex-grow relative z-10 text-base md:text-lg">
                                        "{t.feedback}"
                                    </p>

                                    {/* User Profile */}
                                    <div className="flex items-center gap-4 mt-auto border-t border-slate-50 pt-6 relative z-10">
                                        {/* <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0 bg-slate-100">
                                            <Image 
                                                src={t.img} 
                                                alt={t.name} 
                                                fill
                                                className="object-cover"
                                            />
                                        </div> */}
                                        <div>
                                            <h3 className="font-bold text-slate-900">{t.name}</h3>
                                            <p className="text-sm font-medium text-blue-600">{t.position}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
}