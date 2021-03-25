const { resolve } = require('path');
const chalk = require('chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const requireDocPlugin = plugin => require(`./sdocs/PLugins/${plugin}`)
const requireMyPlugin = plugin => require(`./webpack/plugins/${plugin}`)

const { WebpackManifestPlugin } = requireDocPlugin('webpack-manifest-plugin');
const InjectPrependChunkPlugin = requireMyPlugin('InjectPrependChunkPlugin');


module.exports = {
  context: resolve(__dirname, './'),
  mode: 'development',
  devtool: 'source-map',
  watch: true,
  entry: {
    // home: ['./src/home/deps.js', './src/home/index.js'],
    list: './src/list/index.js'
  },
  // target: 'web',
  output: {
    path: resolve(__dirname, './sdist'),
    filename: '[name].[chunkhash:8].js',
    publicPath: './',
    chunkLoadTimeout: 1000 * 1000,
    // chunkFilename: '[id].[chunkhash:8].js',
    // jsonpScriptType: 'text/javascript',
    crossOriginLoading: 'anonymous',

    // chunkLoadingGlobal: 'myCustomFunc'
    // library: '__MY_LIB__'
  },
  optimization: {
    runtimeChunk: 'single',
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: [
      //     './webpack/loaders/test-loader',
      //     './webpack/loaders/dd-loader',
      //   ]
      // },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          }
        ]
      }
    ]
  },
  plugins: [
    new InjectPrependChunkPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      inject: true,
      // externalScripts: {
      //   inject: `<script>var g = 123</script>`,
      // }
    }),

    new webpack.DefinePlugin({
      'testDefine': JSON.stringify(true)
    }),

    new WebpackManifestPlugin({
      sort: t => t,
      seed: {
        l: 123
      },
      // writeToFileEmit: true,
    })

  ],
  // plugins: [
  //   /**
  //    * entryOption
  //    */
  //   function () {
  //     this.hooks.entryOption.tap('entryOption', function (context, entryOption) {
  //       console.log(`compiler call plugins: ${chalk.yellow('test compiler entryOption hooks apply')}`);
  //       // console.log(delete entryOption.home);
  //       // entryOption.detail = ['./src/detail/index.js'];
  //     })
  //   },

  //   /**
  //    * environment
  //    */
  //   function () {
  //     this.hooks.environment.tap('environment', function () {
  //       console.log(`compiler call plugins: ${chalk.yellow('test compiler environment hooks apply')}`);
  //     })
  //   },

  //   /**
  //    * beforeRun
  //    */
  //   function () {
  //     this.hooks.beforeRun.tap('beforeRun', function () {
  //       console.log(`compiler call plugins: ${chalk.yellow('test compiler beforeRun hooks apply')}`);
  //     })
  //   },

  //   /**
  //    * watch
  //    */
  //   function () {
  //     this.hooks.watchRun.tapAsync('watchRun', function (watch, cb) {
  //       console.log(`compiler call plugins: ${chalk.yellow('test compiler watchRun hooks apply')}`);
  //       cb();
  //     })
  //   },
  //   function () {
  //     this.hooks.watchClose.tap('watchClose', function () {
  //       console.log(`compiler call plugins: ${chalk.yellow('test compiler watchClose hooks apply')}`);
  //     })
  //   },

  //   /**
  //    * beforeCompile
  //    */
  //   function () {
  //     this.hooks.beforeCompile.tapAsync('beforeCompile', function (params, cb) {
  //       console.log(`compiler call plugins: ${chalk.yellow('test compiler beforeCompile hooks apply')}`);
  //       cb();
  //     })
  //   },

  //   /**
  //    * compile
  //    */
  //   function () {
  //     this.hooks.compile.tap('compile', function () {
  //       console.log(`compiler call plugins: ${chalk.yellow('test compiler compile hooks apply')}`);
  //     })
  //   },

  //   /**
  //    * thisCompilation
  //    */
  //   function () {
  //     this.hooks.thisCompilation.tap('thisCompilation', function () {
  //       console.log(`compiler call plugins: ${chalk.yellow('test compiler thisCompilation hooks apply')}`);
  //     })
  //   },

  //   /**
  //    * compilation
  //    */
  //   function () {
  //     this.hooks.compilation.tap('compilation', function () {
  //       console.log(`compiler call plugins: ${chalk.yellow('test compiler compilation hooks apply')}`);
  //     })
  //   },

  //   /**
  //   * addEntry
  //   */
  //   function () {
  //     this.hooks.make.tap('make', function (compilation) {
  //       console.log('make');
  //       compilation.hooks.addEntry.tap("addEntry", (entry, name) => {
  //         console.log(`compiler call plugins: ${chalk.yellow('test compiler addEntry hooks apply')}`);
  //         console.log('addEntry', entry, name);
  //       })
  //     })
  //   },

  //   /**
  //    * buildModule
  //    */
  //   function () {
  //     this.hooks.make.tap('make', function (compilation) {
  //       compilation.hooks.buildModule.tap("buildModule", (module) => {
  //         console.log(`compiler call plugins: ${chalk.yellow('test compiler buildModule hooks apply')}`);
  //         console.log('构建module', module);
  //       })
  //     })
  //   },

  //   /**
  //    * succeedModule
  //    */
  //   function () {
  //     this.hooks.make.tap('make', function (compilation) {
  //       compilation.hooks.succeedModule.tap("succeedModule", (module) => {
  //         console.log(`compiler call plugins: ${chalk.yellow('test compiler succeedModule hooks apply')}`);
  //         console.log('module 构建完成', module.context,);
  //       })
  //     })
  //   },



  //   /**
  //    * afterCompile
  //    */
  //   function () {
  //     this.hooks.afterCompile.tapAsync('afterCompile', function (compilation, cb) {
  //       console.log(`compiler call plugins: ${chalk.yellow('test compiler afterCompile hooks apply')}`);
  //       cb();
  //     })
  //   },

  //   /**
  //    * assetEmitted
  //    */
  //   function () {
  //     this.hooks.assetEmitted.tapAsync('assetEmitted', function (file, content, cb) {
  //       console.log(`compiler call plugins: ${chalk.yellow('test compiler assetEmitted hooks apply')}`);
  //       console.log(file);
  //       cb();
  //     })
  //   },



  //   /**
  //    * done
  //    */
  //   function () {
  //     this.hooks.done.tap('done', function () {
  //       console.log(`compiler call plugins: ${chalk.yellow('test compiler done hooks apply')}`);
  //     })
  //   },
  //   // new HtmlWebpackPlugin({
  //   //   filename: 'prefetch.js',
  //   //   template: './prefetch.html',
  //   //   inject: false
  //   // }),

  //   // new HtmlWebpackPlugin({
  //   //   scripts: [
  //   //     'http://example.com/somescript.js',
  //   //   ],
  //   // }),

  // ]
}
