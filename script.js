const IMG = {
  "nectarine": "images/tarte_fruit.jpg",
  "citron": "images/tarte_citron.jpg",
  "chocolat": "images/tarte_chocolat.jpg",
  "amandine": "images/tarte_amandine.jpg",
  "banana": "images/banana_bread.jpg",
  "muffin": "images/muffin.jpg",
  "muffinepices": "images/muffin_epices.jpg",
  "cookie2": "images/cookies.jpg",
  "crumble": "images/cake_crumble.jpg",
  "fondant": "images/fondant_chocolat.jpg",
  "clafoutis": "images/clafoutis.jpg",
  "cheesecake": "images/cheese_cake.jpg",
  "tiramisu": "images/tiramisu.jpg",
  "hero": "images/accueil.jpg",
  "piping": "images/piping.jpg",
  "brownie": "images/brownie.jpg",
  "tarteFraises": "images/tarte_fraises.jpg",
  "caramel": "images/caramel.jpg",
  "tartiner": "images/pate_tartiner.jpg",
  "tartelette": "images/tartelette_pumpkin.jpg",
  "cookiecitron": "images/cookie_citron.jpg"
};

// Cadrage des photos (object-position) : [image] -> position
const POS = {
  "banana": "center 10%"
};

// ---------------------------------------------------------------------------
// PRODUITS : chaque produit est défini une seule fois ici.
//   img        : clé de l'image (voir IMG plus haut)
//   name       : nom du produit
//   desc       : description (facultative, le HTML <br> est accepté)
//   allergens  : liste des allergènes (sans « Allergènes : » ni point final)
//   from       : (facultatif) prix affiché dans la liste, ex. "2,75 €" → « À partir de 2,75 € »
//   prices     : soit un prix unique ("22 €"), soit une liste [libellé, prix]
//   sansGluten : (facultatif) true / false pour forcer le badge « Sans gluten »
//                (par défaut : affiché quand « gluten » n'est pas dans les allergènes)
// ---------------------------------------------------------------------------
const U = [["À l'unité", "3 €"], ["Lot de 6", "17 €"], ["Lot de 12", "33 €"]];
const parts = (a, b) => [["4 parts", a], ["8 parts", b]];
const pers = (a, b, c) => [["6 personnes", a], ["8 personnes", b], ["10 personnes", c]];

