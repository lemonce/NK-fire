'use strict';
const electron = require('electron');
const path = require('path');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const cwd = process.cwd();
const configPath = path.resolve(cwd, 'config.json');
const config = require(configPath);

const url = require('url');

require('../server');

let mainWindow;

const configPage = url.format({
	pathname: `localhost:${config.port}/config`,
	protocol: 'http:',
	slashes: true
});

function createWindow () {
	mainWindow = new BrowserWindow({width: 800, height: 600});
	mainWindow.setMenu(null);
	mainWindow.maximize();
	mainWindow.loadURL(configPage);

	mainWindow.on('closed', function () {
		mainWindow = null;
	});
	
	const { webContents } = mainWindow;
	let devToolsOpened = false;

	webContents.on('before-input-event', (event, input) => {
		if (input.key === 'F12' && input.type === 'keyDown') {
			devToolsOpened
				? webContents.closeDevTools()
				: webContents.openDevTools();
		}
	});

	webContents.on('devtools-opened', () => devToolsOpened = true);
	webContents.on('devtools-closed', () => devToolsOpened = false);
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