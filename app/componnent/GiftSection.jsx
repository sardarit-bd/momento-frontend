import Image from "next/image";
import Link from "next/link";
import { BsCheck2Square } from "react-icons/bs";
import giftImage from "../../public/gift.jpg";

export default function GiftSection() {
    return (
        <section className="max-w-7xl mx-auto py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left Side */}
                <div className="flex items-center justify-center bg-[#EBF6FF] p-10 rounded-xl h-full">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 uppercase mb-4">
                            THE PERFECT{" "}
                            <span className="text-[#3CA9FF]">PERSONALIZED GIFT</span>
                        </h2>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            Looking for a truly one-of-a-kind gift? Whether it’s for a game
                            lover, collector, or family member, a custom Momento deck is
                            thoughtful, unique, and unforgettable.
                        </p>

                        {/* Checklist */}
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-start gap-2 text-gray-700">
                                <BsCheck2Square className="text-[#3CA9FF] text-xl mt-1" />
                                Gift-ready designs – Create a deck they’ll cherish.
                            </li>
                            <li className="flex items-start gap-2 text-gray-700">
                                <BsCheck2Square className="text-[#3CA9FF] text-xl mt-1" />
                                Perfect for birthdays, holidays, and milestones – Make
                                moments unforgettable.
                            </li>
                        </ul>

                        {/* Button */}
                        <Link href={'/shop'} className="bg-[#3CA9FF] hover:bg-[#2f91e0] text-white font-bold px-6 py-4 rounded-lg transition">
                            Customize & Gift a Deck
                        </Link>
                    </div>
                </div>

                {/* Right Side Image */}
                <div>
                    <Image
                        src={giftImage}
                        alt="Gift"
                        className="rounded-xl w-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
