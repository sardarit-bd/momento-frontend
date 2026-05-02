'use client';

import Link from 'next/link';

export default function FinalCTA() {
    return (
        <section className="py-20 md:py-24 px-4 bg-sky-400 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10 text-center">
                <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 text-balance leading-tight">
                    Ready to Make Yours?
                </h2>

                <p className="text-2xl text-muted-foreground mb-12 text-balance">
                    Design it your way. We'll handle the rest.
                </p>

                <Link href={"/shop"}
                    size="lg"
                    className="bg-white text-gray-700 px-6 py-4 text-lg rounded-full"
                >
                    Create Your Deck
                </Link>

                <p className="text-muted-foreground mt-10">
                    Join thousands of people who've turned their moments into play.
                </p>
            </div>
        </section>
    );
}
