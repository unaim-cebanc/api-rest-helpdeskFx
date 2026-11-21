const http = require('node:http');
const { yellowBold, cyanBold, redBold, greenBold, gris } = require('./colores');

function log_request(req) {
    console.log(cyanBold('\n--- Request ---'));
    console.log(gris('url:'), yellowBold(req.url));
    console.log(gris('Metodo:'), yellowBold(req.method));
    console.log(cyanBold('-'.repeat(15)));
}

function log_response(res, body) {
    const statusMsg = http.STATUS_CODES[res.statusCode];
    console.log(cyanBold('\n--- Response ---'));
    if (res.statusCode === 404) {
        console.log(gris('Estado:'), redBold(`${res.statusCode} ${statusMsg}`));
    } else {
        console.log(gris('Estado:'), greenBold(`${res.statusCode} ${statusMsg}`))
    }
    console.log(gris('Respuesta:'), yellowBold(JSON.stringify(body)));
    console.log(cyanBold('-'.repeat(16)));
}

module.exports = {
    log_request: log_request,
    log_response: log_response
}