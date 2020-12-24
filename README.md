# deep-in-webpack

深入解析webpack源码,看透webpack的本质

## 文档

- [如何加载处理配置](./docs/如何加载处理配置/加载配置.md)
- webpack用到的三方库

## Loader
- vue-loader
 
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

