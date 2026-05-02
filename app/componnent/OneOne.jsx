import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
    return (
        <section className="bg-[#E6F0F8] py-20">
            <div className="h-fit lg:h-[68vh] max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">
                {/* Left Side */}
                <div className="flex-1 text-center lg:text-left">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug">
                        Designed for the Moments That Matter
                    </h1>
                    <p className="mt-6 text-xl text-gray-700 max-w-lg">
                        For decades, games and collectibles have focused on fictional characters and cultural icons. Meanwhile, the moments that matter most in our own lives live inside camera rolls — rarely revisited, never collected.
                    </p>
                    <p className="mt-6 text-xl text-gray-700 max-w-lg">
                        We believe play should reflect the people playing.
                    </p>
                    <div className="mt-8">
                        <Link href="/shop" className="inline-block px-6 py-3 bg-sky-500 text-white font-semibold rounded-sm shadow-md hover:brightness-110 transition">
                            START CUSTOMIZING
                        </Link>
                    </div>
                </div>

                {/* Right Side (Diamond Grid Image) */}
                <div className="flex justify-center items-center group">
                    <Image
                        src={'https://res.cloudinary.com/dg83pvgls/image/upload/v1771828530/1_dhekyy.png'}
                        alt="Diamond"
                        width={1000}
                        height={1000}
                        className="h-[400px] rounded-md shadow-md w-[500px] object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                </div>
            </div>
        </section>
    );
}
