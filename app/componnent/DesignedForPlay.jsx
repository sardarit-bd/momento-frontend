import Image from "next/image";
import Link from "next/link";
import { FaCheckSquare } from "react-icons/fa";

export default function DesignedForPlay() {
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">

                {/* Left side */}
                <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-[1.0]">
                        Play, Made Personal
                    </h2>

                    <p className="mt-6 text-xl text-gray-700">
                        Every Momento deck is fully customizable — faces, traits, names, stories, design.
                    </p>

                    <p className="mt-6 text-xl text-gray-700">
                        When people see themselves inside the game, something shifts. It becomes more engaging. More meaningful. More lasting.
                        What begins as play becomes something worth keeping.
                    </p>

                    <div className="pt-6">
                        <b className=" text-xl text-gray-700">
                            Momento is used by:
                        </b>
                    </div>

                    <div className="mt-8 space-y-6 text-lg text-gray-700">
                        <div className="flex items-start gap-3">
                            <FaCheckSquare className="text-sky-500 mt-1" />
                            <p>Families building traditions</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <FaCheckSquare className="text-sky-500 mt-1" />
                            <p>Teams strengthening identity</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <FaCheckSquare className="text-sky-500 mt-1" />
                            <p>Creators designing original worlds
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <FaCheckSquare className="text-sky-500 mt-1" />
                            <p>Collectors building something personal
                            </p>
                        </div>
                    </div>

                    <div className="pt-6">
                        <b className=" text-xl text-gray-700">
                            This isn’t about novelty. It’s about ownership.

                        </b>
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
                        src={"https://res.cloudinary.com/dg83pvgls/image/upload/v1771908530/05_jujjpj.png"}
                        alt="Stacked Cards"
                        width={1000}
                        height={1000}
                        className="h-[600px] w-[600px] object-cover transition-transform duration-500 hover:scale-105 object-container rounded-md shadow-md"
                    />
                </div>
            </div>
        </section>
    );
}
