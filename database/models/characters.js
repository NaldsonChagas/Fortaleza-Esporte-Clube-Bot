const connection = require('../config')
const Sequelize = require('sequelize')

const Characters = connection.define('characters', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [0, 70]
    }
  },
  isIconic: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

Characters.sync({ force: false })

module.exports = Characters
