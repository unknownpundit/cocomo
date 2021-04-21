const mysql = require('mysql')

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
  
exports.signUpUser = (raw_data) => {
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
      console.log(selectAll())
    }
  })
  connection_pool.end()
  return user
}

console.log(selectAll())
