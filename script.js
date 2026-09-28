const header = document.getElementById("header");
const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const open = header.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      header.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });
}

addEventListener("scroll", () => {
  header?.classList.toggle("is-stuck", scrollY > 8);
}, { passive: true });

function openDialog(id) {
  const dialog = document.getElementById(id);
  if (dialog && !dialog.open) dialog.showModal();
}
function closeDialog(dialog) {
  dialog.close();
}

document.querySelectorAll("[data-open]").forEach((button) => {
  button.addEventListener("click", () => openDialog(button.dataset.open));
});
document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog").close());
});
document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

document.getElementById("open-search")?.addEventListener("click", () => {
  openDialog("search");
  document.getElementById("search-input")?.focus();
});
document.getElementById("open-cart")?.addEventListener("click", () => {
  renderCart();
  openDialog("cart");
});

const catalog = [
  { name: "Liora Lounge Chair", href: "product.html?id=liora", hint: "Forest green velvet" },
  { name: "Marlow Sofa", href: "product.html?id=marlow", hint: "Oatmeal linen" },
  { name: "Calla Dining Chair", href: "product.html?id=calla", hint: "Oak and linen" },
  { name: "Alden Coffee Table", href: "product.html?id=alden", hint: "Pale oak" },
  { name: "Wren Dining Table", href: "product.html?id=wren", hint: "Round oak" },
  { name: "Soren Bed", href: "product.html?id=soren", hint: "Linen and oak" },
  { name: "Hale Sideboard", href: "product.html?id=hale", hint: "Fluted oak" },
  { name: "Bramble Floor Lamp", href: "product.html?id=bramble", hint: "Brass and linen" },
  { name: "Elowen Desk", href: "product.html?id=elowen", hint: "Oak and leather" },
  { name: "Linden Nightstand", href: "product.html?id=linden", hint: "Bedroom · pale oak" },
  { name: "Willa Bedside Lamp", href: "product.html?id=willa", hint: "Bedroom · ceramic" },
  { name: "Fern Desk Chair", href: "product.html?id=fern", hint: "Home office · velvet" },
  { name: "Rowan Shelf", href: "product.html?id=rowan", hint: "Home office · oak" },
  { name: "Quill Desk Lamp", href: "product.html?id=quill", hint: "Home office · brass" },
  { name: "Modular Sofa Collection", href: "collections.html", hint: "Spring / Summer 2024" },
  { name: "Living Room", href: "rooms.html#living", hint: "Shop by room" },
  { name: "Bedroom", href: "rooms.html#bedroom", hint: "Shop by room" },
  { name: "Dining Room", href: "rooms.html#dining", hint: "Shop by room" },
  { name: "Home Office", href: "rooms.html#office", hint: "Shop by room" },
  { name: "Contact Us", href: "contact.html", hint: "Write to the studio" }
];

const searchInput = document.getElementById("search-input");
const searchList = document.getElementById("search-list");
function renderSearch() {
  if (!searchList) return;
  const q = (searchInput?.value || "").trim().toLowerCase();
  const items = catalog.filter((item) => !q || item.name.toLowerCase().includes(q) || item.hint.toLowerCase().includes(q));
  searchList.replaceChildren();
  items.forEach((item) => {
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = `${item.name} — ${item.hint}`;
    searchList.append(link);
  });
}
searchInput?.addEventListener("input", renderSearch);
renderSearch();

const CHAIR_COLORS = {
  "Forest green": "images/chair.jpg",
  Taupe: "images/chair-taupe.jpg",
  Charcoal: "images/chair-charcoal.jpg"
};

