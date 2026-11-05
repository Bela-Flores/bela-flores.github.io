// =============================================================
//  EDITE AQUI: seus dados de contato
// =============================================================
const LOJA = {
  nome: "Bela Flores & Cestas",
  slogan: "Detalhes que encantam seu dia",
  frase: "Transformando momentos especiais em memórias inesquecíveis",
};

const CONTATO = {
  telefones: [
    // numero: como aparece no site | whatsapp: só números (55 + DDD + número)
    { nome: "Isabela", rotulo: "Isabela · Contato comercial", numero: "(19) 98211-8191", whatsapp: "5519982118191" },
    { nome: "Tayline", rotulo: "Tayline",                     numero: "(11) 96018-4207", whatsapp: "5511960184207" },
  ],
  instagramTexto: "@belaflores&cestas_hortolandia", // como aparece no cartão
  instagramUsuario: "",  // @ real, sem o "@" (ex.: "belaflores_cestas"). Vazio = sem botão
};

// =============================================================
//  EDITE AQUI: seus produtos
//  Coloque as fotos na pasta "fotos" e escreva o nome do arquivo.
// =============================================================
const PRODUTOS = [
  { nome: "Buquê Noite Estrelada",        categoria: "Buquês",    foto: "fotos/buque-noite-estrelada.jpg",        descricao: "Rosas azuis, alstroemérias e um girassol no centro, envoltos em papel inspirado na Noite Estrelada de Van Gogh." },
  { nome: "Buquê Girassol & Rosas",       categoria: "Buquês",    foto: "fotos/buque-girassol-rosas-ferrero.jpg", descricao: "Girassol, rosas vermelhas, alstroemérias, mosquitinho e bombons Ferrero Rocher em papel vermelho e dourado." },
  { nome: "Buquê Girassol Solar",         categoria: "Buquês",    foto: "fotos/buque-girassol.jpg",               descricao: "Um girassol radiante com alstroemérias amarelas e mosquitinho, em papel creme com corações dourados." },
  { nome: "Buquê 12 Rosas Vermelhas",     categoria: "Buquês",    foto: "fotos/buque-12-rosas.jpg",              descricao: "Rosas vermelhas com brilho, mosquitinho e tango, em papel vermelho com corações." },
  { nome: "Buquê Clássico de Rosas",      categoria: "Buquês",    foto: "fotos/buque-rosas-tango.jpg",            descricao: "Rosas vermelhas com tango amarelo, mosquitinho e folhagens verdes." },
  { nome: "Buquê Rosas & Ferrero",        categoria: "Buquês",    foto: "fotos/buque-rosas-ferrero.jpg",          descricao: "Rosas vermelhas, alstroemérias e bombons Ferrero Rocher, com cartão para sua mensagem." },
  { nome: "Buquê Delicado",               categoria: "Buquês",    foto: "fotos/buque-delicado.jpg",               descricao: "Rosa, crisântemos, alstroemérias rosadas e mosquitinho em papel vermelho." },
  { nome: "Buquê Flores do Campo",        categoria: "Buquês",    foto: "fotos/buque-flores-do-campo.jpg",        descricao: "Este modelo é uma inspiração: montamos cada buquê com as flores do campo mais frescas da semana. As cores e espécies podem variar, e é isso que deixa cada buquê único." },
  { nome: "Trio de Buquês de Rosas",      categoria: "Buquês",    foto: "fotos/trio-buques-rosas.jpg",            descricao: "Buquês individuais de rosas e alstroemérias, ideais para presentear várias pessoas especiais." },
  { nome: "Mini Orquídea Branca",         categoria: "Orquídeas", foto: "fotos/mini-orquidea-branca.jpg",         descricao: "Mini orquídea phalaenopsis branca com centro roxo, embalada com papel de borda dourada e laço." },
  { nome: "Mini Orquídea Roxa",           categoria: "Orquídeas", foto: "fotos/mini-orquidea-roxa.jpg",           descricao: "Mini orquídea roxa em caixa azul, com papel de borda dourada." },
  { nome: "Kit Rosas Eu & Você",          categoria: "Presentes", foto: "fotos/kit-eu-e-voce.jpg",                descricao: "Buquê de rosas com Ferrero Rocher acompanhado de caixinha com KitKat e balão de coração." },
  { nome: "Cestas Love You",              categoria: "Presentes", foto: "fotos/cestas-love.jpg",                  descricao: "Cestas com pelúcia, chocolates, guloseimas e balão \"Eu te amo\", em três tamanhos." },
];

// =============================================================
//  Daqui para baixo não precisa mexer
// =============================================================

