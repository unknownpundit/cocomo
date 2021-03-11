const url = require("url")
const fileHandler = require("./file-handler.js")

exports.route = (request, response) => {
  const pathname = url.parse(request.url).pathname

  switch (pathname) {
    default:
      fileHandler.readFile(request, response, "./public/home/index.html")
      break
  }
}
