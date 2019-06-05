const config = require('./config');
const utils = require('./utils');
const chalk = require('chalk');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(config.databaseName);

console.log(
  utils.createHeader('Recent Posts')
);

db.serialize(() => {
  const stmt = `SELECT title, date, author, post FROM ${config.tableName}`;
  db.each(stmt, (err, row)  => {
    if (err) {
      console.log(chalk.red('Problem reading row data'));
    } else {
      const { title, date, author, post } = row;
      console.log(utils.renderPost(title, date, author, post));
    }
  });
});

db.close();