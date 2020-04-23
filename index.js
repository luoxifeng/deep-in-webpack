const webpack = require('webpack');
const config = require('./webpack.config');

webpack(config, function (err, stats) {
    console.log(`编译回调+++++++`, stats);
});

console.log('---------');
