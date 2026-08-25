"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import hero4 from "../../public/mockup5.png";
import hero1 from "../../public/mockup4.png";
import hero5 from "../../public/mockup3.png";

export default function Carousel() {
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 768) setSlidesToShow(1);
      else if (w < 1024) setSlidesToShow(2);
      else setSlidesToShow(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    arrows: false,
    draggable: true,
    swipeToSlide: true,
    pauseOnHover: true,
  };

  const items = [
    {
      id: 2,
      img: hero4,
      title: "Milestone Trading Cards",
      desc: "Celebrate birthdays, achievements, big moments, and everything worth remembering.",
    },
    {
      id: 4,
      img: hero5,
      title: "Our Crew Deck",
      desc: "Turn your friend group into a deck packed with personalities, memories, and inside jokes.",
    },
    {
      id: 5,
      img: hero1,
      title: "Turn Us Into Cards",
      desc: "Transform your favorite people into a one-of-a-kind illustrated deck.",
    },
  ];

  return (
    <section className="bg-linear-to-b from-[#EBF6FE] to-[#f2f9ff29]">
      <div className="pt-20 sm:pt-30 pb-15 sm:pb-25 container mx-auto">
        <div className="text-center text-[#333333] mb-12 px-4">
          <h1 className="text-3xl sm:text-5xl uppercase font-bold">
            Bringing Ideas to <span className="text-[#3CA9FF]">Life</span>
          </h1>
          <p className="text-gray-500 text-base sm:text-lg mt-4">
            See how the people, moments, and memories you love can become cards
            made your way.
          </p>
        </div>

        <div className="px-4 sm:px-6">
          <Slider {...settings}>
            {items.map((item) => (
              <div key={item.id} className="px-3 pb-12">
                <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={500}
                    height={400}
                    className="w-full h-64 sm:h-80 object-contain bg-sky-100 p-5 shrink-0"
                  />

                  <div className="p-5 text-center flex flex-col min-h-29">
                    <h2 className="text-xl font-bold text-[#333]">
                      {item.title}
                    </h2>

                    <p className="text-gray-600 mt-2 text-sm">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
