'use strict';
const electron = require('electron');
const path = require('path');
const fse = require('fs-extra');
const url = require('url');
const { spawn } = require('child_process');

const { app, dialog, BrowserWindow } = electron;

const handler = require('../handler');
const cwd = process.cwd();
const configJsonPath = path.resolve(cwd, 'config.json');
const configPagePath = path.resolve(__dirname, '../../dist');
const passwordPath = path.resolve(cwd, 'ldslib.dll');
const { devServer } = require('../../build/config/webpack.base');

if (!fse.existsSync(configJsonPath)) {
	fse.outputJsonSync(configJsonPath, {
		staticPath: configPagePath,
		port: 8888
	});
}

if (!fse.existsSync(passwordPath)) {
	fse.writeFileSync(passwordPath, '88888888', { encoding: 'base64' });
}

const config = require(configJsonPath);
let port = config.port;

function startWebpackDevServer() {
	port = devServer.port;
	spawn('npm.cmd', ['run', 'dev-server']);
}
if (process.argv.splice(2) == 'dev') {
	startWebpackDevServer();
}

require('../server');

let mainWindow;

const configPage = url.format({
	pathname: `localhost:${port}/config/`,
	protocol: 'http:',
	slashes: true
});

const staticPage = url.format({
	pathname: `localhost:${config.port}`,
	protocol: 'http:',
	slashes: true
});

function selectPath() {
	const filePaths = dialog.showOpenDialog({defaultPath: cwd});
	if (!filePaths) {
		return config.staticPath;
	}

	const reg = /^(.*)\\[^\\]*$/;
	const result = filePaths[0].replace(reg, '$1');
	config.staticPath = result;
	fse.outputJsonSync(configJsonPath, config);

	return result;
}

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
			selectPath();
			handler.call('server.restart');
			mainWindow.loadURL(staticPage);
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

handler.define('select-preview-path', selectPath);

handler.define('confirm-static-path', function () {
	mainWindow.loadURL(staticPage);
	mainWindow.setFullScreen(true);
});