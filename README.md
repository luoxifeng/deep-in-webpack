# Deep In Webpack
```
基于webpack5
```



## 💣 Import Point
```
重要的概念，如module，chunk, assets, bundle。。。
```
- webpack 对外暴露的api
```js
webpack: [Function: f] {
  webpack: [Getter],
  validate: [Getter],
  validateSchema: [Getter],
  version: [Getter],
  cli: [Getter],
  AutomaticPrefetchPlugin: [Getter],
  BannerPlugin: [Getter],
  Cache: [Getter],
  Chunk: [Getter],
  ChunkGraph: [Getter],
  CleanPlugin: [Getter],
  Compilation: [Getter],
  Compiler: [Getter],
  ConcatenationScope: [Getter],
  ContextExclusionPlugin: [Getter],
  ContextReplacementPlugin: [Getter],
  DefinePlugin: [Getter],
  DelegatedPlugin: [Getter],
  Dependency: [Getter],
  DllPlugin: [Getter],
  DllReferencePlugin: [Getter],
  DynamicEntryPlugin: [Getter],
  EntryOptionPlugin: [Getter],
  EntryPlugin: [Getter],
  EnvironmentPlugin: [Getter],
  EvalDevToolModulePlugin: [Getter],
  EvalSourceMapDevToolPlugin: [Getter],
  ExternalModule: [Getter],
  ExternalsPlugin: [Getter],
  Generator: [Getter],
  HotUpdateChunk: [Getter],
  HotModuleReplacementPlugin: [Getter],
  IgnorePlugin: [Getter],
  JavascriptModulesPlugin: [Getter],
  LibManifestPlugin: [Getter],
  LibraryTemplatePlugin: [Getter],
  LoaderOptionsPlugin: [Getter],
  LoaderTargetPlugin: [Getter],
  Module: [Getter],
  ModuleFilenameHelpers: [Getter],
  ModuleGraph: [Getter],
  ModuleGraphConnection: [Getter],
  NoEmitOnErrorsPlugin: [Getter],
  NormalModule: [Getter],
  NormalModuleReplacementPlugin: [Getter],
  MultiCompiler: [Getter],
  Parser: [Getter],
  PrefetchPlugin: [Getter],
  ProgressPlugin: [Getter],
  ProvidePlugin: [Getter],
  RuntimeGlobals: [Getter],
  RuntimeModule: [Getter],
  SingleEntryPlugin: [Getter],
  SourceMapDevToolPlugin: [Getter],
  Stats: [Getter],
  Template: [Getter],
  UsageState: [Getter],
  WatchIgnorePlugin: [Getter],
  WebpackError: [Getter],
  WebpackOptionsApply: [Getter],
  WebpackOptionsDefaulter: [Getter],
  WebpackOptionsValidationError: [Getter],
  ValidationError: [Getter],
  cache: [Object],
  config: [Object],
  ids: [Object],
  javascript: [Object],
  optimize: [Object],
  runtime: [Object],
  prefetch: [Object],
  web: [Object],
  webworker: [Object],
  node: [Object],
  electron: [Object],
  wasm: [Object],
  library: [Object],
  container: [Object],
  sharing: [Object],
  debug: [Object],
  util: [Object],
  sources: [Getter],
  experiments: [Object]
}
```
## ⚔️ Skills
```
常用技巧
```



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

