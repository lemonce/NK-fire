'use strict';
const electron = require('electron');
const { dialog } = electron;
const path = require('path');
const fse = require('fs-extra');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const cwd = process.cwd();
const configJsonPath = path.resolve(cwd, 'config.json');
const configPagePath = path.resolve(__dirname, '../../dist');

if (!fse.existsSync(configJsonPath)) {
	fse.outputJsonSync(configJsonPath, {
		staticPath: configPagePath,
		port: 8888
	});
}


const config = require(configJsonPath);

const url = require('url');

const { restart } = require('../server');

let mainWindow;

const configPage = url.format({
	pathname: `localhost:${config.port}/config`,
	protocol: 'http:',
	slashes: true
});

const staticPage = url.format({
	pathname: `localhost:${config.port}`,
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

	webContents.on('before-input-event', (event, input) => {
		if (input.key === 'F11' && input.type === 'keyDown') {
			dialog.showOpenDialog({defaultPath: cwd}, filePaths => {
				const reg = /^(.*)\\[^\\]*$/;
				config.staticPath = filePaths[0].replace(reg, '$1');
				fse.outputJsonSync(configJsonPath, config);
				restart();

				mainWindow.loadURL(staticPage);
				mainWindow.setFullScreen(true);
			});
		}
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