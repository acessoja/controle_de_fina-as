import { mountCrudModule, renderCrudTable } from "./crud-module.js";

export function mountParcelamentos(ctx) { mountCrudModule({ ...ctx, key: "parcelamentos" }); }
export function renderParcelamentos(ctx) { renderCrudTable({ ...ctx, key: "parcelamentos" }); }
