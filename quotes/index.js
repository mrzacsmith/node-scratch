const mathLib = rquire('./lib/math.js')
const quotesLib = require('./lib/data')

let app = {}

app.config = {
  timeBetweenQuotes: 2000,
}

app.printAQuote = () => {
  const allQuotes = quotesLib.allQuotes()
  const numberOfQuotes = quotesLib.length
  const randomNumber = mathLib.getRandomNumber(1, numberOfQuotes)
  const selectedQuote = allQuotes[randomNumber - 1]

  console.log(selectedQuote)
}

app.indefiniteLoop = () => {
  setInterval(app.printAQuote, app.config.timeBetweenQuotes)
}

app.indefiniteLoop()
