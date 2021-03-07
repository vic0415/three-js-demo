var shell = require('shelljs');

shell.exec('tsc');
shell.exec('webpack --config ./webpack.config.dev.js --mode=development');
