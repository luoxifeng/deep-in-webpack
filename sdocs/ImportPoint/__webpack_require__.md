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
- __webpack_require__.e (Function)
```
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