// Desenho de flor usado enquanto a foto ainda não foi colocada na pasta
const FLOR_PADRAO = "data:image/svg+xml," + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <rect width="200" height="200" fill="#f2d5d6"/>
    <g transform="translate(100 95)" fill="#e4a8af">
      ${[0, 72, 144, 216, 288].map(a => `<ellipse rx="22" ry="38" cy="-32" transform="rotate(${a})"/>`).join("")}
    </g>
    <circle cx="100" cy="95" r="16" fill="#c9707d"/>
    <path d="M100 125 V175" stroke="#6d8a74" stroke-width="5"/>
    <ellipse cx="85" cy="155" rx="14" ry="6" fill="#6d8a74" transform="rotate(-30 85 155)"/>
  </svg>`
);

function usarFlorSeFaltar(img) {
  img.addEventListener("error", () => { img.src = FLOR_PADRAO; }, { once: true });
  // a foto pode já ter falhado antes deste código rodar
  if (img.getAttribute("src") && img.complete && img.naturalWidth === 0) img.src = FLOR_PADRAO;
}

// Preenche ano e fotos que faltam
document.querySelectorAll("[data-ano]").forEach(el => el.textContent = new Date().getFullYear());
document.querySelectorAll("img[data-fallback]").forEach(usarFlorSeFaltar);

const linkWhats = t => `https://wa.me/${t.whatsapp}?text=` +
  encodeURIComponent(`Oi, ${t.nome}! Vi o site da ${LOJA.nome} e gostaria de saber mais.`);

// Botões "Falar com a ..." abrem o WhatsApp de cada uma
document.querySelectorAll("[data-whats-de]").forEach(el => {
  const t = CONTATO.telefones.find(t => t.nome === el.dataset.whatsDe);
  if (t) el.href = linkWhats(t);
});
const linkInsta = CONTATO.instagramUsuario ? `https://www.instagram.com/${CONTATO.instagramUsuario}/` : "";

// Telefones na seção de contato
const listaTel = document.querySelector("[data-telefones]");
CONTATO.telefones.forEach(t => {
  const bloco = document.createElement("div");
  bloco.className = "telefone-bloco";
  bloco.innerHTML = `
    <p class="telefone-rotulo"></p>
    <p class="telefone"></p>
    <div class="contato-botoes">
      <a class="botao" target="_blank" rel="noopener">WhatsApp</a>
      <a class="botao botao-linha">Ligar</a>
    </div>`;
  bloco.querySelector(".telefone-rotulo").textContent = t.rotulo;
  bloco.querySelector(".telefone").textContent = t.numero;
  const [whats, ligar] = bloco.querySelectorAll("a");
  whats.href = linkWhats(t);
  ligar.href = `tel:+${t.whatsapp}`;
  listaTel.appendChild(bloco);
});

if (linkInsta) {
  document.querySelector("[data-instagram]").href = linkInsta;
  document.querySelector("[data-instagram-bloco]").hidden = false;
}

// Cartão da loja (desenhado no próprio site)
const ICONE_WHATS = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 8.2c.3-.4.7-.4.9 0l.8 1.6c.1.3 0 .6-.2.8l-.5.5c.6 1.2 1.6 2.2 2.8 2.8l.5-.5c.2-.2.5-.3.8-.2l1.6.8c.4.2.4.6 0 .9-.6.6-1.5.9-2.3.6A8 8 0 0 1 8.5 10.4c-.3-.8 0-1.6.5-2.2Z" fill="currentColor"/></svg>`;
const ICONE_INSTA = `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17" cy="7" r="1.1" fill="currentColor"/></svg>`;
const CESTA = `<svg class="cartao-cesta" viewBox="0 0 160 120" aria-hidden="true">
  <path d="M34 62 C34 12 126 12 126 62" fill="none" stroke="#c4a06a" stroke-width="6" stroke-linecap="round"/>
  <path d="M34 62 C34 12 126 12 126 62" fill="none" stroke="#ead8b4" stroke-width="2" stroke-linecap="round"/>
  <path d="M22 64 H138 L126 108 Q124 114 117 114 H43 Q36 114 34 108 Z" fill="#f1e1c3" stroke="#c4a06a" stroke-width="2"/>
  <g stroke="#d4b583" stroke-width="1.6" fill="none">
    <path d="M26 78 H134"/><path d="M29 92 H131"/><path d="M33 105 H127"/>
    ${[40, 52, 64, 76, 88, 100, 112, 124].map((x, i) => `<path d="M${x} ${i % 2 ? 66 : 72} V${i % 2 ? 106 : 112}"/>`).join("")}
  </g>
  <rect x="17" y="56" width="126" height="12" rx="6" fill="#ead6ad" stroke="#c4a06a" stroke-width="2"/>
  <g fill="#f4c3c8" stroke="#d58f99" stroke-width="1.8" stroke-linejoin="round">
    <path d="M80 26 C66 10 50 14 54 26 C57 35 70 32 80 26 Z"/>
    <path d="M80 26 C94 10 110 14 106 26 C103 35 90 32 80 26 Z"/>
    <path d="M78 28 L68 48 L74 46 L77 52 L80 30 Z"/>
    <path d="M82 28 L92 48 L86 46 L83 52 L80 30 Z"/>
    <circle cx="80" cy="27" r="5.5"/>
  </g>
  <g fill="#c9b07d">
    <path d="M128 40 q8 -16 18 -22" stroke="#c9b07d" stroke-width="1.5" fill="none"/>
    <ellipse cx="139" cy="22" rx="5" ry="2.6" transform="rotate(-40 139 22)"/>
    <ellipse cx="134" cy="30" rx="5" ry="2.6" transform="rotate(-10 134 30)"/>
    <ellipse cx="144" cy="30" rx="5" ry="2.6" transform="rotate(-70 144 30)"/>
  </g>
</svg>`;
const ORNAMENTO = `<svg class="cartao-ornamento" viewBox="0 0 240 20" aria-hidden="true" fill="none" stroke="#c4a06a" stroke-width="1.3" stroke-linecap="round">
  <path d="M10 10 H96"/><path d="M144 10 H230"/>
  <path d="M96 10 c6 -8 14 -8 16 0 c-2 6 -9 5 -9 0"/><path d="M144 10 c-6 -8 -14 -8 -16 0 c2 6 9 5 9 0"/>
  <path d="M120 4 l4 6 -4 6 -4 -6 Z" fill="#e5b9bf" stroke="#c98d96"/>
</svg>`;
const RAMO = `<svg viewBox="0 0 120 160" aria-hidden="true"><g fill="#d9b9b4" stroke="none">
  <path d="M10 155 C40 110 60 70 105 10" stroke="#d9b9b4" stroke-width="2" fill="none"/>
  ${[[30,125,-30],[42,105,40],[52,88,-35],[64,70,45],[74,54,-30],[86,38,50],[96,24,-20]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="13" ry="5.5" transform="rotate(${r} ${x} ${y})"/>`).join("")}
