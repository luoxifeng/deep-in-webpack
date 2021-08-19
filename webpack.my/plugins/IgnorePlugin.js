module.exports = class IgnorePlugin {

  constructor() {

  }

  apply(compiler) {
    compiler.hooks.thisCompilation.tap("XXX", (compilation, { normalModuleFactory, contextModuleFactory }) => {
      normalModuleFactory.hooks.beforeResolve.tapAsync('XXX', (resolveData, callback) => {
        console.log(resolveData)
        if (/locale/.test(resolveData.request)) {
          return callback(null, false)
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