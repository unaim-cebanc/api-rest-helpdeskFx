// --- Librerias ---
const express = require('express');
const fs = require('node:fs');
const path = require('path');

// --- Archivos JSON ---
const incidencias = require('./data/incidencias.json');
const clientes = require('./data/clientes.json');

// --- Paths ---
const pathInc = path.join(__dirname, 'data', 'incidencias.json');
const pathCli = path.join(__dirname, 'data', 'clientes.json');

// --- Servidor ---
const app = express();
const port = 5080;
app.use(express.json());


// --- --- Incidencias --- ---
app.get('/api/incidencias', (req, res) => {
    res.json(incidencias);
});

app.get('/api/incidencias/:codigo', (req, res) => {
    const codigo = String(req.params.codigo);
    const incidencia = incidencias.find(i => i.codigo === codigo);
    
    if (!incidencia) {
        return res.status(404).json({ error: 'No se ha encontrado' });
    }
    res.status(200).json(incidencia);
});

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
});