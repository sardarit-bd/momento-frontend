"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import { toast } from "react-toastify";
import { JOKER_SLOT_BOX, JOKER_SLOT_CLIP_PATH, JOKER_NATIVE_WIDTH, JOKER_NATIVE_HEIGHT } from "@/app/componnent/jokerSlotGeometry";

const SLOT_BOX = { top: "7%", left: "7%", width: "88%", height: "86%" };
const SLOT_CLIP_PATH =
  "polygon(38% 0%, 96% 0%, 96% 74.6%, 57.8% 100%, 1% 100%, 1% 27.4%)";

const JOKER_SLOT_BOX_STYLE = {
  top: `${JOKER_SLOT_BOX.top}%`,
  left: `${JOKER_SLOT_BOX.left}%`,
  width: `${JOKER_SLOT_BOX.width}%`,
  height: `${JOKER_SLOT_BOX.height}%`,
};

const JOKER_CHARACTER_TOP_PERCENT = 17;
const JOKER_CHARACTER_HEIGHT_PERCENT = 33;
const JOKER_CHARACTER_WIDTH_PERCENT = 55;

const ACCEPTED = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
const OFFSET_LIMIT = 0.75; // how far (as a fraction of the box) the photo can be dragged

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

// Reusable, modern upload placeholder — now clickable + drop target
const UploadPlaceholder = ({ compact = false, dragging, busy }) => (
  <div
    className={`group flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed backdrop-blur-md transition-all duration-300 cursor-pointer ${
      dragging
        ? "border-sky-300 bg-sky-400/10"
        : "border-white/25 bg-white/5 hover:border-sky-300/60 hover:bg-white/10"
    }`}
  >
    <div className="relative flex items-center justify-center">
      <div
        className={`absolute inset-0 rounded-full bg-sky-400/20 blur-md transition-opacity duration-300 ${
          compact ? "opacity-0 group-hover:opacity-100" : "opacity-60 group-hover:opacity-100"
        }`}
      />
      <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-white/90 to-white/60 shadow-lg ring-1 ring-white/40 transition-transform duration-300 group-hover:scale-105">
        <Upload className="h-5 w-5 text-slate-700" strokeWidth={2.2} />
      </div>
    </div>
    <div className="text-center px-2">
      <p className="text-[11px] md:text-xs font-semibold text-white/90 drop-shadow-sm">
        {busy ? "Uploading…" : "Upload Photo"}
      </p>
      <p className="hidden md:block text-[10px] text-white/60">
        Drag & drop or click
      </p>
    </div>
  </div>
);

