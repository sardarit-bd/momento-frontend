import Image from "next/image";
import Link from "next/link";
import bgCards from "../../public/club.png"; // example bg image

export default function Cta() {
    return (

        <section className="bg-[#EBF6FF] py-16">
            <div className="relative py-8 md:py-10 lg:py-20 max-w-7xl mx-6 xl:mx-auto rounded-2xl text-center flex flex-col justify-center items-center overflow-hidden">
                {/* Background Image */}
                <Image
                    src={bgCards}
                    alt="CTA Background"
                    fill
                    className="absolute z-0 w-full h-full left-0 object-contain opacity-50"
                />
                {/* Overlay Color */}
                <div className="absolute inset-0 bg-[#3CA9FF]/80" />

                {/* Content */}
                <div className="relative z-10 px-3 md:px-4 lg:px-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-white uppercase">
                        Design your custom deck today
                    </h1>
                    <p className="text-lg text-white mt-4">
                        Start creating, sharing, and playing with purpose.
                    </p>
                    <div className="pt-10">
                        <Link href={'/shop'} className="mt-10 px-8 py-3 bg-[#FF6F3C] text-[#ffffff] text-lg font-semibold rounded-md shadow-md hover:brightness-110 transition cursor-pointer">
                            Start Customizing
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
