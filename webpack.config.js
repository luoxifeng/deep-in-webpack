const { resolve } = require('path');

module.exports = {
    context: resolve(__dirname, './'),
    mode: 'development',
    entry: {
        home: './src/home/index.js',
        list: './src/list/index.js'
    },
    output: {
        path: resolve(__dirname, './dist'),
        filename: '[name].js'
    }
}