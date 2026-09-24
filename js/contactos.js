// contacto.js - Validaciones del formulario de contacto

document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('formulario-contacto');
  if (!formulario) return;

  formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const asunto = document.getElementById('asunto').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    let errores = [];

    if (nombre === '') errores.push('El nombre es obligatorio');
    if (correo === '') errores.push('El correo es obligatorio');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) errores.push('Correo inválido');
    if (asunto === '') errores.push('El asunto es obligatorio');
    if (mensaje === '') errores.push('El mensaje es obligatorio');

    const mensajeError = document.getElementById('mensaje-error');

    if (errores.length > 0) {
      mensajeError.innerHTML = errores.join('<br>');
      mensajeError.style.color = 'red';
    } else {
      mensajeError.innerHTML = '¡Mensaje enviado correctamente!';
      mensajeError.style.color = 'green';
      formulario.reset();
    }
  });
});