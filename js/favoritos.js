// favoritos.js - Gestión de favoritos con localStorage

// Obtener favoritos del localStorage
function obtenerFavoritos() {
  const favoritos = localStorage.getItem('favoritos');
  return favoritos ? JSON.parse(favoritos) : [];
}

// Agregar o quitar de favoritos
// Agregar o quitar de favoritos
function toggleFavorito(id, elemento) {
  let favoritos = obtenerFavoritos();
  const index = favoritos.indexOf(id);

  if (index === -1) {
    // Agregar a favoritos
    favoritos.push(id);
    if (elemento) elemento.classList.add('activo');
  } else {
    // Quitar de favoritos
    favoritos.splice(index, 1);
    if (elemento) elemento.classList.remove('activo');
  }

  localStorage.setItem('favoritos', JSON.stringify(favoritos));

  // Si estamos en la página de favoritos, recargar la lista
  if (document.getElementById('contenedor-favoritos')) {
    renderizarFavoritos();
  }
}

// Renderizar favoritos en la página de favoritos
async function renderizarFavoritos() {
  const contenedor = document.getElementById('contenedor-favoritos');
  const contador = document.getElementById('contador-favoritos');
  if (!contenedor) return;

  const favoritos = obtenerFavoritos();
  const noticias = await cargarNoticias();
  const noticiasFavoritas = noticias.filter(n => favoritos.includes(n.id));

  if (contador) {
    contador.textContent = `Tienes ${noticiasFavoritas.length} noticias guardadas`;
  }

  if (noticiasFavoritas.length === 0) {
    contenedor.innerHTML = '<p>No tienes noticias favoritas aún.</p>';
    return;
  }

  contenedor.innerHTML = '';
 noticiasFavoritas.forEach(noticia => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <img src="${noticia.imagen}" alt="${noticia.titulo}">
    <div class="card-contenido">
      <h3>${noticia.titulo}</h3>
      <p>${noticia.descripcion}</p>
      <a href="detalle.html?id=${noticia.id}&desde=favoritos" class="btn-primario">Ver más</a>
      <span class="eliminar" onclick="toggleFavorito(${noticia.id})">✕</span>
    </div>
  `;
  contenedor.appendChild(card);
});
}

// Inicializar cuando se cargue la página
document.addEventListener('DOMContentLoaded', renderizarFavoritos);


// Toggle favorito desde el detalle (actualiza también el texto del botón)
function toggleFavoritoDetalle(id, elemento) {
  let favoritos = obtenerFavoritos();
  const index = favoritos.indexOf(id);

  if (index === -1) {
    // Agregar a favoritos
    favoritos.push(id);
    elemento.classList.add('activo');
    elemento.innerHTML = '❤ Quitar de favoritos';
  } else {
    // Quitar de favoritos
    favoritos.splice(index, 1);
    elemento.classList.remove('activo');
    elemento.innerHTML = '🤍 Agregar a favoritos';
  }

  localStorage.setItem('favoritos', JSON.stringify(favoritos));
}