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

            {/* Explainer Video Section */}
            {/* <section className="py-20 md:py-24 px-4 bg-sky-50">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-700 mb-6 text-balance">
                        See How Momento Works
                    </h2>
                    <p className="text-xl mb-4 text-gray-700/70 text-balance">
                        From your people to the table.
                    </p>
                    <p className="text-lg text-gray-700/60 mb-12 max-w-2xl mx-auto text-pretty">
                        A short explainer showing how Momento turns real people into playable cards — from customization to game night.
                    </p>

                    
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden flex items-center justify-center transition-colors mb-12">
                        <div className="text-center">
                            <video
                                src="https://res.cloudinary.com/dg83pvgls/video/upload/v1769582816/GettyImages-1279811365_daynze.mp4"
                                autoPlay
                                controls
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>
                    </div>

                    <Link href={'/shop'} className="bg-sky-400 hover:bg-primary/90 text-primary-foreground px-6 py-4 text-lg rounded-full">
                        Create Your Deck
                    </Link>
                </div>
            </section> */}

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
                            <Image src="https://res.cloudinary.com/dg83pvgls/image/upload/v1770007236/one_rzpshu.png" width={1000} height={1000} alt='what is momento' />
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
