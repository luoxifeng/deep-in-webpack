# Deep In Webpack
```
基于webpack5
```

## Runtime
```
webpack构建出的代码，包含的runtime。如何装载，建立模块的关联，引用关系，以及导出。。。
```

## [Process](./docs/Process)
```
webpack构建流程
```

## [Loader](./docs/Loader)
```
loader执行过程以及常用loader
```

## [Plugins](./docs/PLugins)
```
常用plugins
```

## Third party libs
```
用到的三方库以及从webpack流程专门剥离出去的库
```



## Optimization

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

