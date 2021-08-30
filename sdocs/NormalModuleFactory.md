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

## createData （当前模块创建的信息，等于 `resolveData.createData`）
> 创建一个module所需要的信息, 从 `normalModuleFactory.hooks.afterResolve` 开始才有值，因为经过resolve之后，已经解析出文件的上下文，真实路径，loader信息等创建一个 `normalModule`所需信息，为了方便都聚

```js
{
  context: '/Users/deep-in-webpack/packages', // 文件上下文
  generator: JavascriptGenerator, // 模块生成器，后面流程会使用它来生成模块代码
  generatorOptions: undefined, // 生成器配置
  layer: null,
  loaders: [{…}], // 当前文件将要使用的loader, 已经经过解析排序过滤过的
  matchResource: undefined,
  parser: JavascriptParser, // 模块parser，后面流程会使用它来解析模块内容，来分析当前模块的依赖（类似babel）
  parserOptions: undefined, // parser配置
  rawRequest: './packages/test.js', // 原生请求字符串，书写在文件中的原始字符串，一般是相对路径，或者是带别名的
  request: '/Users/deep-in-webpack/node_modules/babel-loader/lib/index.js??ruleSet[1].rules[0].use[0]!/Users/deep-in-webpack/packages/test.js', // 请求处理路径，表示当前模块经过loader的过程(右 -> 左，以 ！分割)
  resolveOptions: undefined, // 解析模块的配置
  resource: '/Users/deep-in-webpack/packages/test.js', // 当前模块的资源路径
  resourceResolveData: {…}, // 模块解析出来的信息，包好文件绝对路径，上下文等，
  settings: {}
  type: 'javascript/auto', // 模块类型, parser的钩子会用到 parser.hooks.for('javascript/auto')
  userRequest: '/Users/deep-in-webpack/packages/test.js', // 模块经过解析的绝对路径
}
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
     * 此钩子一般用来忽略某个模块
     **/
    if (/xxx/.test(resolveData.request)) {
      return callback(null, false)
    }
    callback()
  })
})
```

### factorize

- resolve
- resolveForScheme
### afterResolve
> 已经解析出当前模块的路径信息，loader信息，以及创建模块所需要的 `createData`，下一步就准备开始创建 `module` 流程了
```js
compiler.hooks.thisCompilation.tap("XXX", (compilation, { normalModuleFactory }) => {
  normalModuleFactory.hooks.afterResolve.tap('XXX', (resolveData) => {
    /**
     * 此时已经存在 resolveData.createData
     */
    
  })
})

```

### createModule
> 在创建 NormalModule 实例之前调用，此时还没有创建实例

```js
compiler.hooks.thisCompilation.tap("XXX", (compilation, { normalModuleFactory }) => {
  normalModuleFactory.hooks.createModule.tap('XXX', (createData, resolveData) => {
    // resolveData.createData === createData， 为了方便 createData 单独穿了进来
    /**
     * 此时并没有创建module实例
     * 如果返回一个module实例，接下来讲不会使用webpack默认创建的实例
     * 一般用来根据 createData 的信息来创建一个新的module替换的默认module
     * 如果是想对原始module，做一层包装，那么需要在 normalModuleFactory.hooks.module 返回新的module
     * 因为 createModule 一般还没有创建module实例（除非我们自己或者其他插件监听了此钩子创建了实例）
     * 所以要是想对原来模块进行包装还是在 normalModuleFactory.hooks.module 里面去做
     */
    // 替换原始模块
    return new XXXModule(createData)
  })
})
```

### module
> 在创建 NormalModule 实例后调用

```js
compiler.hooks.thisCompilation.tap("XXX", (compilation, { normalModuleFactory }) => {
  normalModuleFactory.hooks.module.tap('XXX', (module createData resolveData) => {
    /**
     * 在createModule钩子里，如果返回了自定义的模块
     * 那么这里的module就是指createModule钩子里面返回的，
     * 如果 createModule 没有返回，则会调用 new NormalModule
     * 那么这里的module指的就是默认创建的module
     * 这种方式一般应用在对原始module进行包装，又需要保留原始module的场景下
     */
    return new XXXModule(module)
  })
})
```

### createParser
```js
compiler.hooks.thisCompilation.tap("XXX", (compilation, { normalModuleFactory }) => {
  normalModuleFactory.hooks.createParser
    .for('javascript/auto')
    .tap('MyPlugin', (parser, options) => {
      // 返回一个解析器, 一般情况下不需要
      // 除非自定义解析器
      return XXXXParser()
    });
})
```

### parser
> 当前模块被loader处理完成之后，webpack会对编译后的代码进行解析来分析当前模块的依赖，
> 我们可以监听代码的解析的钩子做一些操作

```js
compiler.hooks.thisCompilation.tap("XXX", (compilation, { normalModuleFactory }) => {
  normalModuleFactory.hooks.parser
    .for('javascript/auto')
    .tap('MyPlugin', (parser, options) => {
      parser.hooks.import.tap('MyPlugin', (statement, source) => {
        console.log(statement, source)
      })
    });
})
```


