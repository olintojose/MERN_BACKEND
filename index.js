const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//Crear ael servidor

const app = express();

//Conectar a la base de datos
conectarDB();

//Habilitar Cors
app.use(cors());

//Habilitar express.json


app.use(express.json({ extended: true }));

// Puerto de la app
const PORT = process.env.PORT || 4000;

//Importar Rutas

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));


//Definir home

app.get('/', (req, res) => {
    res.send('Home')
})

//Arrancar el servidor (app)
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});
