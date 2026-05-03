import Link from "next/link";

import { Gift } from "lucide-react";
export default function Giftme() {
  return (
    <>
      <section className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="bg-linear-to-br lg:mx-auto max-w-4xl flex flex-col gap-5 justify-center items-center from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-5 py-12 lg:p-16 text-center shadow-2xl">
          <Gift className="w-16 h-16 text-white   animate-bounce" />
          <h2 className="text-3xl lg:text-5xl font-black text-white ">
            The Perfect Personalized Gift
          </h2>
          <p className="text-lg lg:text-2xl text-white/90 w-full    ">
            Thoughtful. Personal. Unforgettable. Momento decks make incredible
            gifts for birthdays, holidays, anniversaries, milestones, and
            game-night lovers.
          </p>
          <p className="text-lg font-bold text-white lg:text-2xl">
            These aren't just cards — they're memories you can play with.
          </p>
          <Link
            href="/shop"
            className="p-4  bg-white text-orange-600 font-black rounded-xl hover:bg-orange-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform text-lg"
          >
            Customize & Gift a Deck
          </Link>
        </div>
      </section>
    </>
  );
}
