const connection = require('../config')
const Sequelize = require('sequelize')

const Headlines = connection.define('headlines', {
  title: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [0, 280]
    }
  }
})

Headlines.sync({ force: false })

module.exports = Headlines
