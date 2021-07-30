module.exports = function (content) {
    if (this.resourcePath.includes('@a/a') || this.resourcePath.includes('test')) {
        console.log('pre-loader......\n', content, '\n');
    }
    return content;
}