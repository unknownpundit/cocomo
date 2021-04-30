const url = require("url")
const fileHandler = require("./file-handler.js")
const cocomo = require('./model.js')
const template = require('./templates/output-template.js')
const database = require('./database.js')
const saveLoginTemplate = require('./templates/save-login-template.js')

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
      } else if (pathname == '/login') {
        database.loginUser(body, response)
      } else if (pathname == '/save-model') {
        database.saveModel(body, response)
      }
    });
    return
  }

  switch (pathname) {
    case '/':
      fileHandler.readFile(request, response, "./public/home/index.html")
      break
    case '/model':
      fileHandler.readFile(request, response, "./public/model/model.html")
      break
    case '/output':
      const calculations = query['model-type'] == 'basic' ? cocomo.basicModel(query) : cocomo.intermediateModel(query)
      response.writeHead(200, { "Content-Type": "text/html" })
      response.write(template.output(calculations)) // calls template module to render html
      response.end()
      break
    case '/save-output':
      response.writeHead(200, { "Content-Type": "text/html" })
      response.write(saveLoginTemplate.login(query['calculations']))
      response.end()
      break
    case '/signout':
      response.writeHead(200, { "Content-Type": "text/html", "Set-Cookie": 'user=0' })
      fileHandler.readFile(request, response, "./public/home/index.html")
      response.end()
      break
    case '/models':
      if (cookies.user != 0) {
        database.getModels(cookies.user, response)
      }
      break
    case '/output-saved':
      database.regenerateOutput(query['modelID'], response)
      break
    case '/save-model':
      database.saveModel(query, response)
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
