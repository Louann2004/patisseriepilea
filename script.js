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
  "cookie": "images/cookie.jpg",
  "piping": "images/piping.jpg",
  "fraises": "images/fraises.jpg"
};

// Les gâteaux de voyage : [image, nom, description, prix]
const V = [
  ["cookie2", "Cookie au chocolat", "Allergènes : gluten, soja, fruits à coque.", "3 €"],
  ["muffin", "Muffin aux épices", "Sirop d'érable, spéculoos, cannelle, épices chaï.<br><br>Allergènes : gluten, soja.", "3 €"],
  ["banana", "Banana bread", "Minimum de commande : un cake de 8 personnes<br><br>Allergènes : gluten, soja, fruits à coque.", "2,75 €"],
  ["crumble", "Cake pomme crumble", "Minimum de commande : un cake de 8 personnes<br><br>Allergènes : gluten, soja, fruits à coque.", "2,90 €"],
  ["fondant", "Fondant au chocolat", "Minimum de commande : 4 parts.<br><br>Allergènes : soja, fruits à coque.", "3,25 €"]
];

// Les pâtisseries fraîches : [image, nom, description, prix]
const F = [
  ["clafoutis", "Clafoutis aux fruits", "Minimum de commande : 4 parts.<br><br>Allergènes : soja, fruits à coque.", "3,50 €"],
  ["cheesecake", "Cheesecake aux fruits", "Minimum de commande : 8 parts.<br><br>Allergènes : gluten, soja.", "3,75 €"],
  ["tiramisu", "Tiramisu spéculoos et café", "Minimum de commande : 4 parts.<br><br>Allergènes : gluten, soja.", "4,75 €"]
];

// Les tartes de saison : [image, nom, description, [prix 6, 8, 10 personnes]]
const T = [
  ["nectarine", "Tarte aux fruits de saison", "Pâte sucrée croustillante, crème pâtissière à la vanille, fruits de saison et nappage neutre.<br><br>Allergènes : gluten, soja.", [27, 32, 37]],
  ["chocolat", "Tarte au chocolat", "Pâte sucrée croustillante, ganache au chocolat noir.<br>Bananes en supplément (3€)<br><br>Allergènes : gluten, soja.", [23, 28, 33]],
  ["amandine", "Tarte amandine", "Pâte sucrée croustillante, crème d'amande, fruits au choix (poire, abricot, pêche...).<br><br>Allergènes : gluten, soja, fruits à coque.", [27, 31, 35]],
  ["citron", "Tarte citron menthe", "Pâte sucrée croustillante, crème au citron jaune et à la menthe fraîche.<br><br>Allergènes : gluten, soja.", [22, 27, 32]]
];

const card = (k, t, d, p) => `<article class="card"><img src="${IMG[k]}" alt="${t}" loading="lazy"><h3>${t}</h3><p>${d}</p><span class="badge">🌱 Végétalien</span>${p}</article>`;
const single = v => card(v[0], v[1], v[2], `<span class="price">${v[3]}</span>`);

const g1 = document.getElementById("g1");
const g2 = document.getElementById("g2");
const g3 = document.getElementById("g3");

if (g1) g1.innerHTML = V.map(single).join("");
if (g2) g2.innerHTML = F.map(single).join("");
if (g3) {
  g3.innerHTML = T.map(v => card(v[0], v[1], v[2], [6, 8, 10].map((n, i) => `<p>${n} personnes <b>${v[3][i]} €</b></p>`).join(""))).join("");
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
