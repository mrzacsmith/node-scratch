const { stat } = require('fs')
const http = require('http')
const url = require('url')
const config = require('./config.js')

// create server and listener
const server = http.createServer((req, res) => {
  // get url and parse
  const parsedUrl = url.parse(req.url, true)

  // get the path
  const path = parsedUrl.pathname
  const reqPath = path.replace(/^\/+|\/+$/g, '')

  const method = req.method.toUpperCase()

  // did not request query strings, headers, or payload

  // send the response by routing to router
  req.on('end', () => {
    console.log('fired')
    let routeHandler =
      typeof router[reqPath] !== 'undefined'
        ? router[reqPath]
        : handlers.notFound
    const data = {
      reqPath,
      method,
    }
    routeHandler =
      (data,
      (statusCode) => {
        statusCode = typeof statusCode === 'number' ? statusCode : 200
        res.setHeader('Content-Type', 'application/json')
        res.writeHead(statusCode)
      })
  })
})

const PORT = config.port
server.listen(PORT, () => {
  console.log(`** Server is listening on port ${PORT}. `)
})

// hello handler
const handlers = {}

const currentTime = new Date().toLocaleDateString()

handlers.hello = (data, cb) => {
  cb(200, { message: `Hello Pirple from Node server at ${currentTime}` })
}

handlers.notFound = (data, cb) => {
  cb(404)
}

// hello router
const router = {
  hello: handlers.hello,
}
