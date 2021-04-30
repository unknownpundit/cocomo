const mysql = require('mysql')
const homepageTemplate = require('./templates/homepage-template.js')
const modelsTemplate = require('./templates/saved-models-template.js')
const modelOutputTemplate = require('./templates/output-template.js')

const connection_pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'cocomo',
  connectionLimit: 10
});

function selectAll() {
  const users = []
  connection_pool.query('select * from users;', (error, results, fields) => {
    if (error) {
      console.log(error)
    } else {
      for(result of results) {
        const user = {}
        for (key in result) {
          user[key] = result[key]
        }
        users.push(user)
      }
      console.log(users)
    }
  })
}
  
exports.signUpUser = (raw_data, response) => {
  const user = {}
  raw_data.split('&').forEach(set => {
    const components = set.split('=')
      user[components[0]] = components[1]
  })
  connection_pool.query(`insert into users (name, email) values ('${user['name']}','${user['email']}');`, (error, results, fields) => {
    if (error) {
      console.log(error)
    }
    else {
      connection_pool.query(`select users.id from users where name="${user['name']}" and email="${user['email']}";`, (error, results, fields) => {
        if (error) {
          console.log(error)
        } else {
          response.writeHead(200, { "Content-Type": "text/html", "Set-Cookie": `user=${results[0].id}` })
          response.write(homepageTemplate.output(user))
          response.end()
        }
      })
    }
  })
}

exports.loginUser = (raw_data, response) => {
  const user = {}
  raw_data.split('&').forEach(set => {
    const components = set.split('=')
      user[components[0]] = components[1]
  })
  connection_pool.query(`select users.id, users.name from users where email="${user['email']}";`, (error, results, fields) => {
    if (error) {
      console.log(error)
    } else {
      user.name = results[0].name
      response.writeHead(200, { "Content-Type": "text/html", "Set-Cookie": `user=${results[0].id}` })
      response.write(homepageTemplate.output(user))
      response.end()
    }
  })
}

exports.saveModel = (raw_data, response) => {
  connection_pool.query(`select users.id from users where email="${raw_data.email.replace('@', '%40')}";`, (error, results, fields) => {
    if (error) {
      console.log(error)
    } else {
      user_id = results[0].id
      connection_pool.query(`insert into report (userID, result) values ('${user_id}','${raw_data.calculations}');`, (error, results, fields) => {
        if (error) {
          console.log(error)
        } else {
          response.writeHead(301,
            {Location: './models', "Set-Cookie": `user=${user_id}`}
          );
          response.end();
        } 
      })
    }
  })
}

exports.getModels = (user, response) => {
  connection_pool.query(`select * from report where userID = '${user}';`, (error, results, fields) => {
    if (error) {
      console.log(error)
    } else {
      const models = []
      results.forEach(result => {
        models.push(result)
      })
      response.writeHead(200, { "Content-Type": "text/html"})
      response.write(modelsTemplate.output(models))
      response.end()
    }
  })
}

exports.regenerateOutput = (modelIdentification, response) => {
  connection_pool.query(`select * from report where reportID = '${modelIdentification}';`, (error, results, fields) => {
    if (error) {
      console.log(error)
    } else {
      const calculations = JSON.parse(results[0].result)
      response.writeHead(200, { "Content-Type": "text/html"})
      response.write(modelOutputTemplate.output(calculations))
      response.end()
    }
  })
} 
