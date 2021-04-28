const url = require("url")
const fileHandler = require("./file-handler.js")
const cocomo = require('./model.js')
const template = require('./template.js')
const homepageTemplate = require('./homepage-template.js')
const database = require('./database.js')

exports.route = (request, response) => {
  const pathname = url.parse(request.url).pathname
  const query = url.parse(request.url, 'true').query
  const cookies = parseCookies(request)

  if (request.method === 'POST') {
    let body = '';
    request.on('data', chunk => {
      body += chunk.toString();
    });
    request.on('end', () => {
      if (pathname == '/signup') {
        database.signUpUser(body, response)
      }
    });
    return
  }

  switch (pathname) {
    case '/':
      fileHandler.readFile(request, response, "./public/home/index.html")
      break
    case '/model':
      if(Object.keys(query).length > 0) { // checks to see if it's a query
        const calculations = query['model-type'] == 'basic' ? cocomo.basicModel(query) : cocomo.intermediateModel(query)
        response.writeHead(200, { "Content-Type": "text/html" })
        response.write(template.output(calculations)) // calls template module to render html
        response.end()
      } else {
        fileHandler.readFile(request, response, "./public/model/model.html")
      }
      break
    case '/signout':
      console.log(cookies)
      response.writeHead(200, { "Content-Type": "text/html" })
      response.write('signed out') // calls template module to render html
      response.end()
      break
    default:
      fileHandler.readFile(request, response, `./public${pathname}`)
      break
  }
}

function parseCookies(request) {
  const list = {}
  const rc = request.headers.cookie;

  rc && rc.split(';').forEach(function( cookie ) {
      const parts = cookie.split('=');
      list[parts.shift().trim()] = decodeURI(parts.join('='))
  })

  return list
}
