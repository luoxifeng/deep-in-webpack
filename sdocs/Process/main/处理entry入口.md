# 处理entry入口

## 相关插件
```js
EntryOptionPlugin
EntryPlugin
DynamicEntryPlugin
EntryDependency
```


## 过程
- compilation
```js

```

- NormalModuleFactory 阶段
```js
const nmf = NormalModuleFactory

nmf.hooks.beforeResolve.callAsync(resolveData, (err, result) => {
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