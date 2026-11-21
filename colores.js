const pc = require('picocolors');

function yellowBold(msg) {
    return pc.yellow(pc.bold(msg));
}

function cyanBold(msg) {
    return pc.cyan(pc.bold(msg));
}

function redBold(msg) {
    return pc.red(pc.bold(msg));
}

function greenBold(msg) {
    return pc.green(pc.bold(msg));
}

function grey(msg) {
    return pc.grey(msg);
}

module.exports = {
    yellowBold: yellowBold,
    cyanBold: cyanBold,
    redBold: redBold,
    greenBold: greenBold,
    grey: grey
};