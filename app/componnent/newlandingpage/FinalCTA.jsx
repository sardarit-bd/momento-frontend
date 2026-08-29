"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-sky-500">
      <div className="absolute inset-0 bg-linear-to-br from-sky-400 via-sky-500 to-indigo-600 opacity-90" />
      <div className="absolute top-0 left-1/4 w-120 h-120 bg-white/20 rounded-full blur-[120px] mix-blend-overlay pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-120 h-120 bg-indigo-300/30 rounded-full blur-[120px] mix-blend-overlay pointer-events-none" />
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-8 shadow-sm">
          <Sparkles className="w-4 h-4 text-sky-200" />
          <span className="text-sm font-bold tracking-wide uppercase text-sky-50">
            The Ultimate Game Night
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 text-balance tracking-tight">
          Ready to Make Yours?
        </h2>
        <p className="text-xl md:text-2xl text-sky-50 mb-12 text-balance font-light max-w-2xl mx-auto leading-relaxed">
          Design it your way. We'll handle the printing, cutting, and shipping
          straight to your door.
        </p>
        <div className="flex flex-col items-center justify-center">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 bg-white text-sky-600 px-8 py-4 text-lg font-bold rounded-full shadow-2xl hover:shadow-sky-900/20 hover:bg-slate-50 transition-all duration-300 hover:-translate-y-1 active:scale-95"
          >
            Create Your Deck
            <ArrowRight className="w-5 h-5 text-sky-500 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
