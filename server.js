const http = require("http")
const router = require("./router.js")

const app = http.createServer((request, response) => {
  router.route(request, response)
})

app.listen(80, () => console.log("Listening on port 80"))
