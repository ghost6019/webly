/* ============================================
   Webly — interactions
   Tarifs : renseignez WEBLY_PRICES pour afficher
   un montant (ex. "1 200 €"). Laissez null pour
   conserver « prix à définir ».
   Formulaire : ouvre un e-mail prérempli vers WEBLY_CONTACT_EMAIL.
   ============================================ */

const WEBLY_PRICES = {
  essentiel: null,
  professionnel: null,
  surmesure: null
};

const WEBLY_CONTACT_EMAIL = "webly.contact0@gmail.com";

document.addEventListener("DOMContentLoaded", () => {
  applyPrices();
  initHeader();
  initNav();
  initReveal();
  initActiveNav();
  initForm();
});

function applyPrices() {
  document.querySelectorAll("[data-plan]").forEach((el) => {
    const key = el.getAttribute("data-plan");
    const value = WEBLY_PRICES[key];
    const target = el.querySelector(".price-value");
    if (target && value) target.textContent = value;
  });
}

function initHeader() {
  const header = document.getElementById("entete");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("nav");
  if (!toggle || !nav) return;

  const close = () => {
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Ouvrir le menu");
  };

  toggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", close);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
}

function initReveal() {
  const nodes = document.querySelectorAll(
    ".card, .audience-card, .timeline-item, .project-card, .price-card, .compare-card, .faq-item, .trust-item"
  );

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const show = (node) => node.classList.add("is-visible");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        show(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
  );

  nodes.forEach((node, index) => {
    node.classList.add("reveal-pending");
    node.style.transitionDelay = `${(index % 4) * 50}ms`;
    observer.observe(node);
  });

  setTimeout(() => nodes.forEach(show), 1800);
}

function initActiveNav() {
  const links = [...document.querySelectorAll(".nav-list a")];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        links.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === id);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

function initForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form || !status) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.textContent = "";
    status.className = "form-status";

    const required = [...form.querySelectorAll("[required]")];
    let valid = true;

    required.forEach((field) => {
      const ok = Boolean(String(field.value).trim());
      field.classList.toggle("is-invalid", !ok);
      if (!ok) valid = false;
    });

    const email = form.querySelector("#email");
    if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.classList.add("is-invalid");
      valid = false;
    }

    if (!valid) {
      status.textContent = "Merci de compléter les champs obligatoires.";
      status.classList.add("is-error");
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    const body = [
      `Nom : ${data.name || ""}`,
      `Entreprise : ${data.entreprise || "—"}`,
      `E-mail : ${data.email || ""}`,
      `Téléphone : ${data.telephone || "—"}`,
      `Activité : ${data.activite || "—"}`,
      `Projet : ${data.projet || "—"}`,
      `Budget : ${data.budget || "—"}`,
      "",
      "Message :",
      data.message || ""
    ].join("\n");

    const mailto = `mailto:${WEBLY_CONTACT_EMAIL}?subject=${encodeURIComponent("Demande de devis — Webly")}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    status.textContent = "Votre messagerie s’ouvre. Cliquez sur Envoyer pour que le message parte vers webly.contact0@gmail.com.";
    status.classList.add("is-ok");
  });
}
