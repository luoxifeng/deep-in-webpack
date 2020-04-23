const webpack = require('webpack');
// const { resolve } = require('path');
const shell = require('shelljs');
const config = require('./webpack.config');

shell.rm('-rf', config.output.path);
webpack(config);

console.log('---------');
