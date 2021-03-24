const webpack = require('webpack');
// const { resolve } = require('path');
const shell = require('shelljs');
const util = require('util');
const config = require('./webpack.config');

// const Webpack = util.promisify(webpack)

shell.rm('-rf', config.output.path);

global.watch = webpack(config, (error, stats) => {
    if (error) {
        return console.error(error);
    }
    console.log('complete compiler....');
    
    // console.log(stats);
    console.log(`耗时：${(stats.endTime - stats.startTime)/ 1000}`)
})
// console.log(global.watch);