'use client';

import Howwork from '@/app/componnent/howitwork/Howwork';
import Customzaizer from '@/app/componnent/newlandingpage/Customaizer';
import Image from 'next/image';
import Link from 'next/link';
import FinalCTA from '../../componnent/newlandingpage/FinalCTA';
import Hero from '../../componnent/newlandingpage/Hero';
import PremiumQuality from '../../componnent/newlandingpage/PremiumQuality';
import Products from '../../componnent/newlandingpage/Product';
import SocialProof from '../../componnent/newlandingpage/SocialProof';
import WhyMomento from '../../componnent/newlandingpage/WhyMomento';

export default function Page() {
    return (
        <main className="min-h-screen">

            <Hero />
            <Customzaizer />

            {/* What is Momento */}
            <section className="py-20 md:py-24 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-700 mb-4 text-balance">
                            What Is Momento?
                        </h2>
                        <p className="text-xl text-gray-600/70 font-semibold mb-6">
                            Real people. Real cards. Real game nights.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1 space-y-6 text-center md:text-left">
                            <p className="text-lg text-gray-700/70 leading-relaxed">
                                Momento turns the people you care about into playable cards.
                            </p>
                            <p className="text-lg text-gray-700/70 leading-relaxed">
                                Design custom cards inspired by friends, family, or favorite characters — choosing their look, vibe, and personality. We professionally print and ship everything straight to your door.
                            </p>
                            <p className="text-2xl font-bold text-gray-700/80 italic mb-8">
                                Memories you can shuffle.
                            </p>
                            <Link href={"/shop"} className="bg-sky-400 hover:bg-sky-400/80 text-primary-foreground px-6 py-4 text-lg rounded-full">
                                Start Creating Your Deck
                            </Link>
                        </div>

                        <div className="order-1 md:order-2 relative h-fit rounded-2xl overflow-hidden bg-sky-400/10 flex items-center justify-center border-2 border-sky-200/10">
                            <Image src="/trading-deck.png" width={1000} height={1000} alt='what is momento' />
                        </div>
                    </div>
                </div>
            </section>

            <Products />




            <div className='bg-sky-50'>
                <div className='w-full max-w-6xl mx-auto'>
                    <Howwork />
                </div>
            </div>

            <WhyMomento />
            <SocialProof />
            <PremiumQuality />
            <FinalCTA />

        </main>
    );
}
