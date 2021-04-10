const R = require('ramda')
const { getPartContent, initPartBuild, initHotListener } = require('./core')

const needPart = R.pipe(
  R.prop('argv'),
  R.slice(2, Infinity),
  R.find(R.includes('_part_')),
  Boolean,
)(process)

function partBuild(content) {
  initPartBuild({
    ...this.query,
    alias: this._compiler.options.resolve.alias,
  })
  return getPartContent(this.resourcePath) || content
}

if (needPart) {
  module.exports = partBuild
  initHotListener()
} else {
  module.exports = content => content
}

module.exports.HotReload = compiler => {
  compiler.hooks.entryOption.tap('tongdi-plugin', (_v, entrys) => {
    for (const i in entrys) {
      if (/webpack-hot-middleware\/client/.test(entrys[i])) {
        entrys[i] += '&reload=true'
      }
    }
  })
}
