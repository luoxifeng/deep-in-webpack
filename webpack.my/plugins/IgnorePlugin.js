module.exports = class IgnorePlugin {

  constructor() {

  }

  apply(compiler) {
    compiler.hooks.thisCompilation.tap("XXX", (compilation, { 
      normalModuleFactory,
      contextModuleFactory 
    }) => {
      const nmf = normalModuleFactory

      nmf.hooks.beforeResolve.tapAsync('XXX', (resolveData, callback) => {
        console.log(resolveData)
        if (/test2/.test(resolveData.request)) {
          // resolveData.dependencies.forEach((dep, i) => {
          //   if (i) {
          //     dep._parentModule.removeDependency(dep)
          //     console.log(dep)
          //   } else {
          //     // 
          //   }
          // })
          // setTimeout(() => {
          //   compilation.moduleGraph.getModule(resolveData.dependencies[1]) 
          // }, 5 * 1000)
          // 
          // console.log(compilation.moduleGraph.getModule(dep))
          // dep._parentModule.presentationalDependencies.length = 1
          // return callback(null, false)
        }
        callback()
      })

      /**
       * factorize
       */
      nmf.hooks.factorize.tap('XXX', (resolveData) => {
        console.log(resolveData)
      })

      /**
       * resolve
       */
      nmf.hooks.resolve.tap('XXX', resolveData => {
        console.log(resolveData, 'test2 resolve')
      })

      /**
       * resolveForScheme 
       */

      /**
       * afterResolve
       */
      nmf.hooks.afterResolve.tap('XXX', (resolveData) => {
        console.log(resolveData)
      })

      /**
       * createModule
       */
      nmf.hooks.createModule.tap('XXX', (createData, resolveData) => {
        if (/test2/.test(resolveData.request)) {
          console.log(resolveData)
        }
      })

      // nmf.hooks.createGenerator
      //   .for('asset')
      //   .tap('XXX', (createData, resolveData) => {
      //   if (/test2/.test(resolveData.request)) {
      //     console.log(resolveData)
      //   }
      // })

      
      /**
       * module
       */
      nmf.hooks.module.tap('XXX', (module, createData, resolveData) => {
        if (/test2/.test(resolveData.request)) {
          console.log(resolveData)
        }
      })

      nmf.hooks.parser
        .for('javascript/auto')
        .tap('MyPlugin', (parser, options) => {
          parser.hooks.import.tap('mmm', (statement, source) => {

            console.log(statement, source)
            // return '111111'
          })
        });
    })
  }
}