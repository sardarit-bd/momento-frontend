import Link from "next/link";

export default function Passion() {
    return (
        <section className="bg-[#EBF6FF] text-center py-20">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl uppercase font-bold">Need <span className="text-[#3CA9FF]">Inspiration?</span></h1>
                <p className="mt-4 text-lg">Looking for a truly one-of-a-kind gift? Whether it’s for a game lover, collector, or family member, a custom Momento deck is thoughtful, unique, and unforgettable.</p>
                <div className="mt-8">
                    <Link href={'/shop'} className="bg-[#3CA9FF] hover:bg-[#2f91e0] text-white font-bold uppercase px-6 py-3 rounded-lg transition">
                        Browse Creative Examples
                    </Link>
                </div>
            </div>
        </section>
    )
}
