import { mountCrudModule, renderCrudTable } from "./crud-module.js";

export function mountGastos(ctx) { mountCrudModule({ ...ctx, key: "gastos" }); }
export function renderGastos(ctx) { renderCrudTable({ ...ctx, key: "gastos" }); }
