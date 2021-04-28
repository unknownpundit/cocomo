const mysql = require('mysql')
const homepageTemplate = require('./homepage-template.js')

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
      return users
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
          return error
        } else {
          response.writeHead(200, { "Content-Type": "text/html", "Set-Cookie": `user=${results[0].id}` })
          response.write(homepageTemplate.output(user))
          response.end()
        }
      })
    }
  })
}
