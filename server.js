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

