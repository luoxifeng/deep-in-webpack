/* eslint-disable */
const {
  ConcatSource,
  CachedSource,
  RawSource,
  OriginalSource
} = require('webpack-sources')
const { Compilation, util, javascript } = require('../../../webpack');
const { getCompilationHooks } = javascript.JavascriptModulesPlugin;
const chalk = require('chalk');


module.exports = class InjectPrependChunkPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {


    compiler.hooks.thisCompilation.tap("XXX",(compilation, { normalModuleFactory }) => {
      normalModuleFactory.hooks.module.tap("XXX", (originalModule, createData, resolveData) => {
        console.log(chalk.cyanBright('originalModule'), originalModule, createData, resolveData)
      })
    })
    // this.options.
    // compiler.hooks.thisCompilation.tap('InjectPrependChunkPlugin', compilation => {
    //   const hooks = getCompilationHooks(compilation);

    //   hooks.chunkHash.tap(
    //     "InjectPrependChunkPlugin",
    //     (chunk, hash, { chunkGraph, runtimeTemplate }) => {
    //       console.log('9999')
    //       console.log('====',chunk, hash)

    //       if (chunk.hash) {

            

    //         hash.update('var f = oooo')
    //         // console.log('====',chunk, hash)



    //       }

    //       // if (chunk.hasRuntime()) return;
    //       // hash.update("ArrayPushCallbackChunkFormatPlugin");
    //       // hash.update("1");
    //       // hash.update(`${runtimeTemplate.outputOptions.chunkLoadingGlobal}`);
    //       // hash.update(`${runtimeTemplate.outputOptions.hotUpdateGlobal}`);
    //       // hash.update(`${runtimeTemplate.outputOptions.globalObject}`);
    //     }
    //   );

    //   // compilation.hooks.record.tap('InjectPrependChunkPlugin', (compilation1, records) => {
    //   //   // console.log('reviveChunks', ...args)
    //   //   console.log('\nrecord', 'start\n')

    //   //   // console.log(records, compilation1.assets)

    //   //   console.log('\nrecord', 'end\n')

    //   //   // compilation1.createHash()


    //   //   // const assets = compilation.assets;
    //   //   // // console.log('record', compilation.assets)

    //   //   // const key = Object.keys(assets).find(key => /list.*?\.js$/.test(key))
    //   //   // if (assets[key]) {
    //   //   //   console.log(assets[key]);
    //   //   // }


    //   // })

    //   // compilation.hooks.beforeHash.tap('sfsfs', (chunk, chunkHash) => {
    //   //   console.log('====', compilation.chunks)

    //   // }
      
    //   compilation.hooks.processAssets.tap(
    //     {
    //       name: 'MyPlugin',
    //       stage: Compilation.PROCESS_ASSETS_STAGE_DERIVED,
    //       additionalAssets: true,
    //     },
    //     (assets, callback) => {
    //       console.log('MyPlugin')


    //     // const assets = compilation.assets;

    //     // console.log('assets', compilation.chunks[0].updateHash)

    //     // const hash = util.createHash(compilation.outputOptions.hashFunction)


    //     // compilation.chunks.forEach((chunk) => {
    //     //   console.log('chunk', chunk)
    //     //   chunk.files.forEach((file) => {
    //     //     compilation.assets[file] = new ConcatSource(
    //     //       'lllll555ll',
    //     //       '\n',
    //     //       compilation.assets[file]
    //     //     );

    //     //     compilation.assets[file].updateHash(hash)
    //     //   });

    //     //   // chunk.updateHash(hash, compilation.chunkGraph)
    //     // })


    //     // console.log('compilation.mainTemplate', compilation.mainTemplate)
    //     // console.log('compilation.chunkTemplate', compilation.chunkTemplate)


    //     // return 
    //     const key = Object.keys(assets).find(key => /list.*?\.js$/.test(key))
    //     if (assets[key]) {

    //       // console.log(assets[key]);
    //       const g = assets[key]._source;
    //       // // console.log('assets[key]._source before', assets[key]._source)
    //       // // assets[key]._source = new ConcatSource(
    //       // //   '/**Sweet Banner**/',
    //       // //   '\n',
    //       // //   'var g = 123452',
    //       // //   '\n',
    //       // //   g
    //       // // );

    //       compilation.updateAsset(key, new CachedSource(new ConcatSource(
    //         '/**Sweet Banner**/',
    //         '\n',
    //         'var g = 123452',
    //         '\n',
    //         g
    //       )))

    //       console.log('assets[key]._source', '=====')

    //       // console.log('hash', compilation.mainTemplate.outputOptions.hashFunction)

    //       // console.log('assets[key]._source after', assets[key]._source)
    //       // console.log('filename', key);
    //       // assets[key]._source.console = true;
    //       // assets[key]._source.updateHash(hash)

    //       // assets[key].updateHash(hash)
    //       // console.log('====', compilation.createHash())

    //       // assets[key].updateHash();
    //     }
    //       // console.log('additionalChunkAssets', 'start\n')
    //       // console.log('additionalChunkAssets', compilation.assets)
    //       // chunks.forEach((chunk) => {
    //       //   chunk.files.forEach((file) => {
    //       //     console.log('file', file);

    //       //     compilation.assets[file] = new ConcatSource(
    //       //       '/**Sweet Banner**/',
    //       //       '\n',
    //       //       'var g = 123',
    //       //       '\n',
    //       //       compilation.assets[file]
    //       //     );
    //       //   });
    //       // })
    //       // console.log('additionalChunkAssets', 'end\n')

    //       callback && callback();
    //     }
    //   )
    // })

  }
}