const P = {
  cookieChoc: { img: "cookie2", name: "Cookie au chocolat", allergens: "gluten, soja, fruits à coque", from: "2,75 €", prices: U },
  cookieCitron: { img: "cookiecitron", name: "Cookie au citron", allergens: "gluten, soja", from: "3 €", prices: [["À l'unité", "3,50 €"], ["Lot de 6", "20 €"], ["Lot de 12", "36 €"]] },
  muffinEpices: { img: "muffinepices", name: "Muffin aux épices", desc: "Sirop d'érable, spéculoos, cannelle, épices chaï.", allergens: "gluten, soja", from: "2,75 €", prices: U },
  muffinMyrtilles: { img: "muffin", name: "Muffin myrtilles", allergens: "gluten, soja", from: "2,75 €", prices: U },
  fondant: { img: "fondant", name: "Fondant au chocolat", desc: "Minimum de commande : 4 parts.", allergens: "soja, fruits à coque", from: "3,10 €", prices: parts("14 €", "25 €") },
  banana: { img: "banana", name: "Banana bread", desc: "8 personnes (2,75€/part)", allergens: "gluten, soja, fruits à coque", prices: "22 €" },
  crumble: { img: "crumble", name: "Cake pomme crumble", desc: "8 personnes (3€/part)", allergens: "gluten, soja, fruits à coque", prices: "24 €" },

  clafoutis: { img: "clafoutis", name: "Clafoutis aux fruits", desc: "Minimum de commande : 4 parts.", allergens: "soja, fruits à coque", from: "3,10 €", prices: parts("14 €", "25 €") },
  cheesecake: { img: "cheesecake", name: "Crémeux fruité", desc: "Base spéculoos et crémeux au fruit de ton choix.<br>8 personnes (3,75€/part).", allergens: "gluten, soja", prices: "30 €" },
  tiramisu: { img: "tiramisu", name: "Tiramisu spéculoos et café", allergens: "gluten, soja", from: "3,75 €", prices: [["6 parts", "25 €"], ["12 parts", "45 €"]] },

  caramel: { img: "caramel", name: "Caramel \"beurre\" salé à la vanille", allergens: "soja", prices: [["Pot de 300g", "7 €"]] },
  tartiner: { img: "tartiner", name: "Pâte à tartiner noisette", allergens: "soja, fruits à coque (noisette)", prices: [["Pot de 300g", "9,5 €"]] },

  tarteFruits: { img: "nectarine", name: "Tarte aux fruits de saison", desc: "Pâte sucrée croustillante, crème pâtissière à la vanille, fruits de saison et nappage neutre.", allergens: "gluten, soja", prices: pers("32 €", "38 €", "43 €") },
  tarteChocolat: { img: "chocolat", name: "Tarte au chocolat", desc: "Pâte sucrée croustillante, ganache au chocolat noir.<br>Bananes en supplément (3€)", allergens: "gluten, soja", prices: pers("25 €", "30 €", "35 €") },
  tarteAmandine: { img: "amandine", name: "Tarte amandine", desc: "Pâte sucrée croustillante, crème d'amande, fruits au choix (poire, abricot, pêche...).", allergens: "gluten, soja, fruits à coque", prices: pers("27 €", "31 €", "35 €") },
  tarteCitron: { img: "citron", name: "Tarte citron menthe", desc: "Pâte sucrée croustillante, crème au citron jaune et à la menthe fraîche.", allergens: "gluten, soja", prices: pers("22 €", "27 €", "32 €") },
  pumpkin: { img: "tartelette", name: "Tartelette \"pumpkin pie\"", desc: "Pâte sucrée croustillante, crème de potimarron, épices de Noël.", allergens: "gluten, soja", from: "3,75 €", prices: [["À l'unité", "4 €"], ["4 unités", "15,50 €"], ["8 unités", "30 €"]] }
};

// Identifiant dans l'adresse : produit-<nom sans accents ni espaces>
const slug = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const BY_ID = {};
Object.values(P).forEach(p => { p.id = slug(p.name); BY_ID[p.id] = p; });

// Contenu de chaque section de la carte (« Nouveautés » reprend des produits déjà listés ailleurs)
const N = [P.cookieCitron, P.pumpkin, P.muffinMyrtilles];
const V = [P.cookieChoc, P.cookieCitron, P.muffinEpices, P.muffinMyrtilles, P.fondant, P.banana, P.crumble];
const F = [P.clafoutis, P.cheesecake, P.tiramisu];
const D = [P.caramel, P.tartiner];
const T = [P.tarteFruits, P.tarteChocolat, P.tarteAmandine, P.tarteCitron, P.pumpkin];

const esc = s => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const num = s => parseFloat(String(s).replace(/[^\d,.]/g, "").replace(",", "."));
const imgPos = k => POS[k] ? ` style="object-position:${POS[k]}"` : "";

// Prix affiché dans la liste : le plus bas, précédé de « À partir de » s'il y en a plusieurs
function fromPrice(p) {
  if (p.from) return "À partir de " + p.from; // prix de la liste imposé à la main (champ « from »)
  if (typeof p.prices === "string") return p.prices;
  const v = p.prices.map(x => x[1]);
  const min = v.reduce((a, b) => (num(b) < num(a) ? b : a));
  return new Set(v.map(num)).size > 1 ? "À partir de " + min : min;
}

// Carte de la liste : image + nom + prix, le tout cliquable
const card = p => `<a class="card" href="#produit-${p.id}" data-prod><img src="${IMG[p.img]}" alt="${esc(p.name)}" loading="lazy"${imgPos(p.img)}><h3>${esc(p.name)}</h3><span class="price">${fromPrice(p)}</span></a>`;

