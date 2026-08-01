import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function AccountAddressesPage() {
  return (
    <div>
      <h1 className="font-display text-3xl tracking-[0.08em]">Addresses</h1>
      <p className="mt-2 text-sm text-rw-muted">Add a shipping address.</p>
      <form className="mt-8 max-w-lg space-y-3">
        <Input label="Full name" />
        <Input label="Address line" />
        <div className="grid grid-cols-2 gap-3">
          <Input label="City" />
          <Input label="ZIP" />
        </div>
        <Button type="button">Save address</Button>
      </form>
    </div>
  );
}
