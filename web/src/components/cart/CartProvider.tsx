"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Product } from "@/lib/data";

export type CartLine = {
  product: Product;
  size: string;
  color: string;
  qty: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, size: string, color: string, qty?: number) => void;
  updateQty: (key: string, qty: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  lineKey: (line: CartLine) => string;
};

const CartContext = createContext<CartContextValue | null>(null);

function keyOf(productId: string, size: string, color: string) {
  return `${productId}::${size}::${color}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const lineKey = useCallback(
    (line: CartLine) => keyOf(line.product.id, line.size, line.color),
    []
  );

  const addItem = useCallback(
    (product: Product, size: string, color: string, qty = 1) => {
      setLines((prev) => {
        const k = keyOf(product.id, size, color);
        const existing = prev.find(
          (l) => keyOf(l.product.id, l.size, l.color) === k
        );
        if (existing) {
          return prev.map((l) =>
            keyOf(l.product.id, l.size, l.color) === k
              ? { ...l, qty: l.qty + qty }
              : l
          );
        }
        return [...prev, { product, size, color, qty }];
      });
      setIsOpen(true);
    },
    []
  );

  const updateQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      prev
        .map((l) =>
          keyOf(l.product.id, l.size, l.color) === key ? { ...l, qty } : l
        )
        .filter((l) => l.qty > 0)
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setLines((prev) =>
      prev.filter((l) => keyOf(l.product.id, l.size, l.color) !== key)
    );
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + l.product.price * l.qty, 0);
    return {
      lines,
      count,
      subtotal,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      updateQty,
      removeItem,
      clearCart,
      lineKey,
    };
  }, [lines, isOpen, addItem, updateQty, removeItem, clearCart, lineKey]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
