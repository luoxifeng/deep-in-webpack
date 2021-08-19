# NormalModuleFactory


## resolveData
  ```js
  {
    assertions: undefined,
    cacheable: true,
    context: '/xxx/xxx/xxx/deep-in-webpack', // 绝对路径，构建上下文，一般是项目的根目录
    contextDependencies: LazySet {},
    contextInfo: { 
      issuer: '',
      issuerLayer: null,
      compiler: undefined
    },
    createData: { }, // 创建module以后才会有值
    dependencies: [], 
    dependencyType: 'esm', // 存在其他值 commonjs
    fileDependencies: LazySet {_set: Set(0), _toMerge: Set(1), _toDeepMerge: Array(1), _needMerge: true, _deopt: false}
    missingDependencies: LazySet {_set: Set(0), _toMerge: Set(1), _toDeepMerge: Array(1), _needMerge: true, _deopt: false}
    request: './packages/test.js', // 原始的引用，代码里面写的，不是经过处理后，所以可能不带后缀
    resolveOptions: {}
  }

  ```

### resolveData.contextInfo （当前模块所属的上下文信息）
  - 结构
    ```js
    { 
      issuer: '/xxx/xxx/xxx/index.js', // 当前模块引用者的绝对路径
      issuerLayer: null,
      compiler: undefined
    }
    ```
  - issuer  
    指的是引用 `当前模块` 的 `那个模块` 的 `绝对路径`，简单点说也就是指当前模块之所以会加入构建流程中的原因，因为有`其他模块`用了此模块，这里 `其他模块` 的绝对路径就是 `issuer`。\
    > 注意：
      <br>1.由于入口文件是没有被`其他模块`引用的，所以 `issuer` 是空的。
      <br>2.如果一个模块被多个模块引用，那么根据依赖链进入 `NormalModuleFactory.hooks.xxxx` 时，得到的上下文信息是不一样的, `issuer`也就不一样
    
### resolveData.dependencies （当前模块的`被依赖项`）
指的是当前模块所关联的依赖，注意并不是指当前模块引用了其他模块而产生的依赖，而是指当前模块的 `引用者` 是以什么形式引用此模块而产生的依赖。指的是 `上游（模块以什么形式引用的当前模块）` 而不是 `下游（当前模块以什么形式引用其他模块）`。
比如以下代码
```js
// a.js
import b from './b'

// b.js
export default {
  b: 123
}
```

  
### resolveData.resolveOptions 
```js

```

### resolveData.createData （当前模块创建的信息）
```js

```



## hooks

- beforeResolve
  > 当遇到新的依赖项请求时调用。可以通过返回 false 来忽略依赖项

  ```js
  compiler.hooks.thisCompilation.tap("XXX", (compilation, { normalModuleFactory }) => {
    normalModuleFactory.hooks.beforeResolve.tapAsync('XXX', (resolveData, callback) => {
      /**
       * 此时只是在处理依赖的时候，
       **/
      if (/xxx\.js/.test(resolveData.request)) {
        callback(null, false)
      }
      callback()
    })
  })
  ```

- 