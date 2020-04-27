module.exports = (content) => {
    console.log('pre-loader......');
    return content + 'var g = "pre-loader你好";';
}