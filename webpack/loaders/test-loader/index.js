const chalk = require('chalk');

module.exports = function(content) {
    console.log(chalk.yellowBright(`loader - ${this.resourcePath}`))

    return content;
}