export function renderTabs(tabs) {
  const nav = document.getElementById("tabs");
  nav.innerHTML = "";
  tabs.forEach(([id, name], index) => {
    const btn = document.createElement("button");
    btn.className = `tab-btn ${index === 0 ? "active" : ""}`;
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
