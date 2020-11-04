const connection = require('../config')
const Sequelize = require('sequelize')

const Players = connection.define('players', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [0, 50]
    }
  },
  fortalezaPlayer: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isIdol: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isIconic: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  isCurrentFortalezaPlayer: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

Players.sync({ force: false })

Players.save = async (data) => {
  const {
    name,
    fortalezaPlayer,
    isIdol,
    isIconic,
    isCurrentFortalezaPlayer
  } = data

  const playerExists = await Players.findOne({
    where: {
      name
    }
  })

  if (playerExists) return false

  const player = await Players.create({
    name,
    fortalezaPlayer,
    isIdol,
    isIconic,
    isCurrentFortalezaPlayer
  })

  return player
}

module.exports = Players
