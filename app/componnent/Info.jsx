"use client";

import Image from "next/image";
import club from "../../public/club.png";
import dice from "../../public/dice.png";
import heart from "../../public/heart.png";
import spade from "../../public/spade.png";

export default function Info() {
  const cards = [
    {
      rank: "A",
      suit: "♠",
      title: "Limitless Creativity",
      description:
        "Design cards that feel personal, unique, and completely your own.",
      image: spade,
    },
    {
      rank: "K",
      suit: "♦",
      title: "Premium Quality",
      description:
        "Durable premium materials and finishes designed to look and feel collectible.",
      image: dice,
    },
    {
      rank: "Q",
      suit: "♥",
      title: "Easy Customization",
      description:
        "No complicated tools — create your cards in just a few minutes.",
      image: heart,
    },
    {
      rank: "J",
      suit: "♣",
      title: "Fast & Easy Ordering",
      description:
        "Customize your cards, place your order, and let Momento handle the rest with an easy delivery process right to your door.",
      image: club,
    },
  ];

  const tilt = [-4, -1.4, 1.4, 4];
  const lift = [10, -4, -4, 10];

  return (
    <section className="relative w-full py-20 lg:py-32 bg-linear-to-b from-[#EBF6FF] to-white overflow-hidden">
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-225 h-125 rounded-full opacity-40"
        style={{
          background: "radial-gradient(closest-side, #D9EEFD, transparent)",
        }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center px-4 mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-5">
            Made to Be Shuffled, <br className="hidden sm:block" />
            <span className="text-[#3CA9FF]">Not Shelved</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-14 gap-x-8 lg:gap-x-10">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="card-deal group relative"
              style={{
                animationDelay: `${idx * 120}ms`,

                "--tilt": `${tilt[idx]}deg`,
                "--lift": `${lift[idx]}px`,
              }}
            >
              <div className="card-tilt relative transition-transform duration-500 ease-out">
                <div className="rounded-[26px] p-0.75 bg-linear-to-br from-[#3CA9FF] to-[#8AD0FF] shadow-[0_10px_30px_-12px_rgba(60,169,255,0.45)] transition-shadow duration-500 group-hover:shadow-[0_24px_46px_-14px_rgba(60,169,255,0.55)]">
                  <div className="relative overflow-hidden rounded-[23px] bg-white px-6 pt-9 pb-9 h-full flex flex-col items-center text-center">
                    <div className="absolute top-4 left-4 flex flex-col items-center leading-none text-[#3CA9FF]">
                      <span className="text-base font-extrabold">
                        {card.rank}
                      </span>
                      <span className="text-xs -mt-0.5">{card.suit}</span>
                    </div>

                    <div className="absolute bottom-4 right-4 rotate-180 flex flex-col items-center leading-none text-[#3CA9FF]">
                      <span className="text-base font-extrabold">
                        {card.rank}
                      </span>
                      <span className="text-xs -mt-0.5">{card.suit}</span>
                    </div>

                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.06]">
                      <div className="relative w-32 h-32">
                        <Image
                          src={card.image}
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>

                    <div className="relative flex items-center justify-center w-20 h-20 mb-7 rounded-full bg-[#EBF6FF] transition-transform duration-500 group-hover:scale-110 group-hover:bg-[#D9EEFD]">
                      <div className="relative w-10 h-10">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          draggable={false}
                          className="object-contain drop-shadow-sm"
                          sizes="40px"
                        />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-[#0B2A4A] mb-3 transition-colors duration-300 group-hover:text-[#3CA9FF]">
                      {card.title}
                    </h3>
                    <p className="text-[#5B6B7C] leading-relaxed text-sm font-medium">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .card-tilt {
          transform: rotate(var(--tilt)) translateY(var(--lift));
        }
        .group:hover .card-tilt {
          transform: rotate(0deg) translateY(-10px);
        }

        .card-deal {
          opacity: 0;
          animation: dealIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes dealIn {
          from {
            opacity: 0;
            transform: translateY(28px) scale(0.94);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .card-deal {
            animation: none;
            opacity: 1;
          }
          .card-tilt,
          .group:hover .card-tilt {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
