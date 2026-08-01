export function SpecTable({ specs }: { specs: Record<string, string> }) {
  return (
    <dl className="divide-y divide-rw-border border border-rw-border">
      {Object.entries(specs).map(([key, value]) => (
        <div
          key={key}
          className="grid grid-cols-2 gap-4 px-4 py-3 text-sm md:grid-cols-[180px_1fr]"
        >
          <dt className="text-rw-muted">{key}</dt>
          <dd className="text-rw-text">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
