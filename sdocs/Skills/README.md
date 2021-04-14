# Skills

## entry
- 更改entry名
```js
compiler.hooks.entryOption.tap("XXX", (context, entry) => {
  for (const i in entry) {
    if (/webpack-hot-middleware\/client/.test(entry[i])) {
      entry[i] += '&reload=true'
    }
  }
  return true;
});
```
- 增加entry的依赖
```js
compiler.hooks.entryOption.tap("XXX", (context, entry) => {
  for (const i in entry) {
    if (/home/.test(entry[i])) { // 指定入口，去掉判断就是全部入口
      entry[i].import.unshift('./common/deps.js')
    }
  }
  return true;
});
```

## module
- 忽略某个模块
```js
compiler.hooks.thisCompilation.tap("XXX",(compilation, { normalModuleFactory }) => {
  const nmfHooks = normalModuleFactory.hooks
  nmfHooks.beforeResolve.tapAsync('XXX', (resolveData, callback) => {
    if (/xxx\.js/.test(resolveData.request)) {
      callback(null, false)
    }
  })
})
```

- 用一个新的模块替换原来的模块
```js

class ProxyModule  extends Module {
  constructor(context, request, originalModule) {
    super("my-proxy-module", context, originalModule.layer);
    this.context = context;
    this.request = request;
    this.originalModule = originalModule
  }

  identifier() {
		return `proxy|${this.originalModule.identifier()}`;
	}

	/**
	 * @param {RequestShortener} requestShortener the request shortener
	 * @returns {string} a user readable identifier of the module
	 */
	readableIdentifier(requestShortener) {
		return `proxy ${this.originalModule.readableIdentifier(
			requestShortener
		)}`;
  }
  
  getSourceTypes() {
    return new Set(["javascript"]);
  }

  libIdent(options) {
    return `${this.originalModule.libIdent(options)}!proxy`;
  }

  needBuild(context, callback) {
    callback(null, true);
  }

  build(options, compilation, resolver, fs, callback) {
    this.buildInfo = {}
    // const block = new AsyncDependenciesBlock({});
    // block.addDependency(new MyDependency())
    const dep = new CommonJsRequireDependency(`${this.originalModule.resource}?true`)
    this.addDependency(dep);
    // this.addBlock(block);
    callback();
  }

  codeGeneration({ runtimeTemplate, chunkGraph, moduleGraph }) {
    console.log('MyProxyModule codeGeneration')
    const sources = new Map();
    const runtimeRequirements = new Set();
    let code = '';

    const dep = this.dependencies[0];
		const trueModule = moduleGraph.getModule(dep);

    runtimeRequirements.add(RuntimeGlobals.module);
    code += Template.asString([
      `var temp = ${runtimeTemplate.moduleExports({
				module: trueModule,
				chunkGraph,
				request: trueModule.userRequest,
				runtimeRequirements
      })}
      console.log('Test Proxy Module') // 自己添加代码
      module.exports = temp
      `
    ])
    // runtimeRequirements.add(RuntimeGlobals.exports);
    runtimeRequirements.add(RuntimeGlobals.exports);

    sources.set("javascript", new RawSource(code));

    return {
      sources,
      runtimeRequirements,
    }
  }

  size(type) {
    return 200;
  }

}

compiler.hooks.thisCompilation.tap("XXX",(compilation, { normalModuleFactory }) => {
  normalModuleFactory.hooks.module.tap("XXX", (originalModule, createData, resolveData) => {
    // XXXModule extends Module
    return new ProxyModule();
  })
})
```
- 剥离模块
```js
ExternalModuleFactoryPlugin
ExternalModule
```

## chunk
- 更新chunkhash
```js
// 常用在你要对chunk添加内容
compiler.hooks.thisCompilation.tap('XXX', compilation => {
  compilation.hooks.chunkHash.tap("XXX", (chunk, hash, { chunkGraph, runtimeTemplate }) => {
    if (hash.name === 'xxx') hash.update('some string')
  })
})
```

## asset
- 添加代码到asset上
```js
// 添加的代码因为没有添加到chunk中，会引起hash前后没变化，要去手动的更新hash,参照 `更新chunkhash`
compiler.hooks.thisCompilation.tap('XXX', compilation => {
  compilation.hooks.processAssets.tap(
    {
      name: 'MyPlugin',
      stage: Compilation.PROCESS_ASSETS_STAGE_DERIVED,
      additionalAssets: true,
    },
    (assets, callback) => {

      Object.keys(assets).forEach(key => {
        if (/xxx/.test(key)) {
          const origing = assets[key]._source;
          // 添加代码
          assets[key]._source = new ConcatSource(
            '/**Sweet Banner**/',
            '\n',
            'var g = 123456', // 
            '\n',
            origing
          );

          // 或者
          // compilation.updateAsset(key, new CachedSource(
          //   new ConcatSource(
          //     '/**Sweet Banner**/',
          //     '\n',
          //     'var g = 123456', // 
          //     '\n',
          //     origing
          //   )
          // ))
        }
      })
    
      callback()
    }
  )
})
```



