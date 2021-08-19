# NormalModuleFactory

## hooks
- beforeResolve
```js
compiler.hooks.thisCompilation.tap("XXX", (compilation, { normalModuleFactory }) => {
  normalModuleFactory.hooks.beforeResolve.tapAsync('XXX', (resolveData, callback) => {
    if (/xxx\.js/.test(resolveData.request)) {
      callback(null, false)
    }
  })
})
```
- 