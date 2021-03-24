/* eslint-disable */
const {
  ConcatSource,
  CachedSource,
  RawSource,
  OriginalSource
} = require('webpack-sources')
const { Compilation } = require('webpack');

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
      // return
      compilation.hooks.additionalChunkAssets.tapAsync(
        'InjectPrependChunkPlugin',
        (chunks, callback) => {
        const assets = compilation.assets;

        const key = Object.keys(assets).find(key => /list.*?\.js$/.test(key))
        if (assets[key]) {
          // console.log(assets[key]);
          const g = assets[key]._source;
          assets[key]._source = new ConcatSource(
            '/**Sweet Banner**/',
            '\n',
            'var g = 123',
            '\n',
            g
          );

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