const fill = (id, list) => { const g = document.getElementById(id); if (g) g.innerHTML = list.map(card).join(""); };
fill("g0", N);
fill("g1", V);
fill("g2", F);
fill("g4", D);
fill("g3", T);

// ---------------------------------------------------------------------------
// FICHE PRODUIT (page créée à la volée, adresse : #produit-<id>)
// ---------------------------------------------------------------------------
const ICON = {
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M7.5 12.5l3 3 6-6.5"/></svg>',
  back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
  truck: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h11v10H3z"/><path d="M14 9h4l3 3v4h-7"/><circle cx="7.5" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/></svg>',
  store: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9l1.5-5h15L21 9"/><path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"/><path d="M5 12v8h14v-8"/><path d="M10 20v-5h4v5"/></svg>'
};

const mainEl = document.querySelector("main");
const prodPage = document.createElement("section");
prodPage.className = "page";
prodPage.id = "produit";
if (mainEl) mainEl.appendChild(prodPage);

function renderProduct(p) {
  const sansGluten = p.sansGluten !== undefined ? p.sansGluten : !/gluten/i.test(p.allergens);
  const tags = ["Végétalien", "Sans œuf", "Sans lactose"].concat(sansGluten ? ["Sans gluten"] : []);
  const prices = typeof p.prices === "string"
    ? `<p class="prod-price">${p.prices}</p>`
    : `<ul class="prices">${p.prices.map(x => `<li><span>${x[0]}</span><b>${x[1]}</b></li>`).join("")}</ul>`;
  prodPage.innerHTML = `
    <div class="prod">
      <a class="back" href="#carte" aria-label="Retour à la carte">${ICON.back}</a>
      <div class="prod-grid">
        <img class="prod-img" src="${IMG[p.img]}" alt="${esc(p.name)}"${imgPos(p.img)}>
        <div class="prod-info">
          <h1>${esc(p.name)}</h1>
          <ul class="tags">${tags.map(t => `<li>${ICON.check}${t}</li>`).join("")}</ul>
          ${p.desc ? `<p>${p.desc}</p>` : ""}
          <p class="strong">Allergènes : ${p.allergens}.</p>
          <p class="strong">Fabriqué dans un atelier qui utilise du gluten, du soja et des fruits à coque.</p>
          <div class="deliv">
            <div>${ICON.truck}<p><b>Livraison à Grenoble</b><span>Service payant</span></p></div>
            <div>${ICON.store}<p><b>Click &amp; Collect</b><span>Retrait à l'atelier</span></p></div>
          </div>
          <h2 class="prod-sub">Tarifs</h2>
          ${prices}
          <a class="btn" href="contact.html#contact">Je craque</a>
        </div>
      </div>
    </div>`;
}

// Navigation : on retient d'où l'on vient pour revenir au même endroit de la liste
let carteY = 0;
let fromCarte = false;
document.addEventListener("click", e => {
  const a = e.target.closest && e.target.closest("a[data-prod]");
  if (a) { carteY = scrollY; fromCarte = true; return; }
  const back = e.target.closest && e.target.closest(".back");
  if (back) {
    e.preventDefault();
    if (fromCarte) history.back(); else location.hash = "carte";
  }
});

// Menu de la carte : « Voir tout » ou une section à la fois, avec bouton « Suivant »
const carteNav = document.querySelector(".carte-nav");
if (carteNav) {
  const content = document.querySelector(".carte-content");
  const secs = [...content.querySelectorAll(".carte-sec")];
  const btns = [...carteNav.querySelectorAll("button")];
  const show = (key, scroll) => {
    const all = key === "all";
    content.classList.toggle("all", all);
    secs.forEach(s => s.hidden = !all && s.dataset.s !== key);
    btns.forEach(b => {
      const on = b.dataset.s === key;
      b.classList.toggle("on", on);
      if (on) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current");
    });
    const top = document.querySelector(".carte-layout").getBoundingClientRect().top;
    if (scroll || top < 0) scrollTo({ top: scrollY + top - 16, behavior: "smooth" });
  };
  btns.forEach(b => b.addEventListener("click", () => show(b.dataset.s, false)));
  content.querySelectorAll(".next").forEach(b => b.addEventListener("click", () => show(b.dataset.go, true)));
  show("all", false);
}

