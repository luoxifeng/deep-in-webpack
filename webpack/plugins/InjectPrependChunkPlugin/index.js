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
    compiler.hooks.compilation.tap('InjectPrependChunkPlugin', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'InjectPrependChunkPlugin',
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
          additionalAssets: true
        },
        assets => {
          const key = Object.keys(assets).find(key => /list.*?\.js$/.test(key))
          if (assets[key]) {
            const origin = assets[key]._source.source();

            const concatSource = assets[key]._source;
            const _children = concatSource._children;
            console.log(concatSource)
            console.log('_children[0]', _children[1])
            _children.splice(1, 0, new OriginalSource('11111111'), new OriginalSource('sfsf.gb = '))

            // console.log('_children', _children)

            // assets[key]._source = new ConcatSource('你好吗;', ..._children)
            // assets[key]._source.add('sfsfsdfsdfsdf')

            // console.log('=====', assets[key]);

            // console.log(assets[key]._source.a);

            // console.log(assets[key]._source);

            // assets[key] = new CachedSource(new OriginalSource('你好吗;' + origin, key))
            // assets[key].updateHash()
            // console.log(assets[key]);

            // console.log(assets[key]._source);
            // console.log(assets[key]._source);
          }
        }
      )
    })
  }
}