document.querySelectorAll(".swatch").forEach((swatch) => {
  swatch.addEventListener("click", () => {
    const group = swatch.parentElement;
    group?.querySelectorAll(".swatch").forEach((item) => item.classList.remove("is-on"));
    swatch.classList.add("is-on");
    const name = swatch.dataset.color || "Forest green";
    const scope = swatch.closest(".feature, .product-hero") || document;
    const label = scope.querySelector(".color-name");
    if (label) label.textContent = name;
    const src = CHAIR_COLORS[name];
    const photo = scope.querySelector(".feature-photo img, #product-image");
    if (src && photo) {
      photo.src = src;
      photo.alt = `Liora Lounge Chair in ${name.toLowerCase()} velvet`;
    }
    const view = scope.querySelector("a.btn");
    if (view) view.href = `product.html?id=liora&color=${encodeURIComponent(name)}`;
  });
});

const arrivals = [
  {
    kicker: "New arrival",
    title: "Modular Sofa Collection",
    copy: "Flexible, stylish and made for real life. Create your perfect setup.",
    href: "collections.html",
    link: "Discover Collection",
    img: "images/modular.jpg",
    alt: "Modular cream sofa on a beige rug with a side table and a tall plant."
  },
  {
    kicker: "In the room",
    title: "The Arched Living Room",
    copy: "A cream sectional, an oak table, and shelves set into a plaster niche.",
    href: "rooms.html#living",
    link: "See the room",
    img: "images/hero.jpg",
    alt: "Cream sectional sofa beneath an arched shelf niche."
  }
];
let arrivalIndex = 0;
function showArrival(index) {
  arrivalIndex = (index + arrivals.length) % arrivals.length;
  const slide = arrivals[arrivalIndex];
  const title = document.getElementById("arrival-title");
  if (!title) return;
  title.textContent = slide.title;
  document.getElementById("arrival-copy").textContent = slide.copy;
  const link = document.getElementById("arrival-link");
  link.href = slide.href;
  link.firstChild.textContent = `${slide.link} `;
  const img = document.getElementById("arrival-img");
  img.src = slide.img;
  img.alt = slide.alt;
}
document.getElementById("arrival-next")?.addEventListener("click", () => showArrival(arrivalIndex + 1));
document.getElementById("arrival-prev")?.addEventListener("click", () => showArrival(arrivalIndex - 1));

const reviewSets = [
  [
    ["The quality is incredible and the design is exactly what my home needed!", "Sarah J.", "Los Angeles, CA", "images/avatar-1.jpg"],
    ["Livora’s pieces bring so much warmth and character to our space.", "Michael T.", "Austin, TX", "images/avatar-2.jpg"],
    ["Customer service was amazing and delivery was super fast!", "Emily R.", "New York, NY", "images/avatar-3.jpg"]
  ],
  [
    ["The oak is pale and quiet, and the chair is the one we actually sit in.", "Daniel K.", "Seattle, WA", "images/avatar-4.jpg"],
    ["Delivery was careful and the sofa looks exactly like the room we imagined.", "Priya S.", "Chicago, IL", "images/avatar-1.jpg"],
    ["We started with one chair. The rest of the room followed.", "Owen L.", "Portland, OR", "images/avatar-2.jpg"]
  ]
];
let reviewIndex = 0;
function showReviews(index) {
  const track = document.getElementById("review-track");
  if (!track) return;
  reviewIndex = (index + reviewSets.length) % reviewSets.length;
  track.replaceChildren();
  reviewSets[reviewIndex].forEach(([quote, name, city, photo]) => {
    const article = document.createElement("article");
    article.className = "review";
    const stars = document.createElement("div");
    stars.className = "stars";
    stars.setAttribute("aria-label", "5 stars");
    stars.textContent = "★★★★★";
    const block = document.createElement("blockquote");
    block.textContent = `“${quote}”`;
    const who = document.createElement("div");
    who.className = "who";
    const img = document.createElement("img");
    img.src = photo;
    img.alt = "";
    const meta = document.createElement("div");
    const strong = document.createElement("strong");
    strong.textContent = name;
    const span = document.createElement("span");
    span.textContent = city;
    meta.append(strong, span);
    who.append(img, meta);
    article.append(stars, block, who);
    track.append(article);
  });
}
document.getElementById("review-next")?.addEventListener("click", () => showReviews(reviewIndex + 1));
document.getElementById("review-prev")?.addEventListener("click", () => showReviews(reviewIndex - 1));

