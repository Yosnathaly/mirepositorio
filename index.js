const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
const path = require('path');
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); 
  });
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
  });

  app.get('/canciones', (req, res) => {

    const canciones = JSON.parse(fs.readFileSync('canciones.json'));
  
    res.json(canciones);
});

  app.post('/canciones', (req, res) => {
    const canciones = JSON.parse(fs.readFileSync("canciones.json"))
    const nuevaCancion = req.body;
	canciones.push(nuevaCancion);

	fs.writeFileSync('canciones.json', JSON.stringify(canciones));

	res.send('Canción agregada con éxito !!');})

  app.get('/canciones/:id', (req, res) => {
    const canciones = JSON.parse(fs.readFileSync('canciones.json'));
    const id = req.params.id;
    const cancion = canciones.find(c => c.id == id);
    res.json(cancion);  
  })

  app.put('/canciones/:id', (req, res) => {
    const id = req.params.id;
    const { titulo, artista, tono } = req.body;
  
    // Leer el archivo canciones.json
    const canciones = JSON.parse(fs.readFileSync('canciones.json'));
  
    // Buscar la canción por su ID
    const cancionIndex = canciones.findIndex(c => c.id == id);
  
    // Si no se encuentra la canción, devolver un error 404
    if (cancionIndex === -1) {
      return res.status(404).send('Canción no encontrada');
    }
  
    // Actualizar la información de la canción
    canciones[cancionIndex] = {
      ...canciones[cancionIndex],
      titulo,
      artista,
      tono
    };
  
    // Escribir de vuelta al archivo canciones.json
    fs.writeFileSync('canciones.json', JSON.stringify(canciones));
  
    // Enviar una respuesta de éxito
    res.send('Canción actualizada exitosamente');
  });
  app.delete("/canciones/:id", (req, res) => {
    const canciones = JSON.parse(fs.readFileSync("canciones.json"))
    const {id} =req.params
    const listanuevascanciones = canciones.filter(cancion => cancion.id != id)
    fs.writeFileSync('canciones.json', JSON.stringify(listanuevascanciones));
    res.send('Canción eliminada con exito !!');
    
})



module.exports = app

