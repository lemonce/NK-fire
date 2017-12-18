'use strict';
const path = require('path');
const fse = require('fs-extra');
const cwd = process.cwd();

const configPath = path.resolve(cwd, 'config.json');

const config = {
	staticPath: path.resolve(cwd, 'dist'),
	port: 8888
};

fse.outputJsonSync(configPath, config);