'use strict';
let http = require('http');
let Router = require('router');
let myRouter = new Router();
const port = 8001;

myRouter.get('/', (req, res) => {
    res.end('Hello world');
});

http.createServer(function (req, res) {
    myRouter(req, res, function() {});
}).listen(port,'0.0.0.0');