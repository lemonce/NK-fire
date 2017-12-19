'use strict';
const {resolve} = require('path');
const compiler = require('innosetup-compiler');
const setting = require('../package.json');
const ProductName = setting.productName;
const version = setting.version;
const names = ProductName.split(/\s/);

compiler(resolve(__dirname, 'lemonce.iss'), {
	gui: false,
	verbose: false,
	'dRegValueName=': names.join(''),
	'dNameShort=': names[0],
	'dNameLong=': ProductName,
	'dNameVersion=': ProductName,
	'dExeBasename=': names[0],
	'dDirName=': ProductName,
	'dAppUserId=': names.join('.'),
	'dVersion=': version,
	'dArch=': process.arch
}, function(err) {
	if (err) throw err;
	else console.log('Build new installer.'); // eslint-disable-line no-console
});