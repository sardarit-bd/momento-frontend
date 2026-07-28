"use client";
import { useRef, useState } from "react";
import { IoCloudUploadOutline, IoTrashOutline, IoAddOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const ACCEPTED = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_IMAGES = 5;

const PhotoPortraitBoxCustomizer = ({ boxImages = [], onBoxImagesChange }) => {
    const inputRef = useRef(null);
    const [dragging, setDragging] = useState(false);
    const [busy, setBusy] = useState(false);

    const handleFile = (file) => {
        if (!file) return;

        if (!ACCEPTED.includes(file.type)) {
            toast.error("Please upload a PNG, JPG, or WEBP image.");
            return;
        }

        if (file.size > MAX_SIZE) {
            toast.error("Image is too large. Max size is 10 MB.");
            return;
        }

        setBusy(true);
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const newImage = {
                    id: Date.now() + Math.random(),
                    src: typeof reader.result === "string" ? reader.result : null,
                    zoom: 1,
                    xFraction: 0,
                    yFraction: 0,
                    x: 0,
                    y: 0,
                };
                onBoxImagesChange([...boxImages, newImage]);
            } catch {
                toast.error("Could not read the image. Please try another file.");
            } finally {
                setBusy(false);
            }
        };
        reader.onerror = () => {
            toast.error("Could not read the image. Please try another file.");
            setBusy(false);
        };
        reader.readAsDataURL(file);
    };

    const onInputChange = (e) => {
        const file = e.target.files?.[0];
        handleFile(file);
        e.target.value = "";
    };

    const onDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];
        handleFile(file);
    };

    const openPicker = () => {
        if (boxImages.length >= MAX_IMAGES) {
            toast.warn(`Maximum ${MAX_IMAGES} images allowed.`);
            return;
        }
        inputRef.current?.click();
    };

    const removeImage = (id) => {
        onBoxImagesChange(boxImages.filter((img) => img.id !== id));
    };

    const updateZoom = (id, zoom) => {
        const updated = boxImages.map((img) =>
            img.id === id ? { ...img, zoom } : img
        );
        onBoxImagesChange(updated);
    };

    const updatePosition = (id, x, y) => {
        const updated = boxImages.map((img) =>
            img.id === id ? { ...img, x, y } : img
        );
        onBoxImagesChange(updated);
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <input
                ref={inputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={onInputChange}
            />

            {boxImages.length > 0 && (
                <div className="space-y-4">
                    {boxImages.map((img, index) => (
                        <div key={img.id} className="relative rounded-xl border border-gray-200 bg-white p-3">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-sm font-semibold text-gray-600">
                                    Photo {index + 1}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {Math.round(img.zoom * 100)}% zoom
                                </span>
                            </div>

                            <div className="relative h-[200px] rounded-lg overflow-hidden bg-gray-50">
                                <img
                                    src={img.src}
                                    alt={`Box photo ${index + 1}`}
                                    className="absolute cursor-move"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transform: `translate(${img.x}px, ${img.y}px) scale(${img.zoom})`,
                                    }}
                                    onMouseDown={(e) => {
                                        const startX = e.clientX;
                                        const startY = e.clientY;
                                        const startImgX = img.x;
                                        const startImgY = img.y;

                                        const handleMove = (moveEvent) => {
                                            const dx = moveEvent.clientX - startX;
                                            const dy = moveEvent.clientY - startY;
                                            updatePosition(img.id, startImgX + dx, startImgY + dy);
                                        };

                                        const handleUp = () => {
                                            window.removeEventListener('mousemove', handleMove);
                                            window.removeEventListener('mouseup', handleUp);
                                        };

                                        window.addEventListener('mousemove', handleMove);
                                        window.addEventListener('mouseup', handleUp);
                                    }}
                                    onTouchStart={(e) => {
                                        const touch = e.touches[0];
                                        const startX = touch.clientX;
                                        const startY = touch.clientY;
                                        const startImgX = img.x;
                                        const startImgY = img.y;

                                        const handleMove = (moveEvent) => {
                                            const isTouch = moveEvent.type === 'touchmove';
                                            const moveX = isTouch ? moveEvent.touches[0].clientX : moveEvent.clientX;
                                            const moveY = isTouch ? moveEvent.touches[0].clientY : moveEvent.clientY;
                                            const dx = moveX - startX;
                                            const dy = moveY - startY;
                                            updatePosition(img.id, startImgX + dx, startImgY + dy);
                                        };

                                        const handleUp = (endEvent) => {
                                            const isTouchEnd = endEvent.type === 'touchend';
                                            const endX = isTouchEnd ? endEvent.changedTouches[0].clientX : endEvent.clientX;
                                            const endY = isTouchEnd ? endEvent.changedTouches[0].clientY : endEvent.clientY;
                                            const dx = endX - startX;
                                            const dy = endY - startY;
                                            if (dx !== 0 || dy !== 0) {
                                                updatePosition(img.id, startImgX + dx, startImgY + dy);
                                            }
                                            window.removeEventListener('touchmove', handleMove);
                                            window.removeEventListener('touchend', handleUp);
                                        };

                                        window.addEventListener('touchmove', handleMove, { passive: false });
                                        window.addEventListener('touchend', handleUp);
                                    }}
                                />
                            </div>

                            <div className="flex items-center gap-3 mt-2">
                                <span className="text-xs font-medium text-gray-500">Zoom</span>
                                <input
                                    type="range"
                                    min="0.5"
                                    max="2"
                                    step="0.1"
                                    value={img.zoom}
                                    onChange={(e) => updateZoom(img.id, Number(e.target.value))}
                                    className="flex-1"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(img.id)}
                                    className="flex items-center justify-center gap-1 rounded-lg border border-gray-300 bg-white px-2 py-1 text-xs font-semibold text-gray-600 transition hover:bg-gray-100"
                                >
                                    <IoTrashOutline className="text-sm" />
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {boxImages.length < MAX_IMAGES && (
                <div
                    onClick={openPicker}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={onDrop}
                    className={`flex h-[200px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition my-2 ${
                        dragging
                            ? "border-sky-500 bg-sky-50"
                            : "border-gray-300 bg-gray-50 hover:border-sky-400 hover:bg-sky-50/40"
                    }`}
                >
                    <IoAddOutline className="text-2xl text-gray-400" />
                    <p className="px-3 text-center text-sm font-medium text-gray-500">
                        {busy ? "Reading image…" : `Add Photo (${boxImages.length}/${MAX_IMAGES})`}
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG, WEBP · up to 10 MB</p>
                </div>
            )}
        </div>
    );
};

export default PhotoPortraitBoxCustomizer;