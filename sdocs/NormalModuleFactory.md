# NormalModuleFactory

## 相关对象
- resolveData
```js
{
  assertions: undefined,
  cacheable: true,
  context: '/xxx/xxx/xxx/deep-in-webpack', // 绝对路径，构建上下文，一般是项目的根目录
  contextDependencies: LazySet {},
  contextInfo: { 
    issuer: '',
    issuerLayer: null,
    compiler: undefined
  },
  createData: { }, // 创建module以后才会有值
  dependencies: [EntryDependency, ...],
  dependencyType: 'esm', // 存在其他值
  fileDependencies: LazySet {_set: Set(0), _toMerge: Set(1), _toDeepMerge: Array(1), _needMerge: true, _deopt: false}
  missingDependencies: LazySet {_set: Set(0), _toMerge: Set(1), _toDeepMerge: Array(1), _needMerge: true, _deopt: false}
  request: './packages/test.js', // 原始的引用，代码里面写的，不是经过处理后，所以可能不带后缀
  resolveOptions: {}
}

```

- contextInfo
```js
{ 
  issuer: '', 
  issuerLayer: null,
  compiler: undefined
}

```

- createData
```js

```

- resolveOptions
```js

```

## hooks
- beforeResolve
  > 在此hook里返回 `false` 来忽略此模块

  ```js
  compiler.hooks.thisCompilation.tap("XXX", (compilation, { normalModuleFactory }) => {
    normalModuleFactory.hooks.beforeResolve.tapAsync('XXX', (resolveData, callback) => {
      if (/xxx\.js/.test(resolveData.request)) {
        callback(null, false)
      }
      callback()
    })
  })
  ```
- 