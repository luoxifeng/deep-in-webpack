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

## compilation 添加入口阶段
- -> compiler.hooks.make 调用阶段 ->
  - -> compilation.addEntry 调用阶段 ->
    > this.entries.set(name, entryData)
    - <--> compilation.hooks.addEntry.call(entry, options)
    > 三方差价可以在这里添加入口
    - -> compilation.addModuleTree 调用阶段
      > 得到 factory, dependencies 
      - -> compilation.handleModuleCreation 调用阶段
        - -> compilation.factorizeModule（_factorizeModule） 调用阶段
          - -> normalModuleFactory.create 调用阶段
          > [具体过程参照下面](#NormalModuleFactory.create阶段)
          - <- normalModuleFactory.create 回调阶段
          > 
        - <- compilation.factorizeModule（_factorizeModule） 回调阶段
      - <- compilation.handleModuleCreation 回调阶段
    - <- compilation.addModuleTree 回调阶段
  - <- compilation.addEntry 回调阶段
- <- compiler.hooks.make 回调阶段

## NormalModuleFactory.create 阶段

- nmf.create(data, createCallbak) ->
  ```
  组装 resolveData 调用 nmf.hooks.beforeResolve
  ```
  - -> nmf.hooks.beforeResolve.callAsync(resolveData, beforeResolveCallback: (err, result)) ->
  > 源码里面什么也没做，直接调用回调，但是三方插件可以调用回调返回 `false` 来[忽略某个模块](../../Skills/README.md#module)
  - -> nmf.hooks.beforeResolve callback(err, result) 阶段 ->
  > 如果三方插件调用会回调返回的 `result === false`, 则会直接调用 `createCallbak` 跳过接下里的流程，作用是忽略当前的模块。否则调用 `nmf.hooks.factorize.callAsync` 进行正常流程
    - -> nmf.hooks.factorize.callAsync -> 
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
      - nmf.hooks.afterResolve
        ```
        返回false 忽略模块
        ```
        - -> nmf.hooks.createModule
          ```
          直接自己创建module，后续流程就会使用这个module,一般用在使用自己创建的module代替原始module
          ```
        - <- nmf.hooks.createModule
          - -> nmf.hooks.module
          ```
          可以使用自己创建的module替换原始module,一般用在使用自己创建的module代理真实module,做一些控制或者优化
          当需要真实module的时候在返回真实module LazyCompilation 就是使用这个hook
          ```
    - <- nmf.hooks.factorize callback(err, module)
- nmf.create callbalk (err, factoryResult)


```

_factorizeModule -> nmf.create module -> _addModule ->  handleModuleCreation ->
factorizeModule -> addModule -> buildModule -> processModuleDependencies
```
