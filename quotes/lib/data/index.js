const fs = require('fs')

const quotes = {}

quotes.allQuotes = () => {
  let fileContents = fs.readFileSync(__dirname + '/quotes.txt', 'utf8')
  let arrayOfQuotes = fileContents.split(/\r?\n/)

  return arrayOfQuotes
}

module.exports = quotes
