require('dotenv').config()

const server = require('./server/server')

server.listen(process.env.PORT, () => console.log("It's works"))
