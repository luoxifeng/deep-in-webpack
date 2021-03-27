# Skills

- 更新chunkhash
```js
// 常用在你要对chunk添加内容
compiler.hooks.thisCompilation.tap('XXX', compilation => {
  compilation.hooks.chunkHash.tap("XXX", (chunk, hash, { chunkGraph, runtimeTemplate }) => {
    if (hash.name === 'xxx') hash.update('some string')
  })
})
```

- 添加代码到asset上
```js
// 添加内容
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

        }
      })
    
      callback()
    }
  )
})
```

