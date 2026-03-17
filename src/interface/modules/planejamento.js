import { mountCrudModule, renderCrudTable } from "./crud-module.js";

export function mountPlanejamento(ctx) { mountCrudModule({ ...ctx, key: "planejamento" }); }
export function renderPlanejamento(ctx) { renderCrudTable({ ...ctx, key: "planejamento" }); }
