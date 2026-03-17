import { mountCrudModule, renderCrudTable } from "./crud-module.js";

export function mountValoresReceber(ctx) { mountCrudModule({ ...ctx, key: "receber" }); }
export function renderValoresReceber(ctx) { renderCrudTable({ ...ctx, key: "receber" }); }
