import type { Cart } from "./cart";

export type Command =
  | { type: "bye" }
  | { type: "update"; productId: string; delta: number }
  | { type: "invalid" };

export function parseCommand(line: string): Command {
  const trimmed = line.trim();

  if (trimmed === "bye") {
    return { type: "bye" };
  }

  const parts = trimmed.split(" ");
  if (parts.length !== 2) {
    return { type: "invalid" };
  }

  const [productId, deltaText] = parts;
  const delta = Number(deltaText);

  if (!productId || Number.isNaN(delta)) {
    return { type: "invalid" };
  }

  return { type: "update", productId, delta };
}

export function renderCartState(cart: Cart): string {
  if (cart.isEmpty()) {
    return "Tu carrito esta vacio";
  }

  const lines = cart
    .getEntries()
    .map(([productId, quantity]) => `   - ${productId} con ${quantity} unidades`);

  return ["Tu carrito es:", ...lines].join("\n");
}

export function renderNotInCartError(productId: string): string {
  return `Oops parece que no tienes el producto ${productId} agregado a tu carrito.`;
}