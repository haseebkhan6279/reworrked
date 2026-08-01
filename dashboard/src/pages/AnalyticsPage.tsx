import { useMemo, useState } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

const EVENTS = [
  { id: "1", type: "page_view", journey: "browse", ts: "2026-07-29 14:02", path: "/" },
  { id: "2", type: "product_view", journey: "pdp", ts: "2026-07-29 14:05", path: "/products/noir-structured-fitted" },
  { id: "3", type: "add_to_cart", journey: "commerce", ts: "2026-07-29 14:07", path: "/cart" },
  { id: "4", type: "consent_accept", journey: "privacy", ts: "2026-07-29 14:01", path: "/" },
  { id: "5", type: "checkout_start", journey: "commerce", ts: "2026-07-29 14:12", path: "/checkout" },
  { id: "6", type: "page_view", journey: "blog", ts: "2026-07-29 15:20", path: "/blog/fit-guide-crown-and-brim" },
];

export function AnalyticsPage() {
  const [eventType, setEventType] = useState("");
  const [journey, setJourney] = useState("");

  const filtered = useMemo(
    () =>
      EVENTS.filter(
        (e) =>
          (!eventType || e.type === eventType) &&
          (!journey || e.journey === journey)
      ),
    [eventType, journey]
  );

  const chartOptions: ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      background: "transparent",
      fontFamily: "DM Sans, sans-serif",
    },
    theme: { mode: "dark" },
    colors: ["#E8E4DC"],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.4,
        opacityFrom: 0.35,
        opacityTo: 0.05,
      },
    },
    grid: { borderColor: "#2A2A2A" },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: { style: { colors: "#9A9A9A" } },
      axisBorder: { color: "#2A2A2A" },
    },
    yaxis: { labels: { style: { colors: "#9A9A9A" } } },
    tooltip: { theme: "dark" },
  };

  const series = [{ name: "Sessions", data: [420, 510, 480, 620, 700, 640, 780] }];

  return (
    <div>
      <h1 className="font-display text-3xl tracking-[0.08em]">Analytics</h1>
      <p className="mt-1 text-sm text-rw-muted">
        ApexCharts · Nest analytics events
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-4">
        {[
          ["Sessions", "4,150"],
          ["Product views", "1,892"],
          ["Add to cart", "312"],
          ["Consents", "88%"],
        ].map(([l, v]) => (
          <div key={l} className="border border-rw-border bg-rw-surface p-4">
            <p className="text-[11px] uppercase tracking-[0.12em] text-rw-muted">
              {l}
            </p>
            <p className="mt-2 font-display text-3xl tracking-[0.06em] text-rw-accent">
              {v}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 border border-rw-border bg-rw-surface p-4">
        <p className="mb-3 text-[11px] uppercase tracking-[0.12em] text-rw-muted">
          Sessions · 7 days
        </p>
        <Chart options={chartOptions} series={series} type="area" height={260} />
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap gap-3">
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="h-10 border border-rw-border bg-rw-surface px-3 text-sm focus:border-rw-accent focus:outline-none"
          >
            <option value="">All event types</option>
            <option value="page_view">page_view</option>
            <option value="product_view">product_view</option>
            <option value="add_to_cart">add_to_cart</option>
            <option value="checkout_start">checkout_start</option>
            <option value="consent_accept">consent_accept</option>
          </select>
          <select
            value={journey}
            onChange={(e) => setJourney(e.target.value)}
            className="h-10 border border-rw-border bg-rw-surface px-3 text-sm focus:border-rw-accent focus:outline-none"
          >
            <option value="">All journeys</option>
            <option value="browse">browse</option>
            <option value="pdp">pdp</option>
            <option value="commerce">commerce</option>
            <option value="privacy">privacy</option>
            <option value="blog">blog</option>
          </select>
        </div>

        <div className="mt-4 overflow-x-auto border border-rw-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-rw-border bg-rw-surface text-[11px] uppercase tracking-[0.1em] text-rw-muted">
              <tr>
                <th className="px-3 py-3 font-medium">Time</th>
                <th className="px-3 py-3 font-medium">Event</th>
                <th className="px-3 py-3 font-medium">Journey</th>
                <th className="px-3 py-3 font-medium">Path</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.id} className="border-b border-rw-border">
                  <td className="px-3 py-3 font-mono text-xs text-rw-muted">
                    {e.ts}
                  </td>
                  <td className="px-3 py-3">{e.type}</td>
                  <td className="px-3 py-3 text-rw-muted">{e.journey}</td>
                  <td className="px-3 py-3 font-mono text-xs">{e.path}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
