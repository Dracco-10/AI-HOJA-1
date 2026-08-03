import { describe, it, expect } from "vitest";
import { PassThrough } from "node:stream";
import { startTui } from "../src/tui";

function runConversation(lines: string[]): Promise<string> {
  return new Promise((resolve) => {
    const input = new PassThrough();
    const output = new PassThrough();
    let result = "";

    output.on("data", (chunk) => {
      result += chunk.toString();
    });

    const rl = startTui(input, output);
    rl.on("close", () => resolve(result));

    for (const line of lines) {
      input.write(line + "\n");
    }
    input.end();
  });
}

describe("startTui (integración)", () => {
  it("sigue el flujo completo del mock: agregar, quitar, error y despedida", async () => {
    const transcript = await runConversation([
      "Rodrigo Custodio",
      "12345 5",
      "12345 -5",
      "12345 -5",
      "456 20",
      "bye",
    ]);

    expect(transcript).toContain("Hola Rodrigo Custodio!");
    expect(transcript).toContain("- 12345 con 5 unidades");
    expect(transcript).toContain("Tu carrito esta vacio");
    expect(transcript).toContain(
      "Oops parece que no tienes el producto 12345 agregado a tu carrito."
    );
    expect(transcript).toContain("- 456 con 20 unidades");
    expect(transcript).toContain("Adios fue un gusto atenderte!");
  });
});
