'use strict'

const express = require('express'),
	server = express(),
	bodyParser = require('body-parser'),
	models = require('./models'),
	config = require('./config.js'),
	expressFileUpload = require('express-fileupload'),
    json2xls = require('json2xls'),
    kue = require('kue'),
    queue = kue.createQueue(),
    Router = require('./Router');

const INDEX_ROUTE = '/api/1.0';

server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(bodyParser.json());
server.use(expressFileUpload());
server.use(json2xls.middleware);
server.use((err, req, res, next) => {
    console.log(err.status);
});

//CORS
if (process.env.NODE_ENV !== 'production') {
    server.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
        next();
    });
}

function init() {
    return models.sequelize.authenticate();
}

init().then(() => {
    let router = new Router(server, INDEX_ROUTE);
    router.addEventsListeners(models, queue);
});

server.listen(config.serverPort, () => {
  console.log('Server listening on port ' + config.serverPort);
});

process.on('unhandledRejection', error => {
    console.log(error);
    process.exit(1);
});