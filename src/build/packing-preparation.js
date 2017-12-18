const fs = require('fs');

fs.copyFileSync('./src/build/main.js', './dist/main.js');
fs.copyFileSync('./package.json', './dist/package.json');

console.log('Packing preparation finish.');