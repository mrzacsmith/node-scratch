const { stat } = require('fs')
const http = require('http')
const url = require('url')
const config = require('./config.js')

const currentTime = new Date().toLocaleTimeString()

const server = http.createServer()
server.on('request', (req, res) => {
  const parsedUrl = url.parse(req.url, true)
  const path = parsedUrl.pathname
  const reqPath = path.replace(/^\/+|\/+$/g, '')

  if (reqPath === 'hello')
    return res.end(`Hello Pirple from Node server at ${currentTime}`)

  res.end('Not Found')
})

const PORT = config.port
server.listen(PORT, () => {
  console.log(`** Server is listening on port ${PORT}. `)
})
