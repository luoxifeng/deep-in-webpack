# Skills


## module 
- 用一个新的模块替换原来的模块
```js
compiler.hooks.thisCompilation.tap("XXX",(compilation, { normalModuleFactory }) => {
  normalModuleFactory.hooks.module.tap("XXX", (originalModule, createData, resolveData) => {
    // XXXModule extends Module
    return new XXXModule();
  })
})

```

## chunk
- 更新chunkhash
```js
// 常用在你要对chunk添加内容
compiler.hooks.thisCompilation.tap('XXX', compilation => {
  compilation.hooks.chunkHash.tap("XXX", (chunk, hash, { chunkGraph, runtimeTemplate }) => {
    if (hash.name === 'xxx') hash.update('some string')
  })
})
```

## asset
- 添加代码到asset上
```js
// 添加的代码因为没有添加到chunk中，会引起hash前后没变化，要去手动的更新hash,参照 `更新chunkhash`
compiler.hooks.thisCompilation.tap('XXX', compilation => {
  compilation.hooks.processAssets.tap(
    {
      name: 'MyPlugin',
      stage: Compilation.PROCESS_ASSETS_STAGE_DERIVED,
      additionalAssets: true,
    },
    (assets, callback) => {

      Object.keys(assets).forEach(key => {
        if (/xxx/.test(key)) {
          const origing = assets[key]._source;
          // 添加代码
          assets[key]._source = new ConcatSource(
            '/**Sweet Banner**/',
            '\n',
            'var g = 123456', // 
            '\n',
            origing
          );

          // 或者
          // compilation.updateAsset(key, new CachedSource(
          //   new ConcatSource(
          //     '/**Sweet Banner**/',
          //     '\n',
          //     'var g = 123456', // 
          //     '\n',
          //     origing
          //   )
          // ))
        }
      })
    
      callback()
    }
  )
})
```