document.getElementById("contact-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  if (!name) {
    form.querySelector("[name=name]")?.focus();
    return;
  }
  const topic = String(data.get("topic") || "your note");
  form.hidden = true;
  const thanks = document.getElementById("contact-thanks");
  const copy = document.getElementById("thanks-copy");
  if (copy) copy.textContent = `${name}, we have your note about ${topic.toLowerCase()}. It stays in this browser.`;
  if (thanks) thanks.hidden = false;
});

document.getElementById("consult-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  form.replaceChildren();
  const p = document.createElement("p");
  p.textContent = "The studio has your note. This preview keeps it in the browser.";
  form.append(p);
});

document.getElementById("chat-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const text = new FormData(form).get("message");
  form.replaceChildren();
  const p = document.createElement("p");
  p.textContent = `Noted: “${text}”. A person would reply from here. Nothing was sent.`;
  form.append(p);
});

const CART_KEY = "livora-cart";
function readCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}
function writeCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  const badge = document.getElementById("cart-count");
  if (!badge) return;
  const count = items.reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = String(count);
  badge.classList.toggle("show", count > 0);
}
function renderCart() {
  const body = document.getElementById("cart-body");
  if (!body) return;
  const items = readCart();
  body.replaceChildren();
  if (!items.length) {
    const p = document.createElement("p");
    p.className = "muted";
    p.textContent = "Your cart is empty.";
    const link = document.createElement("a");
    link.className = "btn btn-primary";
    link.href = "shop.html";
    link.textContent = "Shop Collection";
    body.append(p, link);
    return;
  }
  items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "cart-line";
    const name = document.createElement("div");
    name.innerHTML = "";
    const strong = document.createElement("strong");
    strong.textContent = item.name;
    const meta = document.createElement("div");
    meta.className = "muted";
    meta.textContent = `${item.color} · Qty ${item.qty}`;
    name.append(strong, meta);
    row.append(name);
    body.append(row);
  });
  const clear = document.createElement("button");
  clear.className = "btn btn-ghost";
  clear.type = "button";
  clear.textContent = "Clear cart";
  clear.addEventListener("click", () => {
    writeCart([]);
    renderCart();
  });
  body.append(clear);
}
writeCart(readCart());

const PRODUCTS = {
  liora: { name: "Liora Lounge Chair", price: 599, category: "Lounge seating", image: "images/chair.jpg", copy: "A perfect blend of modern design and everyday comfort. Velvet seat, oak legs, made to sit in for a long afternoon.", swatches: true },
  marlow: { name: "Marlow Sofa", price: 2480, category: "Seating", image: "images/sofa.jpg", copy: "Three seats in oatmeal linen on a pale oak plinth. Long enough for two people and the hour between them.", swatches: false },
  calla: { name: "Calla Dining Chair", price: 420, category: "Seating", image: "images/dining-chair.jpg", copy: "A pale oak chair with a curved crest and a linen cushion tied at the side. Sold singly, meant to be gathered.", swatches: false },
  alden: { name: "Alden Coffee Table", price: 890, category: "Tables", image: "images/coffee.jpg", copy: "A low round top in solid oak, the base turning inward like a stem. Empty in the middle, on purpose.", swatches: false },
  wren: { name: "Wren Dining Table", price: 1640, category: "Tables", image: "images/dining-table.jpg", copy: "A round oak top on a single pedestal. Four can sit. A bowl is enough at the center.", swatches: false },
  soren: { name: "Soren Bed", price: 2190, category: "Sleep", image: "images/bed.jpg", copy: "A low oak platform and a tall linen headboard. Dressed in plain cream linen, with morning light as the only ornament.", swatches: false },
  hale: { name: "Hale Sideboard", price: 1280, category: "Storage", image: "images/sideboard.jpg", copy: "Four fluted oak doors over a darkened base. A place for the things that do not need to be on view.", swatches: false },
  bramble: { name: "Bramble Floor Lamp", price: 540, category: "Light", image: "images/lamp.jpg", copy: "An arch of blackened brass and a cream linen shade. It reaches over a chair and stops just above the page.", swatches: false },
  elowen: { name: "Elowen Desk", price: 980, category: "Work", image: "images/desk.jpg", copy: "A writing desk with a cognac leather field, one drawer, and a brass pull. Small enough for a letter.", swatches: false },
  linden: { name: "Linden Nightstand", price: 460, category: "Storage", image: "images/nightstand.jpg", copy: "A small oak table with one drawer, meant for the side of the bed. The top stays clear for a vase.", swatches: false },
  willa: { name: "Willa Bedside Lamp", price: 240, category: "Light", image: "images/bedside.jpg", copy: "A low ceramic lamp with a linen shade. It sits on the nightstand and stays dim enough for the last page.", swatches: false },
  fern: { name: "Fern Desk Chair", price: 680, category: "Work", image: "images/desk-chair.jpg", copy: "A tufted chair in forest green velvet, with pale oak legs. It is the seat that faces the desk.", swatches: false },
  rowan: { name: "Rowan Shelf", price: 720, category: "Storage", image: "images/shelf.jpg", copy: "Three open oak shelves on a quiet plinth. For the books that stay in the room where you work.", swatches: false },
  quill: { name: "Quill Desk Lamp", price: 220, category: "Light", image: "images/desk-lamp.jpg", copy: "A brass stem and a pleated cream shade, scaled for a writing desk. It lights the page and little else.", swatches: false }
};

