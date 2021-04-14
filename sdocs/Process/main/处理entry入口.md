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
            > 创建了module实例
        - <- compilation.factorizeModule（_factorizeModule） 回调阶段
          - -> compilation.addModule 调用阶段
            - -> compilation._modulesCache.get(identifier, (err, cacheModule)) 调用阶段
              > 根据 module.identifier() 获取缓存
            - <- compilation._modulesCache.get cacheModule 回调阶段 (取缓存)
              > 如果 cacheModule 存在就使用 cacheModule 否则使用 之前的module
              同时向compilation添加module实例
              compilation._modules.set(identifier, module);
			        compilation.modules.add(module);
          - <- compilation.addModule 回调阶段
            - -> compilation.buildModule 调用阶段
              - -> module.needBuild 调用阶段
              - <- module.needBuild 回调阶段
                > 如果needBuild 为false 直接调用回调返回 compilation.addModule 回调
                - compilation.hooks.buildModule.call(module)
				        - compilation.builtModules.add(module)
                - -> module.build 调用阶段 （关键部分，另做分析）
                  > 内部调用run-loader 运行loader对代码进行处理，
                  webpack根据返回的结果进行parse -> ast -> 分析依赖 -> 挂载到当前module上
                - <- module.build 回调阶段
                  - 失败 compilation.hooks.failedModule.call(module, err)
                  - -> 成功 compilation._modulesCache.store 调用阶段 (存缓存)
                  - <- compilation._modulesCache.store 回调阶段 (存好缓存)
                    - 失败 compilation.hooks.failedModule.call(module, err)
                    - 成功 compilation.hooks.succeedModule.call(module)
                    - 回到 compilation.buildModule 回调
            - <- compilation.buildModule 回调阶段
              - -> compilation.processModuleDependencies 调用阶段
                - processDependenciesBlock format依赖
                  > 根据build阶段得到的依赖，进行重组 得到 sortedDependencies 每一项结构如下
                  {
                    factory: factory,
                    dependencies: [XXXDependency, YYYDependency],
                    originModule: module
                  }
                  在webpack中依赖分为很多种比如 import { xxx } from './xxx.js' 这会得到两个依赖，
                  HarmonyImportSideEffectDependency， HarmonyImportSpecifierDependency
                  如果sortedDependencies为空说明当前模块没有依赖其他模块 调用回调直接返回 compilation.handleModuleCreation 回调阶段
                - 处理 sortedDependencies
                  > 当模块的依赖不为空，使用asyncLib.forEach对 sortedDependencies每一项进行 compilation.handleModuleCreation处理，
                  此时又回到了 create module -> build module -> processDependencies -> asyncLib.forEach -> create module -> ...递归
                  由于asyncLib.forEach对列表的处理只有每一项都被处理了才会进入asyncLib.forEach的回调，并且每一个模块的依赖链在被处理的时候，
                  上层的compilation.handleModuleCreation的回到是没有被调用的，所以在深层次处理依赖的时候，只有最深层析的依赖被处理了，
                  才会执行当前compilation.handleModuleCreation的回调，然后在调用上层compilation.handleModuleCreation的回调，
                  按照这样的顺序一层层向上调用，最终回到入口的compilation.handleModuleCreation。
                  也就是说整个过程上层的进程受到处理依赖的进程控制，一直到最底层的依赖被处理，然后在一步步向上册回退知道最上层，
                  回到最上层以后然后在调用回调，这时从一个入口开始到最底层的依赖都被处理，所有依赖都生成了module,接着进行接下里的流程
      - <- compilation.handleModuleCreation 回调阶段
    - <- compilation.addModuleTree 回调阶段
      — 失败 this.hooks.failedEntry.call(entry, options, err)
      - 成功 this.hooks.succeedEntry.call(entry, options, module)
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
