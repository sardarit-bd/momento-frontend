'use client';

import { Heart, PartyPopper, Gift, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const benefits = [
    {
        title: 'Personal',
        description: 'Every card has profound meaning, tailored exclusively for your table.',
        icon: Heart,
        iconColor: 'text-rose-500',
        iconBg: 'bg-rose-50',
    },
    {
        title: 'Fun',
        description: 'Game night genuinely feels like your game, with your inside jokes brought to life.',
        icon: PartyPopper,
        iconColor: 'text-sky-500',
        iconBg: 'bg-sky-50',
    },
    {
        title: 'Gift-worthy',
        description: 'A deeply thoughtful and memorable present that lasts way beyond the box.',
        icon: Gift,
        iconColor: 'text-amber-500',
        iconBg: 'bg-amber-50',
    }
];

export default function WhyMomento() {
    return (
        <section className="relative py-24 px-4 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
            {/* Subtle ambient background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-sky-100/40 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative max-w-5xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                        Why Momento Works
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto font-light">
                        Because the people at the table matter.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {benefits.map((benefit, idx) => {
                        const Icon = benefit.icon;
                        return (
                            <div
                                key={idx}
                                className="group relative bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-sky-100 transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Icon Container with scale effect */}
                                <div className={`inline-flex p-4 rounded-2xl ${benefit.iconBg} mb-6 group-hover:scale-110 transition-transform duration-300 ease-out`}>
                                    <Icon className={`w-8 h-8 ${benefit.iconColor}`} strokeWidth={2} />
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                                    {benefit.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center flex justify-center">
                    <Link 
                        href="/shop" 
                        className="group inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 text-lg font-medium rounded-full shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/40 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                    >
                        Make One for Your Group
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}