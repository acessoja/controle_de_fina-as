import { tabs } from "../entities/tabs.js";
import { schema } from "../entities/schema.js";
import { getFilters } from "../usecases/filters.js";

import { renderTabs } from "./modules/tabs.js";
import { setupFilters } from "./modules/filters.js";
import { mountVisaoGeral, renderVisaoGeral } from "./modules/visao-geral.js";
import { mountReceitas, renderReceitas } from "./modules/receitas.js";
import { mountGastos, renderGastos } from "./modules/gastos.js";
import { mountDividas, renderDividas } from "./modules/dividas.js";
import { mountValoresReceber, renderValoresReceber } from "./modules/valores-receber.js";
import { mountParcelamentos, renderParcelamentos } from "./modules/parcelamentos.js";
import { mountCartoes, renderCartoes } from "./modules/cartoes.js";
import { mountReservaMetas, renderReservaMetas } from "./modules/reserva-metas.js";
import { mountPlanejamento, renderPlanejamento } from "./modules/planejamento.js";
import { renderRelatorios } from "./modules/relatorios.js";
import { renderModeloPlanilha } from "./modules/modelo-planilha.js";
import { renderAlerts } from "./modules/alerts.js";
import { bindJsonTransfer } from "./modules/json-transfer.js";

export function startApp(state, saveState) {
  const ctx = { schema, state, saveState, renderAll };

  renderTabs(tabs);
  setupFilters(renderAll);

  mountVisaoGeral(state, saveState, renderAll);
  mountReceitas(ctx);
  mountGastos(ctx);
  mountDividas(ctx);
  mountValoresReceber(ctx);
  mountParcelamentos(ctx);
  mountCartoes(ctx);
  mountReservaMetas(ctx);
  mountPlanejamento(ctx);

  renderModeloPlanilha();
  bindJsonTransfer(state, saveState, renderAll);
  renderAll();

  function renderAll() {
    const filters = getFilters();
    const renderCtx = { schema, state, filters, saveState, renderAll };

    renderVisaoGeral(state, filters);
    renderReceitas(renderCtx);
    renderGastos(renderCtx);
    renderDividas(renderCtx);
    renderValoresReceber(renderCtx);
    renderParcelamentos(renderCtx);
    renderCartoes(renderCtx);
    renderReservaMetas(renderCtx);
    renderPlanejamento(renderCtx);

    renderRelatorios(state, filters);
    renderAlerts(state);
  }
}
