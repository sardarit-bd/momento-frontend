import Image from "next/image";
import Link from "next/link";

export default function Four() {
  return (
    <section className="relative py-20 md:py-32 px-6 bg-gradient-to-b from-slate-50 to-slate-100/80 overflow-hidden">
      {/* Eye-Soothing Ambient Gray Mesh */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-slate-200/90 rounded-full blur-[120px] -translate-y-1/4 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gray-200/40 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />

      <div className="relative z-10 container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side (Left on Desktop, Bottom on Mobile) */}
          <div className="order-2 lg:order-1 w-full flex justify-center lg:justify-start">
            <div className="group relative w-full max-w-md lg:max-w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/50 border border-white/80 bg-white">
              <Image
                src="https://res.cloudinary.com/dg83pvgls/image/upload/v1771908529/03_tdwl52.png"
                alt="Momento Collectible Cards"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Inner shadow overlay for depth */}
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-3xl pointer-events-none" />
            </div>
          </div>

          {/* Text Side (Right on Desktop, Top on Mobile) */}
          <div className="order-1 lg:order-2 max-w-2xl mx-auto lg:mx-0">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
              From Personal Moments to Collectible Culture
            </h2>

            <div className="space-y-6 text-lg md:text-xl text-slate-600 font-light leading-relaxed">
              <p>
                Today, Momento offers fully customizable playing cards and
                trading cards.
              </p>
              <p>
                Next comes limited releases, creator collaborations, and
                exclusive drops — built on the same foundation: identity at the
                center of play.
              </p>
            </div>

            {/* Bold Punchline Section */}
            <div className="mt-10 pt-8 border-t border-slate-200/60">
              <p className="text-xl md:text-2xl font-bold text-slate-900 leading-snug">
                We’re not following an existing category.{" "}
                <br className="hidden md:block" />
                <span className="text-sky-500">We’re building a new one.</span>
              </p>

              <div className="mt-10">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold tracking-widest uppercase rounded-full shadow-lg shadow-sky-500/30 transition-all duration-300 hover:-translate-y-1 active:scale-95"
                >
                  Start Customizing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
