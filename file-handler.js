const fs = require("fs")
const path = require("path")
const CONTENT_TYPE = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".txt": "text/plain",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml"
}

function errorResponse(response) {
  response.writeHead(404, { "Content-Type": "text/plain" })
  response.write("Yikes, something went wrong :(")
  response.end()
}

exports.readFile = (request, response, fileName) => {
  const fileType = path.extname(fileName)
  fs.readFile(fileName, (error, data) => {
    if (error) {
      errorResponse(response)
    } else {
      response.writeHead(200, { "Content-Type": CONTENT_TYPE[fileType] })
      response.write(data)
      response.end()
    }
  })
}
