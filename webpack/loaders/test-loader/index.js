const chalk = require('chalk');

module.exports = function(content) {
    console.log(chalk.yellowBright(`loader - ${this.resource}`))

    return content;
}