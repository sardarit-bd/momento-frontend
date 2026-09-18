'use client';

import { Sparkles, Palette, ShieldCheck } from 'lucide-react';

export default function PremiumQuality() {
    const features = [
        {
            icon: Sparkles,
            title: 'Premium Card Stock',
            description: 'Feels as good as it looks, with a satisfying weight in your hand.',
            color: 'text-amber-500',
            bg: 'bg-amber-50',
        },
        {
            icon: Palette,
            title: 'Vibrant Colors',
            description: 'Crisp, clear, and brilliant edge-to-edge printing.',
            color: 'text-sky-500',
            bg: 'bg-sky-50',
        },
        {
            icon: ShieldCheck,
            title: 'Durable Finish',
            description: 'Built with a protective coating to withstand countless shuffles.',
            color: 'text-emerald-500',
            bg: 'bg-emerald-50',
        }
    ];

    return (
        <section className="relative py-24 px-4 bg-gradient-to-b from-sky-50 to-white overflow-hidden">
            {/* Soft Ambient Glow Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-200/30 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/20 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />

            <div className="relative max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                        Built To Be Played
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
                        Printed on premium card stock with vibrant colors and durable finishes. Made to last beyond the first shuffle.
                    </p>
                </div>

                {/* Quality showcase grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => {
                        const Icon = feature.icon;
                        return (
                            <div 
                                key={idx}
                                className="group bg-white rounded-3xl p-8 text-center border border-slate-100 shadow-sm hover:shadow-xl hover:border-sky-100 transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Icon Container with scale effect */}
                                <div className={`mx-auto w-16 h-16 flex items-center justify-center rounded-2xl ${feature.bg} mb-6 group-hover:scale-110 transition-transform duration-300 ease-out`}>
                                    <Icon className={`w-8 h-8 ${feature.color}`} strokeWidth={2} />
                                </div>
                                
                                <h3 className="font-bold text-xl text-slate-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}