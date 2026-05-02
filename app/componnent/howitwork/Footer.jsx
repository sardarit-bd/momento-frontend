
export default function Footer() {
    return (
        <>
            {/* Footer CTA */}
            <section className="relative max-w-7xl mx-auto px-6 py-20">
                <div className="bg-slate-900 rounded-3xl p-12 lg:p-16 text-center">
                    <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
                        Where memories become moments of play
                    </h2>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
                        Momento Cards helps you turn the people you care about into cards worth keeping, gifting, and playing again and again.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-xl hover:shadow-2xl hover:scale-105 transform text-lg">
                            Start Creating Now
                        </button>
                        <button className="px-10 py-5 bg-white/10 backdrop-blur text-white font-bold rounded-xl border-2 border-white/20 hover:bg-white/20 transition-all text-lg">
                            Learn More About Momento
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}
