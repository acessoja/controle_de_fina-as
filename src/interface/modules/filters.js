export function setupFilters(onChange) {
  const monthEl = document.getElementById("filterMonth");
  const yearEl = document.getElementById("filterYear");
  monthEl.innerHTML = `<option value="all">Mês</option>${Array.from({ length: 12 }, (_, i) => `<option value="${i + 1}">${String(i + 1).padStart(2, "0")}</option>`).join("")}`;
  const y = new Date().getFullYear();
  yearEl.innerHTML = `<option value="all">Ano</option>${[y - 1, y, y + 1, y + 2].map((v) => `<option>${v}</option>`).join("")}`;
  ["filterMonth", "filterYear", "filterCategory", "filterPerson"].forEach((id) => {
    document.getElementById(id).addEventListener("input", onChange);
  });
}
