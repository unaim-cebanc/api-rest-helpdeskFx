function log_request(req) {
    console.log('--- Request ---');
    console.log(`url: ${req.url}`);
    console.log(`Metodo: ${req.method}`);
    console.log('-'.repeat(15));
}

function log_response(res, body) {
    console.log('--- Response ---');
    console.log(`Estado: ${res.statusCode}`);
    console.log(`Respuesta: ${JSON.stringify(body)}`);
}

module.exports = {
    log_request: log_request,
    log_response: log_response
}