import { mountCrudModule, renderCrudTable } from "./crud-module.js";

export function mountReservaMetas(ctx) { mountCrudModule({ ...ctx, key: "metas" }); }
export function renderReservaMetas(ctx) { renderCrudTable({ ...ctx, key: "metas" }); }
