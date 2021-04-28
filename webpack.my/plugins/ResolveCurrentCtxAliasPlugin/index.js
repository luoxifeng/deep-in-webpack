const { resolve } = require("path");
const forEachBail = require('enhanced-resolve/lib/forEachBail');

module.exports = class CurrentCtxAliasPlugin {
  
  constructor(options) {
    this.source = 'normal-resolve'
    this.target = 'internal-resolve'
    this.alias = Object.entries(options.alias).map(([alias, value]) => ({ alias, value }))
  }

  apply(resolver) {
    const target = resolver.ensureHook(this.target)
    resolver
      .ensureHook(this.source)
      .tapAsync('CurrentCtxAliasPlugin', (request, resolveContext, callback) => {
        let requestStr = request.request || request.path
        if (!requestStr) return callback()

        forEachBail(
          this.alias, 
          (items, callback) => {
            console.log(request, resolveContext, callback)
            if (!requestStr.startsWith(items.alias)) return callback()
            const remainingRequest = requestStr.substr(items.alias.length)
            const staticPath = items.value.replace(/\{\{.*/, '').replace(/(\/$)/, '')
            const relativePath = request.path.replace(staticPath, '').replace(/(^\/)|(\/$)/g, '')
            const splitPath = relativePath.split(/\//)
            requestStr = items.value.replace(/\{\{(\d+)\}\}/g, (_, k) => splitPath[k])

            requestStr = resolve(requestStr, remainingRequest.startsWith('/') ? `.${remainingRequest}` : `./${remainingRequest}`)
            const newRequest = {
              ...request,
              request: requestStr
            }
            const message = ''
            resolver.doResolve(
              target,
              newRequest,
              message,
              resolveContext,
              (err, result) => {
                if (err) return callback(err)
                if (result) return callback(null, result)
                return callback()
              },
            )
          },
          callback
        )
      })
  }
}