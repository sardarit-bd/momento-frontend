'use client';

import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const benefits = [
    {
        title: 'Personal',
        description: 'Every card has meaning'
    },
    {
        title: 'Fun',
        description: 'Game night feels like your game'
    },
    {
        title: 'Gift-worthy',
        description: 'Thoughtful and memorable'
    }
];

export default function WhyMomento() {
    return (
        <section className="py-20 md:py-24 px-4 bg-sky-50 text-black">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 text-balance">
                        Why Momento Works
                    </h2>
                    <p className="text-xl text-gray-600">
                        Because the people at the table matter.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {benefits.map((benefit, idx) => (
                        <div
                            key={idx}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative bg-white rounded-2xl p-8 border-2 border-sky-400/40 group-hover:border-sky-500 transition-colors h-full">
                                <div className="flex items-start gap-4 mb-4">
                                    <CheckCircle2 className="w-8 h-8 text-sky-400 flex-shrink-0 mt-1" />
                                </div>

                                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                                    {benefit.title}
                                </h3>
                                <p className="text-lg text-gray-400 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link href={'/shop'} className="bg-sky-400 hover:bg-sky-500 text-white px-6 py-4 text-lg rounded-full">
                        Make One for Your Group
                    </Link>
                </div>
            </div>
        </section>
    );
}
