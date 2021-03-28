const chalk = require('chalk');

module.exports = (content) => {
    console.log(chalk.cyanBright('loader'))

    return content;
}