'use strict';
const config = require('../package.json');

function filterDir(dir) {
	if (dir.match(/^\/app\/[bcgl]/) ||
		dir.match(/^\/packager/) ||
		dir.match(/^\/workspace/)) {
		return true;
	}

	if (~dir.indexOf('/.vscode') ||
		~dir.indexOf('/test')) {
		return true;
	}


	if (~dir.indexOf('eslint') ||
		~dir.indexOf('travis') ||
		~dir.indexOf('webpack.dev')) {
		return true;
	}

	return false;

}

module.exports = {
	asar: true,
	dir: '.',
	overwrite: true,
	prune: true,
	packageManager: 'npm',
	ignore: filterDir,
	name: 'nk-fire',
	appVersion: config.version,
	out: 'output'
};