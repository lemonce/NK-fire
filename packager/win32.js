'use strict';
const {resolve} = require('path');
const packager = require('electron-packager');
const config = require('../package.json');console.log(config.productName);
const sharedConf = require('./shared-config.js');

const packageOpts = Object.assign({
	icon: resolve(__dirname, '../icons/Lemonce.ico'),
	platform: 'win32',
	arch: 'ia32',
	win32metadata: {
		CompanyName: 'Or-change',
		FileDescription: 'Lemonce Display System',
		ProductName: config.productName,
		LegalCopyright: `©2014 - ${new Date().getFullYear()} Or-change`
	}
}, sharedConf);

packager(packageOpts, err => {
	if (err) throw err;
	console.log('Built win32 version'); // eslint-disable-line no-console
});
