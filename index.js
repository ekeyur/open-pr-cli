#!/usr/bin/env node

const clear       = require('clear');
const figlet      = require('figlet');
const chalk       = require('chalk');
const CLI         = require('clui');
const Spinner     = CLI.Spinner;
const args = process.argv

const { errorLog, usage, fetchPrRequests } = require('./lib/utils');

// clear the console and print the heading
clear();
console.log(
  chalk.blue(
    figlet.textSync('PRs', { horizontalLayout: 'full' })
  )
);

// Throw an error if atleast 3 args are not given
if (args.length < 4) {
  errorLog(`Please give command in correct format`);
  usage()
  process.exit(1);
}

const spinner = new Spinner('Making a request, please wait...');

// Create an array of requests 
const prRequests = fetchPrRequests(args.slice(3));

//Async call to the github api
const getPRs = (urls) => {
  spinner.start();
  return Promise.all(urls)
    .then(users_prs => {
      users_prs.map(prs => {
        spinner.stop();
        if(prs.items[0]) console.log(`\r\n${prs.items[0] && prs.items[0].user.login}'s pull requests`)
        prs.items.map((pr,index) => console.log(index+1 + ': '+pr.title))
      })
    })
    .catch(err => {
      errorLog(err);
    })
}

getPRs(prRequests);