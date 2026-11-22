// --- Librerias ---
const express = require('express');
const fs = require('node:fs');
const path = require('path');
const { log_request, log_response } = require('./logs');
const { yellowBold } = require('./colores');

// --- Archivos JSON ---
const incidencias = require('./data/incidencias.json');
const clientes = require('./data/clientes.json');

// --- Paths ---
const pathInc = path.join(__dirname, 'data', 'incidencias.json');
const pathCli = path.join(__dirname, 'data', 'clientes.json');

// --- Servidor ---
const app = express();
const port = 5082;
const errorMsg = { error: 'No encontrado' };
app.use(express.json());


// --- --- Incidencias --- ---
app.get('/api/incidencias', (req, res) => {
    log_request(req);
    res.json(incidencias);
    log_response(res, incidencias);
});

app.get('/api/incidencias/:codigo', (req, res) => {
    log_request(req);
    const codigo = String(req.params.codigo);
    const incidencia = incidencias.find(i => i.codigo === codigo);
    
    if (!incidencia) {
        res.status(404).json(errorMsg);
        log_response(res, errorMsg);
        return;
    }
    
    res.status(200).json(incidencia);
    log_response(res, incidencia);
});

app.post('/api/incidencias', (req, res) => {
    log_request(req);
    
    const codigo = Number(incidencias[incidencias.length - 1].codigo.replace('H', ''))
    const incidencia = {
        "codigo": "H" + String(codigo + 1).padStart(3, '0'),
        "titulo": req.body.titulo,
        "prioridad": req.body.prioridad,
        "fecha": req.body.fecha,
        "descripcion": req.body.descripcion,
        "estado": "Pendiente"
    };
    
    incidencias.push(incidencia);
    fs.writeFileSync(pathInc, JSON.stringify(incidencias, null, 4));
    
    res.status(201).json(incidencia);
    log_response(res, incidencia);
});


// --- --- Clientes --- ---
app.get('/api/clientes', (req, res) => {
    log_request(req);
    res.status(200).json(clientes);
    log_response(res, clientes);
});

app.get('/api/clientes/:id', (req, res) => {
    log_request(req);
    
    const id = Number(req.params.id);
    const cliente = clientes.find(c => c.id === id);
    
    if (!cliente) {
        res.status(404).json(errorMsg);
        log_response(res, errorMsg);
        return;
    }
    
    res.status(200).json(cliente);
    log_response(res, cliente);
});

app.post('/api/clientes', (req, res) => {
    log_request(req);
    
    const id = clientes[clientes.length - 1].id;
    const cliente = {
        "id": id,
        "nombre": req.body.nombre,
        "email": req.body.nombre,
        "telefono": req.body.telefono
    }
    
    clientes.push(cliente);
    fs.writeFileSync(pathCli, JSON.stringify(clientes, null, 4));
    
    res.status(201).json(cliente);
    log_response(res, cliente);
});

app.put('/api/clientes/:id', (req, res) => {
    log_request(req);
    
    const id = Number(req.params.id);
    const index = clientes.findIndex(c => c.id === id);
    
    if (index === -1) {
        res.status(404).json(errorMsg);
        log_response(res, errorMsg);
        return;
    }
    
    clientes[index] = {
        "id": id,
        "nombre": req.body.nombre || clientes[index].nombre,
        "email": req.body.email || clientes[index].email,
        "telefono": req.body.telefono || clientes[index].telefono
    };
    fs.writeFileSync(pathCli, JSON.stringify(clientes, null, 4));
    
    res.status(200).json(clientes[index]);
    log_response(res, clientes[index]);
});

app.delete('/api/clientes/:id', (req, res) => {
    log_request(req);
    
    const id = Number(req.params.id);
    const index = clientes.findIndex(c => c.id === id);
    if (index === -1) {
        res.status(404).json(errorMsg);
        log_response(res, errorMsg);
        return;
    }
    
    clientes.slice(clientes[index]);
    fs.writeFileSync(pathCli, JSON.stringify(clientes, null, 4));
    
    res.status(200).json({ message: 'Se ha eliminado correctamente' });
    log_response(res, { message: 'Se ha eliminado correctamente' });
})

app.use((req, res) => {
    log_request(req);
    res.status(404).json(errorMsg);
    log_response(res, errorMsg);
});

app.listen(port, () => {
    console.log(yellowBold(`Escuchando en el puerto ${port}`));
});