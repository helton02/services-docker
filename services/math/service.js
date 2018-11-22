'use strict';
let http = require('http');
let Router = require('router');
let os = require('os');

let myRouter = new Router();
const port = 8002;

myRouter.post('/add', (req, res) => addParams(req, res));

myRouter.post('/multiply', (req, res) => multiplyParams(req, res));


http.createServer(function (req, res) {
    myRouter(req, res, function() {});
}).listen(port,'0.0.0.0');
console.log('Server listening on port', port);


async function extractBody(req) {
    let body = '';
    return new Promise((resolve, reject) => {
        req.on('data', data => { body += data });
        req.on('end', () => {
            resolve(body);
        });
    });
}

async function addParams(req, res) {
    let body = await extractBody(req);
    let params = JSON.parse(body).params;
    res.write(`HOST - ${os.hostname()}\n`);
    res.end(add(params).toString());
}

async function multiplyParams(req, res) {
    let body = await extractBody(req);
    let params = JSON.parse(body).params;
    res.write(`HOST - ${os.hostname()}\n`);
    res.end(multiply(params).toString());
}

function add(params) {
    return params.reduce((total, item) => total += item, 0);
}

function multiply(params) {
    return params.reduce((total, item) => total *= item, 1);
}