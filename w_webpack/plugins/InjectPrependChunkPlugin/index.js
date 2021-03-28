/* eslint-disable */
const {
  ConcatSource,
  CachedSource,
  RawSource,
  OriginalSource
} = require('webpack-sources')
const { Compilation, util, javascript, Module, Dependency } = require('../../../webpack');
const AsyncDependenciesBlock = require("../../../webpack/lib/AsyncDependenciesBlock");
const { getCompilationHooks } = javascript.JavascriptModulesPlugin;
const chalk = require('chalk');


module.exports = class InjectPrependChunkPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {

    class MyDependency extends Dependency {
      constructor() {
        super();
        // this.originalModule = originalModule;
      }
    
      get category() {
        return "esm";
      }
    
      get type() {
        return "lazy import()";
      }
    
      /**
       * @returns {string | null} an identifier to merge equal requests
       */
      getResourceIdentifier() {
        return 'uheudnfjsnfj.js';
      }
    }


    compiler.hooks.thisCompilation.tap("XXX",(compilation, { normalModuleFactory }) => {
      normalModuleFactory.hooks.module.tap("XXX", (originalModule, createData, resolveData) => {
        // return originalModule
        class HHh  extends Module {
          constructor(context, request, originalModule) {
            super("lazy-compilation-proxy", context, originalModule.layer);
            this.context = context;
            this.request = request;
            this.buildInfo = {
              active: false
            };
            // this.originalModule = 
          }

          readableIdentifier() {
            return 'pppp ffff';
          }

          identifier() {
            return 'pppp'
          }

          // getSourceTypes() {
          //   return new Set(["javascript"]);;
          // }

          // needBuild(context, callback) {
          //   callback(null, true);
          // }

          build(options, compilation, resolver, fs, callback) {
            console.log('999999')
            console.log(AsyncDependenciesBlock)

            const block = new AsyncDependenciesBlock({});
            block.addDependency(new MyDependency())

            this.addBlock(block);
            callback();
          }

          codeGeneration() {
            console.log('codeGeneration')

            const sources = new Map();
            
            sources.set("javascript", new RawSource('const foo = 90'));

            return {
              sources: new RawSource('lllll'),
			        runtimeRequirements: new Set()
            }

          }

          size(type) {
            return 200;
          }

        }
        return new HHh(compiler.context, resolveData.request, originalModule);
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