const PhotoCardPreview = ({ activeCard, previewCardNodeRef, onSelectPhoto, onPhotoOffsetChange }) => {
  const photo = activeCard?.userPhoto || null;
  const zoom = activeCard?.userPhotoZoom || 1;
  const offset = activeCard?.userPhotoOffset || { x: 0, y: 0 };
  const isJoker = activeCard?.editedCard === "Joker_Card";

  const slotRef = useRef(null);
  const fileInputRef = useRef(null);
  const dragStateRef = useRef(null);

  const [isDropTarget, setIsDropTarget] = useState(false);
  const [isDraggingPhoto, setIsDraggingPhoto] = useState(false);
  const [busy, setBusy] = useState(false);

  // ---------- Upload ----------
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
      if (typeof reader.result === "string") {
        onSelectPhoto?.(reader.result);
      } else {
        toast.error("Could not read the image. Please try another file.");
      }
      setBusy(false);
    };
    reader.onerror = () => {
      toast.error("Could not read the image. Please try another file.");
      setBusy(false);
    };
    reader.readAsDataURL(file);
  };

  const openPicker = () => fileInputRef.current?.click();

  const onInputChange = (e) => {
    const file = e.target.files?.[0];
    handleFile(file);
    e.target.value = "";
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDropTarget(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  // ---------- Drag to reposition ----------
  const handlePointerDown = (e) => {
    if (!photo) return;
    e.preventDefault();
    const rect = slotRef.current?.getBoundingClientRect();
    if (!rect) return;

    dragStateRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startOffsetX: offset.x,
      startOffsetY: offset.y,
      boxW: rect.width,
      boxH: rect.height,
    };
    setIsDraggingPhoto(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    const drag = dragStateRef.current;
    if (!drag) return;

    const dxFrac = (e.clientX - drag.startX) / drag.boxW;
    const dyFrac = (e.clientY - drag.startY) / drag.boxH;

    onPhotoOffsetChange?.({
      x: clamp(drag.startOffsetX + dxFrac, -OFFSET_LIMIT, OFFSET_LIMIT),
      y: clamp(drag.startOffsetY + dyFrac, -OFFSET_LIMIT, OFFSET_LIMIT),
    });
  };

  const endDrag = (e) => {
    dragStateRef.current = null;
    setIsDraggingPhoto(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  const photoTransform = `translate(calc(-50% + ${offset.x * 100}%), calc(-50% + ${offset.y * 100}%)) scale(${zoom})`;

  return (
    <div
      ref={previewCardNodeRef}
      className={
        isJoker
          ? "flex items-center justify-center relative w-[200px] md:w-[270px] lg:w-[400px] rounded-4xl border-2 border-transparent"
          : "flex items-center justify-center relative w-[200px] h-auto md:w-[270px] md:h-[370px] lg:w-[400px] lg:h-[600px] rounded-4xl border-2 border-transparent"
      }
      style={isJoker ? { aspectRatio: `${JOKER_NATIVE_WIDTH} / ${JOKER_NATIVE_HEIGHT}` } : undefined}
    >
      {activeCard?.baseImage && (
        <Image width={1000} height={1000} src={activeCard.baseImage} alt="Base Card" className="w-full h-full object-contain" />
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={onInputChange}
      />

      {isJoker ? (
        <div
            ref={slotRef}
            onClick={!photo ? openPicker : undefined}
            onDragOver={(e) => {
              if (photo) return;
              e.preventDefault();
              setIsDropTarget(true);
            }}
            onDragLeave={() => setIsDropTarget(false)}
            onDrop={photo ? undefined : onDrop}
            onPointerDown={photo ? handlePointerDown : undefined}
            onPointerMove={photo ? handlePointerMove : undefined}
            onPointerUp={photo ? endDrag : undefined}
            onPointerCancel={photo ? endDrag : undefined}
            style={{
              position: "absolute",
              top: JOKER_SLOT_BOX_STYLE.top,
              left: JOKER_SLOT_BOX_STYLE.left,
              width: JOKER_SLOT_BOX_STYLE.width,
              height: JOKER_SLOT_BOX_STYLE.height,
              overflow: "hidden",
              clipPath: JOKER_SLOT_CLIP_PATH,
              touchAction: photo ? "none" : "auto",
              cursor: photo ? (isDraggingPhoto ? "grabbing" : "grab") : "pointer",
            }}
          >
          {photo ? (
            <Image
              width={1000} height={1000} src={photo} alt="Your photo" draggable={false}
              style={{
                position: "absolute", top: "50%", left: "50%", width: "100%", height: "100%",
                objectFit: "contain", transform: photoTransform, transformOrigin: "center center",
              }}
            />
          ) : (
            <UploadPlaceholder compact dragging={isDropTarget} busy={busy} />
          )}
        </div>
      ) : (
        <div
          ref={slotRef}
          onClick={!photo ? openPicker : undefined}
          onDragOver={(e) => {
            if (photo) return;
            e.preventDefault();
            setIsDropTarget(true);
          }}
          onDragLeave={() => setIsDropTarget(false)}
          onDrop={photo ? undefined : onDrop}
          onPointerDown={photo ? handlePointerDown : undefined}
          onPointerMove={photo ? handlePointerMove : undefined}
          onPointerUp={photo ? endDrag : undefined}
          onPointerCancel={photo ? endDrag : undefined}
          style={{
            position: "absolute", top: SLOT_BOX.top, left: SLOT_BOX.left,
            width: SLOT_BOX.width, height: SLOT_BOX.height, overflow: "hidden", clipPath: SLOT_CLIP_PATH,
            touchAction: photo ? "none" : "auto",
            cursor: photo ? (isDraggingPhoto ? "grabbing" : "grab") : "pointer",
          }}
        >
          {photo ? (
            <Image
              width={1000} height={1000} src={photo} alt="Your photo" draggable={false}
              style={{
                position: "absolute", top: "50%", left: "50%", width: "100%", height: "100%",
                objectFit: "cover", transform: photoTransform, transformOrigin: "center center",
              }}
            />
          ) : (
            <UploadPlaceholder dragging={isDropTarget} busy={busy} />
          )}
        </div>
      )}
    </div>
  );
};

export default PhotoCardPreview;