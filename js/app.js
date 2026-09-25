// app.js - Lógica principal del sitio

async function cargarNoticias() {
  try {
    const respuesta = await fetch('data/noticias.json');
    const noticias = await respuesta.json();
    return noticias;
  } catch (error) {
    console.error('Error al cargar las noticias:', error);
    return [];
  }
}

function renderizarCards(noticias, contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;

  contenedor.innerHTML = '';

  // Obtener los favoritos actuales
  const favoritos = obtenerFavoritos();

  noticias.forEach(noticia => {
    // Verificar si esta noticia está en favoritos
    const esFavorito = favoritos.includes(noticia.id);

    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${noticia.imagen}" alt="${noticia.titulo}" onerror="this.style.background='#F3F4F6'; this.style.height='200px';">
      <div class="card-contenido">
        <h3>${noticia.titulo}</h3>
        <p>${noticia.descripcion}</p>
        <a href="detalle.html?id=${noticia.id}&desde=listado" class="btn-primario">Ver más</a>
        <span class="favorito ${esFavorito ? 'activo' : ''}" onclick="toggleFavorito(${noticia.id}, this)">❤</span>
      </div>
    `;
    contenedor.appendChild(card);
  });
}