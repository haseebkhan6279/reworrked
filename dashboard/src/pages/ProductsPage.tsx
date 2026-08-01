import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice, type AdminProduct } from "../lib/data";
import { api } from "../lib/api";
import { DeleteModal } from "../components/DeleteModal";
import { Toast } from "../components/Toast";

export function ProductsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [rows, setRows] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  async function load() {
    setLoading(true);
    try {
      const { data } = await api.get<AdminProduct[]>("/products", {
        params: { q: q || undefined, status: status || undefined },
      });
      setRows(data);
    } catch {
      setToast("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const t = setTimeout(load, 200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, status]);

  const filtered = useMemo(() => rows, [rows]);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-[0.08em]">Products</h1>
          <p className="mt-1 text-sm text-rw-muted">
            {loading ? "Loading…" : `${filtered.length} items`}
          </p>
        </div>
        <Link
          to="/products/new"
          className="inline-flex h-10 items-center bg-rw-accent px-4 text-sm font-medium text-rw-accent-ink hover:bg-white"
        >
          New product
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name or slug"
          className="h-10 min-w-[200px] flex-1 border border-rw-border bg-rw-surface px-3 text-sm focus:border-rw-accent focus:outline-none"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-10 border border-rw-border bg-rw-surface px-3 text-sm focus:border-rw-accent focus:outline-none"
        >
          <option value="">All status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div className="mt-4 overflow-x-auto border border-rw-border">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-rw-border bg-rw-surface text-[11px] uppercase tracking-[0.1em] text-rw-muted">
            <tr>
              <th className="px-3 py-3 font-medium">Product</th>
              <th className="px-3 py-3 font-medium">Slug</th>
              <th className="px-3 py-3 font-medium">Category</th>
              <th className="px-3 py-3 font-medium">Price</th>
              <th className="px-3 py-3 font-medium">Stock</th>
              <th className="px-3 py-3 font-medium">Status</th>
              <th className="px-3 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-rw-border">
                <td className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    {p.thumb ? (
                      <img
                        src={p.thumb}
                        alt=""
                        className="h-10 w-10 object-cover bg-rw-surface-2"
                      />
                    ) : (
                      <div className="h-10 w-10 bg-rw-surface-2" />
                    )}
                    <span>{p.name}</span>
                  </div>
                </td>
                <td className="px-3 py-3 font-mono text-xs text-rw-muted">
                  {p.slug}
                </td>
                <td className="px-3 py-3 text-rw-muted">{p.category}</td>
                <td className="px-3 py-3">{formatPrice(p.price)}</td>
                <td
                  className={`px-3 py-3 ${p.stock <= 5 ? "text-rw-sale" : ""}`}
                >
                  {p.stock}
                </td>
                <td className="px-3 py-3">
                  <span
                    className={`text-[10px] uppercase tracking-[0.12em] ${
                      p.status === "published"
                        ? "text-rw-accent"
                        : "text-rw-muted"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <div className="flex gap-3">
                    <Link
                      to={`/products/${p.id}/edit`}
                      className="text-xs text-rw-muted hover:text-rw-accent"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="text-xs text-rw-muted hover:text-rw-sale"
                      onClick={() => setDeleteId(p.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!loading && filtered.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-3 py-10 text-center text-sm text-rw-muted"
                >
                  No products yet. Create your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <DeleteModal
        open={!!deleteId}
        title="Delete product?"
        description="This cannot be undone. Product will be removed from the catalog."
        onCancel={() => setDeleteId(null)}
        onConfirm={async () => {
          try {
            await api.delete(`/products/${deleteId}`);
            setRows((r) => r.filter((p) => p.id !== deleteId));
            setToast("Product deleted");
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
