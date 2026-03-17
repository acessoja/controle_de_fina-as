import { buildAlerts } from "../../usecases/alerts.js";

export function renderAlerts(state) {
  const alerts = buildAlerts(state);
  document.getElementById("alerts").innerHTML = alerts.length
    ? alerts.map((a) => `<div class="alert">${a}</div>`).join("")
    : "";
}
