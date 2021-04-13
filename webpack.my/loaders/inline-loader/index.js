module.exports = function(content) {
  console.log('inline-loader......', this.resourcePath);
  return content;
}