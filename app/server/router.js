'use strict';
const express = require('express');
const fse = require('fs-extra');
const path = require('path');
const handler = require('../handler');
const cwd = process.cwd();
const configJsonPath = path.resolve(cwd, 'config.json');
const passwordPath = path.resolve(cwd, 'ldslib.dll');
const router = new express.Router();

function checkPassword(password) {
	const correctPassword = fse.readFileSync(passwordPath, { encoding: 'utf8' });
	if (correctPassword !== password) {
		return false;
	}

	return true;
}

function getStaticPath(req, res) {
	res.status(200).json(require(configJsonPath).staticPath);
}

function getProductName(req, res) {
	res.status(200).json(require(configJsonPath).productName);
}

function setFullscreen(req, res) {
	handler.call('win.setFullscreen');
	res.status(200).json('done');
}

function selectPreviewPath(req, res) {
	const path = handler.call('win.selectPreviewPath');
	res.status(200).json(path);
	handler.call('server.restart');
}

function cancelFullscreen(req, res) {
	handler.call('win.cancelFullscreen');
	res.status(200).json('done');
}

function login(req, res) {
	if (!checkPassword(req.body.password)) {
		res.status(401).json('wrong password');
		return;
	}

	res.status(200).json('success');
}

router.get('/config/staticPath', getStaticPath);
router.get('/config/productName', getProductName);

router.get('/config/previewPath', selectPreviewPath);
router.post('/win/fullscreen', setFullscreen);
router.delete('/win/fullscreen', cancelFullscreen);
router.post('/login', login);

module.exports = router;
