'use strict';
let http = require('http');
let Router = require('router');
let os = require('os');
let serviceReg = require('./registration')();

let myRouter = new Router();
const Port = 8001;
const ServiceId = 'hello-service';
const RegistFrequency = 2000;

//Routes
myRouter.get('/', sayHello(req, res));


//Server
http.createServer(function (req, res) {
    myRouter(req, res, function() {});
}).listen(Port,'0.0.0.0');
console.log('Server listening on port', Port);


//Regist service frequently
setInterval(() => {
    let info = { id: ServiceId, address: 'http://localhost:' + Port };
    serviceReg.register('http://localhost:5002/regist', info, (error) => {
        if (error) console.log('WARNING::','REGISTRATION', error);
    });
}, RegistFrequency);


function sayHello(req, res) {
    res.write(`HOST - ${os.hostname()}\n`);
    res.end(`Hello world`);
}