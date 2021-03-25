/* eslint-disable */
const {
  ConcatSource,
  CachedSource,
  RawSource,
  OriginalSource
} = require('webpack-sources')
const { Compilation, util } = require('webpack');

module.exports = class InjectPrependChunkPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    // this.options.
    compiler.hooks.compilation.tap('InjectPrependChunkPlugin', compilation => {

      compilation.hooks.record.tap('InjectPrependChunkPlugin', (compilation1, records) => {
        // console.log('reviveChunks', ...args)
        console.log('\nrecord', 'start\n')

        // console.log(records, compilation1.assets)

        console.log('\nrecord', 'end\n')

        // compilation1.createHash()


        // const assets = compilation.assets;
        // // console.log('record', compilation.assets)

        // const key = Object.keys(assets).find(key => /list.*?\.js$/.test(key))
        // if (assets[key]) {
        //   console.log(assets[key]);
        // }


      })

      // compilation.hooks.beforeHash.tap('sfsfs', (chunk, chunkHash) => {
      //   console.log('====', compilation.chunks)

      // })
      
      compilation.hooks.processAssets.tap(
        {
          name: 'MyPlugin',
          stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE,
          additionalAssets: true,
        },
        (assets, callback) => {
        // const assets = compilation.assets;

        // console.log('assets', compilation.chunks[0].updateHash)

        // const hash = util.createHash(compilation.outputOptions.hashFunction)


        // compilation.chunks.forEach((chunk) => {
        //   console.log('chunk', chunk)
        //   chunk.files.forEach((file) => {
        //     compilation.assets[file] = new ConcatSource(
        //       'lllll555ll',
        //       '\n',
        //       compilation.assets[file]
        //     );

        //     compilation.assets[file].updateHash(hash)
        //   });

        //   // chunk.updateHash(hash, compilation.chunkGraph)
        // })


        // console.log('compilation.mainTemplate', compilation.mainTemplate)
        // console.log('compilation.chunkTemplate', compilation.chunkTemplate)


        // return 
        const key = Object.keys(assets).find(key => /list.*?\.js$/.test(key))
        if (assets[key]) {
          // console.log(assets[key]);
          const g = assets[key]._source;
          // console.log('assets[key]._source before', assets[key]._source)
          assets[key]._source = new ConcatSource(
            '/**Sweet Banner**/',
            '\n',
            'var g = 12345',
            '\n',
            g
          );

          console.log('assets[key]._source', assets[key]._source)


          
          // console.log('hash', compilation.mainTemplate.outputOptions.hashFunction)

          // console.log('assets[key]._source after', assets[key]._source)
          // console.log('filename', key);
          // assets[key]._source.console = true;
          // assets[key]._source.updateHash(hash)

          // assets[key].updateHash(hash)
          // console.log('====', compilation.createHash())

          // assets[key].updateHash();
        }
          // console.log('additionalChunkAssets', 'start\n')
          // console.log('additionalChunkAssets', compilation.assets)
          // chunks.forEach((chunk) => {
          //   chunk.files.forEach((file) => {
          //     console.log('file', file);

          //     compilation.assets[file] = new ConcatSource(
          //       '/**Sweet Banner**/',
          //       '\n',
          //       'var g = 123',
          //       '\n',
          //       compilation.assets[file]
          //     );
          //   });
          // })
          console.log('additionalChunkAssets', 'end\n')

          callback && callback();
        }
      )
    })

  }
}
