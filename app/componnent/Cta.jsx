'use client';

import Link from "next/link";
import Image from "next/image";

// Importing the image exactly how you handle assets in your project
import mockup1 from "../../public/mockup1.png";

export default function CallToAction() {
    return (
        <section className="relative w-full py-24 lg:py-32 overflow-hidden">
            
            {/* --- Premium Background Image Layer --- */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={mockup1}
                    alt="Momento Cards Mockup"
                    fill
                    className="object-cover object-center transform scale-105"
                    quality={90}
                    placeholder="blur"
                />
                {/* Sophisticated gradient overlay to ensure the image doesn't overpower the foreground */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-slate-900/90 backdrop-blur-[2px]"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* --- Premium Floating Glass Card --- */}
                {/* Changed to bg-white/95 with backdrop-blur to create a high-end frosted glass effect */}
                <div className="relative bg-white/95 backdrop-blur-2xl rounded-[2rem] shadow-2xl p-10 md:p-16 lg:p-20 text-center border border-white/50 overflow-hidden group hover:shadow-[#3CA9FF]/20 transition-all duration-500">
                    
                    {/* Ambient Glow Effects (Inside the card) */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#3CA9FF]/5 to-[#FF6F3C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#3CA9FF]/15 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-110"></div>
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#FF6F3C]/10 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-110"></div>

                    <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto">
                        
                        {/* Exact Text Preserved */}
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
                            Create Something They’ll Actually Remember
                        </h2>
                        
                        {/* Exact Description Preserved */}
                        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl">
                            Personalized cards made for memories, gifts, collections, and unforgettable moments.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
                            
                            {/* Exact Button Preserved */}
                            <Link
                                href="/shop"
                                className="w-full sm:w-auto flex items-center justify-center px-10 py-4 bg-[#3CA9FF] text-white font-bold text-lg rounded-xl shadow-lg shadow-[#3CA9FF]/30 hover:bg-[#FF6F3C] hover:shadow-[#FF6F3C]/30 transform hover:-translate-y-1 transition-all duration-300"
                            >
                                Start Creating
                            </Link>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}