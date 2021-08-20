module.exports = class IgnorePlugin {

  constructor() {

  }

  apply(compiler) {
    compiler.hooks.thisCompilation.tap("XXX", (compilation, { normalModuleFactory, contextModuleFactory }) => {
      normalModuleFactory.hooks.beforeResolve.tapAsync('XXX', (resolveData, callback) => {
        console.log(resolveData)
        if (/test2/.test(resolveData.request)) {
          resolveData.dependencies.forEach((dep, i) => {
            if (i) {
              dep._parentModule.removeDependency(dep)
              console.log(dep)
            } else {
              // 
            }
          })
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

      normalModuleFactory.hooks.resolve.tapAsync('XXX', (resolveData, callback) => {
        if (/test2/.test(resolveData.request)) {
          console.log(resolveData, 'test2 resolve')

          // const index = dep._parentModule.dependencies.findIndex(t => t === dep)
          // if (index > -1) {
          //   dep._parentModule.dependencies.splice(index, 1)
          // }
          // return callback(null, false)
        }
        callback()
      })

      normalModuleFactory.hooks.parser
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