/* Bureau Webly — interne.
   Pour changer le mot de passe :
   node -e "console.log(require('crypto').createHash('sha256').update('NOUVEAU','utf8').digest('hex'))"
   puis remplacer PASS_HASH. */
const PASS_HASH = "7f9f1635f47cfb0b03dc9d80ed014c73b20422b452fdff46c1b5daa940a51b65";
const SESSION_KEY = "webly-bureau-ok";
const NOTES_KEY = "webly-bureau-notes";
const CHECKS_KEY = "webly-bureau-checks";
const DEVIS_KEY = "webly-bureau-devis";
const OFFER_DEFAULTS = {
  Essentiel: 499,
  Professionnel: 799,
  "Sur mesure": "",
  Maintenance: 29
};

const DEFAULT_CHECKS = [
  { id: "siret", label: "SIRET / dénomination / siège : les coller dans mentions-legales.html et cgv.html" },
  { id: "publisher", label: "Responsable de la publication (ton nom)" },
  { id: "host", label: "Mettre à jour l’hébergeur dans les mentions si tu quittes GitHub Pages" },
  { id: "domain", label: "Nom de domaine (le site public pointe encore vers www.webly.fr)" },
  { id: "cgv-devis", label: "Joindre le lien des CGV à chaque devis envoyé" }
];

document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("app").hidden) openApp();
});

document.addEventListener("webly-bureau-open", () => {
  openApp();
});

let bureauReady = false;

function openApp() {
  document.getElementById("gate").hidden = true;
  document.getElementById("app").hidden = false;
  if (bureauReady) return;
  bureauReady = true;
  try {
    initLogout();
    initCopy();
    initNotes();
    initChecks();
    initLeads();
    initDevis();
  } catch (err) {
    console.error(err);
  }
}

function initLogout() {
  document.getElementById("logout").addEventListener("click", () => {
    try { sessionStorage.removeItem(SESSION_KEY); } catch (e) {}
    location.reload();
  });
}

function readStore(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw == null ? fallback : raw;
  } catch {
    return fallback;
  }
}

function writeStore(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* navigation privée */
  }
}

function initCopy() {
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(btn.getAttribute("data-copy"));
        btn.textContent = "Copié";
        btn.classList.add("is-ok");
        setTimeout(() => {
          btn.textContent = "Copier";
          btn.classList.remove("is-ok");
        }, 1400);
      } catch {
        btn.textContent = "Ctrl+C";
      }
    });
  });
}

function initNotes() {
  const field = document.getElementById("notes-field");
  const status = document.getElementById("notes-status");
  const saved = readStore(NOTES_KEY, "");
  field.value = saved;
  status.textContent = saved ? "Enregistré sur cet appareil." : "Vide pour l’instant.";

  let timer;
  field.addEventListener("input", () => {
    status.textContent = "Enregistrement…";
    clearTimeout(timer);
    timer = setTimeout(() => {
      writeStore(NOTES_KEY, field.value);
      status.textContent = field.value.trim() ? "Enregistré sur cet appareil." : "Vide pour l’instant.";
    }, 280);
  });
}

function initChecks() {
  const root = document.getElementById("checks");
  const done = new Set(JSON.parse(readStore(CHECKS_KEY, "[]")));

  const render = () => {
    root.innerHTML = DEFAULT_CHECKS.map((item) => {
      const checked = done.has(item.id);
      return `<li>
        <label class="${checked ? "is-done" : ""}">
          <input type="checkbox" data-check="${item.id}" ${checked ? "checked" : ""}>
          <span>${item.label}</span>
        </label>
      </li>`;
    }).join("");
  };

  render();
  root.addEventListener("change", (event) => {
    const input = event.target.closest("[data-check]");
    if (!input) return;
    const id = input.getAttribute("data-check");
    if (input.checked) done.add(id);
    else done.delete(id);
    writeStore(CHECKS_KEY, JSON.stringify([...done]));
    render();
  });
}

