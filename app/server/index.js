const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const fse = require('fs-extra');
const _ = require('lodash');

const cwd = process.cwd();
const configPath = path.resolve(cwd, 'config.json');
const configPagePath = path.resolve(cwd, 'dist');
const config = require(configPath);

function getStaticPath(req, res) {
	res.status(200).json(config.staticPath);
}

function modifyStaticPath(req, res) {
	config.staticPath = req.body.path;
	fse.outputJsonSync(configPath, config);
	res.status(200).json('done');
	restartServer();
}

function appFactory(staticPath) {
	const app = express();

	app.use(bodyParser.json({ type: '*/json', limit: '32mb' }));
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use('/config/', express.static(configPagePath));
	app.use('/', express.static(staticPath || configPagePath));
	app.put('/config/staticPath', modifyStaticPath);
	app.get('/config/staticPath', getStaticPath);

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
		socketPool.splice(index, 1);
	});
}

function restartServer() {
	destoryAllSocket();
	server && server.close();
	server = null;

	server = http.createServer(appFactory(config.staticPath)).listen(config.port);
	server.on('connection', socket => {
		socketPool.push(socket);
		socket.once('close', () => removeSocket(socket));
	});
}

restartServer();