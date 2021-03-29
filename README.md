# Deep In Webpack
```
基于webpack5
```



## [💣 Import Point](./sdocs/ImportPoint/README.md)
```
重要的概念，如module，chunk, assets, bundle。。。
```
- [webpack](./sdocs/ImportPoint/README.md#webpack)
- [module](./sdocs/ImportPoint/README.md#module)
- [chunk](./sdocs/ImportPoint/README.md#chunk)


## [⚔️ Skills](./sdocs/Skills/README.md)
```
常用技巧, 比如插件的关键钩子可以获取到什么，具体可以做什么等等。。。
```
- [Module](./sdocs/Skills/README.md#Module)
- [Chunk](./sdocs/Skills/README.md#Chunk)
- [Asset](./sdocs/Skills/README.md#Asset)


## ⛓ Runtime
```
webpack构建出的代码，包含的runtime。如何引用模块，装载模块，定义模块导出。。。
```

## 🚄 [Process](./sdocs/Process)
```
webpack构建流程。。。
```

## 🔮 [Loader](./sdocs/Loader)
```
loader执行过程以及常用loader
```

## 🛠 [Plugins](./sdocs/PLugins)
```
常用plugins, 包含内部使用的，暴露给外用使用，以及第三方plugin
```

## 🛍 Third party libs
```
用到的三方库以及从webpack流程专门剥离出去的库
```



## 🏥 Optimization

## 🗝 Hooks
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

