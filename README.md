# Deep In Webpack
```
基于webpack5
```



## 💣 Import Point
```
重要的概念，如module，chunk, assets, bundle。。。
```
- webpack对象
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

- chunk对象
```js
 Chunk {
  id: 'main',
  ids: [ 'main' ],
  debugId: 1000,
  name: 'main',
  preventIntegration: false,
  entryModule:
    NormalModule {
      dependencies: [],
      blocks: [],
      variables: [],
      type: 'javascript/auto',
      context: '/Users/xxx/workspace/xxx/src',
      debugId: 1000,
      hash: 'a6388d29fa15bd58c6cffb10246992a5',
      renderedHash: 'a6388d29fa15bd58c6cf',
      resolveOptions: {},
      factoryMeta: {},
      warnings: [],
      errors: [],
      buildMeta: [Object],
      buildInfo: [Object],
      reasons: [Array],
      _chunks: [SortableSet],
      id: './src/index.js',
      index: 0,
      index2: 0,
      depth: 0,
      issuer: null,
      profile: undefined,
      prefetched: false,
      built: true,
      used: null,
      usedExports: null,
      optimizationBailout: [],
      _rewriteChunkInReasons: undefined,
      useSourceMap: true,
      _source: [SourceMapSource],
      request:
      '/Users/orion/Desktop/react-beauty-highcharts/node_modules/babel-loader/lib/index.js!/Users/xxx/workspace/xxx/src/index.js',
      userRequest: '/Users/xxx/workspace/xxx/src/index.js',
      rawRequest: './src/index.js',
      binary: false,
      parser: [Parser],
      generator: JavascriptGenerator {},
      resource: '/Users/xxx/workspace/xxx/src/index.js',
      matchResource: undefined,
      loaders: [Array],
      error: null,
      _buildHash: '488efbd43aa05371d3f44d94c89abd57',
      buildTimestamp: 1547884969828,
      _cachedSources: Map {},
      lineToLine: false,
      _lastSuccessfulBuildMeta: [Object],
      _ast: null 
    },
  _modules:
    SortableSet [Set] {
      [NormalModule],
      _sortFn: [Function: sortByIdentifier],
      _lastActiveSortFn: null,
      _cache: undefined,
      _cacheOrderIndependent: undefined },
  filenameTemplate: undefined,
  _groups:
    SortableSet [Set] {
      [Entrypoint],
      _sortFn: [Function: sortChunkGroupById],
      _lastActiveSortFn: null,
      _cache: undefined,
      _cacheOrderIndependent: undefined },
  files: [],
  rendered: false,
  hash: '0988e8454f1915ec05fee482db8d0a6f',
  contentHash: { javascript: '4b8695ca3c1d42e76c52' },
  renderedHash: '0988e8454f1915ec05fe',
  chunkReason: undefined,
  extraAsync: false,
  removedModules: undefined 
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

