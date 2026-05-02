'use client';

export default function PremiumQuality() {
    return (
        <section className="py-20 md:py-24 px-4 bg-sky-50 text-black relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10" />

            <div className="max-w-4xl mx-auto">
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-600 mb-6 text-balance">
                        Built To Be Played
                    </h2>
                    <p className="text-xl text-gray-700/80 mb-8">
                        Made to last beyond the first shuffle.
                    </p>
                    <p className="text-lg text-gray-700/70 leading-relaxed max-w-2xl mx-auto">
                        Printed on premium card stock with vibrant color and durable finishes.
                    </p>
                </div>

                {/* Quality showcase grid */}
                <div className="grid md:grid-cols-3 gap-6 mt-16">
                    <div className="bg-white rounded-xl p-8 text-center border-2 border-sky-400/40 hover:border-primary/50 transition-colors hover:shadow-lg">
                        <div className="text-5xl mb-4">✨</div>
                        <h3 className="font-bold text-lg text-gray-700 mb-2">Premium Card Stock</h3>
                        <p className="text-muted-foreground">Feels as good as it looks</p>
                    </div>

                    <div className="bg-white rounded-xl p-8 text-center border-2 border-sky-400/40 hover:border-primary/50 transition-colors hover:shadow-lg">
                        <div className="text-5xl mb-4">🎨</div>
                        <h3 className="font-bold text-lg text-gray-700 mb-2">Vibrant Colors</h3>
                        <p className="text-muted-foreground">Crisp, clear, and brilliant</p>
                    </div>

                    <div className="bg-white rounded-xl p-8 text-center border-2 border-sky-400/40 hover:border-primary/50 transition-colors hover:shadow-lg">
                        <div className="text-5xl mb-4">🛡️</div>
                        <h3 className="font-bold text-lg text-gray-700 mb-2">Durable Finish</h3>
                        <p className="text-muted-foreground">Built to withstand countless shuffles</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
