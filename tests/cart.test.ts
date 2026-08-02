import { describe, it, expect } from "vitest";
import { Cart } from "../src/cart";

describe("Cart", () => {
  it("empieza vacío", () => {
    const cart = new Cart();
    expect(cart.isEmpty()).toBe(true);
  });

  it("agrega un producto nuevo sumando la cantidad indicada", () => {
    const cart = new Cart();
    cart.addOrUpdate("12345", 5);
    expect(cart.getQuantity("12345")).toBe(5);
    expect(cart.isEmpty()).toBe(false);
  });

  it("suma cantidades cuando el producto ya existe", () => {
    const cart = new Cart();
    cart.addOrUpdate("12345", 5);
    cart.addOrUpdate("12345", 3);
    expect(cart.getQuantity("12345")).toBe(8);
  });

  it("resta cantidad y elimina el producto si llega a cero", () => {
    const cart = new Cart();
    cart.addOrUpdate("12345", 5);
    cart.addOrUpdate("12345", -5);
    expect(cart.getQuantity("12345")).toBe(0);
    expect(cart.isEmpty()).toBe(true);
  });

  it("lanza un error si se intenta restar un producto que no existe en el carrito", () => {
    const cart = new Cart();
    expect(() => cart.addOrUpdate("99999", -1)).toThrow();
  });
});