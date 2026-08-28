/**
 * GalleryUpload — multi-image uploader for admin forms (e.g. Destinations gallery).
 *
 * Props:
 *   value    {string[]}              array of image URLs
 *   onChange {(urls: string[]) => void}  called whenever the list changes
 *   folder   {string}                Firebase Storage subfolder, e.g. "destinations"
 *   label    {string?}               form label text
 */

import { useRef, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/config";

const MAX_MB   = 10;
const MAX_FILES = 20;

function makeStoragePath(folder, file) {
  const ext  = file.name.split(".").pop().toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const rand = Math.random().toString(36).slice(2, 7);
  return `uploads/${folder}/${Date.now()}-${rand}.${ext}`;
}

export default function GalleryUpload({ value = [], onChange, folder, label }) {
  const [uploading, setUploading] = useState(false);
  const [progress,  setProgress]  = useState(0); // 0-100 overall progress
  const [err,       setErr]       = useState("");
  const inputRef = useRef(null);

  // Upload one file → URL string
  async function uploadOne(file, onProg) {
    const path      = makeStoragePath(folder, file);
    const storageRef = ref(storage, path);

    return new Promise((resolve, reject) => {
      const task = uploadBytesResumable(storageRef, file);
      task.on(
        "state_changed",
        (snap) => onProg(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
        reject,
        async () => {
          const url = await getDownloadURL(storageRef);
          resolve(url);
        },
      );
    });
  }

  async function handleFiles(fileList) {
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (!files.length) return;
    setErr("");

    // Guard limits
    const oversized = files.filter((f) => f.size > MAX_MB * 1024 * 1024);
    if (oversized.length) {
      setErr(`Some images are too large (max ${MAX_MB} MB each). Please resize them first.`);
      return;
    }
    if (value.length + files.length > MAX_FILES) {
      setErr(`You can have at most ${MAX_FILES} gallery images.`);
      return;
    }

    setUploading(true);
    setProgress(0);

    // Upload sequentially so progress bar is meaningful
    const newUrls = [];
    for (let i = 0; i < files.length; i++) {
      try {
        const url = await uploadOne(files[i], (p) => {
          // Overall progress: (completed files + current file fraction) / total
          setProgress(Math.round(((i + p / 100) / files.length) * 100));
        });
        newUrls.push(url);
      } catch (e) {
        setErr("Upload failed for one or more images: " + (e.message || "unknown error"));
      }
    }

    onChange([...value, ...newUrls]);
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  function remove(index) {
    onChange(value.filter((_, i) => i !== index));
  }

  function handleDrop(e) {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  }

  return (
    <div>
      {label && (
        <label className="block text-[0.8125rem] font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}

      {/* ── Existing images grid ──────────────────────────────── */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-3">
          {value.map((url, i) => (
            <div key={i} className="relative group aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={url}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.opacity = 0.3; }}
              />
              {/* Remove button */}
              <button
                type="button"
                onClick={() => remove(i)}
                title="Remove this image"
                className="absolute top-1 right-1 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full text-[10px] font-bold leading-none items-center justify-center hidden group-hover:flex shadow transition-colors"
              >
                ×
              </button>
              {/* Index badge */}
              <span className="absolute bottom-1 left-1 bg-black/50 text-white text-[9px] px-1 rounded">
                {i + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── Drop zone / Add more ──────────────────────────────── */}
      {value.length < MAX_FILES && (
        <div
          role="button"
          tabIndex={0}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => !uploading && inputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && !uploading && inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 hover:border-yellow-400 rounded-xl px-4 py-5 text-center cursor-pointer transition-colors select-none"
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
              <div className="text-2xl mb-1 select-none">🖼️</div>
              <p className="text-sm text-gray-500 font-medium">
                {value.length === 0 ? "Click to add gallery images" : "+ Add more images"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Drag &amp; drop or click · JPG, PNG, WebP · max {MAX_MB} MB each
              </p>
              {value.length > 0 && (
                <p className="text-xs text-gray-400 mt-0.5">
                  {value.length}/{MAX_FILES} images
                </p>
              )}
            </>
          )}
        </div>
      )}

      {/* Hidden multi-file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {err && <p className="text-xs text-red-500 mt-1">{err}</p>}
    </div>
  );
}
