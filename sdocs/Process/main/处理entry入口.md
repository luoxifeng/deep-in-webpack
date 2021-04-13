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
  ```
  - nmf.hooks.beforeResolve.callAsync(resolveData, beforeResolveCallback: (err, result)) ->
  > 源码里面什么也没做，直接调用回调，但是三方插件可以调用回调返回 `false` 来[忽略某个模块](../../Skills/README.md#module)
  - -> nmf.hooks.beforeResolve callback(err, result) 阶段
  > 如果三方插件调用会回调返回的 `result === false`, 则会直接调用 `createCallbak` 跳过接下里的流程，作用是忽略当前的模块。否则调用 `nmf.hooks.factorize.callAsync` 进行正常流程
    - nmf.hooks.factorize.callAsync -> 
      - nmf.hooks.resolve.callAsync ->
        - 解析文件路径
        >解析文件路径同时根据文件路径解析，是否使用了inline-loader以及，忽略其他的loader得到
          >>`以-!开头 noPreAutoLoaders(不使用pre normal loader)`<br>
          >>`以!开头 noAutoLoaders(不使用normal loader)`<br>
          >>`以!!开头 noPrePostAutoLoaders(不使用pre normal post loader)`<br>
        - nmf.ruleSet.exec
        ```
        指定匹配规则，获取文件满足的左右规则集, 可能会包含非loader
        ```
        - 过滤分类rule
        >遍历上一步得到的rules根据rule.type进行分类以及`noPreAutoLoaders, noAutoLoaders, noPrePostAutoLoaders`，
        过滤掉非loader类型以及文件路径里面忽略的loader, 然后得到useLoadersPost, useLoaders, useLoadersPre 三个数组，
        每一项的结构如下：
        {
          ident: undefined, 
          loader: "./ddd/test-loader", // 可能为绝对路径以及相对路径
          options: undefined, // 如果配置了就有值
        }
        - resolve loader路径
        > 对上述三组loaders 分别调用 `nmf.resolveRequestArray` 
        使用 `loadResolver` 根据 `context` 把loader的路径处理成绝对路径
        得到对应的 `postLoaders, normalLoaders, preLoaders`
        -

- nmf.create 结束  