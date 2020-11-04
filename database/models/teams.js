const connection = require('../config')
const Sequelize = require('sequelize')

const Teams = connection.define('teams', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [0, 70]
    }
  }
})

Teams.sync({ force: false })

module.exports = Teams
