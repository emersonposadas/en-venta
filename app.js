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
    statusFilter: "Estado",
    categoryFilter: "Categoria",
    allStatuses: "Todos",
    allCategories: "Todas",
    noProducts: "No hay productos con estos filtros.",
    free: "Gratis",
    reserve: "Me interesa",
    share: "Compartir",
    copied: "Enlace copiado",
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
    statusFilter: "Status",
    categoryFilter: "Category",
    allStatuses: "All",
    allCategories: "All",
    noProducts: "No products match these filters.",
    free: "Free",
    reserve: "I'm interested",
    share: "Share",
    copied: "Link copied",
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
    statusFilter: "Status",
    categoryFilter: "Kategorie",
    allStatuses: "Alle",
    allCategories: "Alle",
    noProducts: "Keine Produkte passen zu diesen Filtern.",
    free: "Gratis",
    reserve: "Ich habe Interesse",
    share: "Teilen",
    copied: "Link kopiert",
    footerNote: "Privatverkauf. Uebergabe oder Abholung je nach Artikel.",
    pagesReady: "Bereit fuer GitHub Pages",
    generalMessage: "Hallo, ich habe deine Verkaufsseite gesehen und moechte etwas fragen.",
    productMessage: "Hallo, ich interessiere mich fuer: {title}. Ist es noch verfuegbar?",
  },
};

const state = {
  lang: localStorage.getItem("saleLanguage") || detectLanguage(),
  statusFilter: "all",
  categoryFilter: "all",
};

const whatsappIcon = `
  <svg class="whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path fill="currentColor" d="M12.04 3.1a8.76 8.76 0 0 0-7.52 13.25L3.4 20.9l4.66-1.08a8.75 8.75 0 1 0 3.98-16.72Zm0 1.75a7 7 0 0 1 5.97 10.66 7 7 0 0 1-9.66 2.47l-.3-.18-2.2.51.53-2.13-.2-.32A7 7 0 0 1 12.04 4.85Zm-2.5 3.4c-.17 0-.42.06-.64.3-.22.23-.84.82-.84 2 0 1.17.86 2.31.98 2.47.12.16 1.68 2.68 4.14 3.65 2.04.8 2.46.64 2.9.6.44-.04 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28l-1.68-.83c-.22-.1-.4-.16-.56.12-.16.23-.64.82-.78.98-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.2-1.43-1.35-1.67-.14-.24-.02-.37.1-.49.11-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42l-.76-1.82c-.2-.48-.4-.5-.56-.5h-.48Z"/>
  </svg>
`;

const shareIcon = `
  <svg class="share-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M8.7 10.6 15.2 7M8.7 13.4l6.5 3.6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <circle cx="6.5" cy="12" r="2.7" fill="none" stroke="currentColor" stroke-width="2"/>
    <circle cx="17.5" cy="6" r="2.7" fill="none" stroke="currentColor" stroke-width="2"/>
    <circle cx="17.5" cy="18" r="2.7" fill="none" stroke="currentColor" stroke-width="2"/>
  </svg>
`;

function detectLanguage() {
  const supportedLanguages = ["es", "en", "de"];
  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
  const matchedLanguage = browserLanguages
    .map((language) => language.slice(0, 2).toLowerCase())
    .find((language) => supportedLanguages.includes(language));

  return matchedLanguage || "es";
}

function formatPrice(product) {
  if (product.price === 0) {
    return t("free");
  }

  return new Intl.NumberFormat(state.lang, {
    style: "currency",
    currency: product.currency,
    maximumFractionDigits: 0,
  }).format(product.price);
}

function t(key) {
  return translations[state.lang][key] || translations.es[key] || key;
}

