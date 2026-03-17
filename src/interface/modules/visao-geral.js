import { computeOverview, annualSum, monthsEvolution } from "../../usecases/finance.js";
import { money } from "../../infrastructure/formatters.js";

let saldoChart;
let comparativoChart;

export function mountVisaoGeral(state, saveState, renderAll) {
  const section = document.getElementById("overview");
  const card = document.createElement("div");
  card.className = "module-card";
  card.innerHTML = `
    <h3>Configuração de saldo atual</h3>
    <div class="data-form">
      <label>Total em conta <input type="number" id="totalConta" value="${state.totalConta}" /></label>
      <label>Total em dinheiro <input type="number" id="totalDinheiro" value="${state.totalDinheiro}" /></label>
      <button id="saveSaldo" type="button">Salvar</button>
    </div>
    <div id="overviewCards" class="cards"></div>
    <div class="grid-2">
      <div class="canvas-card"><canvas id="saldoChart"></canvas></div>
      <div class="canvas-card"><canvas id="comparativoChart"></canvas></div>
    </div>
  `;
  section.appendChild(card);

  card.querySelector("#saveSaldo").onclick = () => {
    state.totalConta = Number(card.querySelector("#totalConta").value || 0);
    state.totalDinheiro = Number(card.querySelector("#totalDinheiro").value || 0);
    saveState(state);
    renderAll();
  };
}

export function renderVisaoGeral(state, filters) {
  const data = computeOverview(state, filters);
  const cards = [
    ["Saldo atual", data.saldoAtual],
    ["Total em conta", state.totalConta],
    ["Total em dinheiro", state.totalDinheiro],
    ["Entradas do mês", data.entradasMes],
    ["Saídas do mês", data.saidasMes],
    ["Saldo final do mês", data.saldoFinal],
    ["Receita - Despesa", data.comparativo],
    ["Resumo anual (receitas)", annualSum(state, "receitas", "valor")],
    ["Resumo anual (gastos)", annualSum(state, "gastos", "valor")],
  ];

  document.getElementById("overviewCards").innerHTML = cards.map(([label, value]) => `<div class="card"><div class="label">${label}</div><div class="value">${money(value)}</div></div>`).join("");
  drawCharts(monthsEvolution(state), data.entradasMes, data.saidasMes);
}

function drawCharts(monthly, entradasMes, saidasMes) {
  const saldoCtx = document.getElementById("saldoChart");
  const compCtx = document.getElementById("comparativoChart");
  if (!saldoCtx || !compCtx) return;

  if (saldoChart) saldoChart.destroy();
  if (comparativoChart) comparativoChart.destroy();

  saldoChart = new Chart(saldoCtx, {
    type: "line",
    data: { labels: monthly.map((m) => m.label), datasets: [{ label: "Evolução saldo mensal", data: monthly.map((m) => m.saldo), borderColor: "#4f46e5" }] }
  });

  comparativoChart = new Chart(compCtx, {
    type: "bar",
    data: { labels: ["Entradas", "Saídas"], datasets: [{ label: "Comparativo", data: [entradasMes, saidasMes], backgroundColor: ["#16a34a", "#dc2626"] }] }
  });
}
