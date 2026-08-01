import { useEffect } from "react";

export function Toast({
  message,
  onDone,
}: {
  message: string;
  onDone: () => void;
}) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [message, onDone]);

  if (!message) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 border border-rw-border bg-rw-surface px-4 py-3 text-sm text-rw-text shadow-none">
      {message}
    </div>
  );
}
