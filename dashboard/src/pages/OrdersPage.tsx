import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { formatPrice } from "../lib/data";
import { Toast } from "../components/Toast";

type OrderCustomer = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  notes: string;
};

type OrderItem = {
  productId: string;
  name: string;
  slug: string;
  price: number;
  qty: number;
  size: string;
  color: string;
  image: string;
};

type AdminOrder = {
  id: string;
  orderNumber: string;
  customer: OrderCustomer;
  items: OrderItem[];
  paymentMethod: string;
  status: string;
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
};

const STATUSES = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
] as const;

export function OrdersPage() {
  const [rows, setRows] = useState<AdminOrder[]>([]);
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState<AdminOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  async function load() {
    setLoading(true);
    try {
      const { data } = await api.get<AdminOrder[]>("/orders", {
        params: { status: status || undefined },
      });
      setRows(data);
    } catch {
      setToast("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function updateStatus(id: string, next: string) {
    try {
      const { data } = await api.patch<AdminOrder>(`/orders/${id}/status`, {
        status: next,
      });
      setRows((r) => r.map((o) => (o.id === id ? data : o)));
      if (selected?.id === id) setSelected(data);
      setToast("Order status updated");
    } catch {
      setToast("Status update failed");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-[0.08em]">Orders</h1>
          <p className="mt-1 text-sm text-rw-muted">
            {loading ? "Loading…" : `${rows.length} COD bookings`}
          </p>
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-10 border border-rw-border bg-rw-surface px-3 text-sm focus:border-rw-accent focus:outline-none"
        >
          <option value="">All status</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="overflow-x-auto border border-rw-border">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-rw-border bg-rw-surface text-[11px] uppercase tracking-[0.1em] text-rw-muted">
              <tr>
                <th className="px-3 py-3 font-medium">Order</th>
                <th className="px-3 py-3 font-medium">Customer</th>
                <th className="px-3 py-3 font-medium">Phone</th>
                <th className="px-3 py-3 font-medium">Items</th>
                <th className="px-3 py-3 font-medium">Total</th>
                <th className="px-3 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((o) => (
                <tr
                  key={o.id}
                  className={`cursor-pointer border-b border-rw-border hover:bg-rw-surface/60 ${
                    selected?.id === o.id ? "bg-rw-surface" : ""
                  }`}
                  onClick={() => setSelected(o)}
                >
                  <td className="px-3 py-3 font-mono text-xs">{o.orderNumber}</td>
                  <td className="px-3 py-3">{o.customer.fullName}</td>
                  <td className="px-3 py-3 text-rw-muted">{o.customer.phone}</td>
                  <td className="px-3 py-3 text-rw-muted">
                    {o.items.reduce((n, i) => n + i.qty, 0)}
                  </td>
                  <td className="px-3 py-3">{formatPrice(o.total)}</td>
                  <td className="px-3 py-3">
                    <span className="text-[10px] uppercase tracking-[0.12em] text-rw-accent">
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
              {!loading && rows.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-3 py-10 text-center text-sm text-rw-muted"
                  >
                    No orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <aside className="h-fit border border-rw-border bg-rw-surface p-5">
          {!selected ? (
            <p className="text-sm text-rw-muted">
              Select an order to see customer and product details.
            </p>
          ) : (
            <div className="space-y-5">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-rw-muted">
                  Order
                </p>
                <p className="mt-1 font-mono text-sm">{selected.orderNumber}</p>
                <p className="mt-1 text-xs text-rw-muted">
                  {selected.createdAt
                    ? new Date(selected.createdAt).toLocaleString()
                    : ""}
                </p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-rw-muted">
                  Customer
                </p>
                <dl className="mt-2 space-y-1.5 text-sm">
                  <div>
                    <dt className="text-rw-muted">Name</dt>
                    <dd>{selected.customer.fullName}</dd>
                  </div>
                  <div>
                    <dt className="text-rw-muted">Phone</dt>
                    <dd>{selected.customer.phone}</dd>
                  </div>
                  {selected.customer.email && (
                    <div>
                      <dt className="text-rw-muted">Email</dt>
                      <dd>{selected.customer.email}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-rw-muted">Address</dt>
                    <dd>
                      {selected.customer.address}
                      <br />
                      {selected.customer.city}, {selected.customer.province}
                      {selected.customer.postalCode
                        ? ` ${selected.customer.postalCode}`
                        : ""}
                      <br />
                      {selected.customer.country}
                    </dd>
                  </div>
                  {selected.customer.notes && (
                    <div>
                      <dt className="text-rw-muted">Notes</dt>
                      <dd>{selected.customer.notes}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-rw-muted">
                  Products booked
                </p>
                <ul className="mt-3 space-y-3">
                  {selected.items.map((item, i) => (
                    <li
                      key={`${item.productId}-${i}`}
                      className="flex gap-3 border border-rw-border bg-rw-canvas p-2"
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt=""
                          className="h-14 w-14 object-cover"
                        />
                      ) : (
                        <div className="h-14 w-14 bg-rw-surface-2" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm">{item.name}</p>
                        <p className="text-xs text-rw-muted">
                          {item.size}
                          {item.color ? ` · ${item.color}` : ""} · ×{item.qty}
                        </p>
                        <p className="text-xs">
                          {formatPrice(item.price * item.qty)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1 border-t border-rw-border pt-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-rw-muted">Subtotal</span>
                  <span>{formatPrice(selected.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-rw-muted">Shipping</span>
                  <span>
                    {selected.shipping === 0
                      ? "Free"
                      : formatPrice(selected.shipping)}
                  </span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total (COD)</span>
                  <span>{formatPrice(selected.total)}</span>
                </div>
                <p className="pt-1 text-[11px] uppercase tracking-[0.12em] text-rw-muted">
                  Payment · Cash on delivery
                </p>
              </div>

              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.12em] text-rw-muted">
                  Update status
                </span>
                <select
                  value={selected.status}
                  onChange={(e) => updateStatus(selected.id, e.target.value)}
                  className="mt-2 h-10 w-full border border-rw-border bg-rw-canvas px-3 text-sm focus:border-rw-accent focus:outline-none"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}
        </aside>
      </div>

      <Toast message={toast} onDone={() => setToast("")} />
    </div>
  );
}
