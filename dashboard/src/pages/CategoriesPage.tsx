import { useEffect, useState, type FormEvent } from "react";
import { api } from "../lib/api";
import type { AdminCategory } from "../lib/data";
import { DeleteModal } from "../components/DeleteModal";
import { Toast } from "../components/Toast";

export function CategoriesPage() {
  const [rows, setRows] = useState<AdminCategory[]>([]);
  const [editing, setEditing] = useState<AdminCategory | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const { data } = await api.get<AdminCategory[]>("/categories");
      setRows(data);
    } catch {
      setToast("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name"));
    const slug = String(fd.get("slug"));
    try {
      if (editing) {
        const { data } = await api.patch<AdminCategory>(
          `/categories/${editing.id}`,
          { name, slug }
        );
        setRows((r) => r.map((c) => (c.id === editing.id ? data : c)));
        setEditing(null);
        setToast("Category updated");
      } else {
        const { data } = await api.post<AdminCategory>("/categories", {
          name,
          slug,
        });
        setRows((r) => [...r, data]);
        setCreating(false);
        setToast("Category created");
      }
    } catch {
      setToast("Save failed");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-[0.08em]">
            Categories
          </h1>
          <p className="mt-1 text-sm text-rw-muted">
            {loading ? "Loading…" : `${rows.length} categories`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setCreating(true);
            setEditing(null);
          }}
          className="h-10 bg-rw-accent px-4 text-sm font-medium text-rw-accent-ink hover:bg-white"
        >
          New category
        </button>
      </div>

      {(creating || editing) && (
        <form
          onSubmit={save}
          className="mt-6 grid gap-3 border border-rw-border bg-rw-surface p-4 sm:grid-cols-[1fr_1fr_auto_auto]"
        >
          <input
            name="name"
            required
            placeholder="Name"
            defaultValue={editing?.name}
            className="h-10 border border-rw-border bg-rw-canvas px-3 text-sm focus:border-rw-accent focus:outline-none"
          />
          <input
            name="slug"
            required
            placeholder="slug"
            defaultValue={editing?.slug}
            className="h-10 border border-rw-border bg-rw-canvas px-3 text-sm focus:border-rw-accent focus:outline-none"
          />
          <button
            type="submit"
            className="h-10 bg-rw-accent px-4 text-sm text-rw-accent-ink"
          >
            Save
          </button>
          <button
            type="button"
            className="h-10 border border-rw-border px-4 text-sm text-rw-muted"
            onClick={() => {
              setCreating(false);
              setEditing(null);
            }}
          >
            Cancel
          </button>
        </form>
      )}

      <div className="mt-4 overflow-x-auto border border-rw-border">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="border-b border-rw-border bg-rw-surface text-[11px] uppercase tracking-[0.1em] text-rw-muted">
            <tr>
              <th className="px-3 py-3 font-medium">Name</th>
              <th className="px-3 py-3 font-medium">Slug</th>
              <th className="px-3 py-3 font-medium">Products</th>
              <th className="px-3 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} className="border-b border-rw-border">
                <td className="px-3 py-3">{c.name}</td>
                <td className="px-3 py-3 font-mono text-xs text-rw-muted">
                  {c.slug}
                </td>
                <td className="px-3 py-3">{c.productCount}</td>
                <td className="px-3 py-3">
                  <div className="flex gap-3">
                    <button
                      type="button"
                      className="text-xs text-rw-muted hover:text-rw-accent"
                      onClick={() => {
                        setEditing(c);
                        setCreating(false);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-xs text-rw-muted hover:text-rw-sale"
                      onClick={() => setDeleteId(c.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteModal
        open={!!deleteId}
        title="Delete category?"
        description="Products in this category will need reassignment."
        onCancel={() => setDeleteId(null)}
        onConfirm={async () => {
          try {
            await api.delete(`/categories/${deleteId}`);
            setRows((r) => r.filter((c) => c.id !== deleteId));
            setToast("Category deleted");
          } catch {
            setToast("Delete failed");
          } finally {
            setDeleteId(null);
          }
        }}
      />
      <Toast message={toast} onDone={() => setToast("")} />
    </div>
  );
}
