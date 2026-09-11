/* Configurateur Webly — estimation, pas un devis définitif. */

const CFG_KEY = "webly-configurateur";

const SITE_TYPES = [
  {
    id: "vitrine",
    label: "Site vitrine",
    text: "Présentez votre entreprise, vos services et vos coordonnées.",
    price: 499,
    priceLabel: "À partir de 499 €"
  },
  {
    id: "complet",
    label: "Site professionnel complet",
    text: "Un site plus complet avec davantage de pages et de fonctionnalités.",
    price: 799,
    priceLabel: "À partir de 799 €"
  },
  {
    id: "specifique",
    label: "Projet spécifique",
    text: "Vous avez un besoin particulier ? Expliquez-nous votre projet.",
    price: null,
    priceLabel: "Devis personnalisé"
  }
];

const PAGE_RANGES = [
  { id: "1-3", label: "1 à 3 pages", extra: 0, note: "Inclus", min: 1, max: 3 },
  { id: "4-5", label: "4 à 5 pages", extra: 100, note: "+100 €", min: 4, max: 5 },
  { id: "6-8", label: "6 à 8 pages", extra: 200, note: "+200 €", min: 6, max: 8 },
  { id: "9-12", label: "9 à 12 pages", extra: 350, note: "+350 €", min: 9, max: 12 },
  { id: "12+", label: "Plus de 12 pages", extra: null, note: "Devis personnalisé", min: 13, max: 99 }
];

const INCLUDED_PAGES = [
  { id: "accueil", label: "Accueil", hint: "La première page que l’on voit.", price: 0, locked: true },
  { id: "apropos", label: "À propos", hint: "Qui vous êtes, votre histoire.", price: 0, locked: true },
  { id: "services", label: "Services", hint: "Ce que vous proposez.", price: 0 },
  { id: "contact", label: "Contact", hint: "Comment vous joindre.", price: 0 }
];

const EXTRA_PAGES = [
  { id: "realisations", label: "Réalisations / Portfolio", hint: "Vos travaux, photos de chantiers ou projets.", price: 50 },
  { id: "avis", label: "Avis clients", hint: "Les retours de vos clients, sur une page dédiée.", price: 30 },
  { id: "faq", label: "FAQ", hint: "Les questions que l’on vous pose souvent.", price: 30 },
  { id: "blog", label: "Blog / Actualités", hint: "Des articles ou des nouvelles de l’entreprise.", price: 100 },
  { id: "zone", label: "Zone d’intervention", hint: "Les villes ou le secteur où vous vous déplacez.", price: 50 },
  { id: "personnalisee", label: "Page personnalisée", hint: "Une page qui n’entre dans aucune case ci-dessus.", price: 50 }
];

const DESIGNS = [
  { id: "essentiel", label: "Design essentiel", text: "Un design professionnel, propre et adapté à votre activité.", price: 0 },
  { id: "personnalise", label: "Design personnalisé", text: "Une identité visuelle davantage adaptée à vos goûts et à votre entreprise.", price: 100 },
  { id: "premium", label: "Design premium", text: "Un design haut de gamme avec davantage de détails visuels, d’animations et de travail graphique.", price: 200 }
];

const FEATURES = [
  { id: "formulaire", label: "Formulaire de contact", text: "Pour que vos clients vous écrivent depuis le site.", price: 0, locked: true },
  { id: "whatsapp", label: "Bouton WhatsApp", text: "Pour vous écrire directement sur WhatsApp.", price: 20 },
  { id: "maps", label: "Google Maps", text: "Une carte pour indiquer où vous vous trouvez.", price: 20 },
  { id: "galerie", label: "Galerie photos", text: "Pour montrer vos photos, clairement, sur le site.", price: 30 },
  { id: "filtres", label: "Galerie avec filtres", text: "Pour trier les photos (par type de travail, par pièce…). Remplace la galerie simple.", price: 70 },
  { id: "devis", label: "Formulaire de demande de devis", text: "Un formulaire plus précis pour demander un devis.", price: 50 },
  { id: "rdv", label: "Prise de rendez-vous", text: "Pour que vos clients choisissent un créneau.", price: 100 },
  { id: "reservation", label: "Système de réservation", text: "Pour réserver une table, un créneau ou une prestation.", price: 100 },
  { id: "newsletter", label: "Newsletter", text: "Pour collecter les e-mails et envoyer des actualités.", price: 50 },
  { id: "avisgoogle", label: "Avis Google intégrés", text: "Pour afficher vos avis Google sur le site.", price: 50 },
  { id: "chat", label: "Chat / messagerie", text: "Pour répondre aux visiteurs pendant qu’ils sont sur le site.", price: 50 },
  { id: "specifique", label: "Fonctionnalité spécifique", text: "Un besoin particulier, à chiffrer avec vous.", price: null }
];

