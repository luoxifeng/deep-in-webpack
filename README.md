# deep-in-webpack


## 文档

- [如何加载处理配置](./docs/如何加载处理配置/加载配置.md)
- webpack用到的三方库

## Loader
- vue-loader

## [Plugins](./docs/Plugins/README.md)

## HMR

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

