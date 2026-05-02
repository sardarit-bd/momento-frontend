import Image from "next/image";
import Link from "next/link";
import { FaCheckSquare } from "react-icons/fa";

export default function Five() {
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">

                {/* Left side */}
                <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-[1.0]">
                        Why Now
                    </h2>

                    <p className="mt-6 text-xl text-gray-700">
                        People want experiences that feel personal.
                    </p>

                    <div className="mt-8 space-y-4 text-lg text-gray-700">
                        <div className="flex items-start gap-3">
                            <FaCheckSquare className="text-sky-500 mt-1" />
                            <p>Less generic entertainment.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <FaCheckSquare className="text-sky-500 mt-1" />
                            <p>More connection.
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <FaCheckSquare className="text-sky-500 mt-1" />
                            <p>Less scrolling.

                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <FaCheckSquare className="text-sky-500 mt-1" />
                            <p>More ownership.
                            </p>
                        </div>

                        <div className="flex items-start gap-3">
                            <FaCheckSquare className="text-sky-500 mt-1" />
                            <p>Momento exists at that shift.
                            </p>
                        </div>

                        <div className="flex items-start gap-3">
                            <FaCheckSquare className="text-sky-500 mt-1" />
                            <p>Early customers aren’t just buying a deck.
                            </p>
                        </div>

                        <div className="flex items-start gap-3">
                            <FaCheckSquare className="text-sky-500 mt-1" />
                            <p>They’re stepping into something ahead of its time.
                            </p>
                        </div>
                    </div>


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
                        src={'https://res.cloudinary.com/dg83pvgls/image/upload/v1771908539/02_cteult.png'}
                        alt="Stacked Cards"
                        width={1000}
                        height={1000}
                        className="w-[600] h-[500px] object-cover transition-transform duration-500 hover:scale-105 object-container rounded-md shadow-md"
                    />
                </div>
            </div>
        </section>
    );
}
