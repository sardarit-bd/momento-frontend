import Image from "next/image";
import Link from "next/link";
import customOnes from "../../public/allcardstucture.png";

export default function CustomOne() {
    return (
        <section className="py-24 bg-[#EBF6FF]">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
                    {/* Left Content */}
                    <div className="space-y-10 py-8 text-center lg:text-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                            Your
                            <span className="text-[#3CA9FF]"> Deck</span>, Your <span className="text-[#3CA9FF]">Design</span>,
                            <br />
                            Your <span className="text-[#3CA9FF]">Memories</span>.
                        </h1>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto lg:mx-0">
                            Customization should be effortless—and at <span className="font-semibold">Momento Cards</span>, it is.
                            Whether you’re crafting a personalized deck for play, a unique trading card, or a game-changing design,
                            we make it simple to bring your vision to life.
                        </p>
                        <Link
                            href="/shop"
                            className="inline-block bg-[#3CA9FF] text-white py-3 px-6 rounded-md 
                        font-medium shadow-md hover:bg-[#FF6F3C] transition duration-300"
                        >
                            Explore Customization
                        </Link>
                    </div>

                    {/* Right Image */}
                    <div className="relative group text-right">
                        <Image
                            src={customOnes}
                            alt="Customization Preview"
                            width={1000}
                            height={1000}
                            draggable={false}
                            className="rounded-xl object-contain w-full h-[500px] transform transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
