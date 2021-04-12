module.exports = function(content) {
    console.log('post-loader......', this.resourePath);
    return content;
}