const TEXTS = [
  { id: "tous", label: "Je fournis tous mes textes", price: 0 },
  { id: "partie", label: "Je fournis une partie des textes", price: 50 },
  { id: "aide", label: "J’ai besoin d’aide pour rédiger les textes", price: 100 }
];

const SEOS = [
  { id: "base", label: "SEO de base", text: "Titres clairs, site rapide, version mobile. Inclus.", price: 0 },
  { id: "avance", label: "SEO avancé", text: "Un travail plus poussé sur les textes et la structure, toujours sans promesse de classement.", price: 150 }
];

const IMAGES = [
  { id: "fournies", label: "Je fournis mes photos", price: 0 },
  { id: "manque", label: "Il me manque quelques images", price: 50 },
  { id: "webly", label: "Webly recherche et sélectionne les images", price: 50 }
];

const LOGOS = [
  { id: "existant", label: "J’ai déjà un logo", price: 0 },
  { id: "simple", label: "Création d’un logo simple", price: 100 },
  { id: "amelio", label: "Amélioration de mon logo", price: 75 },
  { id: "identite", label: "Création d’une identité visuelle", price: 100 }
];

const DOMAINS = [
  { id: "deja", label: "J’ai déjà mon nom de domaine", note: "0 €" },
  { id: "webly", label: "Webly s’en occupe", note: "Prix communiqué séparément" }
];

const HOSTS = [
  { id: "deja", label: "J’ai déjà mon hébergement", note: "0 €" },
  { id: "webly", label: "Webly s’en occupe", note: "Abonnement séparé" }
];

const MAINTS = [
  {
    id: "sans",
    label: "Sans maintenance",
    monthly: 0,
    text: "Vous gérez la suite vous-même. Le nom de domaine et l’hébergement restent à votre charge, chaque année."
  },
  {
    id: "essentielle",
    label: "Maintenance Essentielle",
    monthly: 29,
    text: "Hébergement, sauvegardes, mises à jour, petites modifications, assistance."
  },
  {
    id: "plus",
    label: "Maintenance Plus",
    monthly: 49,
    text: "Tout ce qui est dans Essentielle, davantage de modifications, assistance prioritaire, surveillance du site."
  }
];

const defaultState = () => ({
  company: { name: "", sector: "", city: "", about: "" },
  siteType: "vitrine",
  pageRange: "1-3",
  pages: ["accueil", "apropos", "services", "contact"],
  design: "essentiel",
  features: ["formulaire"],
  texts: "tous",
  seo: "base",
  images: "fournies",
  logo: "existant",
  domain: "deja",
  hosting: "deja",
  maintenance: "sans",
  contact: { first: "", last: "", company: "", email: "", phone: "", consent: false }
});

let state = loadState();
let step = 1;
let phase = "wizard";
let error = "";

function loadState() {
  try {
    const raw = sessionStorage.getItem(CFG_KEY);
    if (!raw) return defaultState();
    return { ...defaultState(), ...JSON.parse(raw) };
  } catch {
    return defaultState();
  }
}

function saveState() {
  try {
    sessionStorage.setItem(CFG_KEY, JSON.stringify(state));
  } catch {
    /* privé */
  }
}

function euro(n) {
  return `${new Intl.NumberFormat("fr-FR").format(n)} €`;
}

function find(list, id) {
  return list.find((item) => item.id === id);
}

function rangeFromCount(count) {
  if (count > 12) return "12+";
  if (count <= 3) return "1-3";
  return PAGE_RANGES.find((range) => count >= range.min && count <= range.max)?.id || "1-3";
}

function quote(result) {
  return Boolean(result.quote);
}

