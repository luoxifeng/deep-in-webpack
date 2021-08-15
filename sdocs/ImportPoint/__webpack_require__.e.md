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
```
加载当前chunk
```

### \_\_webpack_require__.f.remotes
```
加载远程chunk，指当前项目模块联邦配置的remotes字段对应的chunk, 同时也是引用的其他项目模块联邦配置的expose对应的chunk
```

### \_\_webpack_require__.f.consume
```
加载模块联邦shared chunk
```
