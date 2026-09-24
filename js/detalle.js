// detalle.js - Carga el detalle de una noticia según el ID de la URL

document.addEventListener('DOMContentLoaded', async () => {
  const contenedor = document.getElementById('detalle-contenido');
  const enlaceVolver = document.getElementById('volver');
  if (!contenedor) return;

  // Obtener parámetros de la URL
  const params = new URLSearchParams(window.location.search);
  let id = parseInt(params.get('id'));
  const desde = params.get('desde'); // 👈 Leer "desde"

  // Cargar todas las noticias
  const noticias = await cargarNoticias();

  // Si no hay ID, usar la última noticia vista o la primera
  if (!id || isNaN(id)) {
    const ultimaVista = localStorage.getItem('ultimaNoticia');
    id = ultimaVista ? parseInt(ultimaVista) : noticias[0].id;
  }

  const noticia = noticias.find(n => n.id === id);

  if (!noticia) {
    contenedor.innerHTML = '<p>Noticia no encontrada.</p>';
    return;
  }

  // Guardar la noticia actual como última vista
  localStorage.setItem('ultimaNoticia', noticia.id);

  // 👇 CONFIGURAR EL BOTÓN "VOLVER" según el parámetro "desde"
  if (enlaceVolver) {
    if (desde === 'favoritos') {
      enlaceVolver.href = 'favoritos.html';
      enlaceVolver.textContent = '← Volver a favoritos';
    } else if (desde === 'listado') {
      enlaceVolver.href = 'listado.html';
      enlaceVolver.textContent = '← Volver al listado';
    } else {
      enlaceVolver.href = 'index.html';
      enlaceVolver.textContent = '← Volver al inicio';
    }
  }

  // Renderizar el detalle
  contenedor.innerHTML = `
    <img src="${noticia.imagen}" alt="${noticia.titulo}" class="detalle-imagen">
    <span class="badge">${noticia.categoria}</span>
    <h1>${noticia.titulo}</h1>
    <p class="metadatos">Por: ${noticia.autor} | Fecha: ${noticia.fecha}</p>
    <p class="contenido">${noticia.contenido}</p>
    <div class="detalle-botones">
      <button class="btn-favorito" onclick="toggleFavorito(${noticia.id})">❤ Agregar a favoritos</button>
      <a href="contacto.html" class="btn-secundario">📧 Contactar</a>
    </div>
  `;
});