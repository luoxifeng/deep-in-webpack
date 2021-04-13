module.exports = function(content) {
    console.log('post-loader......', this.resourcePath);
    return content;
}