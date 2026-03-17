import { buildReports } from "../../usecases/reports.js";
import { money } from "../../infrastructure/formatters.js";

export function renderRelatorios(state, filters) {
  const el = document.getElementById("relatorios");
  const report = buildReports(state, filters);

  el.innerHTML = `
    <div class="module-card">
      <h3>Análises rápidas</h3>
      <p><strong>Gastos por categoria:</strong> ${Object.entries(report.gastosCategoria).map(([k, v]) => `${k || "Sem categoria"}: ${money(v)}`).join(" | ") || "Sem dados"}</p>
      <p><strong>Receitas por origem:</strong> ${Object.entries(report.receitasOrigem).map(([k, v]) => `${k || "Sem origem"}: ${money(v)}`).join(" | ") || "Sem dados"}</p>
      <p><strong>Maiores gastos do mês:</strong> ${report.maioresGastos.map((g) => `${g.descricao || g.categoria}: ${money(g.valor)}`).join("; ") || "Sem dados"}</p>
      <p><strong>Comparação entre meses:</strong> use o gráfico de evolução na visão geral.</p>
      <p><strong>Relatório de inadimplência:</strong> ${report.inadimplencia} registro(s) em atraso.</p>
      <p><strong>Relatório de dívidas:</strong> Total aberto ${money(report.dividasAbertas)}.</p>
      <p><strong>Relatório de valores a receber:</strong> Falta receber ${money(report.faltaReceber)}.</p>
    </div>
  `;
}
