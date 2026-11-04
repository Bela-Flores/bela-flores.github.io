// =============================================================
//  EDITE AQUI: seus dados de contato
// =============================================================
const CONTATO = {
  nome: "Isabela",
  telefone: "(19) 99374-4383",   // como aparece no site
  whatsapp: "5519993744383",     // só números: 55 + DDD + número
};

// =============================================================
//  EDITE AQUI: seus produtos
//  Coloque as fotos na pasta "fotos" e escreva o nome do arquivo.
// =============================================================
const PRODUTOS = [
  { nome: "Buquê de Rosas Vermelhas", categoria: "Buquês",   foto: "fotos/buque-rosas.jpg",     descricao: "Rosas vermelhas colombianas com folhagens e papel kraft." },
  { nome: "Buquê do Campo",           categoria: "Buquês",   foto: "fotos/buque-campo.jpg",     descricao: "Flores do campo coloridas, leves e cheias de alegria." },
  { nome: "Arranjo de Girassóis",     categoria: "Arranjos", foto: "fotos/arranjo-girassol.jpg", descricao: "Girassóis em vaso de cerâmica para iluminar qualquer ambiente." },
  { nome: "Arranjo Delicado",         categoria: "Arranjos", foto: "fotos/arranjo-delicado.jpg", descricao: "Tons de rosa e branco em cesto de palha." },
  { nome: "Orquídea Phalaenopsis",    categoria: "Plantas",  foto: "fotos/orquidea.jpg",        descricao: "Orquídea elegante que dura semanas com pouco cuidado." },
  { nome: "Suculentas em Vasinho",    categoria: "Plantas",  foto: "fotos/suculentas.jpg",      descricao: "Mix de suculentas, perfeito para presentear." },
  { nome: "Cesta de Café da Manhã",   categoria: "Presentes", foto: "fotos/cesta.jpg",          descricao: "Flores acompanhadas de mimos para um bom-dia especial." },
  { nome: "Box Rosas e Chocolates",   categoria: "Presentes", foto: "fotos/box-rosas.jpg",      descricao: "Caixa com rosas e chocolates finos." },
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
}

// Preenche nome, telefone e links
document.querySelectorAll("[data-nome]").forEach(el => el.textContent = CONTATO.nome);
document.querySelectorAll("[data-telefone]").forEach(el => el.textContent = CONTATO.telefone);
document.querySelectorAll("[data-ano]").forEach(el => el.textContent = new Date().getFullYear());
const mensagem = encodeURIComponent(`Oi, ${CONTATO.nome}! Vi o site da Bela Flores e gostaria de saber mais.`);
document.querySelectorAll("[data-whatsapp]").forEach(el => el.href = `https://wa.me/${CONTATO.whatsapp}?text=${mensagem}`);
document.querySelectorAll("[data-ligar]").forEach(el => el.href = `tel:+${CONTATO.whatsapp}`);
document.querySelectorAll("img[data-fallback]").forEach(usarFlorSeFaltar);

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
