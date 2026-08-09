'use client';

import Link from 'next/link';

const steps = [
    { number: '01', title: 'Pick your cards', description: 'Choose the cards and layout for your deck' },
    { number: '02', title: 'Create your characters', description: 'Add your people and personalize each card' },
    { number: '03', title: 'Customize trading cards', description: 'Fine-tune every detail to match your vision' },
    { number: '04', title: 'Live preview', description: 'See your deck exactly as it will be printed' },
    { number: '05', title: 'Printed & shipped', description: 'We handle the rest and ship to your door' }
];

export default function HowItWorks() {
    return (
        <section className="py-20 md:py-24 px-4 bg-gray-200 text-black">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        How It Works
                    </h2>
                    <p className="text-xl text-gray-700">
                        Create your deck in minutes.
                    </p>
                </div>

                <div className="grid md:grid-cols-5 gap-4 md:gap-2 mb-12">
                    {steps.map((step, idx) => (
                        <div key={idx} className="relative group">
                            {/* Connection line */}
                            {idx < steps.length - 1 && (
                                <div className="hidden md:block absolute top-12 left-1/2 w-[calc(100%)] h-0.5 bg-gradient-to-r from-primary to-transparent -z-10" />
                            )}

                            <div className="relative bg-white rounded-xl p-6 h-full border-2 border-sky-400 group-hover:border-primary/60 transition-colors">
                                <div className="flex flex-col h-full">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sky-400 text-white flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                                            {step.number}
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold  mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 flex-grow">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link href={"/shop"} className="bg-sky-400 hover:bg-sky-500 text-white px-6 py-4 text-lg rounded-full">
                        Create Your Deck
                    </Link>
                </div>
            </div>
        </section>
    );
}
