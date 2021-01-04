const mathLib = require('./lib/math.js')
const quotesLib = require('./lib/data')

const app = {}

config = {
  timeBetweenQuotes: 2000,
}

printAQuote = () => {
  const allQuotes = quotesLib.allQuotes()
  const numberOfQuotes = allQuotes.length
  const randomNumber = mathLib.getRandomNumber(1, numberOfQuotes)
  const selectedQuote = allQuotes[randomNumber - 1]

  console.log(selectedQuote)
}

indefiniteLoop = () => {
  setInterval(printAQuote, config.timeBetweenQuotes)
}

indefiniteLoop()

// console.log(mathLib.getRandomNumber(1, 13))
