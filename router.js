const url = require("url")
const fileHandler = require("./file-handler.js")

exports.route = (request, response) => {
  const pathname = url.parse(request.url).pathname
  switch (pathname) {
    case '/model':
      fileHandler.readFile(request, response, "./public/model/model.html")
      break
    default:
      fileHandler.readFile(request, response, "./public/home/index.html")
      break
  }
}
