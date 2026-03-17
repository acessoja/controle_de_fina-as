const STORAGE_KEY = "financeiro_pessoal_v2";

export function loadState(baseState) {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return { ...baseState, ...parsed };
  } catch {
    return { ...baseState };
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
