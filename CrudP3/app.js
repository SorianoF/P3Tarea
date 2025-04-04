let pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
let editandoId = null;

// DOM
const form = document.getElementById('patientForm');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido'); // Nuevo campo
const dni = document.getElementById('dni');
const edad = document.getElementById('edad');
const lista = document.getElementById('listaPacientes');
const buscar = document.getElementById('buscar');

function mostrarPacientes(filtro = '') {
  lista.innerHTML = '';

  const filtrados = pacientes.filter(p =>
    (p.nombre + ' ' + p.apellido).toLowerCase().includes(filtro.toLowerCase())
  );

  filtrados.forEach(p => {
    const li = document.createElement('li');
    li.className = 'paciente';
    li.innerHTML = `
      <p><strong>Nombre:</strong> ${p.nombre} ${p.apellido}</p>
      <p><strong>DNI:</strong> ${p.dni}</p>
      <p><strong>Edad:</strong> ${p.edad}</p>
      <button onclick="editarPaciente(${p.id})">Editar</button>
      <button onclick="eliminarPaciente(${p.id})">Eliminar</button>
    `;
    lista.appendChild(li);
  });
}

form.addEventListener('submit', e => {
    e.preventDefault();
  
    const paciente = {
      id: editandoId || Date.now(),
      nombre: nombre.value.trim(),
      apellido: apellido.value.trim(),
      dni: dni.value.trim(),
      edad: edad.value.trim()
    };
  
    if (editandoId) {
      pacientes = pacientes.map(p => (p.id === editandoId ? paciente : p));
      editandoId = null;
    } else {
      pacientes.push(paciente);
    }
  
    guardarYMostrar();
    form.reset();
  });