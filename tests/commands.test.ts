import { describe, it, expect } from "vitest";
import { Cart } from "../src/cart";
import { parseCommand, renderCartState, renderNotInCartError } from "../src/commands";

describe("parseCommand", () => {
  it("reconoce el comando de despedida", () => {
    expect(parseCommand("bye")).toEqual({ type: "bye" });
  });

  it("parsea un comando de id y cantidad válido", () => {
    expect(parseCommand("12345 5")).toEqual({
      type: "update",
      productId: "12345",
      delta: 5,
    });
  });

  it("parsea cantidades negativas", () => {
    expect(parseCommand("12345 -5")).toEqual({
      type: "update",
      productId: "12345",
      delta: -5,
    });
  });

  it("marca como inválido un comando sin cantidad numérica", () => {
    expect(parseCommand("12345 abc")).toEqual({ type: "invalid" });
  });

  it("marca como inválido un comando vacío", () => {
    expect(parseCommand("")).toEqual({ type: "invalid" });
  });
});

describe("renderCartState", () => {
  it("muestra que el carrito está vacío", () => {
    const cart = new Cart();
    expect(renderCartState(cart)).toBe("Tu carrito esta vacio");
  });

  it("muestra los productos con sus cantidades", () => {
    const cart = new Cart();
    cart.addOrUpdate("12345", 5);
    expect(renderCartState(cart)).toBe(
      "Tu carrito es:\n   - 12345 con 5 unidades"
    );
  });
});

describe("renderNotInCartError", () => {
  it("arma el mensaje de error con el id del producto", () => {
    expect(renderNotInCartError("12345")).toBe(
      "Oops parece que no tienes el producto 12345 agregado a tu carrito."
    );
  });
});