import { useState } from "react";
import { api } from "../lib/api";

export function ImageUploader({
  images,
  onChange,
}: {
  images: string[];
  onChange: (next: string[]) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  function move(from: number, to: number) {
    if (to < 0 || to >= images.length) return;
    const next = [...images];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  }

  async function uploadFiles(files: FileList | File[]) {
    const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!list.length) return;
    setUploading(true);
    setError("");
    try {
      const uploaded: string[] = [];
      for (const file of list) {
        const fd = new FormData();
        fd.append("file", file);
        const { data } = await api.post<{ url: string }>("/uploads", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        uploaded.push(data.url);
      }
      onChange([...images, ...uploaded]);
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label
        className="flex cursor-pointer flex-col items-center justify-center border border-dashed border-rw-border bg-rw-canvas px-4 py-10 text-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files?.length) uploadFiles(e.dataTransfer.files);
        }}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          disabled={uploading}
          onChange={(e) => {
            if (e.target.files?.length) uploadFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <p className="text-sm text-rw-text">
          {uploading ? "Uploading…" : "Drop images or click to upload"}
        </p>
        <p className="mt-1 text-xs text-rw-muted">Cloudinary · reorder after upload</p>
      </label>
      {error && <p className="mt-2 text-xs text-rw-sale">{error}</p>}

      {images.length > 0 && (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {images.map((src, i) => (
            <li key={`${src}-${i}`} className="border border-rw-border bg-rw-canvas">
              <img src={src} alt="" className="aspect-square w-full object-cover" />
              <div className="flex items-center justify-between gap-1 border-t border-rw-border px-2 py-1.5">
                <button
                  type="button"
                  className="text-xs text-rw-muted hover:text-rw-text"
                  onClick={() => move(i, i - 1)}
                >
                  ←
                </button>
                <button
                  type="button"
                  className="text-xs text-rw-muted hover:text-rw-sale"
                  onClick={() => onChange(images.filter((_, idx) => idx !== i))}
                >
                  Remove
                </button>
                <button
                  type="button"
                  className="text-xs text-rw-muted hover:text-rw-text"
                  onClick={() => move(i, i + 1)}
                >
                  →
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