function compute() {
  const lines = [];
  const reasons = [];
  let total = 0;
  let monthly = 0;

  const site = find(SITE_TYPES, state.siteType) || SITE_TYPES[0];
  if (site.price == null) {
    reasons.push("projet spécifique");
    lines.push({ label: site.label, amount: null });
  } else {
    total += site.price;
    lines.push({ label: site.label, amount: site.price });
  }

  const selectedPages = uniquePages();
  const count = selectedPages.length;
  const extraCount = EXTRA_PAGES.filter((page) => selectedPages.includes(page.id)).length;
  const range = state.pageRange === "12+"
    ? find(PAGE_RANGES, "12+")
    : extraCount === 0
      ? find(PAGE_RANGES, "1-3")
      : find(PAGE_RANGES, rangeFromCount(count));
  if (range.extra == null) {
    reasons.push("plus de 12 pages");
    lines.push({ label: range.label, amount: null });
  } else if (range.extra > 0) {
    total += range.extra;
    lines.push({ label: range.label, amount: range.extra });
  }

  EXTRA_PAGES.forEach((page) => {
    if (!selectedPages.includes(page.id)) return;
    total += page.price;
    lines.push({ label: page.label, amount: page.price });
  });

  const design = find(DESIGNS, state.design);
  if (design.price > 0) {
    total += design.price;
    lines.push({ label: design.label, amount: design.price });
  }

  const featureIds = new Set(state.features);
  if (featureIds.has("filtres")) featureIds.delete("galerie");
  FEATURES.forEach((feature) => {
    if (feature.id === "formulaire") return;
    if (!featureIds.has(feature.id)) return;
    if (feature.price == null) {
      reasons.push("fonctionnalité spécifique");
      lines.push({ label: feature.label, amount: null });
      return;
    }
    total += feature.price;
    lines.push({ label: feature.label, amount: feature.price });
  });

  const texts = find(TEXTS, state.texts);
  if (texts.price > 0) {
    total += texts.price;
    lines.push({ label: texts.label, amount: texts.price });
  }

  const seo = find(SEOS, state.seo);
  if (seo.price > 0) {
    total += seo.price;
    lines.push({ label: seo.label, amount: seo.price });
  }

  const images = find(IMAGES, state.images);
  if (images.price > 0) {
    total += images.price;
    lines.push({ label: images.label, amount: images.price });
  }

  const logo = find(LOGOS, state.logo);
  if (logo.price > 0) {
    total += logo.price;
    lines.push({ label: logo.label, amount: logo.price });
  }

  const maint = find(MAINTS, state.maintenance);
  monthly = maint.monthly;

  return {
    total,
    monthly,
    quote: reasons.length > 0,
    reasons,
    lines,
    site: site.label,
    pages: count,
    range: range.label,
    design: design.label,
    features: Math.max(featureIds.size, 1),
    domain: find(DOMAINS, state.domain).label,
    hosting: find(HOSTS, state.hosting).label,
    maintenance: maint.label
  };
}

function uniquePages() {
  const included = INCLUDED_PAGES
    .filter((page) => page.locked || state.pages.includes(page.id))
    .map((page) => page.id);
  const extra = EXTRA_PAGES.map((page) => page.id).filter((id) => state.pages.includes(id));
  return [...new Set([...included, ...extra])];
}

function pickRadio(name, items, selected) {
  return items.map((item) => {
    let price = "";
    if (item.priceLabel) price = item.priceLabel;
    else if (item.note) price = item.note;
    else if (item.monthly > 0) price = `${item.monthly} €/mois`;
    else if (name === "maintenance" && item.monthly === 0) price = "0 €/mois";
    else if (item.price === 0) price = "+0 €";
    else if (typeof item.price === "number") price = `+${item.price} €`;
    return `
    <label class="cfg-pick">
      <input type="radio" name="${name}" value="${item.id}" ${selected === item.id ? "checked" : ""}>
      <strong>${item.label}</strong>
      ${item.text ? `<p>${item.text}</p>` : ""}
      ${price ? `<span class="cfg-price ${item.extra === 0 || item.price === 0 || item.monthly === 0 ? "cfg-included" : ""}">${price}</span>` : ""}
    </label>
  `;
  }).join("");
}

