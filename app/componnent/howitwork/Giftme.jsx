import Link from "next/link";

import { Gift } from 'lucide-react';
export default function Giftme() {
    return (
        <>
            <section className="relative max-w-7xl mx-auto px-6 py-20">
                <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-5 py-12 lg:p-16 text-center shadow-2xl">
                    <Gift className="w-16 h-16 text-white mx-auto mb-6 animate-bounce" />
                    <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
                        The Perfect Personalized Gift
                    </h2>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                        Thoughtful. Personal. Unforgettable. Momento decks make incredible gifts for birthdays, holidays, anniversaries, milestones, and game-night lovers.
                    </p>
                    <p className="text-2xl font-bold text-white mb-8">
                        These aren't just cards — they're memories you can play with.
                    </p>
                    <Link href='/shop' className="px-10 py-5 bg-white text-orange-600 font-black rounded-xl hover:bg-orange-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform text-lg">
                        Customize & Gift a Deck
                    </Link>
                </div>
            </section>
        </>
    )
}
