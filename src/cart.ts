export class Cart {
  private items: Map<string, number> = new Map();

  isEmpty(): boolean {
    return this.items.size === 0;
  }

  getQuantity(productId: string): number {
    return this.items.get(productId) ?? 0;
  }

  addOrUpdate(productId: string, delta: number): void {
    const current = this.items.get(productId);

    if (current === undefined) {
      if (delta <= 0) {
        throw new Error(`El producto ${productId} no está en el carrito.`);
      }
      this.items.set(productId, delta);
      return;
    }

    const newQuantity = current + delta;

    if (newQuantity <= 0) {
      this.items.delete(productId);
      return;
    }

    this.items.set(productId, newQuantity);
  }
}