function money(value) {
  return "$" + value.toLocaleString("en-US");
}

function showProduct() {
  const root = document.querySelector("[data-product]");
  if (!root) return;
  const id = new URLSearchParams(location.search).get("id") || "liora";
  const product = PRODUCTS[id] || PRODUCTS.liora;
  const requested = new URLSearchParams(location.search).get("color");
  const chairColor = product.swatches && requested && CHAIR_COLORS[requested] ? requested : "";
  const image = document.getElementById("product-image");
  image.src = chairColor ? CHAIR_COLORS[chairColor] : product.image;
  image.alt = chairColor ? `Liora Lounge Chair in ${chairColor.toLowerCase()} velvet` : product.name;
  document.getElementById("product-category").textContent = product.category;
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-copy").textContent = product.copy;
  document.title = product.name + " — Livora Interiors";
  const swatches = document.getElementById("product-swatches");
  const colorName = document.getElementById("color-name");
  if (swatches) swatches.hidden = !product.swatches;
  if (colorName) {
    colorName.hidden = !product.swatches;
    if (chairColor) colorName.textContent = chairColor;
  }
  if (chairColor) {
    document.querySelectorAll("#product-swatches .swatch").forEach((button) => {
      button.classList.toggle("is-on", button.dataset.color === chairColor);
    });
  }
  const add = document.getElementById("product-add");
  add.dataset.add = id;
  add.dataset.name = product.name;
  add.dataset.price = String(product.price);
}

document.querySelectorAll("[data-add]").forEach((button) => {
  button.addEventListener("click", () => {
    const items = readCart();
    const id = button.dataset.add;
    const name = button.dataset.name || "Liora Lounge Chair";
    const price = Number(button.dataset.price || 599);
    const swatchBox = document.getElementById("product-swatches");
    const selected = swatchBox?.querySelector(".swatch.is-on")?.dataset.color;
    const finish = !swatchBox || swatchBox.hidden ? "As shown" : (selected || "Forest green");
    const existing = items.find((item) => item.id === id && item.color === finish);
    if (existing) existing.qty += 1;
    else items.push({ id, name, price, color: finish, qty: 1 });
    writeCart(items);
    renderCart();
    openDialog("cart");
  });
});

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.dataset.filter;
    document.querySelectorAll(".filter").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    document.querySelectorAll("#catalog .product-card").forEach((card) => {
      card.hidden = group !== "all" && card.dataset.group !== group;
    });
  });
});

showProduct();
