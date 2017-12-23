const path = require('path');
const fse = require('fs-extra');
const cwd = process.cwd();

const configJsonPath = path.resolve(cwd, 'config.json');
const configPagePath = path.resolve(__dirname, '../dist');
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

checkFiles();