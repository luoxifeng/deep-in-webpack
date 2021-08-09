# __webpack_require__

## 基本
- __webpack_require__ (Function)
```
```

- __webpack_require__.p (String)
```js
指的是 publicPath
```

- __webpack_require__.o (Function)
```
```

## 动态import相关
- __webpack_require__.f (Object)
```

__webpack_require__.f = {

}

```

- __webpack_require__.e (Function)
```js

 
__webpack_require__.e = (chunkId) => {
  return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
    __webpack_require__.f[key](chunkId, promises);
    return promises;
  }, []));
};
```


## 热更新相关
> 以 `h`, `hmr` 开头

- __webpack_require__.h (Function)
```js
/* webpack/runtime/getFullHash */
/* 本次构建hash，代表本次整个编译的hash值 */
__webpack_require__.h = () => ("7ba73b6e2564bfb1a168")
```

- __webpack_require__.hmrF (Function)

```js
/* webpack/runtime/get update manifest filename */
/* 携带上次构建的hash值，拼接获取更新文件清单的请求url，json后缀 */	
__webpack_require__.hmrF = () => ("runtime." + __webpack_require__.h() + ".hot-update.json");
```

- __webpack_require__.hmrM (Function)
```js
/**
 * 在热更新 check 阶段客户端发送请求，去请求资源变更清单
 * 接下来根据请求到的manifest，创建script请求更新的内容
 */
__webpack_require__.hmrM = () => {
  if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
  return fetch(
      __webpack_require__.p + __webpack_require__.hmrF() // json url
    )
    .then((response) => {
      if(response.status === 404) return; // no update available
      if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
      return response.json();
    });
};
```

- __webpack_require__.hmrC (Object: { jsonp: Function, [key]: Function })
```js
// array with handler functions to download chunk updates
/**
 * 挂载请求更新文件的函数，
 * 热更新 prepare 阶段的时候会遍历此对象的上面的key值
 * 调用函数创建script标签请求脚本，当所有请求回来，
 * 脚本开始执行后才会进入then, 在此对象上我们也可以注册我们自己的函数
 * 热更新默认挂载的是 __webpack_require__.hmrC.jsonp 函数
 */
Promise.all(
  Object.keys(__webpack_require__.hmrC)
    .reduce(function (promises, key) {
      __webpack_require__.hmrC[key](
        update.c,
        update.r,
        update.m,
        promises,
        currentUpdateApplyHandlers,
        updatedModules
      );
      return promises;
    },
    []
  )
)
```