const Sequelize = require('sequelize')

const dbConfig = {
  db: process.env.DATABASE,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD
}

const connection = new Sequelize(
  dbConfig.db, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'postgres'
  })

module.exports = connection