document.querySelectorAll("[data-k]").forEach(i => i.src = IMG[i.dataset.k]);

const baseTitle = document.title;
let prevPage = null;

function route() {
  const defaultPage = document.body.dataset.defaultPage || "accueil";
  const h = (location.hash || "#" + defaultPage).slice(1);
  const prod = h.indexOf("produit-") === 0 ? BY_ID[h.slice(8)] : null;
  let id;
  if (prod) {
    id = "produit";
    renderProduct(prod);
  } else {
    const targetEl = document.getElementById(h);
    id = targetEl && targetEl.classList.contains("page") && h !== "produit" ? h : defaultPage;
  }
  const navId = id === "produit" ? "carte" : id;

  document.querySelectorAll(".page").forEach(s => s.classList.toggle("on", s.id === id));
  document.querySelectorAll("nav a[data-p]").forEach(a => a.classList.toggle("on", a.dataset.p === navId));
  document.title = prod ? prod.name + " - Pâtisserie Pilea" : baseTitle;

  // Retour de la fiche produit vers la liste : on retrouve la même position
  scrollTo(0, id === "carte" && prevPage === "produit" ? carteY : 0);
  if (id === "carte") fromCarte = false;
  prevPage = id;
}

addEventListener("hashchange", route);
route();

// Quand on arrive sur une page via le menu, le navigateur saute à l'ancre (#carte, #contact...)
// et masque le bandeau du haut : on force donc l'affichage tout en haut de la page.
// (Le rechargement et les boutons précédent/suivant gardent leur comportement habituel.)
const navEntry = (performance.getEntriesByType && performance.getEntriesByType("navigation")[0]) || {};
if (navEntry.type !== "reload" && navEntry.type !== "back_forward") {
  const toTop = () => scrollTo(0, 0);
  toTop();
  requestAnimationFrame(toTop);
  addEventListener("load", () => { toTop(); setTimeout(toTop, 60); });
}

const accueilHero = document.getElementById("accueil");
if (accueilHero) {
  accueilHero.style.backgroundImage = "linear-gradient(rgba(255,241,214,.5),rgba(255,241,214,.5)),url(" + IMG.hero + ")";
}

const f = document.getElementById("f");
if (f) {
  f.addEventListener("submit", async ev => {
    ev.preventDefault();
    const q = i => document.getElementById(i).value;
    const r = f.querySelector("input[name=r]:checked").value;
    const btn = f.querySelector(".send");
    const msg = document.getElementById("msg");

    const d = {
      "Nom": q("n"),
      "E-mail": q("e"),
      "Téléphone": q("t"),
      "Type de demande": r,
      "Demande": q("m"),
      _subject: "Nouvelle demande (" + r + ") - " + q("n"),
      _replyto: q("e"),
      _template: "table",
      _captcha: "false"
    };

    btn.disabled = true;
    btn.textContent = "Envoi en cours…";

    try {
      const x = await fetch("https://formsubmit.co/ajax/contact@patisseriepilea.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(d)
      });
      if (!x.ok) throw 0;
      f.reset();
      msg.textContent = "Merci ! Votre demande a bien été envoyée, nous vous répondons rapidement.";
    } catch (_) {
      const body = Object.entries(d).filter(([k]) => k[0] !== "_").map(([k, v]) => k + " : " + v).join("\n");
      msg.textContent = "L'envoi direct n'a pas abouti : votre application mail s'ouvre avec le message prêt à envoyer.";
      location.href = "mailto:contact@patisseriepilea.com?subject=" + encodeURIComponent(d._subject) + "&body=" + encodeURIComponent(body);
    }
    btn.disabled = false;
    btn.textContent = "Envoyer par email";
  });
}
