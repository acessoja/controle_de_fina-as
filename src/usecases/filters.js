export function getFilters() {
  return {
    month: document.getElementById("filterMonth").value,
    year: document.getElementById("filterYear").value,
    category: document.getElementById("filterCategory").value.toLowerCase(),
    person: document.getElementById("filterPerson").value.toLowerCase(),
  };
}

export function inFilter(item, filters) {
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
