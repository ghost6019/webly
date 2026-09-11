/* ============================================
   Webly — interactions
   Tarifs : WEBLY_PRICES (from, pages, maintenance).
   Formulaire : envoi direct vers WEBLY_CONTACT_EMAIL via Web3Forms.
   ============================================ */

const WEBLY_PRICES = {
  from: "499 €",
  pages: "799 €",
  maintenance: "29 €"
};

const WEBLY_CONTACT_EMAIL = "webly.contact0@gmail.com";

/* Clé Web3Forms (gratuite) : https://web3forms.com — e-mail webly.contact0@gmail.com */
const WEBLY_FORM_ACCESS_KEY = "ee658343-82c9-4e0e-aef6-bc32fd9ba5d2";

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
    if (!target || !value) return;
    if (key === "maintenance") {
      target.innerHTML = `${value}<small>/mois</small>`;
    } else {
      target.textContent = value;
    }
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

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 761px)").matches) close();
  });
}

function initReveal() {
  const nodes = document.querySelectorAll(
    ".card, .audience-card, .audience-item, .timeline-item, .project-card, .price-card, .compare-card, .faq-item, .trust-item, .maintenance"
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
  document.querySelectorAll(".js-webly-form").forEach(bindWeblyForm);
}

function serializeForm(form) {
  const acc = {};
  for (const [key, value] of new FormData(form).entries()) {
    if (key === "botcheck") continue;
    if (Object.prototype.hasOwnProperty.call(acc, key)) {
      const cur = acc[key];
      acc[key] = Array.isArray(cur) ? cur.concat(value) : [cur, value];
    } else {
      acc[key] = value;
    }
  }
  Object.keys(acc).forEach((key) => {
    if (Array.isArray(acc[key])) acc[key] = acc[key].join(", ");
  });
  return acc;
}

function bindWeblyForm(form) {
  const status = form.querySelector(".form-status");
  const submit = form.querySelector("[type='submit']");
  if (!status) return;

  const note = form.querySelector(".form-note");
  if (note && !WEBLY_FORM_ACCESS_KEY) {
    note.innerHTML = `En attendant l’activation de l’envoi direct, votre messagerie s’ouvre avec le message déjà prêt pour <a href="mailto:${WEBLY_CONTACT_EMAIL}">${WEBLY_CONTACT_EMAIL}</a>. Voir la <a href="politique-confidentialite.html">politique de confidentialité</a>.`;
  }

  const subject = form.getAttribute("data-subject") || "Demande de devis — Webly";
  const okMessage = form.getAttribute("data-ok") || "Message envoyé. Nous vous répondons par e-mail, en général sous 24 à 48 h.";
  const submitLabel = submit ? submit.textContent : "Envoyer →";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "";
    status.className = "form-status";

    const required = [...form.querySelectorAll("[required]")];
    let valid = true;
    const radioSeen = new Set();

    required.forEach((field) => {
      if (field.type === "radio") {
        if (radioSeen.has(field.name)) return;
        radioSeen.add(field.name);
        const ok = Boolean(form.querySelector(`input[name="${field.name}"]:checked`));
        form.querySelectorAll(`input[name="${field.name}"]`).forEach((radio) => {
          radio.closest("label")?.classList.toggle("is-invalid", !ok);
        });
        if (!ok) valid = false;
        return;
      }
      if (field.type === "checkbox") {
        const ok = field.checked;
        field.classList.toggle("is-invalid", !ok);
        if (!ok) valid = false;
        return;
      }
      const ok = Boolean(String(field.value).trim());
      field.classList.toggle("is-invalid", !ok);
      if (!ok) valid = false;
    });

    const email = form.querySelector("input[type='email']");
    if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.classList.add("is-invalid");
      valid = false;
    }

    if (!valid) {
      status.textContent = "Merci de compléter les champs obligatoires.";
      status.classList.add("is-error");
      return;
    }

    const data = serializeForm(form);
    if (new FormData(form).get("botcheck")) return;

    if (WEBLY_FORM_ACCESS_KEY) {
      if (submit) {
        submit.disabled = true;
        submit.textContent = "Envoi en cours…";
      }
      try {
        const payload = {
          access_key: WEBLY_FORM_ACCESS_KEY,
          subject,
          from_name: "Site Webly",
          ...data
        };
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(payload)
        });
        const result = await response.json();
        if (!response.ok || result.success === false) {
          throw new Error(result.message || "envoi impossible");
        }
        form.reset();
        status.textContent = okMessage;
        status.classList.add("is-ok");
      } catch (err) {
        status.textContent = "L’envoi n’a pas abouti. Écrivez-nous directement à webly.contact0@gmail.com.";
        status.classList.add("is-error");
      } finally {
        if (submit) {
          submit.disabled = false;
          submit.textContent = submitLabel;
        }
      }
      return;
    }

    const body = Object.entries(data)
      .map(([key, value]) => `${key} : ${value}`)
      .join("\n");
    window.location.href = `mailto:${WEBLY_CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = "Votre messagerie s’ouvre. Cliquez sur Envoyer pour que le message parte vers webly.contact0@gmail.com.";
    status.classList.add("is-ok");
  });
}
