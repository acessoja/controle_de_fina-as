const STORAGE_KEY = "financeiro_pessoal_v1";

const tabs = [
  ["overview", "Visão Geral"],
  ["receitas", "Receitas"],
  ["gastos", "Gastos"],
  ["dividas", "Dívidas"],
  ["receber", "Valores a Receber"],
  ["parcelamentos", "Parcelamentos"],
  ["cartoes", "Cartões"],
  ["metas", "Reserva e Metas"],
  ["planejamento", "Planejamento"],
  ["relatorios", "Relatórios"],
  ["modelo", "Modelo de Planilha"],
];

const schema = {
  receitas: [
    { key: "data", label: "Data", type: "date" },
    { key: "tipo", label: "Tipo", type: "select", options: ["Salário", "Renda Extra", "Comissão", "Reembolso", "Diversos"] },
    { key: "categoria", label: "Categoria" },
    { key: "descricao", label: "Descrição" },
    { key: "forma", label: "Forma de Recebimento" },
    { key: "valor", label: "Valor", type: "number" },
    { key: "obs", label: "Observações" },
  ],
  gastos: [
    { key: "data", label: "Data", type: "date" },
    { key: "grupo", label: "Grupo", type: "select", options: ["Fixo", "Variável", "Essencial", "Não Essencial"] },
    { key: "categoria", label: "Categoria" },
    { key: "subcategoria", label: "Subcategoria" },
    { key: "descricao", label: "Descrição" },
    { key: "forma", label: "Forma de Pagamento" },
    { key: "status", label: "Status", type: "select", options: ["Pago", "Pendente"] },
    { key: "valor", label: "Valor", type: "number" },
    { key: "obs", label: "Observações" },
  ],
  dividas: [
    { key: "credor", label: "Para quem devo" },
    { key: "valorTotal", label: "Valor total", type: "number" },
    { key: "parcelas", label: "Qtd parcelas", type: "number" },
    { key: "valorParcela", label: "Valor parcela", type: "number" },
    { key: "juros", label: "Juros (%)", type: "number" },
    { key: "vencimento", label: "Vencimento", type: "date" },
    { key: "status", label: "Status", type: "select", options: ["Em dia", "Atrasada", "Quitada"] },
    { key: "historico", label: "Histórico de pagamentos" },
    { key: "previsao", label: "Previsão quitação", type: "date" },
  ],
  receber: [
    { key: "pessoa", label: "Nome da pessoa" },
    { key: "motivo", label: "Motivo" },
    { key: "valorTotal", label: "Valor total", type: "number" },
    { key: "pago", label: "Quanto já foi pago", type: "number" },
    { key: "dataEmprestimo", label: "Data empréstimo", type: "date" },
    { key: "dataPrevista", label: "Data prevista pgto", type: "date" },
    { key: "status", label: "Status", type: "select", options: ["Aberto", "Parcial", "Recebido", "Atrasado"] },
    { key: "obs", label: "Observações" },
  ],
  parcelamentos: [
    { key: "descricao", label: "Compra" },
    { key: "cartao", label: "Cartão" },
    { key: "valorTotal", label: "Valor total", type: "number" },
    { key: "parcelas", label: "Número de parcelas", type: "number" },
    { key: "parcelaAtual", label: "Parcela atual", type: "number" },
    { key: "valorParcela", label: "Valor parcela", type: "number" },
    { key: "termino", label: "Previsão término", type: "date" },
  ],
  cartoes: [
    { key: "nome", label: "Nome do cartão" },
    { key: "limiteTotal", label: "Limite total", type: "number" },
    { key: "limiteDisponivel", label: "Limite disponível", type: "number" },
    { key: "faturaAtual", label: "Fatura atual", type: "number" },
    { key: "melhorDia", label: "Melhor dia compra" },
    { key: "vencimento", label: "Vencimento" },
    { key: "gastos", label: "Gastos por cartão", type: "number" },
  ],
  metas: [
    { key: "tipo", label: "Meta", type: "select", options: ["Reserva emergência", "Economia", "Compra", "Viagem", "Outra"] },
    { key: "valorAlvo", label: "Valor alvo", type: "number" },
    { key: "acumulado", label: "Valor acumulado", type: "number" },
    { key: "prazo", label: "Prazo", type: "date" },
    { key: "obs", label: "Observações" },
  ],
  planejamento: [
    { key: "area", label: "Área", type: "select", options: ["Imprevistos", "Planejamento mensal", "Assinaturas", "Gastos sazonais"] },
    { key: "descricao", label: "Descrição" },
    { key: "valorPrevisto", label: "Valor previsto", type: "number" },
    { key: "data", label: "Data", type: "date" },
    { key: "obs", label: "Observações" },
  ]
};