function pickChecks(name, items, selected, lockedIds = []) {
  return items.map((item) => {
    const on = selected.includes(item.id) || item.locked;
    const locked = lockedIds.includes(item.id) || item.locked;
    const price = item.price == null ? "Devis personnalisé" : item.price === 0 ? "Inclus" : `+${item.price} €`;
    return `
      <label class="cfg-pick">
        <input type="checkbox" name="${name}" value="${item.id}" ${on ? "checked" : ""} ${locked ? "disabled" : ""}>
        <strong>${item.label}</strong>
        ${item.hint || item.text ? `<p>${item.hint || item.text}</p>` : ""}
        <span class="cfg-price ${item.price === 0 ? "cfg-included" : ""}">${price}</span>
      </label>
    `;
  }).join("");
}

function renderStep() {
  if (step === 1) {
    const c = state.company;
    return `
      <h2>Parlons un peu de votre entreprise</h2>
      <p class="cfg-lead">Ces informations nous permettent de mieux comprendre votre projet.</p>
      <div class="cfg-fields">
        <div class="form-row">
          <label for="cfg-name">Nom de l’entreprise</label>
          <input id="cfg-name" data-company="name" type="text" autocomplete="organization" value="${escapeAttr(c.name)}" required>
        </div>
        <div class="form-row">
          <label for="cfg-sector">Secteur d’activité</label>
          <input id="cfg-sector" data-company="sector" type="text" value="${escapeAttr(c.sector)}" placeholder="Artisanat, restaurant, services…">
        </div>
        <div class="form-row">
          <label for="cfg-city">Ville</label>
          <input id="cfg-city" data-company="city" type="text" value="${escapeAttr(c.city)}" autocomplete="address-level2">
        </div>
        <div class="form-row">
          <label for="cfg-about">Décrivez votre activité en quelques mots</label>
          <textarea id="cfg-about" data-company="about">${escapeHtml(c.about)}</textarea>
        </div>
      </div>
    `;
  }

  if (step === 2) {
    return `
      <h2>Quel type de site souhaitez-vous ?</h2>
      <p class="cfg-lead">Choisissez la formule la plus proche. On pourra affiner ensuite.</p>
      <div class="cfg-grid">${pickRadio("siteType", SITE_TYPES, state.siteType)}</div>
    `;
  }

  if (step === 3) {
    return `
      <h2>Combien de pages souhaitez-vous ?</h2>
      <p class="cfg-lead">Une page correspond à une section accessible avec sa propre adresse, par exemple Accueil, Services ou Contact.</p>
      <div class="cfg-grid">${pickRadio("pageRange", PAGE_RANGES, state.pageRange)}</div>
    `;
  }

  if (step === 4) {
    return `
      <h2>Quelles pages souhaitez-vous sur votre site ?</h2>
      <p class="cfg-lead">Accueil et À propos sont toujours là, offertes. Services et Contact aussi, si vous les cochez. Seules les pages supplémentaires s’ajoutent au prix.</p>
      <div class="cfg-group">
        <h3>Pages incluses</h3>
        <div class="cfg-grid cfg-grid-2">${pickChecks("pages", INCLUDED_PAGES, state.pages)}</div>
      </div>
      <div class="cfg-group">
        <h3>Pages supplémentaires</h3>
        <div class="cfg-grid cfg-grid-2">${pickChecks("pages", EXTRA_PAGES, state.pages)}</div>
      </div>
    `;
  }

  if (step === 5) {
    return `
      <h2>Quel style souhaitez-vous ?</h2>
      <p class="cfg-lead">Les trois restent professionnels. La différence, c’est le niveau de travail visuel.</p>
      <div class="cfg-grid">${pickRadio("design", DESIGNS, state.design)}</div>
    `;
  }

  if (step === 6) {
    return `
      <h2>Que souhaitez-vous ajouter à votre site ?</h2>
      <p class="cfg-lead">Le formulaire de contact est toujours inclus. Cochez seulement ce dont vous avez vraiment besoin.</p>
      <div class="cfg-grid">${pickChecks("features", FEATURES, state.features, ["formulaire"])}</div>
    `;
  }

  if (step === 7) {
    return `
      <h2>Avez-vous déjà votre contenu ?</h2>
      <div class="cfg-group">
        <h3>Textes</h3>
        <div class="cfg-grid">${pickRadio("texts", TEXTS, state.texts)}</div>
      </div>
      <div class="cfg-group">
        <h3>SEO</h3>
        <p class="cfg-lead">Le SEO aide les moteurs de recherche comme Google à mieux comprendre votre site. Cela n’assure pas d’être premier sur Google.</p>
        <div class="cfg-grid">${pickRadio("seo", SEOS, state.seo)}</div>
      </div>
    `;
  }

  if (step === 8) {
    return `
      <h2>Et pour les images et votre identité visuelle ?</h2>
      <div class="cfg-group">
        <h3>Images</h3>
        <div class="cfg-grid">${pickRadio("images", IMAGES, state.images)}</div>
      </div>
      <div class="cfg-group">
        <h3>Logo</h3>
        <div class="cfg-grid">${pickRadio("logo", LOGOS, state.logo)}</div>
      </div>
    `;
  }

  return `
    <h2>Et après la création ?</h2>
    <p class="cfg-lead">Créer le site et le garder en ligne sont deux choses différentes. Le nom de domaine se paie à part, chaque année.</p>
    <div class="cfg-group">
      <h3>Nom de domaine</h3>
      <div class="cfg-grid">${pickRadio("domain", DOMAINS, state.domain)}</div>
    </div>
    <div class="cfg-group">
      <h3>Hébergement</h3>
      <div class="cfg-grid">${pickRadio("hosting", HOSTS, state.hosting)}</div>
    </div>
    <div class="cfg-group">
      <h3>Maintenance</h3>
      <div class="cfg-grid">${pickRadio("maintenance", MAINTS, state.maintenance)}</div>
    </div>
  `;
}

