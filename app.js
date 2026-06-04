const translations = {
  es: {
    brand: "En venta",
    eyebrow: "Entrega o recogida a coordinar",
    heroTitle: "Cosas personales en venta, listas para coordinar.",
    heroText: "Muebles, hogar y organizacion en buen estado. Pregunta por WhatsApp y coordinamos la mejor forma de entrega.",
    seeProducts: "Ver productos",
    askWhatsapp: "Preguntar por WhatsApp",
    catalogEyebrow: "Catalogo actualizado",
    catalogTitle: "Disponibles ahora",
    available: "Disponible",
    sold: "Vendido",
    reserve: "Me interesa",
    originalPost: "Ver anuncio",
    footerNote: "Venta privada. Entrega o recogida segun el articulo.",
    pagesReady: "Listo para GitHub Pages",
    generalMessage: "Hola, vi tu pagina de cosas en venta y quiero hacer una consulta.",
    productMessage: "Hola, me interesa: {title}. ¿Sigue disponible?",
  },
  en: {
    brand: "For sale",
    eyebrow: "Delivery or pickup to arrange",
    heroTitle: "Personal items for sale, ready to arrange.",
    heroText: "Furniture, household items and storage pieces in good condition. Message me on WhatsApp and we can arrange the best handover option.",
    seeProducts: "See products",
    askWhatsapp: "Ask on WhatsApp",
    catalogEyebrow: "Updated catalog",
    catalogTitle: "Available now",
    available: "Available",
    sold: "Sold",
    reserve: "I'm interested",
    originalPost: "View listing",
    footerNote: "Private sale. Delivery or pickup depends on the item.",
    pagesReady: "Ready for GitHub Pages",
    generalMessage: "Hi, I saw your sale page and would like to ask a question.",
    productMessage: "Hi, I'm interested in: {title}. Is it still available?",
  },
  de: {
    brand: "Zu verkaufen",
    eyebrow: "Uebergabe oder Abholung abstimmen",
    heroTitle: "Private Sachen zu verkaufen, bereit zur Abstimmung.",
    heroText: "Moebel, Haushalt und Aufbewahrung in gutem Zustand. Schreib mir per WhatsApp, dann stimmen wir die beste Uebergabe ab.",
    seeProducts: "Produkte ansehen",
    askWhatsapp: "Per WhatsApp fragen",
    catalogEyebrow: "Aktueller Katalog",
    catalogTitle: "Jetzt verfuegbar",
    available: "Verfuegbar",
    sold: "Verkauft",
    reserve: "Ich habe Interesse",
    originalPost: "Anzeige ansehen",
    footerNote: "Privatverkauf. Uebergabe oder Abholung je nach Artikel.",
    pagesReady: "Bereit fuer GitHub Pages",
    generalMessage: "Hallo, ich habe deine Verkaufsseite gesehen und moechte etwas fragen.",
    productMessage: "Hallo, ich interessiere mich fuer: {title}. Ist es noch verfuegbar?",
  },
};

const state = {
  lang: localStorage.getItem("saleLanguage") || detectLanguage(),
};

const whatsappIcon = `
  <svg class="whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7l-1 3.6 3.7-1a8.4 8.4 0 1 0 4.5-15.3Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M9.1 8.5c-.2.4-.4.7-.4 1.2 0 2.2 2.8 5.1 5.3 5.1.5 0 .9-.1 1.3-.4.3-.2.5-.8.6-1.1.1-.2 0-.4-.2-.5l-1.5-.7c-.2-.1-.4-.1-.6.1l-.5.6c-.1.2-.3.2-.5.1-1-.4-1.9-1.2-2.4-2.2-.1-.2-.1-.4.1-.5l.5-.5c.2-.2.2-.4.1-.6l-.7-1.5c-.1-.2-.3-.3-.5-.3-.2 0-.5.1-.6.2Z" fill="currentColor"/>
  </svg>
`;

function detectLanguage() {
  const browserLang = navigator.language.slice(0, 2).toLowerCase();
  return ["es", "en", "de"].includes(browserLang) ? browserLang : "es";
}

function formatPrice(product) {
  return new Intl.NumberFormat(state.lang, {
    style: "currency",
    currency: product.currency,
    maximumFractionDigits: 0,
  }).format(product.price);
}

function formatDate(date) {
  return new Intl.DateTimeFormat(state.lang, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function t(key) {
  return translations[state.lang][key] || translations.es[key] || key;
}

function productText(product, field) {
  return product[field][state.lang] || product[field].es || product[field].de || "";
}

function whatsappUrl(message) {
  const phone = window.STORE_CONFIG.whatsappPhone.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function renderStaticText() {
  document.documentElement.lang = state.lang;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });

  const generalWhatsapp = document.getElementById("generalWhatsapp");
  generalWhatsapp.href = whatsappUrl(t("generalMessage"));
  generalWhatsapp.innerHTML = `${whatsappIcon}<span>${t("askWhatsapp")}</span>`;

  document.querySelectorAll(".language-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === state.lang);
  });
}

function renderProducts() {
  const grid = document.getElementById("products");
  grid.innerHTML = "";

  window.PRODUCTS.forEach((product) => {
    const isSold = product.sold === true;
    const title = productText(product, "title");
    const card = document.createElement("article");
    card.className = `product-card ${isSold ? "sold" : ""}`;
    card.style.setProperty("--accent", product.image.accent);

    const details = product.details[state.lang] || product.details.es || [];
    const message = t("productMessage").replace("{title}", title);
    const primaryButton = isSold
      ? `<span class="button button-primary is-disabled" aria-disabled="true">${t("sold")}</span>`
      : `<a class="button button-primary" href="${whatsappUrl(message)}" target="_blank" rel="noreferrer">${whatsappIcon}<span>${t("reserve")}</span></a>`;

    card.innerHTML = `
      <div class="product-media">
        ${product.image.src ? `<img src="${product.image.src}" alt="${title}">` : ""}
        <div class="media-label">
          <span>${product.image.label}</span>
          <span class="price">${formatPrice(product)}</span>
        </div>
      </div>
        <div class="product-body">
          <div class="product-meta">
          <span class="pill">${t(isSold ? "sold" : "available")}</span>
          <span>${productText(product, "category")}</span>
          <span>${formatDate(product.date)}</span>
        </div>
        <h3>${title}</h3>
        <p class="summary">${productText(product, "summary")}</p>
        <ul class="details">
          ${details.map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <div class="product-actions">
          ${primaryButton}
          <a class="button button-secondary nebenan-link" href="${product.nebenanUrl}" target="_blank" rel="noreferrer">${t("originalPost")}</a>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

function setLanguage(lang) {
  state.lang = lang;
  localStorage.setItem("saleLanguage", lang);
  renderStaticText();
  renderProducts();
}

document.querySelectorAll(".language-button").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

renderStaticText();
renderProducts();