const state = loadState();
init();

function loadState() {
  const base = { totalConta: 0, totalDinheiro: 0, receitas: [], gastos: [], dividas: [], receber: [], parcelamentos: [], cartoes: [], metas: [], planejamento: [] };
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return { ...base, ...parsed };
  } catch {
    return base;
  }
}

function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

function init() {
  renderTabs();
  setupFilters();
  renderAccountInputs();
  ["receitas", "gastos", "dividas", "receber", "parcelamentos", "cartoes", "metas", "planejamento"].forEach((key) => renderModule(key));
  renderModelo();
  renderAll();
  bindImportExport();
}

function renderTabs() {
  const nav = document.getElementById("tabs");
  tabs.forEach(([id, name]) => {
    const btn = document.createElement("button");
    btn.className = `tab-btn ${id === "overview" ? "active" : ""}`;
    btn.textContent = name;
    btn.onclick = () => activateTab(id, name, btn);
    nav.appendChild(btn);
  });
}

function activateTab(id, name, btn) {
  document.querySelectorAll(".tab-content").forEach((el) => el.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document.querySelectorAll(".tab-btn").forEach((el) => el.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById("activeTitle").textContent = name;
}

function setupFilters() {
  const monthEl = document.getElementById("filterMonth");
  const yearEl = document.getElementById("filterYear");
  monthEl.innerHTML = `<option value="all">Mês</option>${Array.from({ length: 12 }, (_, i) => `<option value="${i + 1}">${String(i + 1).padStart(2, "0")}</option>`).join("")}`;
  const y = new Date().getFullYear();
  yearEl.innerHTML = `<option value="all">Ano</option>${[y - 1, y, y + 1, y + 2].map((v) => `<option>${v}</option>`).join("")}`;
  ["filterMonth", "filterYear", "filterCategory", "filterPerson"].forEach((id) => {
    document.getElementById(id).addEventListener("input", () => renderAll());
  });
}

function renderAccountInputs() {
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
    saveState();
    renderAll();
  };
}

function renderModule(key) {
  const section = document.getElementById(key);
  const template = document.getElementById("moduleTemplate").content.cloneNode(true);
  template.querySelector("h3").textContent = `Controle de ${key}`;
  const form = template.querySelector(".data-form");
  schema[key].forEach((f) => form.appendChild(createInput(f)));
  const submit = document.createElement("button");
  submit.type = "submit";
  submit.textContent = "Adicionar";
  form.appendChild(submit);
  form.onsubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    schema[key].forEach((f) => {
      if (f.type === "number") data[f.key] = Number(data[f.key] || 0);
    });
    data.id = crypto.randomUUID();
    state[key].push(data);
    saveState();
    form.reset();
    renderAll();
  };
  section.appendChild(template);
}

function createInput(field) {
  const wrap = document.createElement("label");
  wrap.textContent = field.label;
  let el;
  if (field.type === "select") {
    el = document.createElement("select");
    el.innerHTML = `<option value="">Selecione</option>${field.options.map((o) => `<option>${o}</option>`).join("")}`;
  } else if (field.key === "obs") {
    el = document.createElement("textarea");
    el.rows = 1;
  } else {
    el = document.createElement("input");
    el.type = field.type || "text";
  }
  el.name = field.key;
  wrap.appendChild(el);
  return wrap;
}

function getFilters() {
  return {
    month: document.getElementById("filterMonth").value,
    year: document.getElementById("filterYear").value,
    category: document.getElementById("filterCategory").value.toLowerCase(),
    person: document.getElementById("filterPerson").value.toLowerCase(),
  };
}

function inFilter(item, filters) {
  if (filters.category && !String(item.categoria || item.grupo || item.tipo || item.area || "").toLowerCase().includes(filters.category)) return false;
  if (filters.person && !String(item.pessoa || item.credor || "").toLowerCase().includes(filters.person)) return false;
  const dateVal = item.data || item.vencimento || item.dataPrevista || item.dataEmprestimo;
  if (dateVal) {
    const d = new Date(dateVal);
    if (filters.month !== "all" && d.getMonth() + 1 !== Number(filters.month)) return false;
    if (filters.year !== "all" && d.getFullYear() !== Number(filters.year)) return false;
  }
  return true;
}

