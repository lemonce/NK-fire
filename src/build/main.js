const electron = require('electron');
const http = require('http');
const express = require('express');
const expressApp = express();

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

expressApp.use(express.static(__dirname));

http.createServer(expressApp).listen(8888);

let mainWindow;

function createWindow () {
	mainWindow = new BrowserWindow({fullscreen: true});
	mainWindow.setMenu(null);
	mainWindow.loadURL(url.format({
		pathname: 'localhost:8888',
		protocol: 'http:',
		slashes: true
	}));

	mainWindow.on('closed', function () {
		mainWindow = null;
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function () {
	if (mainWindow === null) {
		createWindow();
	}
});