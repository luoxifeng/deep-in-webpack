const { resolve } = require("path");
const _resolve = require('enhanced-resolve');
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
          (item, callback) => {
            console.log(request, resolveContext, callback)
            if (!requestStr.startsWith(item.alias)) return callback()
            const remainingRequest = requestStr.substr(item.alias.length)
            const staticPath = item.value.replace(/\{\{.*/, '').replace(/(\/$)/, '')
            const relativePath = request.path.replace(staticPath, '').replace(/(^\/)|(\/$)/g, '')
            const splitPath = relativePath.split(/\//)
            const currentContext = item.value.replace(/\{\{(\d+)\}\}/g, (_, k) => splitPath[k])

            requestStr = resolve(currentContext, remainingRequest.startsWith('/') ? `.${remainingRequest}` : `./${remainingRequest}`)
            const newRequest = {
              ...request,
              request: requestStr
            }

            const message = [
              `\nalias path '${request.request}' mapping info:`,
              `\n  issuer: '${request.context.issuer}'`,
              `\n  context: '${currentContext}'`,
              `\n  mapping: '${requestStr}'`,
              `\n`,
            ].join('')
             
            console.log(message)
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