module.exports = class IgnorePlugin {

  constructor() {

  }

  apply(compiler) {
    compiler.hooks.thisCompilation.tap("XXX", (compilation, { normalModuleFactory }) => {
      normalModuleFactory.hooks.beforeResolve.tapAsync('XXX', (resolveData, callback) => {
        console.log(resolveData)
        if (/test2\.js/.test(resolveData.request)) {
          callback(null, false)
        }
        callback()
      })
    })
  }
}