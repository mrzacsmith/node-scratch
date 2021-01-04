const { log } = require('console')
const http = require('http')
const url = require('url')
const { StringDecoder } = require('string_decoder')

const server = http.createServer((req, res) => {
  // 1: parse url
  let parsedUrl = url.parse(req.url, true)

  // 2: get path
  let path = parsedUrl.pathname
  let trimPath = path.replace(/^\/+|\/+$/g, '')

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

    // 4: sent the response
    res.end('node server\n')

    // 5: log as needed
    console.log('buffer:', buffer)
    console.log('query', JSON.stringify(queryStringObject, null, 4))
  })

  // 5: log the request path
  // console.log(
  //   `Request received on path: ${trimPath}\nwith method: ${method}\nwith query parameters:`
  // )
  // console.log(JSON.stringify(queryStringObject, null, 4))
  // console.log('headers', headers)
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`** Server is running on port ${PORT}`)
})
