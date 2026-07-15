"use client";
import { useRef, useState } from "react";
import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const ACCEPTED = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

const PhotoUploader = ({ activeCard, selectPhoto, userPhotoZoom = 1, setUserPhotoZoom }) => {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);

  const photo = activeCard?.userPhoto || null;

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
        selectPhoto(typeof reader.result === "string" ? reader.result : null);
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

  const openPicker = () => inputRef.current?.click();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-3">
      <div className="flex items-center justify-between gap-3 pb-1">
        <h3 className="text-xl font-semibold text-gray-800">Your Photo</h3>
        {photo ? (
          <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-600">
            Using your photo
          </span>
        ) : (
          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500">
            Default character
          </span>
        )}
      </div>

      <p className="pb-3 text-xs text-gray-500">
        Upload a photo to replace the character. Leave empty to use the default look.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={onInputChange}
      />

      {photo ? (
        <div className="space-y-2">
          <div className="relative overflow-hidden rounded-xl border border-gray-200">
            <img
              src={photo}
              alt="Uploaded photo preview"
              className="h-[180px] w-full object-contain bg-gray-50"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-gray-500">Zoom</span>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={userPhotoZoom}
              onChange={(e) => setUserPhotoZoom?.(Number(e.target.value))}
              className="flex-1"
            />
            <span className="w-10 text-right text-xs font-semibold text-gray-600">
              {Math.round(userPhotoZoom * 100)}%
            </span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={openPicker}
              disabled={busy}
              className="flex-1 rounded-xl border border-sky-500 bg-sky-50 py-2 text-sm font-semibold text-sky-600 transition hover:bg-sky-100 disabled:opacity-60 cursor-pointer"
            >
              {busy ? "Loading…" : "Change Photo"}
            </button>
            <button
              type="button"
              onClick={() => selectPhoto(null)}
              className="flex items-center justify-center gap-1 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 cursor-pointer"
            >
              <IoTrashOutline className="text-base" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={openPicker}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`flex h-[150px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition ${
            dragging
              ? "border-sky-500 bg-sky-50"
              : "border-gray-300 bg-gray-50 hover:border-sky-400 hover:bg-sky-50/40"
          }`}
        >
          <IoCloudUploadOutline className="text-3xl text-gray-400" />
          <p className="px-3 text-center text-sm font-medium text-gray-500">
            {busy ? "Reading image…" : "Click or drag & drop a photo"}
          </p>
          <p className="text-xs text-gray-400">PNG, JPG, WEBP · up to 10 MB</p>
        </div>
      )}
    </div>
  );
};

export default PhotoUploader;
