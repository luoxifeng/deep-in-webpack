const { resolve } = require('path');
const chalk = require('chalk');

module.exports = {
    context: resolve(__dirname, './'),
    mode: 'development',
    devtool: 'none',
    watch: true,
    entry: {
        home: './src/home/index.js',
        list: './src/list/index.js'
    },
    output: {
        path: resolve(__dirname, './dist'),
        filename: '[name].js',
        publicPath: '/static/'
        // library: '__MY_LIB__'
    },
    plugins: [
        function() {
            this.hooks.environment.tap('environment', function() {
                console.log(`compiler call plugins: ${chalk.yellow('test compiler environment hooks apply')}`);
            })
        },
        function() {
            this.hooks.beforeRun.tap('beforeRun', function() {
                console.log(`compiler call plugins: ${chalk.yellow('test compiler beforeRun hooks apply')}`);
            })
        },
        function() {
            this.hooks.watchRun.tapAsync('watchRun', function(watch, cb) {
                console.log(`compiler call plugins: ${chalk.yellow('test compiler watchRun hooks apply')}`);
                cb();
            })
        },
        function() {
            this.hooks.watchClose.tap('watchClose', function() {
                console.log(`compiler call plugins: ${chalk.yellow('test compiler watchClose hooks apply')}`);
            })
        }
    ]
}