</g></svg>`;

const contatosCartao = CONTATO.telefones.map(t => `<span>${ICONE_WHATS}${t.nome} ${t.numero}</span>`).join("")
  + `<span>${ICONE_INSTA}<span class="cartao-insta"></span></span>`;

document.querySelectorAll("[data-cartao]").forEach(c => {
  c.innerHTML = `
    <div class="cartao-ramo cartao-ramo-1">${RAMO}</div>
    <div class="cartao-ramo cartao-ramo-2">${RAMO}</div>
    <div class="cartao-ramo cartao-ramo-3">${RAMO}</div>
    <div class="cartao-ramo cartao-ramo-4">${RAMO}</div>
    <div class="cartao-conteudo">
      ${CESTA}
      <p class="cartao-nome"></p>
      <p class="cartao-slogan"></p>
      ${ORNAMENTO}
      <p class="cartao-frase"></p>
      <div class="cartao-contatos">${contatosCartao}</div>
    </div>`;
  c.querySelector(".cartao-nome").textContent = LOJA.nome;
  c.querySelector(".cartao-slogan").textContent = LOJA.slogan;
  c.querySelector(".cartao-frase").textContent = LOJA.frase;
  c.querySelector(".cartao-insta").textContent = CONTATO.instagramTexto;
});

// Galeria com filtros
const galeria = document.querySelector(".galeria");
const filtros = document.querySelector(".filtros");
const categorias = ["Todas", ...new Set(PRODUTOS.map(p => p.categoria))];

function mostrar(categoria) {
  galeria.innerHTML = "";
  PRODUTOS.filter(p => categoria === "Todas" || p.categoria === categoria).forEach(p => {
    const card = document.createElement("button");
    card.className = "produto";
    card.innerHTML = `
      <div class="produto-foto"><img loading="lazy" alt=""></div>
      <div class="produto-info"><span></span><h3></h3></div>`;
    const img = card.querySelector("img");
    usarFlorSeFaltar(img);
    img.src = p.foto;
    img.alt = p.nome;
    card.querySelector("span").textContent = p.categoria;
    card.querySelector("h3").textContent = p.nome;
    card.addEventListener("click", () => abrir(p, img.src));
    galeria.appendChild(card);
  });
  filtros.querySelectorAll(".filtro").forEach(b => b.setAttribute("aria-selected", b.textContent === categoria));
}

categorias.forEach(c => {
  const b = document.createElement("button");
  b.className = "filtro";
  b.setAttribute("role", "tab");
  b.textContent = c;
  b.addEventListener("click", () => mostrar(c));
  filtros.appendChild(b);
});
mostrar("Todas");

// Foto ampliada
const lightbox = document.querySelector(".lightbox");
function abrir(p, src) {
  lightbox.querySelector("img").src = src;
  lightbox.querySelector("img").alt = p.nome;
  lightbox.querySelector("h3").textContent = p.nome;
  lightbox.querySelector("p").textContent = p.descricao;
  lightbox.showModal();
}
lightbox.querySelector(".fechar").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", e => { if (e.target === lightbox) lightbox.close(); });
