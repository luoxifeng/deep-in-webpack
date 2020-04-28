module.exports = function(content) {
    debugger
    console.log('dd-loader......', this.resourePath);
    return content + 'var g = "你好";';
}