function renderAll() {
  const filters = getFilters();
  renderOverview(filters);
  ["receitas", "gastos", "dividas", "receber", "parcelamentos", "cartoes", "metas", "planejamento"].forEach((key) => renderTable(key, filters));
  renderRelatorios(filters);
  renderAlerts();
}

function renderTable(key, filters) {
  const wrap = document.querySelector(`#${key} .table-wrap`);
  if (!wrap) return;
  const cols = schema[key].map((c) => c.key);
  const items = state[key].filter((i) => inFilter(i, filters));
  wrap.innerHTML = `<table><thead><tr>${schema[key].map((c) => `<th>${c.label}</th>`).join("")}<th>Ação</th></tr></thead><tbody>${items.map((i) => {
    const done = key === "metas" ? Math.min(100, ((Number(i.acumulado || 0) / Math.max(1, Number(i.valorAlvo || 1))) * 100)).toFixed(1) + "%" : null;
    const resto = key === "receber" ? Number(i.valorTotal || 0) - Number(i.pago || 0) : null;
    return `<tr>${cols.map((c) => `<td>${formatCell(c, i[c], done, resto)}</td>`).join("")}<td><button data-del="${key}:${i.id}">Excluir</button></td></tr>`;
  }).join("")}</tbody></table>`;
  wrap.querySelectorAll("button[data-del]").forEach((btn) => {
    btn.onclick = () => {
      const [k, id] = btn.dataset.del.split(":");
      state[k] = state[k].filter((i) => i.id !== id);
      saveState();
      renderAll();
    };
  });
}

function formatCell(col, val, done, resto) {
  if (col === "status") {
    const cls = val === "Atrasada" ? "late" : val === "Pendente" || val === "Parcial" ? "warn" : "ok";
    return `<span class="badge ${cls}">${val || "-"}</span>`;
  }
  if (col === "valor" || col.includes("valor") || col.includes("limite") || col === "gastos" || col === "pago") return money(Number(val || 0));
  if (col === "acumulado") return `${money(Number(val || 0))} (${done || "0%"})`;
  if (col === "pago") return `${money(Number(val || 0))} (Falta ${money(Math.max(0, resto || 0))})`;
  return val || "-";
}

function renderOverview(filters) {
  const receitas = state.receitas.filter((i) => inFilter(i, filters));
  const gastos = state.gastos.filter((i) => inFilter(i, filters));
  const entradasMes = sum(receitas, "valor");
  const saidasMes = sum(gastos, "valor");
  const saldoAtual = state.totalConta + state.totalDinheiro;
  const saldoFinal = saldoAtual + entradasMes - saidasMes;
  const comparativo = entradasMes - saidasMes;

  const cards = [
    ["Saldo atual", saldoAtual],
    ["Total em conta", state.totalConta],
    ["Total em dinheiro", state.totalDinheiro],
    ["Entradas do mês", entradasMes],
    ["Saídas do mês", saidasMes],
    ["Saldo final do mês", saldoFinal],
    ["Receita - Despesa", comparativo],
    ["Resumo anual (receitas)", annualSum("receitas", "valor")],
    ["Resumo anual (gastos)", annualSum("gastos", "valor")],
  ];
  document.getElementById("overviewCards").innerHTML = cards.map(([l, v]) => `<div class="card"><div class="label">${l}</div><div class="value">${money(v)}</div></div>`).join("");

  drawCharts(entradasMes, saidasMes);
}

