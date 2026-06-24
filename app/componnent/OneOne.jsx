import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-[#E6F0F8] to-white py-20 md:py-32">
            {/* Subtle ambient background flares */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-200/40 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20">
                
                {/* Left Side (Text Content) */}
                <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6 md:mb-8">
                        Designed for the Moments That Matter
                    </h1>
                    
                    <div className="space-y-6">
                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                            For decades, games and collectibles have focused on fictional characters and cultural icons. Meanwhile, the moments that matter most in our own lives live inside camera rolls — rarely revisited, never collected.
                        </p>
                        <p className="text-xl md:text-2xl font-medium text-slate-800 leading-snug">
                            We believe play should reflect the people playing.
                        </p>
                    </div>

                    <div className="mt-10 md:mt-12">
                        <Link 
                            href="/shop" 
                            className="inline-flex items-center justify-center px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold tracking-widest uppercase rounded-full shadow-lg shadow-sky-500/30 transition-all duration-300 hover:-translate-y-1 active:scale-95"
                        >
                            Start Customizing
                        </Link>
                    </div>
                </div>

                {/* Right Side (Image Grid) */}
                <div className="flex-1 w-full flex justify-center lg:justify-end items-center">
                    <div className="group relative w-full max-w-md lg:max-w-lg xl:max-w-xl aspect-[5/4] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 border border-white/50 bg-white">
                        <Image
                            src="https://res.cloudinary.com/dg83pvgls/image/upload/v1771828530/1_dhekyy.png"
                            alt="Diamond"
                            fill
                            priority
                            className="object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        {/* Soft interior shadow overlay for depth */}
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-3xl pointer-events-none" />
                    </div>
                </div>
                
            </div>
        </section>
    );
}