"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

const PhotoPortraitBoxPreview = forwardRef(function PhotoPortraitBoxPreview(
    { boxImages = [], onImagePositionChange },
    ref
) {
    const handleDragStart = (e, imgId) => {
        if (!onImagePositionChange) return;
        e.preventDefault();
        let lastX = e.clientX;
        let lastY = e.clientY;

        // Capture the SLOT element now — e.currentTarget is nullified by React
        // once the mousedown handler returns, so it can't be read in handleMove.
        const slotEl = e.currentTarget?.parentElement;
        const slotRect = slotEl?.getBoundingClientRect();
        const slotWidth = slotRect?.width || 1;
        const slotHeight = slotRect?.height || 1;

        const handleMove = (moveEvent) => {
            const dx = moveEvent.clientX - lastX;
            const dy = moveEvent.clientY - lastY;
            lastX = moveEvent.clientX;
            lastY = moveEvent.clientY;

            // Divide the raw drag delta by the SLOT element's own rendered size,
            // matching how CSS translate(N%) resolves — resolution-independent.
            const dxFraction = dx / slotWidth;
            const dyFraction = dy / slotHeight;

            onImagePositionChange(imgId, dxFraction, dyFraction);
        };

        const handleUp = () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleUp);
        };

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', handleUp);
    };

    const rootContainerRef = useRef(null);

    // Capture the ALREADY-RESOLVED geometry the browser computed for each slot
    // and its inner <img>, converted to fractions of the outer box container's
    // own rect. This replaces the old fraction-delta replay: we send what the
    // browser actually rendered (frame = overflow-hidden clip box, image =
    // object-cover'd <img> bounding box) rather than re-deriving it from a drag
    // delta. Called once at submit time, not on every drag tick.
    useImperativeHandle(ref, () => ({
        captureResolvedRects() {
            const container = rootContainerRef.current;
            if (!container) return [];
            const boxRect = container.getBoundingClientRect();

            const toFrac = (rect) => ({
                leftFrac: (rect.left - boxRect.left) / boxRect.width,
                topFrac: (rect.top - boxRect.top) / boxRect.height,
                widthFrac: rect.width / boxRect.width,
                heightFrac: rect.height / boxRect.height,
            });

            const slotEls = container.querySelectorAll('[data-img-id]');
            const result = Array.from(slotEls).map((slotEl) => {
                const id = slotEl.getAttribute('data-img-id');
                const imgEl = slotEl.querySelector('img');
                const frame = toFrac(slotEl.getBoundingClientRect());
                const image = imgEl ? toFrac(imgEl.getBoundingClientRect()) : frame;
                return { id, frame, image };
            });

            // TEMP DEBUG: sanity-check the captured numbers before this goes
            // further. Expected: frame.widthFrac matches the slot.size preset
            // (e.g. ~0.55 for a single photo), image rect fully covers frame.
            // eslint-disable-next-line no-console
            console.log('[captureResolvedRects]', JSON.stringify(result, null, 2));

            return result;
        },
    }));

    return (
        <div
            ref={rootContainerRef}
            className="relative w-[340px] sm:w-[440px] md:w-[560px] rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden"
        >
            <img
                src="/photo-portrait/photo-portrait-box.png"
                alt="Photo Portrait Box Template"
                width={1000}
                height={1000}
                className="w-full h-auto object-contain"
            />

            {boxImages.length > 0 && (
                <div className="absolute z-10" style={{ top: '43%', left: '10%', width: '36%', height: '42%' }}>
                    {(() => {
                        const getLayout = () => {
                            const count = boxImages.length;
                            if (count === 1) return [{ i: 0, x: 0, y: 0, z: 3, size: '55%' }];
                            if (count === 2) return [
                                { i: 1, x: -20, y: -18, z: 1, size: '38%' },
                                { i: 0, x: 0, y: 0, z: 3, size: '55%' },
                            ];
                            if (count === 3) return [
                                { i: 1, x: -22, y: -18, z: 1, size: '38%' },
                                { i: 2, x: 22, y: -18, z: 1, size: '38%' },
                                { i: 0, x: 0, y: 0, z: 3, size: '55%' },
                            ];
                            if (count === 4) return [
                                { i: 0, x: -22, y: -15, z: 1, size: '95%', clip: '0% 25% 10% 23%' },
                                { i: 3, x: 22, y: -15, z: 1, size: '95%', clip: '0% 23% 10% 25%' },
                                { i: 1, x: -26, y: 10, z: 2, size: '80%', clip: '0% 27% 55% 28%' },
                                { i: 2, x: 26, y: 10, z: 2, size: '80%', clip: '0% 27% 55% 25%' },
                                { i: 0, x: 0, y: 32, z: 3, size: '99%', clip: '0% 25% 49.3% 25%' },
                            ];
                            return [
                                { i: 3, x: -17, y: -2, z: 1, size: '99%', clip: '0% 25% 10% 24%' },
                                { i: 4, x: 17, y: -2, z: 1, size: '99%', clip: '0% 25% 10% 24%' },
                                { i: 1, x: -26, y: 10, z: 2, size: '80%', clip: '0% 27% 55% 28%' },
                                { i: 2, x: 26, y: 10, z: 2, size: '80%', clip: '0% 27% 55% 25%' },
                                { i: 0, x: 0, y: 32, z: 3, size: '99%', clip: '0% 25% 49.3% 25%' },
                            ];
                        };
                        return getLayout().map((slot, key) => {
                            const img = boxImages[slot.i];
                            if (!img) return null;
                            const userXFraction = img.xFraction || 0;
                            const userYFraction = img.yFraction || 0;
                            return (
                                <div
                                    key={key}
                                    data-img-id={img.id}
                                    className="absolute overflow-hidden"
                                    style={{
                                        width: slot.size,
                                        aspectRatio: '3 / 4',
                                        bottom: '0%',
                                        left: '50%',
                                        transform: `translateX(calc(-50% + ${slot.x}% + ${userXFraction * 100}%)) translateY(calc(${slot.y}% + ${userYFraction * 100}%)) scale(1)`,
                                        transformOrigin: 'bottom center',
                                        zIndex: slot.z,
                                        borderRadius: '4px',
                                        clipPath: slot.clip ? `inset(${slot.clip} round 4px)` : 'none',
                                    }}
                                >
                                    <img
                                        src={img.src}
                                        alt={`Box photo ${slot.i + 1}`}
                                        className="absolute w-full object-cover cursor-move"
                                        style={{ top: '0%', height: '100%', objectPosition: 'top center', transform: `scale(${img.zoom})` }}
                                        onMouseDown={(e) => handleDragStart(e, img.id)}
                                    />
                                </div>
                            );
                        });
                    })()}
                </div>
            )}
        </div>
    );
});

export default PhotoPortraitBoxPreview;