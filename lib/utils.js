const chalk       = require('chalk');
const fetch       = require('node-fetch');

// Usage function
const usage = function() {
  const usageText = `
  This tool helps you see open pull requests by username.

  usage:
    pr <command> 

    command(s):
    list <user1 user2 user3 user4> : This command is used to list open pull requests by user1, user2, user3 and user4

    example usage:
    pr list ekeyur user2 user3

    ps: only use valid github usernames
  `
  console.log(usageText)
}

const errorLog = function(error) {
  const eLog = chalk.red(error)
  console.log(eLog)
}

const printUserPrs = (prs) => {
  if(prs.items[0]) console.log(`\r\n${prs.items[0] && prs.items[0].user.login}'s pull requests`)
        prs.items.map((pr,index) => {
          const tempArr = pr.repository_url.split('/');
          console.log(index+1 + ': '+pr.title, ' | '+ tempArr[tempArr.length-1]);
        })
}
const fetchPrRequests = users => {
  const url = `https://api.github.com/search/issues?q=type:pr+state:open`;
  return users.map(user => {
    return fetch(`${url}+user:${user}`).then(response => response.json())
  })

}



module.exports = { errorLog, usage, fetchPrRequests, printUserPrs }