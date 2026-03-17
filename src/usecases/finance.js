import { inFilter } from "./filters.js";

export function sum(arr, key) {
  return arr.reduce((a, i) => a + Number(i[key] || 0), 0);
}

export function annualSum(state, key, valueKey) {
  const y = new Date().getFullYear();
  return state[key].filter((x) => (x.data || "").startsWith(String(y))).reduce((a, i) => a + Number(i[valueKey] || 0), 0);
}

export function monthsEvolution(state) {
  const map = {};
  state.receitas.forEach((r) => {
    if (!r.data) return;
    const k = r.data.slice(0, 7);
    map[k] = map[k] || { e: 0, s: 0 };
    map[k].e += Number(r.valor || 0);
  });
  state.gastos.forEach((g) => {
    if (!g.data) return;
    const k = g.data.slice(0, 7);
    map[k] = map[k] || { e: 0, s: 0 };
    map[k].s += Number(g.valor || 0);
  });
  return Object.entries(map).sort(([a], [b]) => a.localeCompare(b)).map(([label, x]) => ({ label, saldo: x.e - x.s }));
}

export function computeOverview(state, filters) {
  const receitas = state.receitas.filter((i) => inFilter(i, filters));
  const gastos = state.gastos.filter((i) => inFilter(i, filters));
  const entradasMes = sum(receitas, "valor");
  const saidasMes = sum(gastos, "valor");
  const saldoAtual = Number(state.totalConta || 0) + Number(state.totalDinheiro || 0);
  return {
    entradasMes,
    saidasMes,
    saldoAtual,
    saldoFinal: saldoAtual + entradasMes - saidasMes,
    comparativo: entradasMes - saidasMes,
  };
}

export function groupBy(arr, by, value) {
  return arr.reduce((acc, i) => {
    const k = i[by] || "";
    acc[k] = (acc[k] || 0) + Number(i[value] || 0);
    return acc;
  }, {});
}
