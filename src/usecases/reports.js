import { groupBy, sum } from "./finance.js";
import { inFilter } from "./filters.js";

export function buildReports(state, filters) {
  const gastos = state.gastos.filter((i) => inFilter(i, filters));
  const receitas = state.receitas.filter((i) => inFilter(i, filters));
  return {
    gastosCategoria: groupBy(gastos, "categoria", "valor"),
    receitasOrigem: groupBy(receitas, "tipo", "valor"),
    maioresGastos: [...gastos].sort((a, b) => Number(b.valor || 0) - Number(a.valor || 0)).slice(0, 5),
    inadimplencia: state.dividas.filter((d) => d.status === "Atrasada").length + state.receber.filter((r) => r.status === "Atrasado").length,
    dividasAbertas: sum(state.dividas.filter((d) => d.status !== "Quitada"), "valorTotal"),
    faltaReceber: state.receber.reduce((a, r) => a + Number(r.valorTotal || 0) - Number(r.pago || 0), 0),
  };
}
