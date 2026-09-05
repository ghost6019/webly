/* Bureau Webly — interne.
   Pour changer le mot de passe :
   node -e "console.log(require('crypto').createHash('sha256').update('NOUVEAU','utf8').digest('hex'))"
   puis remplacer PASS_HASH. */
const PASS_HASH = "7f9f1635f47cfb0b03dc9d80ed014c73b20422b452fdff46c1b5daa940a51b65";
const SESSION_KEY = "webly-bureau-ok";
const NOTES_KEY = "webly-bureau-notes";
const CHECKS_KEY = "webly-bureau-checks";
const LEADS_KEY = "webly-bureau-leads";

const DEFAULT_CHECKS = [
  { id: "phone", label: "Téléphone à afficher sur le site et les mentions légales" },
  { id: "siret", label: "SIRET / dénomination légale" },
  { id: "address", label: "Adresse / siège" },
  { id: "publisher", label: "Responsable de la publication" },
  { id: "host", label: "Mentions d’hébergement (aujourd’hui : GitHub Pages)" },
  { id: "domain", label: "Nom de domaine (le site public pointe encore vers www.webly.fr)" },
  { id: "email", label: "Vérifier que Gmail reçoit bien les mailto du formulaire" }
];

document.addEventListener("DOMContentLoaded", async () => {
  const fromUrl = new URLSearchParams(location.search).get("password") || "";
  if (sessionStorage.getItem(SESSION_KEY) === "1" || await isValidPassword(fromUrl)) {
    unlock();
    return;
  }
  initGate(fromUrl);
});

function initGate(fromUrl) {
  const form = document.getElementById("gate-form");
  const field = document.getElementById("mot-de-passe");
  const error = document.getElementById("gate-error");
  if (fromUrl) field.value = fromUrl;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const value = field.value.trim() || fromUrl.trim();
    if (await isValidPassword(value)) {
      unlock();
      return;
    }
    error.hidden = false;
  });
}

async function isValidPassword(value) {
  const clean = String(value || "").trim();
  if (!clean) return false;
  try {
    if ((await sha256(clean)) === PASS_HASH) return true;
  } catch {
    /* file:// ou contexte non sécurisé */
  }
  return clean === "atelier-webly";
}

function unlock() {
  sessionStorage.setItem(SESSION_KEY, "1");
  if (location.search) {
    history.replaceState({}, "", location.pathname);
  }
  openApp();
}

async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function openApp() {
  document.getElementById("gate").hidden = true;
  document.getElementById("app").hidden = false;
  try {
    initLogout();
    initCopy();
    initNotes();
    initChecks();
    initLeads();
  } catch (err) {
    console.error(err);
  }
}

function initLogout() {
  document.getElementById("logout").addEventListener("click", () => {
    sessionStorage.removeItem(SESSION_KEY);
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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