function productText(product, field) {
  return product[field][state.lang] || product[field].es || product[field].de || "";
}

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function whatsappUrl(message) {
  const phone = window.STORE_CONFIG.whatsappPhone.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function productUrl(product) {
  const baseUrl = `${window.location.origin}${window.location.pathname}`;
  return `${baseUrl}#${product.id}`;
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

function categoryKey(product) {
  return normalizeText(product.category.es);
}

function getFilterCategories() {
  const categories = new Map();
  window.PRODUCTS.forEach((product) => {
    if (!categories.has(categoryKey(product))) {
      categories.set(categoryKey(product), product);
    }
  });

  return [...categories.entries()].sort(([, firstProduct], [, secondProduct]) =>
    productText(firstProduct, "category").localeCompare(productText(secondProduct, "category"), state.lang)
  );
}

function renderFilters() {
  const statusFilter = document.getElementById("statusFilter");
  const categoryFilter = document.getElementById("categoryFilter");

  statusFilter.innerHTML = `
    <option value="all">${t("allStatuses")}</option>
    <option value="available">${t("available")}</option>
    <option value="sold">${t("sold")}</option>
  `;
  statusFilter.value = state.statusFilter;

  categoryFilter.innerHTML = `
    <option value="all">${t("allCategories")}</option>
    ${getFilterCategories()
      .map(([category, product]) => {
        return `<option value="${category}">${productText(product, "category")}</option>`;
      })
      .join("")}
  `;
  categoryFilter.value = state.categoryFilter;
}

function productMatchesFilters(product) {
  const matchesStatus =
    state.statusFilter === "all" ||
    (state.statusFilter === "available" && product.sold !== true) ||
    (state.statusFilter === "sold" && product.sold === true);
  const matchesCategory = state.categoryFilter === "all" || categoryKey(product) === state.categoryFilter;

  return matchesStatus && matchesCategory;
}

function renderProducts() {
  const grid = document.getElementById("products");
  grid.innerHTML = "";

  const filteredProducts = window.PRODUCTS.filter(productMatchesFilters);

  if (!filteredProducts.length) {
    const emptyState = document.createElement("p");
    emptyState.className = "empty-state";
    emptyState.textContent = t("noProducts");
    grid.appendChild(emptyState);
    return;
  }

  filteredProducts.forEach((product) => {
    const isSold = product.sold === true;
    const title = productText(product, "title");
    const card = document.createElement("article");
    card.id = product.id;
    card.className = `product-card ${isSold ? "sold" : ""}`;
    card.style.setProperty("--accent", product.image.accent);

    const details = product.details[state.lang] || product.details.es || [];
    const message = t("productMessage").replace("{title}", title);
    const primaryButton = isSold
      ? `<span class="button button-primary is-disabled" aria-disabled="true">${t("sold")}</span>`
      : `<a class="button button-primary" href="${whatsappUrl(message)}" target="_blank" rel="noreferrer">${whatsappIcon}<span>${t("reserve")}</span></a>`;

    card.innerHTML = `
      <div class="product-media">
        ${product.image.src ? `<img src="${product.image.src}" alt="${title}" loading="lazy" decoding="async">` : ""}
        <div class="media-label">
          <span>${product.image.label}</span>
          <span class="price">${formatPrice(product)}</span>
        </div>
      </div>
        <div class="product-body">
          <div class="product-meta">
          <span class="pill">${t(isSold ? "sold" : "available")}</span>
          <span>${productText(product, "category")}</span>
        </div>
        <h3>${title}</h3>
        <p class="summary">${productText(product, "summary")}</p>
        <ul class="details">
          ${details.map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <div class="product-actions">
          ${primaryButton}
          <button class="button button-secondary share-button" type="button" data-share-id="${product.id}">
            ${shareIcon}<span>${t("share")}</span>
          </button>
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
  renderFilters();
  renderProducts();
}

async function shareProduct(productId) {
  const product = window.PRODUCTS.find((item) => item.id === productId);
  if (!product) return;

  const title = productText(product, "title");
  const text = productText(product, "summary");
  const url = productUrl(product);

  if (navigator.share) {
    await navigator.share({ title, text, url });
    return;
  }

  if (navigator.clipboard) {
    await navigator.clipboard.writeText(url);
  } else {
    const input = document.createElement("textarea");
    input.value = url;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
  }

  const button = document.querySelector(`[data-share-id="${productId}"] span`);
  if (!button) return;

  const originalText = button.textContent;
  button.textContent = t("copied");
  window.setTimeout(() => {
    button.textContent = originalText;
  }, 1800);
}

document.querySelectorAll(".language-button").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

document.getElementById("statusFilter").addEventListener("change", (event) => {
  state.statusFilter = event.target.value;
  renderProducts();
});

document.getElementById("categoryFilter").addEventListener("change", (event) => {
  state.categoryFilter = event.target.value;
  renderProducts();
});

document.getElementById("products").addEventListener("click", (event) => {
  const shareButton = event.target.closest("[data-share-id]");
  if (!shareButton) return;
  shareProduct(shareButton.dataset.shareId).catch(() => {});
});

renderStaticText();
renderFilters();
renderProducts();
