import Image from "next/image";
import Link from "next/link";
import customize from "../../public/customize.png";
import gallery from "../../public/gallery.png";
import quality from "../../public/high-quality.png";
import search from "../../public/search.png";

const steps = [
    {
        id: 1,
        title: "Upload Your Images",
        description: "Faces, characters, symbols—whatever represents you",
        image: gallery,
    },
    {
        id: 2,
        title: "Customize Freely",
        description: "Fonts, icons, border, and colors to match your style.",
        image: customize,
    },
    {
        id: 3,
        title: "Live Preview",
        description: "Before printing see your exact design in real time.",
        image: search,
    },
    {
        id: 4,
        title: "Print & Deliver",
        description:
            "Sharp details, vibrant colors, and premium card texture.",
        image: quality,
    },
];

export default function CustomizationWork() {
    return (
        <section className="text-center py-20 max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 uppercase">
                How <span className="text-[#3CA9FF]">Customization</span> Works
            </h1>
            <p className="my-5 text-lg text-gray-600">
                Your creativity. Your masterpiece. Let’s make it happen.
            </p>

            {/* Cards Container */}
            <div className="text-left grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
                {steps.map((step) => {
                    const words = step.title.split(" ");
                    const lastWord = words.pop();
                    const firstPart = words.join(" ");

                    return (
                        <div
                            key={step.id}
                            className="bg-[#EBF6FF] p-6 rounded-xl shadow hover:shadow-lg transition"
                        >
                            <Image
                                src={step.image}
                                alt={step.title}
                                width={80}
                                height={80}
                                className="mb-4"
                            />
                            <h2 className="text-2xl font-bold mb-2 uppercase">
                                {firstPart}{" "}
                                <span className="text-[#3CA9FF]">{lastWord}</span>
                            </h2>
                            <p className="text-gray-600 text-xl">{step.description}</p>
                        </div>
                    );
                })}
            </div>
            <Link href={'/shop'} className="mt-12 inline-block bg-[#3CA9FF] text-white py-3 px-6 rounded-md 
                        font-medium shadow-md hover:bg-[#FF6F3C] transition duration-300">Start Customizing now</Link>
        </section>
    );
}
