import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../lib/api";
import type { AdminCategory, AdminProduct } from "../lib/data";
import { ImageUploader } from "../components/ImageUploader";
import { Toast } from "../components/Toast";

export function ProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [existing, setExisting] = useState<AdminProduct | null>(null);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [highlights, setHighlights] = useState("");
  const [specs, setSpecs] = useState([{ key: "", value: "" }]);
  const [toast, setToast] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    api
      .get<AdminCategory[]>("/categories")
      .then((res) => setCategories(res.data))
      .catch(() => setToast("Failed to load categories"));
  }, []);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api
      .get<AdminProduct>(`/products/${id}`)
      .then((res) => {
        setExisting(res.data);
        setImages(res.data.images ?? []);
        setHighlights((res.data.highlights ?? []).join("\n"));
        setSpecs(
          res.data.specifications?.length
            ? res.data.specifications
            : [{ key: "", value: "" }]
        );
      })
      .catch(() => setToast("Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      slug: String(fd.get("slug") ?? ""),
      brand: String(fd.get("brand") ?? "REWORRKED"),
      description: String(fd.get("description") ?? ""),
      price: Number(fd.get("price") ?? 0),
      compareAtPrice: fd.get("compareAtPrice")
        ? Number(fd.get("compareAtPrice"))
        : undefined,
      stock: Number(fd.get("stock") ?? 0),
      category: String(fd.get("category") ?? ""),
      tags: String(fd.get("tags") ?? "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      status: String(fd.get("status") ?? "draft") as "draft" | "published",
      images,
      highlights: highlights
        .split("\n")
        .map((h) => h.trim())
        .filter(Boolean),
      specifications: specs.filter((s) => s.key.trim() || s.value.trim()),
      seoTitle: String(fd.get("seoTitle") ?? ""),
      seoDescription: String(fd.get("seoDescription") ?? ""),
    };

    try {
      if (isEdit && id) {
        await api.patch(`/products/${id}`, payload);
        setToast("Product updated");
      } else {
        await api.post("/products", payload);
        setToast("Product created");
      }
      setTimeout(() => navigate("/products"), 600);
    } catch {
      setToast("Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-sm text-rw-muted">Loading product…</p>;
  }

  return (
    <div className="max-w-3xl">
      <Link
        to="/products"
        className="text-xs uppercase tracking-[0.12em] text-rw-muted hover:text-rw-text"
      >
        ← Products
      </Link>
      <h1 className="mt-3 font-display text-3xl tracking-[0.08em]">
        {isEdit ? "Edit product" : "New product"}
      </h1>
      <p className="mt-1 text-sm text-rw-muted">
        Saved to MongoDB · images via Cloudinary
      </p>

      <form className="mt-8 space-y-10" onSubmit={onSubmit}>
        <section className="space-y-4 border border-rw-border bg-rw-surface p-5">
          <h2 className="text-[11px] uppercase tracking-[0.14em] text-rw-muted">
            Basics
          </h2>
          <Field label="Name" name="name" defaultValue={existing?.name} required />
          <Field label="Slug" name="slug" defaultValue={existing?.slug} required />
          <Field
            label="Brand"
            name="brand"
            defaultValue={existing?.brand ?? "REWORRKED"}
          />
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.12em] text-rw-muted">
              Description
            </span>
            <textarea
              name="description"
              rows={4}
              defaultValue={existing?.description}
              className="mt-2 w-full border border-rw-border bg-rw-canvas px-3 py-2 text-sm focus:border-rw-accent focus:outline-none"
            />
          </label>
        </section>

        <section className="space-y-4 border border-rw-border bg-rw-surface p-5">
          <h2 className="text-[11px] uppercase tracking-[0.14em] text-rw-muted">
            Pricing & inventory
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field
              label="Price"
              name="price"
              type="number"
              defaultValue={existing?.price ?? 58}
            />
            <Field
              label="Compare at"
              name="compareAtPrice"
              type="number"
              defaultValue={existing?.compareAtPrice}
            />
            <Field
              label="Stock"
              name="stock"
              type="number"
              defaultValue={existing?.stock ?? 0}
            />
          </div>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.12em] text-rw-muted">
              Category
            </span>
            <select
              name="category"
              defaultValue={existing?.category ?? categories[0]?.name ?? "Dad Cap"}
              className="mt-2 h-11 w-full border border-rw-border bg-rw-canvas px-3 text-sm focus:border-rw-accent focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <Field
            label="Tags (comma-separated)"
            name="tags"
            defaultValue={existing?.tags.join(", ")}
          />
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.12em] text-rw-muted">
              Status
            </span>
            <select
              name="status"
              defaultValue={existing?.status ?? "draft"}
              className="mt-2 h-11 w-full border border-rw-border bg-rw-canvas px-3 text-sm focus:border-rw-accent focus:outline-none"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
        </section>

        <section className="space-y-4 border border-rw-border bg-rw-surface p-5">
          <h2 className="text-[11px] uppercase tracking-[0.14em] text-rw-muted">
            Images · Cloudinary
          </h2>
          <ImageUploader images={images} onChange={setImages} />
        </section>

        <section className="space-y-4 border border-rw-border bg-rw-surface p-5">
          <h2 className="text-[11px] uppercase tracking-[0.14em] text-rw-muted">
            Highlights
          </h2>
          <textarea
            rows={4}
            value={highlights}
            onChange={(e) => setHighlights(e.target.value)}
            placeholder="One highlight per line"
            className="w-full border border-rw-border bg-rw-canvas px-3 py-2 text-sm focus:border-rw-accent focus:outline-none"
          />
        </section>

        <section className="space-y-4 border border-rw-border bg-rw-surface p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[11px] uppercase tracking-[0.14em] text-rw-muted">
              Specifications
            </h2>
            <button
              type="button"
              className="text-xs text-rw-accent"
              onClick={() => setSpecs((s) => [...s, { key: "", value: "" }])}
            >
              + Row
            </button>
          </div>
          <div className="space-y-2">
            {specs.map((row, i) => (
              <div key={i} className="grid grid-cols-2 gap-2">
                <input
                  placeholder="Key"
                  value={row.key}
                  onChange={(e) => {
                    const next = [...specs];
                    next[i] = { ...next[i], key: e.target.value };
                    setSpecs(next);
                  }}
                  className="h-10 border border-rw-border bg-rw-canvas px-3 text-sm focus:border-rw-accent focus:outline-none"
                />
                <input
                  placeholder="Value"
                  value={row.value}
                  onChange={(e) => {
                    const next = [...specs];
                    next[i] = { ...next[i], value: e.target.value };
                    setSpecs(next);
                  }}
                  className="h-10 border border-rw-border bg-rw-canvas px-3 text-sm focus:border-rw-accent focus:outline-none"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 border border-rw-border bg-rw-surface p-5">
          <h2 className="text-[11px] uppercase tracking-[0.14em] text-rw-muted">
            SEO
          </h2>
          <Field
            label="SEO title"
            name="seoTitle"
            defaultValue={existing?.seoTitle}
          />
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.12em] text-rw-muted">
              SEO description
            </span>
            <textarea
              name="seoDescription"
              rows={3}
              defaultValue={existing?.seoDescription}
              className="mt-2 w-full border border-rw-border bg-rw-canvas px-3 py-2 text-sm focus:border-rw-accent focus:outline-none"
            />
          </label>
        </section>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="h-11 bg-rw-accent px-6 text-sm font-medium text-rw-accent-ink hover:bg-white disabled:opacity-60"
          >
            {saving
              ? "Saving…"
              : isEdit
                ? "Save changes"
                : "Create product"}
          </button>
          <Link
            to="/products"
            className="inline-flex h-11 items-center border border-rw-border px-6 text-sm text-rw-muted hover:text-rw-text"
          >
            Cancel
          </Link>
        </div>
      </form>
      <Toast message={toast} onDone={() => setToast("")} />
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.12em] text-rw-muted">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="mt-2 h-11 w-full border border-rw-border bg-rw-canvas px-3 text-sm focus:border-rw-accent focus:outline-none"
      />
    </label>
  );
}
