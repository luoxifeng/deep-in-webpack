# Import Point

```
重要的概念，如module，chunk, assets, bundle。。。
```

## [**webpack_require**](./__webpack_require__.md)

```

```

## Dependency

- Dependency
```ts
declare class Dependency {
	constructor();
	weak: boolean;
	optional: boolean;
	loc: DependencyLocation;
	readonly type: string;
	readonly category: string;
	getResourceIdentifier(): null | string;

	/**
	 * Returns the referenced module and export
	 */
	getReference(moduleGraph: ModuleGraph): never;

	/**
	 * Returns list of exports referenced by this dependency
	 */
	getReferencedExports(
		moduleGraph: ModuleGraph,
		runtime: RuntimeSpec
	): (string[] | ReferencedExport)[];
	getCondition(
		moduleGraph: ModuleGraph
	):
		| null
		| false
		| ((arg0: ModuleGraphConnection, arg1: RuntimeSpec) => ConnectionState);

	/**
	 * Returns the exported names
	 */
	getExports(moduleGraph: ModuleGraph): undefined | ExportsSpec;

	/**
	 * Returns warnings
	 */
	getWarnings(moduleGraph: ModuleGraph): WebpackError[];

	/**
	 * Returns errors
	 */
	getErrors(moduleGraph: ModuleGraph): WebpackError[];

	/**
	 * Update the hash
	 */
	updateHash(hash: Hash, context: UpdateHashContextDependency): void;

	/**
	 * implement this method to allow the occurrence order plugin to count correctly
	 */
	getNumberOfIdOccurrences(): number;
	getModuleEvaluationSideEffectsState(
		moduleGraph: ModuleGraph
	): ConnectionState;
	createIgnoredModule(context: string): Module;
	serialize(__0: { write: any }): void;
	deserialize(__0: { read: any }): void;
	module: any;
	readonly disconnect: any;
	static NO_EXPORTS_REFERENCED: string[][];
	static EXPORTS_OBJECT_REFERENCED: string[][];
}
```


- EntryDependency
```js
EntryDependency -> ModuleDependency -> 
EntryDependency: {

}
```


## Compilation

```js
compilation: Compilation {
  entries: Map {
    [key: string]: Object: entryData  {
    	dependencies: EntryDependency[],
	includeDependencies: [],
      	options: {
	chunkLoading: undefined
	dependOn: undefined
	filename: undefined
	layer: undefined
	library: undefined
	name: "home", // entry key
	runtime: undefined
	wasmLoading: undefined
      }
    }
  }
}


```

## webpack

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

## module

- module 对象

```js
NormalModule {
  dependencies: [], // 很重要的概念 当前模块的依赖
  blocks: [], // 很重要的概念 当前模块的依赖
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
  issuer: null,// 重要概念，表示谁引用了当前模块
  profile: undefined,
  prefetched: false,
  built: true,
  used: null,
  usedExports: null,
  optimizationBailout: [],
  _rewriteChunkInReasons: undefined,
  useSourceMap: true,
  _source: [SourceMapSource],
  request: '/Users/xxx/workspace/xxx/node_modules/babel-loader/lib/index.js!/Users/xxx/workspace/xxx/src/index.js',
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
}
```

- dependency 对象

```

```

## chunk

```js
Chunk {
  id: 'main',
  ids: [ 'main' ],
  debugId: 1000,
  name: 'main',
  preventIntegration: false,
  entryModule: NormalModule {/* 参见 Module 对象 */},
  _modules:
    SortableSet [Set] {
      [NormalModule],
      _sortFn: [Function: sortByIdentifier],
      _lastActiveSortFn: null,
      _cache: undefined,
      _cacheOrderIndependent: undefined
    },
  filenameTemplate: undefined,
  _groups:
    SortableSet [Set] {
      [Entrypoint],
      _sortFn: [Function: sortChunkGroupById],
      _lastActiveSortFn: null,
      _cache: undefined,
      _cacheOrderIndependent: undefined
    },
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
