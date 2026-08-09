'use client';

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function DesignedForPlay() {
    const useCases = [
        "Families building traditions",
        "Teams strengthening identity",
        "Creators designing original worlds",
        "Collectors building something personal"
    ];

    return (
        <section className="py-20 md:py-32 px-6 bg-slate-50 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left side (Text Content) */}
                    <div className="order-2 lg:order-1 max-w-2xl mx-auto lg:mx-0">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
                            Play, Made Personal
                        </h2>

                        <div className="space-y-6 text-lg md:text-xl text-slate-600 font-light leading-relaxed">
                            <p>
                                Every Momento deck is fully customizable — faces, traits, names, stories, design.
                            </p>
                            <p>
                                When people see themselves inside the game, something shifts. It becomes more engaging. More meaningful. More lasting. What begins as play becomes something worth keeping.
                            </p>
                        </div>

                        {/* List Section */}
                        <div className="mt-10 pt-10 border-t border-slate-200">
                            <h3 className="text-xl font-bold text-slate-800 mb-6">
                                Momento is used by:
                            </h3>
                            
                            <ul className="space-y-4 mb-10">
                                {useCases.map((text, idx) => (
                                    <li key={idx} className="flex items-center gap-4 text-lg text-slate-700">
                                        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-sky-100 text-sky-500">
                                            <CheckCircle2 className="w-5 h-5" strokeWidth={2.5} />
                                        </div>
                                        <span>{text}</span>
                                    </li>
                                ))}
                            </ul>

                            <p className="text-xl md:text-2xl font-bold text-slate-900 mb-10 leading-snug">
                                This isn’t about novelty. <span className="text-sky-500">It’s about ownership.</span>
                            </p>
                            
                            {/* CTA Button */}
                            <Link 
                                href="/shop" 
                                className="inline-flex items-center justify-center px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold tracking-widest uppercase rounded-full shadow-lg shadow-sky-500/30 transition-all duration-300 hover:-translate-y-1 active:scale-95"
                            >
                                Start Customizing
                            </Link>
                        </div>
                    </div>

                    {/* Right side (Image) */}
                    <div className="order-1 lg:order-2 w-full flex justify-center lg:justify-end">
                        <div className="group relative w-full max-w-md lg:max-w-full aspect-[4/5] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 border border-white/60 bg-white">
                            <Image
                                // src="https://res.cloudinary.com/dg83pvgls/image/upload/v1771908530/05_jujjpj.png"
                                src="/about/graduate3.png"
                                alt="Stacked Momento Cards"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            {/* Inner shadow for depth */}
                            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-3xl pointer-events-none" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}