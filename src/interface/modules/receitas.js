import { mountCrudModule, renderCrudTable } from "./crud-module.js";

export function mountReceitas(ctx) { mountCrudModule({ ...ctx, key: "receitas" }); }
export function renderReceitas(ctx) { renderCrudTable({ ...ctx, key: "receitas" }); }
