import { mountCrudModule, renderCrudTable } from "./crud-module.js";

export function mountDividas(ctx) { mountCrudModule({ ...ctx, key: "dividas" }); }
export function renderDividas(ctx) { renderCrudTable({ ...ctx, key: "dividas" }); }
