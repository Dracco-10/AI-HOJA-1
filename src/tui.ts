import * as readline from "node:readline";
import { Cart } from "./cart";
import { parseCommand, renderCartState, renderNotInCartError } from "./commands";

export function startTui(
  input: NodeJS.ReadableStream = process.stdin,
  output: NodeJS.WritableStream = process.stdout
): readline.Interface {
  const rl = readline.createInterface({ input, output });
  const cart = new Cart();
  let nameCaptured = false;

  output.write("Por favor ingrese su nombre.\n");

  rl.on("line", (line) => {
    if (!nameCaptured) {
      nameCaptured = true;
      output.write(`Hola ${line}! Que deseas modificar en tu carrito?\n`);
      return;
    }

    const command = parseCommand(line);

    if (command.type === "bye") {
      output.write("Adios fue un gusto atenderte!\n");
      rl.close();
      return;
    }

    if (command.type === "invalid") {
      output.write("No entendi ese comando, usa: <id de producto> <cantidad>\n");
      return;
    }

    try {
      cart.addOrUpdate(command.productId, command.delta);
      output.write(renderCartState(cart) + "\n");
      output.write("Que mas deseas hacer?\n");
    } catch {
      output.write(renderNotInCartError(command.productId) + "\n");
      output.write("Que mas deseas hacer?\n");
    }
  });

  return rl;
}