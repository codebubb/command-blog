const chalk = require('chalk');

module.exports = {
createHeader: (msg) => `
${chalk.bold.cyan('-'.repeat(msg.length))}
${chalk.bold.cyan(msg)}
${chalk.bold.cyan('-'.repeat(msg.length))}
`,

renderPost: (title, date, author, post) => `
${chalk.bgGreen(title)}
${chalk.bold(`By ${author} on ${date}`)}
${post}`
};