function renderReview() {
  const result = compute();
  const rows = result.lines.map((line) => `
    <li><span>${line.label}</span><strong>${line.amount == null ? "Sur devis" : line.amount === 0 ? "Inclus" : euro(line.amount)}</strong></li>
  `).join("");
  const total = result.quote
    ? `<li class="cfg-review-total"><span>Estimation</span><strong>À valider avec Webly</strong></li>`
    : `<li class="cfg-review-total"><span>Estimation</span><strong>${euro(result.total)}</strong></li>`;
  const monthly = result.monthly
    ? `<li><span>Maintenance</span><strong>${euro(result.monthly)} / mois</strong></li>`
    : "";

  return `
    <h2>Votre projet est prêt</h2>
    <p class="cfg-lead">Voici une première estimation basée sur les options que vous avez sélectionnées.</p>
    <div class="cfg-review">
      <ul>
        ${rows}
        ${monthly}
        ${total}
      </ul>
    </div>
    <p class="cfg-note">Cette estimation n’est pas un devis définitif. Webly vérifie votre projet avant de confirmer le prix final.</p>
  `;
}

function renderDetails() {
  const c = state.contact;
  if (!c.company && state.company.name) c.company = state.company.name;
  return `
    <h2>Vos coordonnées</h2>
    <p class="cfg-lead">Pour vous renvoyer le devis. Rien n’est débité à cette étape.</p>
    <div class="cfg-fields">
      <div class="form-split">
        <div class="form-row">
          <label for="cfg-first">Prénom</label>
          <input id="cfg-first" data-contact="first" type="text" autocomplete="given-name" value="${escapeAttr(c.first)}">
        </div>
        <div class="form-row">
          <label for="cfg-last">Nom</label>
          <input id="cfg-last" data-contact="last" type="text" autocomplete="family-name" value="${escapeAttr(c.last)}">
        </div>
      </div>
      <div class="form-row">
        <label for="cfg-co">Nom de l’entreprise</label>
        <input id="cfg-co" data-contact="company" type="text" autocomplete="organization" value="${escapeAttr(c.company)}">
      </div>
      <div class="form-row">
        <label for="cfg-email">E-mail</label>
        <input id="cfg-email" data-contact="email" type="email" autocomplete="email" value="${escapeAttr(c.email)}">
      </div>
      <div class="form-row">
        <label for="cfg-phone">Téléphone</label>
        <input id="cfg-phone" data-contact="phone" type="tel" autocomplete="tel" value="${escapeAttr(c.phone)}">
      </div>
      <label class="cfg-consent">
        <input type="checkbox" data-contact="consent" ${c.consent ? "checked" : ""}>
        <span>Souhaitez-vous être recontacté par Webly au sujet de ce projet&nbsp;?</span>
      </label>
    </div>
  `;
}

