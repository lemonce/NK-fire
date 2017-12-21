'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const router = new express.Router();

const handler = require('../main/handler');
const cwd = process.cwd();
const configJsonPath = path.resolve(cwd, 'config.json');
const configPagePath = path.resolve(__dirname, '../../dist');
let config = require(configJsonPath);

router.get('/config/staticPath', getStaticPath);

router.get('/config/previewPath', selectPreviewPath);
router.put('/config/staticPath', confirmStaticPath);

function getStaticPath(req, res) {
	res.status(200).json(config.staticPath);
}

function confirmStaticPath(req, res) {
	handler.get('confirm-static-path')();
	res.status(200).json('done');
}

function selectPreviewPath(req, res) {
	const path = handler.get('select-preview-path')();
	res.status(200).json(path);
	restartServer();
}

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
		socketPool.splice(index, 1);
	});
}

const restartServer = exports.restart = function restartServer() {
	destoryAllSocket();
	server && server.close();
	server = null;

	config = require(configJsonPath);
	server = http.createServer(appFactory(config.staticPath)).listen(config.port);
	server.on('connection', socket => {
		socketPool.push(socket);
		socket.once('close', () => removeSocket(socket));
	});
};

restartServer();