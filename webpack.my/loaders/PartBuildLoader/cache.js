const path = require('path')
const fs = require('fs')
const Watchpack = require('watchpack')

const projectDir = process.cwd()
const basePart = []
const alias = {}
const options = {
  entryConfigFilePath: '',
  entryFileData: '',
  entryDir: '',
  templateData: '',
  auto: true,
}

function readEntryFile() {
  const absPath = path.resolve(projectDir, options.entryConfigFilePath)
  return fs.readFileSync(absPath, 'utf8')
}

function readEmptyTemplate() {
  const templatePath = path.resolve(__dirname, './template.vue')
  return fs.readFileSync(templatePath, 'utf8')
}

function watchEntryFileData() {
  const absPath = path.resolve(projectDir, options.entryConfigFilePath)
  const wp = new Watchpack({
    aggregateTimeout: 500,
    poll: false,
  })
  wp.watch({
    files: [absPath],
    startTime: Date.now() - 10000,
  })
  wp.on('change', filePath => {
    if (absPath === filePath) {
      options.entryFileData = readEntryFile()
    }
  })
}

function initStaticConfig(config) {
  basePart.push(...config.basePart)
  Object.assign(alias, config.alias)
  options.entryConfigFilePath = config.entryConfigFilePath
  options.entryDir = config.entryDir
  options.entryFileData = readEntryFile()
  watchEntryFileData()
  options.templateData = readEmptyTemplate()
  if (config.auto !== undefined) options.auto = config.auto
}

exports.initStaticConfig = initStaticConfig
exports.projectDir = projectDir
exports.basePart = basePart
exports.alias = alias
exports.options = options
