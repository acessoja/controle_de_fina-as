import { mountCrudModule, renderCrudTable } from "./crud-module.js";

export function mountCartoes(ctx) { mountCrudModule({ ...ctx, key: "cartoes" }); }
export function renderCartoes(ctx) { renderCrudTable({ ...ctx, key: "cartoes" }); }
