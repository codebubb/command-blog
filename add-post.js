const config = require('./config');
const utils = require('./utils');
const chalk = require('chalk');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(config.databaseName);
const inquirer = require('inquirer');

console.log(
    utils.createHeader('Create a new blog post')
);

inquirer
  .prompt([
    {
        name: 'title',
        message: 'Post Title:',
    },
    {
        name: 'author',
        message: 'Author:',
    },
    {
        name: 'date',
        message: 'Date:',
        default: new Date().toUTCString(),
    },
    {
        name: 'post',
        message: 'Post Content:',
    }
  ])
  .then(answers => {
        const { title, author, date, post } = answers;
        db.serialize(() => {
            const stmt = `INSERT INTO ${config.tableName} (title, date, author, post) VALUES ("${title}", "${date}", "${author}", "${post}")`;
            db.run(stmt);
            console.log(chalk.green('New post added to the database'));
        });
        
        db.close();
  });
