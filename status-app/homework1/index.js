const { stat } = require('fs')
const http = require('http')
const url = require('url')
const config = require('./config.js')

// // create server and listener
// const server = http.createServer((req, res) => {
//   // get url and parse
//   const parsedUrl = url.parse(req.url, true)

//   // get the path
//   const path = parsedUrl.pathname
//   const reqPath = path.replace(/^\/+|\/+$/g, '')

//   const method = req.method.toUpperCase()

//   // did not request query strings, headers, or payload
//   console.log('before end', method)

//   // send the response by routing to router
//   req.on('request', () => {
//     console.log('hello')
//   })
// })

const server = http.createServer()
server.on('request', (req, res) => {
  const parsedUrl = url.parse(req.url, true)
  const path = parsedUrl.pathname
  const reqPath = path.replace(/^\/+|\/+$/g, '')
  console.log('request start', reqPath)

  console.log('request end')
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
