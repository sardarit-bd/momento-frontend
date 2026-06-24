'use client';

import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const products = [
    {
        img: '/mockup4.png',
        title: 'Momento Portrait Deck',
        description: 'A full playing card deck — built from your people.',
        features: [
            'Best place to start',
            'Designed for full game nights',
            'The deck everyone recognizes'
        ]
    },
    {
        img: '/mockup5.png',
        title: 'Momento Trading Cards',
        description: 'Capture real moments — one card at a time.',
        features: [
            'Capture real-life moments',
            'Perfect for memories & milestones',
            'Keep, gift, or collect over time'
        ]
    }
];

export default function Products() {
    return (
        <section className="py-24 px-4 bg-slate-50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                        Experience Momento Game Night — Two Ways
                    </h2>
                    <p className="text-xl text-slate-600 font-light">
                        Each product brings a different layer of personalization to the table. Choose how you want to play.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
                    {products.map((product, idx) => (
                        <div
                            key={idx}
                            className="group flex flex-col bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:border-sky-200 transition-all duration-500 hover:-translate-y-1"
                        >
                            {/* Image Container with precise aspect ratio and zoom effect */}
                            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-8 bg-slate-100">
                                <Image 
                                    src={product.img} 
                                    alt={product.title} 
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority={idx === 0}
                                />
                            </div>

                            <div className="flex flex-col flex-grow">
                                <div className="mb-4">
                                    {product.badge && (
                                        <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-sky-700 uppercase bg-sky-100 rounded-full">
                                            {product.badge}
                                        </span>
                                    )}
                                    <h3 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
                                        {product.title}
                                    </h3>
                                    <p className="text-lg text-slate-600 leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>

                                <ul className="space-y-4 mb-8 mt-auto pt-6">
                                    {product.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-sky-50 flex items-center justify-center mt-0.5">
                                                <Check className="w-4 h-4 text-sky-500" strokeWidth={3} />
                                            </div>
                                            <span className="text-slate-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link 
                                    href="/shop"
                                    className="group/btn flex items-center justify-center w-full bg-sky-500 hover:bg-sky-600 text-white px-6 py-4 text-lg font-medium rounded-xl shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/40 transition-all duration-300 active:scale-95"
                                >
                                    <span>Create {product.title.split(' ')[1] === 'Portrait' ? 'Deck' : 'Cards'}</span>
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center bg-white rounded-2xl py-6 px-4 shadow-sm border border-slate-100 max-w-2xl mx-auto">
                    <p className="text-lg font-medium text-slate-700">
                        ✨ Each Momento product works on its own — and even better together.
                    </p>
                </div>
            </div>
        </section>
    );
}