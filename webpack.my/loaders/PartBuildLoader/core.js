const path = require('path')
const http = require('http')
const R = require('ramda')
const fs = require('fs')
const log = require('./logger')
const {
  initStaticConfig,
  alias,
  projectDir,
  basePart,
  options,
} = require('./cache')

const partList = []

function getModulePath(resourcePath) {
  return R.pipe(
    R.replace(path.resolve(projectDir, options.entryDir), ''),
    R.replace('.vue', ''),
    R.replace(/\/index$/, ''),
    R.replace(/^\//, ''),
  )(resourcePath)
}

function getPartBuildEmptyTemplate(modulePath) {
  return R.pipe(
    R.replace('$slotModulePath$', modulePath),
    R.replace('$auto$', options.auto),
  )(options.templateData)
}

function getPartContent(resourcePath) {
  const res = R.ifElse(
    R.both(
      R.pipe(
        getModulePath,
        t => new RegExp(`(${t})(?=\\.|/|'|")`),
        R.flip(R.test)(options.entryFileData),
      ),
      R.pipe(
        R.flip(R.includes),
        R.flip(R.find)(partList),
        R.not,
      ),
    ),
    R.pipe(
      getModulePath,
      getPartBuildEmptyTemplate,
    ),
    R.F,
  )(resourcePath)
  return res
}

function findVuePath(filePath, suffix = ['', '.vue', '/index.vue']) {
  try {
    const result = filePath + suffix.shift()
    if (fs.lstatSync(result).isFile()) {
      log(`匹配到文件${result}`, 2, true)
      return result
    }
    if (suffix.length > 0) {
      return findVuePath(filePath, suffix)
    }
  } catch (error) {
    if (suffix.length > 0) {
      return findVuePath(filePath, suffix)
    }
  }
}

function changeEntryFilesUtimes(dirStr) {
  const arr = R.pipe(
    R.replace(/^\//, ''),
    R.replace('.vue', ''),
    R.replace(/\/index$/, ''),
    t => new RegExp(`([^'"]*/${t}[^'"]*)`, 'g'),
    R.match(R.__, options.entryFileData),
  )(dirStr)

  arr.forEach(p => {
    const dir = R.pipe(
      R.ifElse(
        R.test(/^\.{1,2}\/.*/),
        R.curryN(2, path.resolve)(`${projectDir}/src/config`),
        R.converge(R.call, [
          R.pipe(
            R.pipe(
              R.match(/^(.[^/]*)/g),
              R.head,
              R.flip(R.prop)(alias),
            ),
            R.replace(/^(.[^/]*)/),
          ),
          R.identity,
        ]),
      ),
      findVuePath,
    )(p)
    if (!dir) {
      log('找不到.vue文件')
      return
    }
    const date = new Date()
    fs.utimes(dir, date, date, () => {})
    log(`file : ${dir} is changed, waiting for compile`)
  })
}

function handlerNewPart(part) {
  try {
    if (partList.includes(part)) return
    partList.push(part)
    log(`recompiling modules: ${part}`, 2, true)
    changeEntryFilesUtimes(part)
  } catch (error) {
    log(error, 3)
  }
}
let initialized = false
function initPartBuild(options) {
  if (initialized) return
  initialized = true
  initStaticConfig(options)
  partList.push(...basePart)
}

function initHotListener() {
  http.createServer((request, response) => {
    const responseFun = () => {
      response.setHeader('Access-Control-Allow-Origin', '*')
      response.setHeader('Access-Control-Allow-Methods', 'GET')
      response.write('accept! waiting for reload')
      response.end()
    }
    R.when(
      R.includes('hot'),
      R.pipe(
        R.split('hot='),
        R.prop(1),
        handlerNewPart,
        responseFun,
      ),
    )(request.url)
  }).listen(9527)
}

exports.getPartContent = getPartContent
exports.handlerNewPart = handlerNewPart
exports.partList = partList
exports.initPartBuild = initPartBuild
exports.initHotListener = initHotListener
