# \__webpack_require__.e, \__webpack_require__.f
> 远程加载脚本，包括 `动态import` ,`模块联邦shared模块` 

## __webpack_require__.e
- 代码实现
```js
/* webpack/runtime/ensure chunk */
(() => {
  // 承载动态加载的模块
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

- 过程分析
  - 遍历__webpack_require__.f所有key值（j, consumes, remotes）
  - 依次执行key值对应的函数（传入当前chunkid, promises数组）
    - 函数内部会异步加载当前chunk的依赖项
    - 同时把异步加载的promise推入数组
  - 返回Promise.all，当resolve以后，当前chunk所依赖模块都已经准备好

## __webpack_require__.f
```
加载当前chunk
```

- remotes
```
加载远程chunk，指当前项目模块联邦配置的remotes字段对应的chunk, 同时也是引用的其他项目模块联邦配置的expose对应的chunk
```

- consume
```
加载模块联邦shared chunk
```
