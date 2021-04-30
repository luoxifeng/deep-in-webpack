const { resolve } = require("path");
const forEachBail = require('enhanced-resolve/lib/forEachBail');

module.exports = class CurrentCtxAliasPlugin {
  
  constructor(options) {
    this.source = 'normal-resolve'
    this.target = 'internal-resolve'
    this.alias = Object.entries(options.alias).map(([alias, value]) => ({ alias, value }))
    this.log = options.log || false
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
            // 未匹配到配置的别名
            if (!requestStr.startsWith(item.alias)) return callback()
            // 取别名后边的路径
            const remainingRequest = requestStr.substr(item.alias.length)
            // 静态路径
            const staticPath = item.value.replace(/\{\{.*/, '').replace(/(\/$)/, '')
            // 引用路径截掉静态路径后的路径
            const relativePath = request.path.replace(staticPath, '').replace(/(^\/)|(\/$)/g, '')
            // 分割路径得到每一级路径
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
             
            this.log && console.log(message)
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
