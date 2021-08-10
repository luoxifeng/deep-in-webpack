# __webpack_require__.e
> 远程加载脚本，包括 `动态import` ,`模块联邦shared模块` 

## 代码实现
```js
/* webpack/runtime/ensure chunk */
(() => {
  __webpack_require__.f = {};

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

## 过程
- 遍历__webpack_require__.f所有key值（f, consumes, remotes）
- 依次执行key值对应的函数（传入当前chunkid, promises数组）
  - 函数内部会异步加载当前chunk的依赖项
  - 同时把异步加载的promise推入数组
- 返回Promise.all，当resolve以后，当前chunk所依赖模块都已经准备好

## __webpack_require__.f
- j
- remotes
- consume