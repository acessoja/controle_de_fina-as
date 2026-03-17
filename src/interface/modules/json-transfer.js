export function bindJsonTransfer(state, saveState, renderAll) {
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
    saveState(state);
    renderAll();
  };
}
