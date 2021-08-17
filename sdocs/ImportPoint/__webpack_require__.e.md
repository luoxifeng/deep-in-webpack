# \_\_webpack_require__.e, \_\_webpack_require__.f
`__webpack_require__.e`，`__webpack_require__.f` 两者是成对出现的，配合在一起，作用是动态加载脚本，包括 `动态import` ,`模块联邦shared模块` 

## \_\_webpack_require__.e
`__webpack_require__.e` 可以看做是一个聚合执行器。它把加载一个 `chunk` 不同依赖项的逻辑聚合在一起执行，保证所有的依赖项都得到解决以后才会继续后续流程
> 说明：具体依赖项的加载逻辑还是在各自的函数里（分而治之）

### 代码实现
```js
/* webpack/runtime/ensure chunk */
(() => {
  /**
   * 承载chunk不同的依赖项
   **/
  __webpack_require__.f = {};

  // 动态创建script，确保依赖加载完成，然后执行后续流程
  __webpack_require__.e = (chunkId) => {
    const _promises = Object.keys(__webpack_require__.f)
      .reduce((promises, key) => {
        __webpack_require__.f[key](chunkId, promises);
        return promises;
      }, [])
    return Promise.all(_promises);
  };
})();
```

### 过程分析
  - 遍历__webpack_require__.f所有key值（j, consumes, remotes）
  - 依次执行key值对应的函数（传入当前chunkid, promises数组）
    - 函数内部会异步加载当前chunk的依赖项
    - 同时把异步加载的promise推入数组
  - 返回Promise.all，当resolve以后，当前chunk所依赖模块都已经准备好

## \_\_webpack_require__.f

### \_\_webpack_require__.f.j (j指的是 jsonp)
```js
/* webpack/runtime/jsonp chunk loading */
(() => {
	// no baseURI
	
	// object to store loaded and loading chunks
	// undefined = chunk not loaded, null = chunk preloaded/prefetched
	// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
	var installedChunks = {
		"main": 0
	};
	
	__webpack_require__.f.j = (chunkId, promises) => {
			// JSONP chunk loading for javascript
			var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
			if(installedChunkData !== 0) { // 0 means "already installed".
	
				// a Promise means "currently loading".
				if(installedChunkData) {
					promises.push(installedChunkData[2]);
				} else {
					if(!/^webpack_(container_remote_app10_Button|sharing_consume_default_react_react)$/.test(chunkId)) {
						// setup Promise in chunk cache
						var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
						promises.push(installedChunkData[2] = promise);
	
						// start chunk loading
						var url = __webpack_require__.p + __webpack_require__.u(chunkId);
						// create error before stack unwound to get useful stacktrace later
						var error = new Error();
						var loadingEnded = (event) => {
							if(__webpack_require__.o(installedChunks, chunkId)) {
								installedChunkData = installedChunks[chunkId];
								if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
								if(installedChunkData) {
									var errorType = event && (event.type === 'load' ? 'missing' : event.type);
									var realSrc = event && event.target && event.target.src;
									error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
									error.name = 'ChunkLoadError';
									error.type = errorType;
									error.request = realSrc;
									installedChunkData[1](error);
								}
							}
						};
						__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
					} else installedChunks[chunkId] = 0;
				}
			}
	};
	
	// no prefetching
	
	// no preloaded
	
	// no HMR
	
	// no HMR manifest
	
	// no on chunks loaded
	
	// install a JSONP callback for chunk loading
	var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
		var [chunkIds, moreModules, runtime] = data;
		// add "moreModules" to the modules object,
		// then flag all "chunkIds" as loaded and fire callback
		var moduleId, chunkId, i = 0;
		for(moduleId in moreModules) {
			if(__webpack_require__.o(moreModules, moduleId)) {
				__webpack_require__.m[moduleId] = moreModules[moduleId];
			}
		}
		if(runtime) var result = runtime(__webpack_require__);
		if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
		for(;i < chunkIds.length; i++) {
			chunkId = chunkIds[i];
			if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
				installedChunks[chunkId][0]();
			}
			installedChunks[chunkIds[i]] = 0;
		}
	
	}
	
	var chunkLoadingGlobal = self["webpackChunk_basic_host_remote_app1"] = self["webpackChunk_basic_host_remote_app1"] || [];
	chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
	chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
})();
```

