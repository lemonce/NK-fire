'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const router = require('./router');

const handler = require('../handler');
const cwd = process.cwd();
const configJsonPath = path.resolve(cwd, 'config.json');
const configPagePath = path.resolve(__dirname, '../../dist');

function appFactory(staticPath) {
	const app = express();

	app.use(bodyParser.json({ type: '*/json', limit: '32mb' }));
	app.use(bodyParser.urlencoded({ extended: false }));
	
	app.use('/config/', express.static(configPagePath));
	app.use('/', express.static(staticPath || configPagePath));
	app.use('/api', router);

	return app;
}

let server = null;
const socketPool = [];

function removeSocket(socket) {
	socketPool.splice(socketPool.indexOf(socket), 1);
}

function destoryAllSocket() {
	socketPool.forEach(function(socket, index) {
		socket.destroy();
	});
}

function restartServer() {
	destoryAllSocket();
	server && server.close();
	server = null;

	const config = require(configJsonPath);
	server = http.createServer(appFactory(config.staticPath)).listen(config.httpPort);
	server.on('connection', socket => {
		socketPool.push(socket);
		socket.once('close', () => removeSocket(socket));
	});
}

handler.define('server.restart', restartServer);

restartServer();