export function money(value) {
  return Number(value || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function dayDiff(a, b) {
  return Math.ceil((b - a) / (1000 * 60 * 60 * 24));
}