function initLeads() {
  const form = document.getElementById("lead-form");
  const body = document.getElementById("leads-body");
  let leads = JSON.parse(readStore(LEADS_KEY, "[]"));

  const persist = () => writeStore(LEADS_KEY, JSON.stringify(leads));

  const render = () => {
    if (!leads.length) {
      body.innerHTML = `<tr class="empty-row"><td colspan="7">Aucune demande pour l’instant.</td></tr>`;
      return;
    }
    body.innerHTML = leads.map((lead) => `
      <tr>
        <td>${escapeHtml(lead.date)}</td>
        <td>${escapeHtml(lead.name)}</td>
        <td>${escapeHtml(lead.company || "—")}</td>
        <td>${escapeHtml(lead.offer)}</td>
        <td>${escapeHtml(lead.status)}</td>
        <td>${escapeHtml(lead.note || "—")}</td>
        <td><button class="delete" type="button" data-id="${lead.id}">Supprimer</button></td>
      </tr>
    `).join("");
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    leads.unshift({
      id: String(Date.now()),
      date: new Date().toLocaleDateString("fr-FR"),
      name: String(data.get("name") || "").trim(),
      company: String(data.get("company") || "").trim(),
      offer: String(data.get("offer") || ""),
      status: String(data.get("status") || ""),
      note: String(data.get("note") || "").trim()
    });
    persist();
    form.reset();
    render();
  });

  body.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-id]");
    if (!btn) return;
    leads = leads.filter((lead) => lead.id !== btn.getAttribute("data-id"));
    persist();
    render();
  });

  render();
}

function euro(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(value || 0);
}

function money(value) {
  const n = Number(String(value ?? "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

function initDevis() {
  const form = document.getElementById("devis-form");
  const body = document.getElementById("devis-body");
  const offer = document.getElementById("devis-offer");
  const price = document.getElementById("devis-price");
  let devis = JSON.parse(readStore(DEVIS_KEY, "[]"));

  const persist = () => writeStore(DEVIS_KEY, JSON.stringify(devis));

  const fillPrice = () => {
    const suggested = OFFER_DEFAULTS[offer.value];
    if (suggested !== "") price.value = suggested;
    else if (!price.value) price.placeholder = "Devis libre";
  };

  offer.addEventListener("change", fillPrice);
  fillPrice();

  const totals = () => {
    const paid = devis.filter((item) => item.status === "Payé");
    const waiting = devis.filter((item) => item.status === "Envoyé" || item.status === "Accepté");
    const ca = paid.reduce((sum, item) => sum + money(item.price), 0);
    const costs = paid.reduce((sum, item) => sum + money(item.cost), 0);
    const pending = waiting.reduce((sum, item) => sum + money(item.price), 0);
    const profit = ca - costs;
    document.getElementById("stat-devis").textContent = String(devis.length);
    document.getElementById("stat-ca").textContent = euro(ca);
    document.getElementById("stat-attente").textContent = euro(pending);
    const profitEl = document.getElementById("stat-profit");
    profitEl.textContent = euro(profit);
    profitEl.classList.toggle("is-pos", profit > 0);
    profitEl.classList.toggle("is-neg", profit < 0);
  };

  const render = () => {
    totals();
    if (!devis.length) {
      body.innerHTML = `<tr class="empty-row"><td colspan="8">Aucun devis pour l’instant.</td></tr>`;
      return;
    }
    body.innerHTML = devis.map((item) => {
      const benefit = money(item.price) - money(item.cost);
      const klass = benefit >= 0 ? "money-pos" : "money-neg";
      return `<tr>
        <td>${escapeHtml(item.date)}</td>
        <td title="${escapeHtml(item.note || "")}">${escapeHtml(item.client)}</td>
        <td>${escapeHtml(item.offer)}</td>
        <td>${escapeHtml(euro(money(item.price)))}</td>
        <td>${escapeHtml(euro(money(item.cost)))}</td>
        <td class="${klass}">${escapeHtml(euro(benefit))}</td>
        <td>
          <select class="status-select" data-status-id="${item.id}">
            ${["Brouillon", "Envoyé", "Accepté", "Payé", "Refusé"].map((status) =>
              `<option${status === item.status ? " selected" : ""}>${status}</option>`
            ).join("")}
          </select>
        </td>
        <td><button class="delete" type="button" data-devis-id="${item.id}">Supprimer</button></td>
      </tr>`;
    }).join("");
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    devis.unshift({
      id: String(Date.now()),
      date: new Date().toLocaleDateString("fr-FR"),
      client: String(data.get("client") || "").trim(),
      offer: String(data.get("offer") || ""),
      price: money(data.get("price")),
      cost: money(data.get("cost")),
      status: String(data.get("status") || "Envoyé"),
      note: String(data.get("note") || "").trim()
    });
    persist();
    form.reset();
    fillPrice();
    render();
  });

  body.addEventListener("change", (event) => {
    const select = event.target.closest("[data-status-id]");
    if (!select) return;
    const id = select.getAttribute("data-status-id");
    const item = devis.find((row) => row.id === id);
    if (!item) return;
    item.status = select.value;
    persist();
    render();
  });

  body.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-devis-id]");
    if (!btn) return;
    devis = devis.filter((row) => row.id !== btn.getAttribute("data-devis-id"));
    persist();
    render();
  });

  render();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
