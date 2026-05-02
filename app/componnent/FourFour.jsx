import Image from "next/image";
import Link from "next/link";

export default function Four() {
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse lg:flex-row-reverse items-center justify-between gap-12">

                {/* Left side */}
                <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-[1.0]">
                        From Personal Moments to Collectible Culture
                    </h2>

                    <p className="mt-6 text-xl text-gray-700">
                        Today, Momento offers fully customizable playing cards and trading cards.
                    </p>

                    <p className="mt-6 text-xl text-gray-700">
                        Next comes limited releases, creator collaborations, and exclusive drops — built on the same foundation: identity at the center of play.
                    </p>

                    <p className="mt-6 text-xl text-gray-700">
                        We’re not following an existing category.
                    </p>

                    <p className="mt-6 text-xl text-gray-700">
                        We’re building a new one.
                    </p>


                    {/* Buttons */}
                    <div className="mt-8 flex gap-4">
                        <Link href={"/shop"} className="px-6 py-3 bg-sky-500 text-white font-semibold rounded-md shadow-md hover:brightness-110 transition">
                            START CUSTOMIZING
                        </Link>
                    </div>
                </div>

                {/* Right side (single merged image) */}
                <div className="h-[500px] w-full rounded-md flex-1 flex justify-center lg:justify-center items-center">
                    <Image
                        src={'https://res.cloudinary.com/dg83pvgls/image/upload/v1771908529/03_tdwl52.png'}
                        alt="Stacked Cards"
                        width={1000}
                        height={1000}
                        className=" w-[600px] h-[500px] transition-transform duration-500 hover:scale-105 object-container rounded-md shadow-md"
                    />
                </div>
            </div>
        </section>
    );
}