let saldoChart;
let comparativoChart;
function drawCharts(entradasMes, saidasMes) {
  const monthly = monthsEvolution();
  const saldoCtx = document.getElementById("saldoChart");
  const compCtx = document.getElementById("comparativoChart");
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

function monthsEvolution() {
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

function renderRelatorios(filters) {
  const el = document.getElementById("relatorios");
  const gastos = state.gastos.filter((i) => inFilter(i, filters));
  const receitas = state.receitas.filter((i) => inFilter(i, filters));
  const gastosCategoria = groupBy(gastos, "categoria", "valor");
  const receitasOrigem = groupBy(receitas, "tipo", "valor");
  const maioresGastos = [...gastos].sort((a, b) => b.valor - a.valor).slice(0, 5);
  const inadimplencia = state.dividas.filter((d) => d.status === "Atrasada").length + state.receber.filter((r) => r.status === "Atrasado").length;
  el.innerHTML = `
    <div class="module-card">
      <h3>Análises rápidas</h3>
      <p><strong>Gráfico textual - Gastos por categoria:</strong> ${Object.entries(gastosCategoria).map(([k, v]) => `${k || "Sem categoria"}: ${money(v)}`).join(" | ") || "Sem dados"}</p>
      <p><strong>Gráfico textual - Receitas por origem:</strong> ${Object.entries(receitasOrigem).map(([k, v]) => `${k || "Sem origem"}: ${money(v)}`).join(" | ") || "Sem dados"}</p>
      <p><strong>Maiores gastos do mês:</strong> ${maioresGastos.map((g) => `${g.descricao || g.categoria}: ${money(g.valor)}`).join("; ") || "Sem dados"}</p>
      <p><strong>Comparação entre meses:</strong> acompanhe no gráfico de evolução no painel principal.</p>
      <p><strong>Relatório de inadimplência:</strong> ${inadimplencia} registro(s) em atraso.</p>
      <p><strong>Relatório de dívidas:</strong> Total aberto ${money(sum(state.dividas.filter((d) => d.status !== "Quitada"), "valorTotal"))}.</p>
      <p><strong>Relatório de valores a receber:</strong> Falta receber ${money(state.receber.reduce((a, r) => a + Number(r.valorTotal || 0) - Number(r.pago || 0), 0))}.</p>
    </div>
  `;
}

function renderAlerts() {
  const today = new Date();
  const alerts = [];
  state.dividas.forEach((d) => {
    if (!d.vencimento) return;
    const diff = dayDiff(today, new Date(d.vencimento));
    if (d.status === "Atrasada" || diff < 0) alerts.push(`Dívida com ${d.credor} está atrasada.`);
    else if (diff <= 7) alerts.push(`Dívida com ${d.credor} vence em ${diff} dia(s).`);
  });
  state.gastos.filter((g) => g.status === "Pendente").forEach((g) => alerts.push(`Conta pendente: ${g.descricao || g.categoria} (${money(g.valor)}).`));
  document.getElementById("alerts").innerHTML = alerts.length ? alerts.map((a) => `<div class="alert">${a}</div>`).join("") : "";
}

function renderModelo() {
  const el = document.getElementById("modelo");
  el.innerHTML = `
    <div class="module-card">
      <h3>Modelo profissional (abas recomendadas)</h3>
      <ul>
        <li>01_VisaoGeral</li><li>02_Receitas</li><li>03_Gastos</li><li>04_Dividas</li><li>05_ValoresAReceber</li>
        <li>06_Parcelamentos</li><li>07_Cartoes</li><li>08_Metas</li><li>09_Planejamento</li><li>10_Relatorios</li>
      </ul>
      <p><strong>Indicadores principais:</strong> taxa de poupança, saldo líquido mensal, % gastos essenciais, índice de inadimplência e % conclusão de metas.</p>
      <p><strong>Automações úteis:</strong> validação por listas, formatação condicional para atrasos, soma por mês via SOMASES/QUERY, dashboard com tabela dinâmica.</p>
      <p><strong>Módulos extras sugeridos:</strong> projeção de aposentadoria, simulador de amortização, acompanhamento de patrimônio e diário financeiro comportamental.</p>
    </div>
  `;
}

function bindImportExport() {
  document.getElementById("exportDataBtn").onclick = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "controle-financeiro.json";
    a.click();
  };
  document.getElementById("importDataInput").onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imported = JSON.parse(await file.text());
    Object.assign(state, imported);
    saveState();
    renderAll();
  };
}

function sum(arr, key) { return arr.reduce((a, i) => a + Number(i[key] || 0), 0); }
function annualSum(key, valueKey) {
  const y = new Date().getFullYear();
  return state[key].filter((x) => (x.data || "").startsWith(String(y))).reduce((a, i) => a + Number(i[valueKey] || 0), 0);
}
function groupBy(arr, by, value) {
  return arr.reduce((acc, i) => {
    const k = i[by] || "";
    acc[k] = (acc[k] || 0) + Number(i[value] || 0);
    return acc;
  }, {});
}
function money(v) { return Number(v || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }); }
function dayDiff(a, b) { return Math.ceil((b - a) / (1000 * 60 * 60 * 24)); }
