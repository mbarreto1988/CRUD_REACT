import { useState } from 'react';

function App() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [descripcion, setDescripcion] = useState('');

  const mostrarDatos = () => {
    const data = {
      name: nombre,
      price: parseFloat(precio),
      quantity: parseInt(cantidad, 10),
      description: descripcion,
    };

    console.log("Enviando datos:", data);

    fetch("http://localhost:8080/productos", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.error || 'Error desconocido');
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("Respuesta de la API:", data);
      alert('Dato Cargado');
    })
    .catch((error) => {
      console.error('Error al cargar el dato:', error);
      alert('Error al cargar el dato: ' + error.message);
    });
  };

  return (
    <>
      <div className='App'>
        <div className='datos'>
          <label>Nombre: <input type="text" onChange={(event) => setNombre(event.target.value)} /></label>
          <label>Precio: <input type="number" onChange={(event) => setPrecio(event.target.value)} /></label>
          <label>Cantidad: <input type="number" onChange={(event) => setCantidad(event.target.value)} /></label>
          <label>Descripción: <input type="text" onChange={(event) => setDescripcion(event.target.value)} /></label>
          <button onClick={mostrarDatos}>Agregar</button>
        </div>
      </div>
    </>
  );
}

export default App;


