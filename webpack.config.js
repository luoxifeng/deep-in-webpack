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
    module: {
        rules: [
            {
                test: /\.js$/,
                use: './webpack/loaders/test-loader'
            }
        ]
    },
    plugins: [
        /**
         * entryOption
         */
        function () {
            this.hooks.environment.tap('entryOption', function (...args) {
                console.log(`compiler call plugins: ${chalk.yellow('test compiler entryOption hooks apply')}`);
                console.log(args);
            })
        },

        /**
         * environment
         */
        function () {
            this.hooks.environment.tap('environment', function () {
                console.log(`compiler call plugins: ${chalk.yellow('test compiler environment hooks apply')}`);
            })
        },

        /**
         * beforeRun
         */
        function () {
            this.hooks.beforeRun.tap('beforeRun', function () {
                console.log(`compiler call plugins: ${chalk.yellow('test compiler beforeRun hooks apply')}`);
            })
        },

        /**
         * watch
         */
        function () {
            this.hooks.watchRun.tapAsync('watchRun', function (watch, cb) {
                console.log(`compiler call plugins: ${chalk.yellow('test compiler watchRun hooks apply')}`);
                cb();
            })
        },
        function () {
            this.hooks.watchClose.tap('watchClose', function () {
                console.log(`compiler call plugins: ${chalk.yellow('test compiler watchClose hooks apply')}`);
            })
        },

        /**
         * beforeCompile
         */
        function () {
            this.hooks.beforeCompile.tapAsync('beforeCompile', function (params, cb) {
                console.log(`compiler call plugins: ${chalk.yellow('test compiler beforeCompile hooks apply')}`);
                cb();
            })
        },

        /**
         * compile
         */
        function () {
            this.hooks.compile.tap('compile', function () {
                console.log(`compiler call plugins: ${chalk.yellow('test compiler compile hooks apply')}`);
            })
        },

        /**
         * thisCompilation
         */
        function () {
            this.hooks.thisCompilation.tap('thisCompilation', function () {
                console.log(`compiler call plugins: ${chalk.yellow('test compiler thisCompilation hooks apply')}`);
            })
        },

        /**
         * compilation
         */
        function () {
            this.hooks.compilation.tap('compilation', function () {
                console.log(`compiler call plugins: ${chalk.yellow('test compiler compilation hooks apply')}`);
            })
        },

        /**
         * afterCompile
         */
        function () {
            this.hooks.afterCompile.tapAsync('afterCompile', function (compilation, cb) {
                console.log(`compiler call plugins: ${chalk.yellow('test compiler afterCompile hooks apply')}`);
                cb();
            })
        },

        /**
         * assetEmitted
         */
        function () {
            this.hooks.assetEmitted.tapAsync('assetEmitted', function (file, content, cb) {
                console.log(`compiler call plugins: ${chalk.yellow('test compiler assetEmitted hooks apply')}`);
                console.log(file);
                cb();
            })
        },

        

        /**
         * done
         */
        function () {
            this.hooks.done.tap('done', function () {
                console.log(`compiler call plugins: ${chalk.yellow('test compiler done hooks apply')}`);
            })
        }
    ]
}
