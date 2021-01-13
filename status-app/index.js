const http = require('http')
const https = require('https')
const url = require('url')
const { StringDecoder } = require('string_decoder')
const config = require('./config')
const fs = require('fs')

//http server and listener
const httpServer = http.createServer((req, res) => {
  unifiedServer(req, res)
})

httpServer.listen(config.httpPort, () => {
  console.log(`** Server is running on port ${config.httpPort}.`)
})

// https server and listener
const httpsServerOptions = {
  key: fs.readFileSync('./https/key.pem'),
  cert: fs.readFileSync('./https/cert.pem'),
}

const httpsServer = https.createServer(httpsServerOptions, (req, res) => {
  unifiedServer(req, res)
})

httpsServer.listen(config.httpsPort, () => {
  console.log(`** Secure server is running on port ${config.httpsPort}`)
})

// handlers
const handlers = {}

handlers.sample = (data, callback) => {
  callback(406, { name: 'sample handler' })
}

let currentTime = new Date().toLocaleTimeString()
handlers.status = (data, callback) => {
  callback(200, {
    currentTime,
    message: 'Server is live',
    author: 'Github @MrZacSmith',
  })
}

handlers.notFound = (data, callback) => {
  callback(404)
}

// Router
const router = {
  sample: handlers.sample,
  status: handlers.status,
}

const unifiedServer = (req, res) => {
  // 1: parse url
  let parsedUrl = url.parse(req.url, true)

  // 2: get path
  let path = parsedUrl.pathname
  let trimmedPath = path.replace(/^\/+|\/+$/g, '')

  // 6: query string as an object
  let queryStringObject = parsedUrl.query

  // 3: get the method
  let method = req.method.toUpperCase()

  // 7: get the headers
  let headers = req.headers

  // 8: get the payload if it exists
  let decoder = new StringDecoder('utf-8')
  let buffer = ''
  req.on('data', (data) => {
    buffer += decoder.write(data)
  })
  req.on('end', () => {
    buffer += decoder.end()
    // 9: call the hanlder for the request
    let chosenHandler =
      typeof router[trimmedPath] !== 'undefined'
        ? router[trimmedPath]
        : handlers.notFound

    // 10: construct the data object to send
    const data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      payload: buffer,
    }

    // 11. route the request to router
    chosenHandler(data, (statusCode, payload) => {
      // default to 200
      statusCode = typeof statusCode === 'number' ? statusCode : 200

      // use payload or default to {}
      payload = typeof payload === 'object' ? payload : {}

      // convert to string
      const payloadString = JSON.stringify(payload)

      res.setHeader('Content-Type', 'application/json')
      res.writeHead(statusCode)
      res.end(payloadString)
      // 5: log as needed
      console.log('Return string payload', statusCode, payloadString)
      // console.log('query', JSON.stringify(queryStringObject, null, 4))
    })
  })
}
