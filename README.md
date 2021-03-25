# deep-in-webpack


## 流程
```
webpack构建整个流程
```


## Loader
```
loader执行过程以及常用loader
```

## [Plugins](./docs/PLugins)
```
常用plugins
```

## 三方库
```
用到的三方库以及从webpack流程专门剥离出去的库
```

## Hooks
- compiler
  -  初始化阶段
  ```
  entryOption
  afterPlugins
  afterResolvers
  environment
  afterEnvironment
  beforeRun
  additionalPass
  run
  watchRun
  normalModuleFactory
  contextModuleFactory
  initialize
  beforeCompile
  ```
  
  -  编译阶段
  ```
  compile
  thisCompilation
  compilation
  make
  ```
  
  -  生成产物阶段
  ```
  afterCompile
  shouldEmit
  emit
  afterEmit
  assetEmitted
  done
  failed
  invalid
  watchClose
  infrastructureLog
  log
  ```

