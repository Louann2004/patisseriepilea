const IMG = {
  "nectarine": "images/tarte_fruit.jpg",
  "citron": "images/tarte_citron.jpg",
  "chocolat": "images/tarte_chocolat.jpg",
  "amandine": "images/tarte_amandine.jpg",
  "banana": "images/banana_bread.jpg",
  "muffin": "images/muffin.jpg",
  "cookie2": "images/cookies.jpg",
  "crumble": "images/cake_crumble.jpg",
  "fondant": "images/fondant_chocolat.jpg",
  "clafoutis": "images/clafoutis.jpg",
  "cheesecake": "images/cheese_cake.jpg",
  "tiramisu": "images/tiramisu.jpg",
  "hero": "images/accueil.jpg",
  "piping": "images/piping.jpg",
  "brownie": "images/brownie.jpg",
  "fraises": "images/fraises.jpg",
  "caramel": "images/caramel.jpg",
  "tartiner": "images/pate_tartiner.jpg"
};

// Cadrage des photos (object-position) : [image] -> position
const POS = {
  "banana": "center 10%"
};

// Prix : soit un texte (prix unique), soit une liste [libellé, prix]
const U = [["À l'unité", "3 €"], ["Lot de 6", "17 €"], ["Lot de 12", "33 €"]];

// Les gâteaux de voyage : [image, nom, description, prix]
const V = [
  ["cookie2", "Cookie au chocolat", "Allergènes : gluten, soja, fruits à coque.", U],
  ["muffin", "Muffin du moment", "Sirop d'érable, spéculoos, cannelle, épices chaï.<br><br>Allergènes : gluten, soja.", U],
  ["fondant", "Fondant au chocolat", "Minimum de commande : 4 parts.<br><br>Allergènes : soja, fruits à coque.", [["4 parts", "14 €"], ["8 parts", "25 €"]]],
  ["banana", "Banana bread", "8 personnes (2,75€/part)<br><br>Allergènes : gluten, soja, fruits à coque.", "22 €"],
  ["crumble", "Cake pomme crumble", "8 personnes (3€/part)<br><br>Allergènes : gluten, soja, fruits à coque.", "24 €"]
];

// Les pâtisseries fraîches : [image, nom, description, prix]
const F = [
  ["clafoutis", "Clafoutis aux fruits", "Minimum de commande : 4 parts.<br><br>Allergènes : soja, fruits à coque.", [["4 parts", "14 €"], ["8 parts", "25 €"]]],
  ["cheesecake", "Cheesecake aux fruits", "8 personnes (3,75€/part).<br><br>Allergènes : gluten, soja.", "30 €"],
  ["tiramisu", "Tiramisu spéculoos et café", "Allergènes : gluten, soja.", [["6 parts", "25 €"], ["12 parts", "45 €"]]]
];

// Les douceurs à tartiner : [image, nom, description, prix]
const D = [
  ["caramel", "Caramel &quot;beurre&quot; salé à la vanille", "Allergènes : soja.", [["Pot de 440g", "7 €"]]],
  ["tartiner", "Pâte à tartiner noisette", "Allergènes : soja, fruits à coque (noisette).", [["Pot de 300g", "9,5 €"]]]
];

// Les tartes de saison : [image, nom, description, [prix 6, 8, 10 personnes]]
const T = [
  ["nectarine", "Tarte aux fruits de saison", "Pâte sucrée croustillante, crème pâtissière à la vanille, fruits de saison et nappage neutre.<br><br>Allergènes : gluten, soja.", [32, 38, 43]],
  ["chocolat", "Tarte au chocolat", "Pâte sucrée croustillante, ganache au chocolat noir.<br>Bananes en supplément (3€)<br><br>Allergènes : gluten, soja.", [25, 30, 35]],
  ["amandine", "Tarte amandine", "Pâte sucrée croustillante, crème d'amande, fruits au choix (poire, abricot, pêche...).<br><br>Allergènes : gluten, soja, fruits à coque.", [27, 31, 35]],
  ["citron", "Tarte citron menthe", "Pâte sucrée croustillante, crème au citron jaune et à la menthe fraîche.<br><br>Allergènes : gluten, soja.", [22, 27, 32]]
];

const card = (k, t, d, p) => `<article class="card"><img src="${IMG[k]}" alt="${t}" loading="lazy"${POS[k] ? ` style="object-position:${POS[k]}"` : ""}><h3>${t}</h3><p>${d}</p><span class="badge">🌱 Végétalien</span>${p}</article>`;
const lines = l => l.map(x => `<p>${x[0]} <b>${x[1]}</b></p>`).join("");
const single = v => card(v[0], v[1], v[2], Array.isArray(v[3]) ? lines(v[3]) : `<span class="price">${v[3]}</span>`);

const g1 = document.getElementById("g1");
const g2 = document.getElementById("g2");
const g3 = document.getElementById("g3");
const g4 = document.getElementById("g4");

if (g1) g1.innerHTML = V.map(single).join("");
if (g2) g2.innerHTML = F.map(single).join("");
if (g4) g4.innerHTML = D.map(single).join("");
if (g3) {
  g3.innerHTML = T.map(v => card(v[0], v[1], v[2], lines([6, 8, 10].map((n, i) => [n + " personnes", v[3][i] + " €"])))).join("");
}

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

function route() {
  const defaultPage = document.body.dataset.defaultPage || "accueil";
  const h = (location.hash || "#" + defaultPage).slice(1);
  const targetEl = document.getElementById(h);
  const id = targetEl && targetEl.classList.contains("page") ? h : defaultPage;

  document.querySelectorAll(".page").forEach(s => s.classList.toggle("on", s.id === id));
  document.querySelectorAll("nav a[data-p]").forEach(a => a.classList.toggle("on", a.dataset.p === id));
  scrollTo(0, 0);
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
