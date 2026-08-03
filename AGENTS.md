# AGENTS.md

Este archivo da contexto a herramientas de agentic coding (Claude Code, OpenAI Codex, OpenCode, etc.) que trabajen en este repositorio.

## Qué es este proyecto

Prueba de concepto (POC) de una TUI (Text User Interface) para el manejo del carrito de compras de un usuario anónimo, para la plataforma de e-commerce "Shop 502".

## Stack

- TypeScript sobre Node.js
- Vitest para tests (unitarios e integración)
- esbuild para empaquetar el código
- @yao-pkg/pkg para generar el binario ejecutable

## Estructura del proyecto

- `src/cart.ts` — lógica pura del carrito (altas, bajas, cambios de cantidad).
- `src/commands.ts` — parseo de comandos de texto y armado de mensajes para el usuario.
- `src/tui.ts` — orquesta la interacción por terminal (lectura de líneas, impresión de mensajes).
- `src/index.ts` — punto de entrada, arranca la TUI.
- `tests/` — un archivo de test por cada módulo de `src/`.

## Cómo correr el proyecto

```bash
npm install
npx tsx src/index.ts
```

## Cómo correr los tests

```bash
npx vitest run --coverage
```

## Reglas de trabajo en este repo

- Metodología: TDD. Escribir el test antes que la implementación cuando se agregue lógica nueva.
- Cobertura mínima esperada: 80% (actualmente por encima del 90%).
- No hacer commits directos a `main`. Todo cambio va en una rama nueva y se sube como Pull Request.
- Seguir Github Flow: ramas cortas, un PR por cambio, squash o rebase al mergear.
- El pipeline de CI corre los tests en cada PR y en cada push a `main`. El pipeline de CD publica el binario (`dist/carrito-tui`) como GitHub artifact solo en pushes a `main`.
- El formato de los comandos de la TUI es `<id de producto> <cantidad a sumar o restar>`, separados por un espacio. Cantidades negativas restan del carrito.