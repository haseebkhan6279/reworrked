export default function AccountOrdersPage() {
  return (
    <div>
      <h1 className="font-display text-3xl tracking-[0.08em]">Orders</h1>
      <div className="mt-8 overflow-x-auto border border-rw-border">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead className="border-b border-rw-border bg-rw-surface text-[11px] uppercase tracking-[0.12em] text-rw-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-rw-border">
              <td className="px-4 py-3 font-mono text-xs">RW-ORD-0001</td>
              <td className="px-4 py-3 text-rw-muted">Jul 22, 2026</td>
              <td className="px-4 py-3">$68</td>
              <td className="px-4 py-3 text-rw-accent">In transit</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
