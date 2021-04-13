# 处理entry入口

## 相关插件
```js
EntryOptionPlugin
EntryPlugin
DynamicEntryPlugin
EntryDependency
```

## 过程对象
- resolveData
```js
const resolveData = {
  cacheable: true,
  context: "/Users/xxx/deep-in-webpack", // 上下文
  contextDependencies: LazySet {_set: Set(0), _toMerge: Set(0), _toDeepMerge: Array(0), …},
  contextInfo: { issuer: "", issuerLayer: null, compiler: undefined },
  createData: {}, // 刚开始是空
  dependencies: [EntryDependency], // 依赖
  fileDependencies: LazySet {_set: Set(0), _toMerge: Set(0), _toDeepMerge: Array(0), …},
  missingDependencies: LazySet {_set: Set(0), _toMerge: Set(0), _toDeepMerge: Array(0), …},
  request: "./src/home/js", // 文件的引用
  resolveOptions: {}, // 刚开始是空
}
```

- createData
```js
const createData = {
  
}
```

## 过程
- compilation
```js




```

- NormalModuleFactory 阶段
```js
const nmf = NormalModuleFactory

nmf.hooks.beforeResolve.callAsync(resolveData, (err, result) => {
  // resolveData.createData is empty object
  /**
   *
   */
  nmf.hooks.factorize.callAsync(resolveData, (err, module) => {

    nmf.hooks.resolve.callAsync(resolveData, (err, result) => {

      nmf.hooks.afterResolve.callAsync(resolveData, (err, result) => {
        
        const createData = resolveData.createData;
        nmf.hooks.createModule.callAsync(createData, resolveData,(err, createdModule) => {
          /**
           * nmf.hooks.module 
           * 这个hook我们可以使用自己的模块来替换原始模块
           */
          createdModule = nmf.hooks.module.call(
            createdModule,
            createData,
            resolveData
          );

          return callback(null, createdModule);
        })
      })

    })

  })
  
})

nmf.hooks.beforeResolve -> nmf.hooks.factorize.callAsync -> nmf.hooks.resolve.callAsync afterResolve
```