function renderThanks() {
  return `
    <div class="cfg-thanks">
      <h2>Projet envoyé !</h2>
      <p class="cfg-lead">Merci pour votre demande. Webly va maintenant vérifier les informations de votre projet. Nous vous contacterons ensuite pour confirmer votre projet et vous transmettre le devis final.</p>
      <ol class="cfg-flow">
        <li>Projet envoyé</li>
        <li>Vérification Webly</li>
        <li>Devis final</li>
        <li>Validation</li>
        <li>Paiement</li>
        <li>Création du site</li>
      </ol>
      <p class="cfg-nav"><a class="btn btn-ghost" href="index.html">Retour à l’accueil</a></p>
    </div>
  `;
}

function recapHtml() {
  const result = compute();
  const price = result.quote
    ? `<p class="cfg-quote">Projet nécessitant une validation personnalisée</p>`
    : `<strong>${euro(result.total)}</strong>${result.monthly ? `<small>Maintenance : ${euro(result.monthly)} / mois</small>` : ""}`;
  return `
    <h2>Votre projet</h2>
    <dl>
      <div><dt>Site</dt><dd>${result.site}</dd></div>
      <div><dt>Pages</dt><dd>${result.pages}</dd></div>
      <div><dt>Design</dt><dd>${result.design.replace(/^Design\s+/, "").replace(/^./, (letter) => letter.toUpperCase())}</dd></div>
      <div><dt>Fonctionnalités</dt><dd>${result.features}</dd></div>
    </dl>
    <div class="cfg-total">${price}</div>
  `;
}

function navLabel() {
  if (phase === "review") return "Continuer vers mes coordonnées →";
  if (phase === "details") return "Envoyer mon projet à Webly →";
  if (step === 9) return "Voir l’estimation →";
  return "Continuer →";
}

function render() {
  const app = document.getElementById("cfg-app");
  if (!app) return;
  const result = compute();
  const showWizardChrome = phase === "wizard";
  const hideRecap = phase === "done";

  let body = "";
  if (phase === "wizard") body = `<div class="cfg-step">${renderStep()}</div>`;
  if (phase === "review") body = `<div class="cfg-step">${renderReview()}</div>`;
  if (phase === "details") body = `<div class="cfg-step">${renderDetails()}</div>`;
  if (phase === "done") body = renderThanks();

  const back = phase === "wizard" && step === 1
    ? `<a class="btn btn-ghost" href="index.html#tarifs">Retour</a>`
    : phase === "done"
      ? ""
      : `<button class="btn btn-ghost" type="button" data-back>Retour</button>`;

  const next = phase === "done"
    ? ""
    : `<button class="btn btn-primary" type="button" data-next>${navLabel()}</button>`;

  app.innerHTML = `
    <div class="cfg-layout">
      <div class="cfg-main">
        <p class="kicker cfg-kicker">Créons votre site</p>
        ${showWizardChrome ? `
          <div class="cfg-progress">
            <div class="cfg-progress-label">
              <span>Étape ${step} sur 9</span>
              <span>${Math.round((step / 9) * 100)}&nbsp;%</span>
            </div>
            <div class="cfg-bar" aria-hidden="true"><span style="width:${(step / 9) * 100}%"></span></div>
          </div>
        ` : ""}
        ${body}
        ${error ? `<p class="cfg-error">${error}</p>` : ""}
        <div class="cfg-nav">${back}${next}</div>
      </div>
      ${hideRecap ? "" : `<aside class="cfg-aside">${recapHtml()}</aside>`}
    </div>
    ${hideRecap ? "" : `
      <div class="cfg-dock" aria-live="polite">
        <div>
          <span>Votre projet</span>
          <strong>${result.quote ? "Sur devis" : euro(result.total)}</strong>
        </div>
      </div>
    `}
  `;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/"/g, "&quot;");
}

