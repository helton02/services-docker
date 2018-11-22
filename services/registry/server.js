'use strict';
let http = require('http');
let Router = require('router');
let os = require('os');

let myRouter = new Router();
const port = 5002;

let services = {};

myRouter.post('/regist', (req, res) => registerService(req, res));

myRouter.get('/services', (req, res) => viewServices(req, res));

myRouter.get('/*', (req, res) => unkownRequest(req, res));

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

async function registerService(req, res) {
    try {
        let body = await extractBody(req);
        let serviceParams = JSON.parse(body);
        if (!serviceParams.id || !serviceParams.address) {
            res.statusCode = 400;
            return res.end('Missing parameters');
        }
        services[serviceParams.id] = serviceParams.address;
        res.write(`HOST - ${os.hostname()}\n`);
        res.end('Service registered');
    } catch(error) {
        res.statusCode = 400;
        res.end();
    }
}

async function viewServices(req, res) {
    res.write(`HOST - ${os.hostname()}\n`);
    res.end(JSON.stringify(services));
}

function unkownRequest(req, res) {
    res.statusCode = 404;
    return res.end('Request not valid');
}