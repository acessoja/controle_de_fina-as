import { inFilter } from "../../usecases/filters.js";
import { money } from "../../infrastructure/formatters.js";

export function mountCrudModule({ key, schema, state, saveState, renderAll }) {
  const section = document.getElementById(key);
  const template = document.getElementById("moduleTemplate").content.cloneNode(true);
  template.querySelector("h3").textContent = `Controle de ${key}`;
  const form = template.querySelector(".data-form");

  schema[key].forEach((field) => form.appendChild(createInput(field)));

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
    saveState(state);
    form.reset();
    renderAll();
  };

  section.appendChild(template);
}

export function renderCrudTable({ key, schema, state, filters, saveState, renderAll }) {
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
      saveState(state);
      renderAll();
    };
  });
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

function formatCell(col, val, done, resto) {
  if (col === "status") {
    const cls = val === "Atrasada" ? "late" : val === "Pendente" || val === "Parcial" ? "warn" : "ok";
    return `<span class="badge ${cls}">${val || "-"}</span>`;
  }
  if (col === "acumulado") return `${money(Number(val || 0))} (${done || "0%"})`;
  if (col === "pago") return `${money(Number(val || 0))} (Falta ${money(Math.max(0, resto || 0))})`;
  if (col === "valor" || col.includes("valor") || col.includes("limite") || col === "gastos") return money(Number(val || 0));
  return val || "-";
}