function readFields(root) {
  root.querySelectorAll("[data-company]").forEach((field) => {
    state.company[field.getAttribute("data-company")] = field.value;
  });
  root.querySelectorAll("[data-contact]").forEach((field) => {
    const key = field.getAttribute("data-contact");
    state.contact[key] = field.type === "checkbox" ? field.checked : field.value;
  });
  const siteType = root.querySelector("[name=siteType]:checked");
  if (siteType) state.siteType = siteType.value;
  const pageRange = root.querySelector("[name=pageRange]:checked");
  if (pageRange) state.pageRange = pageRange.value;
  const design = root.querySelector("[name=design]:checked");
  if (design) state.design = design.value;
  const texts = root.querySelector("[name=texts]:checked");
  if (texts) state.texts = texts.value;
  const seo = root.querySelector("[name=seo]:checked");
  if (seo) state.seo = seo.value;
  const images = root.querySelector("[name=images]:checked");
  if (images) state.images = images.value;
  const logo = root.querySelector("[name=logo]:checked");
  if (logo) state.logo = logo.value;
  const domain = root.querySelector("[name=domain]:checked");
  if (domain) state.domain = domain.value;
  const hosting = root.querySelector("[name=hosting]:checked");
  if (hosting) state.hosting = hosting.value;
  const maintenance = root.querySelector("[name=maintenance]:checked");
  if (maintenance) state.maintenance = maintenance.value;

  const pageBoxes = [...root.querySelectorAll("[name=pages]")];
  if (pageBoxes.length) {
    state.pages = pageBoxes.filter((box) => box.checked).map((box) => box.value);
    if (!state.pages.includes("accueil")) state.pages.unshift("accueil");
    if (!state.pages.includes("apropos")) state.pages.splice(1, 0, "apropos");
    if (state.pageRange !== "12+") {
      state.pageRange = rangeFromCount(uniquePages().length);
    }
  }

  const featureBoxes = [...root.querySelectorAll("[name=features]")];
  if (featureBoxes.length) {
    const picked = featureBoxes.filter((box) => box.checked || box.disabled).map((box) => box.value);
    state.features = ["formulaire", ...picked.filter((id) => id !== "formulaire")];
    if (state.features.includes("filtres")) {
      state.features = state.features.filter((id) => id !== "galerie");
    }
  }

  saveState();
}

function validate() {
  if (phase === "wizard" && step === 1) {
    if (!state.company.name.trim() || !state.company.sector.trim() || !state.company.city.trim() || !state.company.about.trim()) {
      return "Indiquez le nom, le secteur, la ville et quelques mots sur votre activité.";
    }
  }
  if (phase === "wizard" && step === 4 && uniquePages().length < 1) {
    return "Choisissez au moins une page.";
  }
  if (phase === "details") {
    if (!state.contact.first.trim() || !state.contact.last.trim() || !state.contact.email.trim()) {
      return "Indiquez votre prénom, votre nom et votre e-mail.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.contact.email)) {
      return "L’e-mail n’est pas valide.";
    }
    if (!state.contact.consent) {
      return "Cochez la case si vous souhaitez être recontacté au sujet de ce projet.";
    }
  }
  return "";
}

