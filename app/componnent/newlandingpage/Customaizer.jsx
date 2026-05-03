import Link from "next/link";
import { useState } from "react";

const Customzaizer = () => {
  const [isDeck, setisDeck] = useState(true);

  const imgss = isDeck
    ? "https://res.cloudinary.com/dg83pvgls/video/upload/v1770289107/final_tony_deck_xs0xal.mp4"
    : "https://res.cloudinary.com/dg83pvgls/video/upload/v1770293487/trading_dhjd6y.mp4";

  return (
    <section className="py-20 md:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-1 gap-12 items-center ">
          <div className="order-2 md:order-2 space-y-6 text-center md:text-center">
            <p className="text-2xl font-bold text-gray-700/80 italic mb-8">
              {/* Memories you can shuffle. */}
            </p>
            <Link
              href={"/shop"}
              className="w-full! bg-sky-400 hover:bg-sky-400/80 text-white px-6 py-4 text-lg rounded-xl"
            >
              Start Creating Your Deck
            </Link>
          </div>

          <div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <button
                onClick={() => {
                  setisDeck(true);
                }}
                className={`px-4 py-2 rounded-md cursor-pointer ${isDeck ? "bg-sky-500 text-white " : "bg-sky-100 text-sky-700"}`}
              >
                Deck Card
              </button>
              <button
                onClick={() => {
                  setisDeck(false);
                }}
                className={`px-4 py-2 rounded-md cursor-pointer ${!isDeck ? "bg-sky-500 text-white " : "bg-sky-100 text-sky-700"}`}
              >
                Trading Card
              </button>
            </div>
            <div className="order-1 md:order-1 h-full w-full rounded-2xl border-3 border-sky-400/20 object-cover overflow-hidden">
              <video
                src={imgss}
                autoPlay
                muted
                loop
                // playsInline
                // controls={false}
                className={`w-full h-full object-container rounded-2xl ${isDeck ? "scale-x-101" : "scale-x-113"}`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Customzaizer;