### \_\_webpack_require__.f.remotes
```
加载远程chunk，指当前项目模块联邦配置的remotes字段对应的chunk, 同时也是引用的其他项目模块联邦配置的expose对应的chunk
```

### \_\_webpack_require__.f.consume
```
加载模块联邦shared chunk
```

## \_\_webpack_require__.I
```js
(() => {
	__webpack_require__.S = {};
	var initPromises = {};
	var initTokens = {};
	__webpack_require__.I = (name, initScope) => {
		if(!initScope) initScope = [];
		// handling circular init calls
		var initToken = initTokens[name];
		if(!initToken) initToken = initTokens[name] = {};
		if(initScope.indexOf(initToken) >= 0) return;
		initScope.push(initToken);
		// only runs once
		if(initPromises[name]) return initPromises[name];
		// creates a new share scope if needed
		if(!__webpack_require__.o(__webpack_require__.S, name)) __webpack_require__.S[name] = {};
		// runs all init snippets from all modules reachable
		var scope = __webpack_require__.S[name];
		var warn = (msg) => (typeof console !== "undefined" && console.warn && console.warn(msg));
		var uniqueName = "@basic-host-remote/app1";
		var register = (name, version, factory, eager) => {
			var versions = scope[name] = scope[name] || {};
			var activeVersion = versions[version];
			if(!activeVersion || (!activeVersion.loaded && (!eager != !activeVersion.eager ? eager : uniqueName > activeVersion.from))) versions[version] = { get: factory, from: uniqueName, eager: !!eager };
		};
		var initExternal = (id) => {
			var handleError = (err) => (warn("Initialization of sharing external failed: " + err));
			try {
        // 引用远程
				var module = __webpack_require__(id);
				if(!module) return;

        // 初始化远程
				var initFn = (module) => (module && module.init && module.init(__webpack_require__.S[name], initScope))

        /**
         * 无论是通过哪种方式获取远程上下文，此函数最终返回的都是promise
         * 原因是：
         *  remote应用可能存在与host应用相同的共享的模块(比如react...),
         *  那么host应用此时是不能确定是否使用自身的shared模块
         *  所以调用了 initExternal 去拉取remote，同时创建了promise来控制shared module的加载
         *  当远程模块 init 以后, 也就是注册shared module 以后会继续流程，
         *  此时host就可以根据版本号等信息确定要使用哪个来源的共享模块了
         * */
        // 这里如果是通过__webpack_require__.l请求的返回的promise, 
				if(module.then) return promises.push(module.then(initFn, handleError));

        // 如果是远程脚本已经注入到html，返回的就是远程到处的上下文 { init, get }
				var initResult = initFn(module);
				if(initResult && initResult.then) return promises.push(initResult.catch(handleError));
			} catch(err) { handleError(err); }
		}
		var promises = [];
		switch(name) {
			case "default": {
				register("react-dom", "16.14.0", () => (Promise.all([__webpack_require__.e("vendors-node_modules_react-dom_index_js"), __webpack_require__.e("webpack_sharing_consume_default_react_react")]).then(() => (() => (__webpack_require__(/*! ../node_modules/react-dom/index.js */ "../node_modules/react-dom/index.js"))))));
				register("react", "16.14.0", () => (Promise.all([__webpack_require__.e("vendors-node_modules_react_index_js"), __webpack_require__.e("node_modules_object-assign_index_js-node_modules_prop-types_checkPropTypes_js")]).then(() => (() => (__webpack_require__(/*! ../node_modules/react/index.js */ "../node_modules/react/index.js"))))));
				initExternal("webpack/container/reference/app2");
			}
			break;
		}
 
		if(!promises.length) return initPromises[name] = 1;

    /**
     * 远程模块初始化以后 promises 会被resolve,继续流程
     * */
		return initPromises[name] = Promise.all(promises).then(() => (initPromises[name] = 1));
	};
})();
```
