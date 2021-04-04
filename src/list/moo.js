
// class AAA {

// }

module.exports = 'LazyCompilation data: 068<br>'

console.warn('%cLoaded LazyCompilation: file', 'color:red;background:#000;');

if (module.hot) {

  module.hot.accept()

}
// export default function ddd() {}


// var moduleMap = {
//   "./components/Comonpnent1": function () {
//     return Promise.all([
//       __webpack_require__.e("webpack_sharing_consume_default_react_react"),
//       __webpack_require__.e("src_components_Close_index_tsx")]).then(function () {
//         return function () {
//           return (__webpack_require__(16499));
//         };
//       });
//   },
// };
// var get = function (module, getScope) {
//   __webpack_require__.R = getScope;
//   getScope = (
//     __webpack_require__.o(moduleMap, module)
//       ? moduleMap[module]()
//       : Promise.resolve().then(function () {
//         throw new Error('Module "' + module + '" does not exist in container.');
//       })
//   );
//   __webpack_require__.R = undefined;
//   return getScope;
// };
// var init = function (shareScope, initScope) {
//   if (!__webpack_require__.S) return;
//   var oldScope = __webpack_require__.S["default"];
//   var name = "default"
//   if (oldScope && oldScope !== shareScope) throw new Error("Container initialization failed as it has already been initialized with a different share scope");
//   __webpack_require__.S[name] = shareScope;
//   return __webpack_require__.I(name, initScope);
// }


// __webpack_require__.f = {};
// // This file contains only the entry chunk.
// // The chunk loading function for additional chunks
// __webpack_require__.e = function (chunkId) {
//   // 获取__webpack_require__.f中的依赖
//   return Promise.all(Object.keys(__webpack_require__.f).reduce(function (promises, key) {
//     __webpack_require__.f[key](chunkId, promises);
//     return promises;
//   }, []));
// };

// __webpack_require__.f.consumes = function (chunkId, promises) {
//   // 检查当前需要加载的chunk是否是在配置项中被声明为shared共享资源，如果在__webpack_require__.O上能找到对应资源，则直接使用，不再去请求资源
//   if (__webpack_require__.o(chunkMapping, chunkId)) {
//     chunkMapping[chunkId].forEach(function (id) {
//       if (__webpack_require__.o(installedModules, id)) return promises.push(installedModules[id]);
//       var onFactory = function (factory) {
//         installedModules[id] = 0;
//         __webpack_modules__[id] = function (module) {
//           delete __webpack_module_cache__[id];
//           module.exports = factory();
//         }
//       };
//       try {
//         var promise = moduleToHandlerMapping[id]();
//         if (promise.then) {
//           promises.push(installedModules[id] = promise.then(onFactory).catch(onError));
//         } else onFactory(promise);
//       } catch (e) { onError(e); }
//     });
//   }
// }

