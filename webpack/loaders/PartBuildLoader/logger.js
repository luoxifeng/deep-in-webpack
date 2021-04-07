const chalk = require('chalk')

// eslint-disable-next-line no-console
const log = console.log
const levelColor = {
  0: chalk.white,
  1: chalk.green,
  2: chalk.yellow,
  3: chalk.red,
}

module.exports = function chalkLog(msg, level = 0, needWrap) {
  if (needWrap)log()
  log(levelColor[level](msg))
}

module.exports.wrap = function wrap() {
  log()
}
