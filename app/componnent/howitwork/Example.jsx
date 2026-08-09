export default function Example() {
    return (
        <>
            <section className="relative max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-black tracking-tight text-slate-900 mb-4">
                        Need Inspiration?
                    </h2>
                    <p className="text-xl text-slate-600">
                        See how others are creating their decks
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer group">
                            <div className="w-full h-64 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl mb-4 group-hover:scale-105 transition-transform" />
                            <h4 className="font-bold text-slate-900 mb-2">Example Deck {i}</h4>
                            <p className="text-slate-600 text-sm">See how this deck came to life</p>
                        </div>
                    ))}
                </div>
                <div className="text-center">
                    <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform">
                        Browse Creative Examples
                    </button>
                </div>
            </section>
        </>
    )
}