function goNext() {
  error = validate();
  if (error) {
    render();
    return;
  }
  if (phase === "wizard") {
    if (step < 9) {
      step += 1;
    } else {
      phase = "review";
    }
  } else if (phase === "review") {
    phase = "details";
  } else if (phase === "details") {
    sendProject();
    return;
  }
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goBack() {
  error = "";
  if (phase === "details") {
    phase = "review";
  } else if (phase === "review") {
    phase = "wizard";
    step = 9;
  } else if (step > 1) {
    step -= 1;
  }
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function lineAmount(amount) {
  if (amount == null) return "sur devis";
  if (amount === 0) return "offert";
  return euro(amount);
}

function projectMessage(result) {
  const pages = uniquePages();
  const included = INCLUDED_PAGES.filter((page) => pages.includes(page.id));
  const extras = EXTRA_PAGES.filter((page) => pages.includes(page.id));
  const feats = FEATURES.filter((feature) => state.features.includes(feature.id));
  const detail = result.lines
    .map((line) => `  - ${line.label} : ${lineAmount(line.amount)}`)
    .join("\n");

  return [
    "Nouveau projet configuré",
    "À vérifier avant d’envoyer le devis au client.",
    "",
    result.quote
      ? "ESTIMATION : à valider (pas de prix automatique)"
      : `ESTIMATION : ${euro(result.total)}`,
    result.monthly ? `Maintenance : ${euro(result.monthly)} / mois` : "Maintenance : aucune",
    "",
    "— Client —",
    `Nom : ${state.contact.first} ${state.contact.last}`,
    `Entreprise : ${state.contact.company || state.company.name}`,
    `E-mail : ${state.contact.email}`,
    `Téléphone : ${state.contact.phone || "non renseigné"}`,
    "",
    "— Entreprise —",
    `Nom : ${state.company.name}`,
    `Secteur : ${state.company.sector}`,
    `Ville : ${state.company.city}`,
    `Activité : ${state.company.about}`,
    "",
    "— Site —",
    `Type : ${result.site}`,
    `Nombre de pages : ${result.pages} (${result.range})`,
    `Design : ${result.design}`,
    "",
    "— Pages incluses (offertes) —",
    ...included.map((page) => `  - ${page.label}`),
    ...(extras.length
      ? ["", "— Pages supplémentaires —", ...extras.map((page) => `  - ${page.label} : ${euro(page.price)}`)]
      : []),
    "",
    "— Fonctionnalités —",
    ...feats.map((feature) => {
      const price = feature.price == null ? "sur devis" : feature.price === 0 ? "inclus" : euro(feature.price);
      return `  - ${feature.label} : ${price}`;
    }),
    "",
    "— Contenu et identité —",
    `Textes : ${find(TEXTS, state.texts).label}`,
    `SEO : ${find(SEOS, state.seo).label}`,
    `Images : ${find(IMAGES, state.images).label}`,
    `Logo : ${find(LOGOS, state.logo).label}`,
    "",
    "— Après la mise en ligne —",
    `Nom de domaine : ${result.domain}`,
    `Hébergement : ${result.hosting}`,
    `Maintenance : ${result.maintenance}${result.monthly ? ` (${euro(result.monthly)} / mois)` : ""}`,
    "",
    "— Détail du prix —",
    detail,
    "",
    result.quote
      ? "Total : à chiffrer avec le client"
      : `Total estimé : ${euro(result.total)}`,
    "Ce montant n’est pas le devis définitif."
  ].join("\n");
}

async function sendProject() {
  const next = document.querySelector("[data-next]");
  if (next) {
    next.disabled = true;
    next.textContent = "Envoi en cours…";
  }
  const result = compute();
  const company = state.contact.company || state.company.name;
  const priceBit = result.quote ? "à valider" : euro(result.total);
  const payload = {
    access_key: WEBLY_FORM_ACCESS_KEY,
    subject: `Projet configuré — ${company} — ${priceBit}`,
    from_name: `${state.contact.first} ${state.contact.last}`,
    replyto: state.contact.email,
    name: `${state.contact.first} ${state.contact.last}`,
    email: state.contact.email,
    entreprise: company,
    telephone: state.contact.phone || "non renseigné",
    estimation: result.quote ? "À valider (pas de prix automatique)" : euro(result.total),
    maintenance: result.monthly ? `${euro(result.monthly)} / mois` : "Aucune",
    type_de_site: result.site,
    message: projectMessage(result)
  };

  try {
    if (!WEBLY_FORM_ACCESS_KEY) throw new Error("no-key");
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok || data.success === false) throw new Error("fail");
    try { sessionStorage.removeItem(CFG_KEY); } catch (e) {}
    phase = "done";
    error = "";
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch {
    error = "L’envoi n’a pas abouti. Écrivez-nous à webly.contact0@gmail.com.";
    render();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("cfg-app");
  if (!app) return;
  render();

  app.addEventListener("change", (event) => {
    readFields(app);
    if (event.target.matches("[name=siteType], [name=pageRange], [name=pages], [name=design], [name=features], [name=texts], [name=seo], [name=images], [name=logo], [name=domain], [name=hosting], [name=maintenance]")) {
      error = "";
      render();
    }
  });

  app.addEventListener("input", (event) => {
    if (!event.target.matches("input, textarea")) return;
    readFields(app);
  });

  app.addEventListener("click", (event) => {
    if (event.target.closest("[data-next]")) {
      readFields(app);
      goNext();
    }
    if (event.target.closest("[data-back]")) {
      readFields(app);
      goBack();
    }
  });
});
