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
  - issuer （释义：发行者， 发行人）  
    指的是引用 `当前模块` 的 `那个模块` 的 `绝对路径`，简单点说也就是指当前模块之所以会加入构建流程中的原因，因为有`其他模块`用了此模块，这里 `其他模块` 的绝对路径就是 `issuer`。\
   
    ```js
    // a1.js
    import b from './b'

    // a2.js
    import b from './b'

    // b.js
    export default {
      b: 123
    }

    /**
     * 上述代码 a1， a2 都引用 b, NormalModuleFactory 在处理到 b.js 的时候
     * 如果是通过处理 a1 依赖过来的，那么此时 issuer 的值就是 a1.js 的绝对路径
     * 如果是通过处理 a2 依赖过来的，那么此时 issuer 的值就是 a2.js 的绝对路径
     */

    ```

    > 注意：.由于入口文件是没有被`其他模块`引用的，所以 `issuer` 是空的。

### resolveData.request （当前模块在父模块中被引用的原始写法)
```js
// a1.js
import b from './b'

// a2.js
import b from './b.js'

// b.js
export default {
  b: 123
}

/**
 * 上述代码 a1， a2 都引用 b, NormalModuleFactory 在处理到 b 的时候
 * 如果是通过处理 a1 依赖过来的，request 的值就是 "./b"
 * 如果是通过处理 a2 依赖过来的，request 的值就是 "./b.js"
 **/
```


### resolveData.dependencyType （当前模块在父模块中被引用的方式）

```js
// a1.js
import b from './b' // 通过 esm 形式引用

// a2.js
require('./b') // 通过 commonjs 形式引用

// b.js
export default {
  b: 123
}

/**
 * 上述代码 a1， a2 都引用 b, NormalModuleFactory 在处理到 b 的时候
 * 如果是通过处理 a1 依赖过来的，dependencyType 的值就是 "esm"
 * 如果是通过处理 a2 依赖过来的，dependencyType 的值就是 "commonjs"
 **/
```


### resolveData.dependencies （当前模块在父模块中被引用时所产生的依赖）
指的是当前模块所关联的依赖，注意并不是指当前模块引用了其他模块而产生的依赖，而是指当前模块的 `引用者` 是以什么形式引用此模块而产生的依赖。
<br>指的是 `上游（模块以什么形式引用的当前模块）` 而不是 `下游（当前模块以什么形式引用其他模块）`。
<br>比如以下代码

```js
// a1.js
import b from './b' // 会被处理成 HarmonyImportSideEffectDependency 存在 a1模块的 dependencies 中
console.log(b, '====') // 会被处理成 HarmonyImportSpecifierDependency 存在 a1模块的 dependencies 中


// a2.js
const b = require('./b') // 会被处理成 CommonJsRequireDependency 存在 a2模块的 dependencies 中

// b.js
export default {
  b: 123
}

/**
 * 上述代码 a1， a2 都引用 b, NormalModuleFactory 在处理到 b 的时候
 * 如果是通过处理 a1 依赖过来的，dependencies 的值就是 [HarmonyImportSideEffectDependency]
 * 
 * 如果是通过处理 a2 依赖过来的，dependencies 的值就是 [CommonJsRequireDependency, HarmonyImportSpecifierDependency]
 **/
```
  
### resolveData.resolveOptions 
```js

```

### resolveData.createData （当前模块创建的信息）
```js

```

## hooks

### beforeResolve
> 当遇到新的依赖项请求时调用。可以通过返回 false 来忽略依赖项

```js
compiler.hooks.thisCompilation.tap("XXX", (compilation, { normalModuleFactory }) => {
  normalModuleFactory.hooks.beforeResolve.tapAsync('XXX', (resolveData, callback) => {
    /**
     * 此时已经处理完父模块，准备处理父模块的依赖项，但是还没有解析模块的真实路径，
     * 也没有创建模块，所以关于模块本身的信息很少，能得到的信息是关于当前模块与父模块的引用关系，依赖关系等，
     * 下面这些变量有值，当然根据这些变量是可以得到父模块的一些信息
     * resolveData.request
     * resolveData.contextInfo
     * resolveData.dependencyType
     * resolveData.dependencies
     * 此钩子一般用来
     **/
    if (/xxx/.test(resolveData.request)) {
      return callback(null, false)
    }
    callback()
  })
})
```

> 当遇到新的依赖项请求时调用。可以通过返回 false 来忽略依赖项

- resolve