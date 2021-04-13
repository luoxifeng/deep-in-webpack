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

/**
 * nmf.create 阶段
 * 组装 resolveData, 调用 nmf beforeResolve hook
 */
nmf.hooks.beforeResolve.callAsync(resolveData, (err, result) => { // 
  nmf.hooks.factorize.callAsync(resolveData, (err, module) => { // 

    /**
     *
     * 
     */
    nmf.hooks.resolve.callAsync(
      resolveData, /* */
      
      /**
       * 
       */

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



```

## 具体流程

- nmf.create(data, createCallbak) ->
  ```
  组装 resolveData 调用 nmf.hooks.beforeResolve
  传入 resolveData, createCallbak
  ```
  - nmf.hooks.beforeResolve.callAsync(resolveData, beforeResolveCallback: (err, result)) ->
  > 源码里面什么也没做，直接调用回调
  但是三方插件可以调用回调返回 false 来[忽略某个模块](../../Skills/README.md#module)


  >
  - -> nmf.hooks.beforeResolve callback(err, result) 阶段

    - nmf.hooks.factorize.callAsync -> 
      - nmf.hooks.resolve.callAsync ->
        - loaders
- nmf.create 结束  