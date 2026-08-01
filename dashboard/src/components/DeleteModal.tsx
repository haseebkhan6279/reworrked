export function DeleteModal({
  open,
  title,
  description,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/70"
        aria-label="Close"
        onClick={onCancel}
      />
      <div className="relative w-full max-w-sm border border-rw-border bg-rw-canvas p-6">
        <h2 className="font-display text-2xl tracking-[0.08em]">{title}</h2>
        <p className="mt-2 text-sm text-rw-muted">{description}</p>
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="h-10 border border-rw-border px-4 text-sm text-rw-muted hover:text-rw-text"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-10 bg-rw-sale/20 px-4 text-sm text-rw-sale hover:bg-rw-sale/30"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
