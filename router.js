const url = require("url")
const fileHandler = require("./file-handler.js")
const cocomo = require('./model.js')
const template = require('./template.js')
const templateI = require('./templateI.js')

exports.route = (request, response) => {
  const pathname = url.parse(request.url).pathname
  const query = url.parse(request.url, 'true').query
  switch (pathname) {
    case '/':
      fileHandler.readFile(request, response, "./public/home/index.html")
      break
    case '/model':
      // checks to see if it's a query
      if(Object.keys(query).length > 0) {
        // calculates the output for basic model
        if (query['model-type'] == 'basic') {
          const calculations = cocomo.basicModel(query)
          response.writeHead(200, { "Content-Type": "text/html" })
          // calls template module to render html
          response.write(template.output(calculations))
          response.end()
        } 
        else {
          if (query['model-type'] == 'intermediate') {
            const calculations = cocomo.intermediateModel(query)
            response.writeHead(200, {"Content-Type": "text/html" })

            response.write(templateI.output(calculations))
            response.end()
          }
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
