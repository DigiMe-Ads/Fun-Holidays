/**
 * ImageUpload — reusable single-image uploader for admin forms.
 *
 * Props:
 *   value    {string}          current image URL (or "")
 *   onChange {(url) => void}   called with the new URL after upload, or "" on remove
 *   folder   {string}          Firebase Storage subfolder, e.g. "tours" or "team"
 *   label    {string?}         form label text
 *   shape    {"rect"|"circle"} preview shape — defaults to "rect"
 */

import { useRef, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/config";

const MAX_MB = 10;

function makeStoragePath(folder, file) {
  const ext  = file.name.split(".").pop().toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const rand = Math.random().toString(36).slice(2, 7);
  return `uploads/${folder}/${Date.now()}-${rand}.${ext}`;
}

export default function ImageUpload({ value, onChange, folder, label, shape = "rect" }) {
  const [uploading, setUploading] = useState(false);
  const [progress,  setProgress]  = useState(0);
  const [err,       setErr]       = useState("");
  const inputRef = useRef(null);

  async function handleFile(file) {
    if (!file) return;
    setErr("");

    if (!file.type.startsWith("image/")) {
      setErr("Please choose an image file (JPG, PNG, WebP, etc.)");
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setErr(`Image is too large. Please use a file under ${MAX_MB} MB.`);
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      const path      = makeStoragePath(folder, file);
      const storageRef = ref(storage, path);

      await new Promise((resolve, reject) => {
        const task = uploadBytesResumable(storageRef, file);
        task.on(
          "state_changed",
          (snap) => setProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
          reject,
          resolve,
        );
      });

      const url = await getDownloadURL(storageRef);
      onChange(url);
    } catch (e) {
      setErr("Upload failed: " + (e.message || "unknown error"));
    } finally {
      setUploading(false);
      // Reset input so the same file can be re-selected if needed
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  }

  const isCircle = shape === "circle";

  return (
    <div>
      {label && (
        <label className="block text-[0.8125rem] font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}

      {/* ── Preview ─────────────────────────────────────────── */}
      {value && (
        <div className={`relative mb-2 bg-gray-100 overflow-hidden ${isCircle ? "w-24 h-24 rounded-full mx-auto" : "w-full h-36 rounded-xl"}`}>
          <img
            src={value}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.opacity = 0.3; }}
          />
          {/* Remove */}
          <button
            type="button"
            onClick={() => onChange("")}
            title="Remove image"
            className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs font-bold leading-none flex items-center justify-center shadow transition-colors"
          >
            ×
          </button>
        </div>
      )}

      {/* ── Drop zone (shown when no image) ─────────────────── */}
      {!value && (
        <div
          role="button"
          tabIndex={0}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => !uploading && inputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && !uploading && inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 hover:border-yellow-400 rounded-xl px-4 py-6 text-center cursor-pointer transition-colors select-none"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-full max-w-[180px] mx-auto bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-yellow-400 h-full rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">Uploading… {progress}%</p>
            </div>
          ) : (
            <>
              <div className="text-2xl mb-1 select-none">📷</div>
              <p className="text-sm text-gray-500 font-medium">Click to upload</p>
              <p className="text-xs text-gray-400 mt-0.5">or drag an image here · JPG, PNG, WebP · max {MAX_MB} MB</p>
            </>
          )}
        </div>
      )}

      {/* ── Change button (shown when image is set) ─────────── */}
      {value && !uploading && (
        <div className="flex items-center gap-3 mt-1.5">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-xs text-blue-500 hover:text-blue-700 underline transition-colors"
          >
            ↑ Replace image
          </button>
        </div>
      )}

      {/* ── Change-image progress (shown when image exists + re-uploading) ── */}
      {value && uploading && (
        <div className="mt-2 flex flex-col gap-1">
          <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
            <div className="bg-yellow-400 h-full rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-gray-400">Uploading… {progress}%</p>
        </div>
      )}

      {/* ── Hidden file input ─────────────────────────────────── */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {err && <p className="text-xs text-red-500 mt-1">{err}</p>}
    </div>
  );
}
