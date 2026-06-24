import Image from "next/image";
import Link from "next/link";

export default function OriginStory() {
    return (
        <section className="py-20 md:py-32 px-6 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    
                    {/* Left: Image Container */}
                    <div className="order-2 lg:order-1 w-full flex justify-center">
                        <div className="group relative w-full max-w-lg lg:max-w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100 bg-slate-50">
                            <Image
                                src="https://res.cloudinary.com/dg83pvgls/image/upload/v1771836881/Baby-image_nabrpt.png"
                                alt="Momento Origin Story"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            {/* Inner shadow for depth */}
                            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-3xl pointer-events-none" />
                        </div>
                    </div>

                    {/* Right: Text Content */}
                    <div className="order-1 lg:order-2 max-w-2xl mx-auto lg:mx-0">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.2] tracking-tight mb-8">
                            Where It Started
                        </h2>
                        
                        <div className="space-y-6 text-lg md:text-xl text-slate-600 leading-relaxed font-light">
                            <p>
                                Momento began in a pediatric waiting room in New York City.
                            </p>
                            <p>
                                My newborn son, dressed in a teddy bear suit — a moment that felt too iconic to live only in a photo.
                            </p>
                            <p>
                                <strong className="font-semibold text-slate-800">
                                    That moment sparked a simple realization:
                                </strong> If trading cards can celebrate athletes and celebrities, why not the people who matter most to us?
                            </p>
                            <p>
                                Momento began in a pediatric waiting room in New York City.
                            </p>
                        </div>

                        <div className="mt-12">
                            <Link 
                                href="/shop" 
                                className="inline-flex items-center justify-center px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold tracking-widest uppercase rounded-full shadow-lg shadow-sky-500/30 transition-all duration-300 hover:-translate-y-1 active:scale-95"
                            >
                                Start Customizing
                            </Link>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    );
}