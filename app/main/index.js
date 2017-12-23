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

function checkFiles() {
	if (!fse.existsSync(configJsonPath)) {
		fse.outputJsonSync(configJsonPath, {
			productName: '南开消防支队党组织生活公开平台',
			staticPath: configPagePath,
			httpPort: 8888,
			devPort: 2000
		});
	}
	
	if (!fse.existsSync(passwordPath)) {
		fse.writeFileSync(passwordPath, '88888888', { encoding: 'utf8' });
	}
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

function startWebpackDevServer() {
	port = config.devPort;
	spawn('npm.cmd', ['run', 'dev-server']);
}



checkFiles();

const config = require(configJsonPath);
let port = config.httpPort;

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
	pathname: `localhost:${config.httpPort}`,
	protocol: 'http:',
	slashes: true
});

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