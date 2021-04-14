/* eslint-disable */
const {
  ConcatSource,
  CachedSource,
  RawSource,
  OriginalSource
} = require('webpack-sources')
const { Compilation, util, javascript, Module, Dependency, RuntimeGlobals, Template } = require('webpack');
const AsyncDependenciesBlock = require("webpack/lib/AsyncDependenciesBlock");
const CommonJsRequireDependency = require("webpack/lib/dependencies/CommonJsRequireDependency");
const { registerNotSerializable } = require("webpack/lib//util/serialization");

const { getCompilationHooks } = javascript.JavascriptModulesPlugin;
const chalk = require('chalk');


class HHh  extends Module {
  constructor(context, request, originalModule) {
    super("lazy-compilation-proxy", context, originalModule.layer);
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

// registerNotSerializable(HHh)
module.exports = class InjectPrependChunkPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {

    // class MyDependency extends Dependency {
    //   constructor() {
    //     super();
    //     // this.originalModule = originalModule;
    //   }
    
    //   get category() {
    //     return "esm";
    //   }
    
    //   get type() {
    //     return "lazy import()";
    //   }
    
    //   /**
    //    * @returns {string | null} an identifier to merge equal requests
    //    */
    //   getResourceIdentifier() {
    //     return 'uheudnfjsnfj.js';
    //   }
    // }

    


    compiler.hooks.compilation.tap("XXX",(compilation, { normalModuleFactory }) => {
      const nmfHooks = normalModuleFactory.hooks
      nmfHooks.beforeResolve.tapAsync("XXX", (resolveData, callback) => {
        console.log(resolveData)
        callback()
      })
    })
  }
}
