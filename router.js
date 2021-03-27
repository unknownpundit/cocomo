const url = require("url")
const fileHandler = require("./file-handler.js")
const cocomo = require('./model.js')
const template = require('./template.js')

exports.route = (request, response) => {
  const pathname = url.parse(request.url).pathname
  const query = url.parse(request.url, 'true').query
  switch (pathname) {
    case '/':
      fileHandler.readFile(request, response, "./public/home/index.html")
      break
    case '/model':
      if(Object.keys(query).length > 0) {
        const calculations = cocomo.basicModel(query['loc'], query['project-type'])
        response.writeHead(200, { "Content-Type": "text/html" })
        response.write(template.output(calculations))
        response.end()
      } else {
        fileHandler.readFile(request, response, "./public/model/model.html")
      }
      break
    default:
      fileHandler.readFile(request, response, `./public${pathname}`)
      break
  }
}
