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
      if(Object.keys(query).length > 0) { // checks to see if it's a query
        if (query['model-type'] == 'basic') { // calculates the output for basic model
          const calculations = cocomo.basicModel(query)
          response.writeHead(200, { "Content-Type": "text/html" })
          response.write(template.output(calculations)) // calls template module to render html
          response.end()
        } else {
          // intermediate 
        }
      } else {
        fileHandler.readFile(request, response, "./public/model/model.html")
      }
      break
    default:
      fileHandler.readFile(request, response, `./public${pathname}`)
      break
  }
}
