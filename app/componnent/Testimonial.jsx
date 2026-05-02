"use client";
import Slider from "react-slick";

import hero1 from "../../public/hero1.png";


export default function Testimonial() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        draggable: true,
        swipeToSlide: true,
        pauseOnHover: true,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ],
    };

    const testimonials = [
        {
            id: 1,
            name: "Alice Johnson",
            position: "Creative Designer",
            feedback: "Amazing experience! Loved the quality and design of the cards.",
            img: hero1
        },
        {
            id: 2,
            name: "Mark Williams",
            position: "Event Organizer",
            feedback: "Customer service was fantastic. Highly recommend!",
            img: hero1
        },
        {
            id: 3,
            name: "Sophia Lee",
            position: "Photographer",
            feedback: "The cards were stunning. Everyone loved them!",
            img: hero1
        },
        {
            id: 4,
            name: "John Doe",
            position: "Designer",
            feedback: "High-quality prints and fast delivery.",
            img: hero1
        },
    ];

    return (
        <section className="bg-gradient-to-b from-[#EBF6FE] to-[#F2F9FF]">
            <div className="pb-20 pt-8 max-w-7xl mx-auto ">
                {/* Heading */}
                <div className="text-center text-[#333333] font-bold mb-12 mt-16 px-4">
                    <span className="text-[#3CA9FF] font-bold border-2 border-[#3CA9FF] rounded-3xl py-3 px-6">
                        TESTIMONIAL
                    </span>
                    <h1 className="text-5xl mt-8 uppercase leading-tight">
                        Real Stories. Real Moments. Real Cards
                    </h1>
                </div>

                {/* Carousel */}
                <div className="w-full px-4">
                    <Slider {...settings}>
                        {testimonials.map((t) => (
                            <div key={t.id} className="px-4 pb-12">
                                <div className="relative bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center transition-transform hover:scale-105 duration-300 overflow-hidden">

                                    {/* Optional ID badge at top-right */}
                                    <div className="absolute -top-5 -right-5 bg-[#3CA9FF] w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
                                        <span className="text-white font-bold text-2xl">{t.id}</span>
                                    </div>

                                    {/* Content */}
                                    <div className="mt-12">
                                        <h3 className="font-bold text-lg text-[#333]">{t.name}</h3>
                                        <p className="text-sm text-[#3CA9FF] mb-4">{t.position}</p>
                                        <p className="text-gray-600 text-sm line-clamp-1">{t.feedback}</p>
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
