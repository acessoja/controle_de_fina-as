import { dayDiff } from "../infrastructure/formatters.js";
import { money } from "../infrastructure/formatters.js";

export function buildAlerts(state) {
  const today = new Date();
  const alerts = [];

  state.dividas.forEach((d) => {
    if (!d.vencimento) return;
    const diff = dayDiff(today, new Date(d.vencimento));
    if (d.status === "Atrasada" || diff < 0) alerts.push(`Dívida com ${d.credor} está atrasada.`);
    else if (diff <= 7) alerts.push(`Dívida com ${d.credor} vence em ${diff} dia(s).`);
  });

  state.gastos
    .filter((g) => g.status === "Pendente")
    .forEach((g) => alerts.push(`Conta pendente: ${g.descricao || g.categoria} (${money(g.valor)}).`));

  return alerts;
}
