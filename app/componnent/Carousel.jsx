"use client";
import Image from "next/image";
import Slider from "react-slick";
import hero3 from "../../public/ele.png";
import hero2 from "../../public/hero2.png";
import hero4 from "../../public/ronaldo.webp";
import hero1 from "../../public/tranding.png";
import hero5 from "../../public/tredingTwo.png";



export default function Carousel() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        cssEase: "ease-in-out",
        arrows: false,
        draggable: true,
        swipeToSlide: true,
        pauseOnHover: true,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ],
    };


    const items = [
        { id: 1, img: hero5, title: "Family Game Night Deck", desc: "“Custom cards for every family member—turned our gatherings into a tradition!”" },
        { id: 2, img: hero4, title: "Family Game Night Deck", desc: "“Custom cards for every family member—turned our gatherings into a tradition!”" },
        { id: 3, img: hero3, title: "Family Game Night Deck", desc: "“Custom cards for every family member—turned our gatherings into a tradition!”" },
        { id: 4, img: hero2, title: "Family Game Night Deck", desc: "“Custom cards for every family member—turned our gatherings into a tradition!”" },
        { id: 5, img: hero1, title: "Family Game Night Deck", desc: "“Custom cards for every family member—turned our gatherings into a tradition!”" },

    ];

    return (
        <section className="bg-gradient-to-b from-[#EBF6FE] to-[#f2f9ff29]">
            <div className="pt-[120px] pb-[100px]  max-w-7xl mx-auto">
                <div className="text-center text-[#333333] mb-12">
                    <h1 className="text-5xl uppercase font-bold">
                        Bringing Ideas to <span className="text-[#3CA9FF]">Life</span>
                    </h1>
                    <p className="text-gray-500 text-lg mt-4">
                        Real stories, stunning designs, and unforgettable moments—see how the Momento
                        community creates, plays, and connects.
                    </p>
                </div>

                <div className="px-6">
                    <Slider {...settings}>
                        {items.map((item) => (
                            <div key={item.id} className="px-3 pb-12">
                                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                    <Image
                                        src={item.img}
                                        alt={item.title}
                                        width={500}
                                        height={400}
                                        className="w-full h-80 object-contain bg-sky-100 p-5"
                                    />
                                    <div className="p-5 text-center">
                                        <h2 className="text-xl font-bold text-[#333]">{item.title}</h2>
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
