# Deep In Webpack
```
基于webpack5
```

## Import Point
```
重要的概念，如module，chunk, assets, bundle。。。
```

## Runtime
```
webpack构建出的代码，包含的runtime。如何引用模块，装载模块，定义模块导出。。。
```

## [Process](./docs/Process)
```
webpack构建流程。。。
```

## [Loader](./docs/Loader)
```
loader执行过程以及常用loader
```

## [Plugins](./docs/PLugins)
```
常用plugins, 包含内部使用的，暴露给外用使用，以及第三方plugin
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

