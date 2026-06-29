"use client";
/**
 * MobileCustomizerSheet
 * ---------------------
 * A mobile-only bottom sheet that replaces the hidden fixed drawer.
 * Three snap positions: peek (80px) → half (48vh) → full (90vh).
 * Desktop is completely unaffected — this renders only on <xl screens.
 *
 * Props mirror what the desktop sidebar/controller already receive.
 */

import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SideController from "./SideController";


const PEEK_HEIGHT = 80;
const NAV_HEIGHT  = 68;
const HALF_RATIO  = 0.48;


const snapTo = (ratio) => {
    if (ratio < 0.15) return "peek";
    if (ratio < 0.70) return "half";
    return "full";
};

export default function MobileCustomizerSheet({
    product,
    cards,
    activeCard,
    activeCardLabel,
    selectBase,
    selectLayer,
    editedCard,
    seteditedCard,
    activebaseEditCard,
    setactivebaseEditCard,
    Done,
    doneloading,
    doneButtonLabel,
}) {
    const [snap, setSnap] = useState("half"); // "peek" | "half" | "full"
    const sheetRef  = useRef(null);
    const dragRef   = useRef({ startY: 0, startH: 0, dragging: false });
    const contentRef = useRef(null);

    // ------------------------------------------------------------------
    // Derived height
    // ------------------------------------------------------------------
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;

    const HEIGHT = {
        peek: PEEK_HEIGHT,
        half: Math.round(vh * HALF_RATIO),
        full: vh - NAV_HEIGHT, 
    };

    // ------------------------------------------------------------------
    // Pointer / touch drag on the handle bar
    // ------------------------------------------------------------------
    const onDragStart = (clientY) => {
        dragRef.current = {
            startY: clientY,
            startH: HEIGHT[snap],
            dragging: true,
        };
    };

    const onDragMove = (clientY) => {
        if (!dragRef.current.dragging || !sheetRef.current) return;
        const delta = dragRef.current.startY - clientY;
        const newH = Math.max(PEEK_HEIGHT, Math.min(vh - NAV_HEIGHT, dragRef.current.startH + delta));
        sheetRef.current.style.height = `${newH}px`;
    };

    const onDragEnd = (clientY) => {
        if (!dragRef.current.dragging) return;
        dragRef.current.dragging = false;
        const delta   = dragRef.current.startY - clientY;
        const newH    = dragRef.current.startH + delta;
        const ratio   = newH / vh;
        const newSnap = snapTo(ratio);
        // Never go below peek — snap back to peek at minimum
        setSnap(newSnap === "peek" ? "peek" : newSnap);
        if (sheetRef.current) sheetRef.current.style.height = "";
    };

    // Mouse events (dev tools / desktop emulation)
    const handleMouseDown = (e) => {
        onDragStart(e.clientY);
        const move = (ev) => onDragMove(ev.clientY);
        const up   = (ev) => { onDragEnd(ev.clientY); window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
        window.addEventListener("mousemove", move);
        window.addEventListener("mouseup", up);
    };

    // Touch events
    const handleTouchStart = (e) => onDragStart(e.touches[0].clientY);
    const handleTouchMove  = (e) => { e.preventDefault(); onDragMove(e.touches[0].clientY); };
    const handleTouchEnd   = (e) => onDragEnd(e.changedTouches[0].clientY);

    // ------------------------------------------------------------------
    // Tap handle cycles: peek → half → full → peek
    // ------------------------------------------------------------------
    const cycleSnap = () => {
        setSnap((prev) => prev === "peek" ? "half" : prev === "half" ? "full" : "peek");
    };

    // Reset to half whenever the active card changes (new context)
    useEffect(() => {
        setSnap("half");
    }, [activeCard?.editedCard]);

    const isOpen = snap !== "peek";

    return (
        /* Only visible below xl breakpoint */
        <div
            className="xl:hidden fixed inset-x-0 bottom-0 z-50"
            style={{
                height: HEIGHT[snap],
                maxHeight: `calc(100dvh - ${NAV_HEIGHT}px)`,
                minHeight: PEEK_HEIGHT,
                transition: dragRef.current.dragging ? "none" : "height 0.32s cubic-bezier(0.32,0.72,0,1)"
            }}
            ref={sheetRef}
        >
            {/* Backdrop — subtle, only when open */}
            {isOpen && (
                <div
                    className="absolute inset-x-0 bottom-full"
                    style={{ height: "40vh", background: "linear-gradient(to top, rgba(0,0,0,0.08), transparent)", pointerEvents: "none" }}
                />
            )}

            <div className="relative flex h-full flex-col rounded-t-3xl border-t border-gray-200 bg-white shadow-[0_-8px_40px_rgba(0,0,0,0.12)]">

                {/* ── Handle bar ── */}
                <div
                    className="flex shrink-0 touch-none select-none flex-col items-center pb-1 pt-2 cursor-grab active:cursor-grabbing"
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onClick={cycleSnap}
                    aria-label={isOpen ? "Collapse customizer" : "Expand customizer"}
                    role="button"
                >
                    {/* Pill */}
                    <span className="mb-2 block h-1.5 w-10 rounded-full bg-gray-300" />

                    {/* Label row */}
                    <div className="flex w-full items-center justify-between px-4">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                                Customizing
                            </span>
                            <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-bold text-sky-600">
                                {activeCardLabel}
                            </span>
                        </div>
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                            {isOpen ? <IoIosArrowDown className="text-base" /> : <IoIosArrowUp className="text-base" />}
                        </span>
                    </div>
                </div>

                {/* ── Scrollable content ── */}
                <div
                    ref={contentRef}
                    className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-2"
                    style={{ WebkitOverflowScrolling: "touch" }}
                >
                    {/* Only mount controller when open to avoid layout thrash */}
                    {isOpen && (
                        <SideController
                            product={product}
                            cards={cards}
                            activeCard={activeCard}
                            selectBase={selectBase}
                            selectLayer={selectLayer}
                            editedCard={editedCard}
                            seteditedCard={seteditedCard}
                            activebaseEditCard={activebaseEditCard}
                            setactivebaseEditCard={setactivebaseEditCard}
                        />
                    )}
                </div>

                {/* ── Sticky CTA ── */}
                <div className="shrink-0 border-t border-gray-100 bg-white px-4 pb-[env(safe-area-inset-bottom,12px)] pt-3">
                    <button
                        onClick={Done}
                        disabled={doneloading}
                        className="flex h-13 w-full items-center justify-center rounded-2xl bg-[#3CA9FF] text-base font-bold text-white shadow-lg shadow-sky-200 transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                        style={{ height: "52px" }}
                    >
                        {doneButtonLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}