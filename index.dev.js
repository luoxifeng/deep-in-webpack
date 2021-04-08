const webpack = require('webpack');
// const { resolve } = require('path');
const shell = require('shelljs');
const util = require('util');
const config = require('./webpack.config');

const WebpackDevServer = require('webpack-dev-server');

// const Webpack = util.promisify(webpack)

shell.rm('-rf', config.output.path);

const callback = (error, stats) => {
  if (error) {
    return console.error(error);
  }
  console.log('complete compiler....');

  // console.log(stats);
  console.log(`耗时：${(stats.endTime - stats.startTime) / 1000}`)
}


let compiler = null;
const devServer = 0;

if (devServer) {
  compiler = webpack(config)

  const server = new WebpackDevServer(compiler, config.devServer)
  server.listen(config.devServer.port, '127.0.0.1', () => {
    console.log(`Starting server on http://localhost:${config.devServer.port}`);
  });

} else {
  webpack(config, callback)
}






