import { useState } from "react";

export default function Video() {
    const [playing, setPlaying] = useState(false);

    return (
        <section id="video" className="relative container mx-auto px-6 py-20  mt-0 lg:mt-20">
            <div className="max-w-6xl mx-auto">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl">
                    <div className="bg-slate-950 rounded-2xl aspect-video relative overflow-hidden group">


                        <video
                            src="https://res.cloudinary.com/dg83pvgls/video/upload/v1769582816/GettyImages-1279811365_daynze.mp4"
                            autoPlay
                            controls
                            className="w-full h-full object-cover rounded-2xl"
                        />


                    </div>
                </div>

                <p className="text-center text-slate-600 mt-6 font-semibold">
                    60–90 second explainer showing what Momento is and how it works
                </p>
            </div>
        </section>
    );
}