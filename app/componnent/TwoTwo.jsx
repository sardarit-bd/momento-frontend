import Image from "next/image";
import Link from "next/link";

export default function Two() {
    return (
        <div className="mt-8 py-8 max-w-7xl mx-auto my-14">
            <div className="flex flex-col lg:flex-row justify-around items-center gap-5 px-4 lg:px-0">
                {/* left */}
                <div className="flex items-center justify-center group overflow-hidden rounded-lg">
                    <Image
                        src={'https://res.cloudinary.com/dg83pvgls/image/upload/v1771836881/Baby-image_nabrpt.png'}
                        alt="Two"
                        width={500}
                        height={500}
                        className="h-[400px] w-[600px] object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                </div>

                {/* right */}
                <div className="max-w-lg">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug">
                        Where It Started
                    </h1>
                    <p className="mt-6 text-xl text-gray-700">
                        Momento began in a pediatric waiting room in New York City.
                    </p>
                    <p className="mt-6 text-xl text-gray-700">
                        My newborn son, dressed in a teddy bear suit — a moment that felt too iconic to live only in a photo.
                    </p>
                    <p className="mt-6 text-xl text-gray-700">
                        <b>That moment sparked a simple realization:</b> If trading cards can celebrate athletes and celebrities, why not the people who matter most to us?

                    </p>
                    <p className="mt-6 text-xl text-gray-700">
                        Momento began in a pediatric waiting room in New York City.
                    </p>
                    <div className="mt-8">
                        <Link href={"/shop"} className="inline-block px-6 py-3 bg-sky-500 text-white font-semibold rounded-sm shadow-md hover:brightness-110 transition">
                            START CUSTOMIZING
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
