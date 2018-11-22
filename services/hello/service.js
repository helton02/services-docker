'use strict';
let http = require('http');
let Router = require('router');
let os = require('os');

let myRouter = new Router();
const port = 8001;

myRouter.get('/', (req, res) => {
    res.write(`HOST - ${os.hostname()}\n`);
    res.end(`Hello world`);
});

http.createServer(function (req, res) {
    myRouter(req, res, function() {});
}).listen(port,'0.0.0.0');

console.log('Server listening on port', port);