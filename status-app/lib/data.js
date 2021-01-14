// store and edit data
const fs = require('fs')
const path = require('path')

// module container
const lib = {}

lib.baseDir = path.join(__dirname, '/../.data')

// write data to a file
lib.create = (dir, file, data, cb) => {
  //open file to write
  fs.open(`${lib.baseDir}${dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      // convert data to string
      const strData = JSON.stringify(data)
      // write and close
      fs.writeFile(fileDescriptor, strData, (err) => {
        if (!err) {
          fs.close(fileDescriptor, (err) => {
            if (!err) {
              cb(false)
            } else {
              cb('Error closing file')
            }
          })
        } else {
          cb('Error writing to file')
        }
      })
    } else {
      cb('Could not create new file, it may already exist')
    }
  })
}

module.exports = lib
