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

Players.filterByVariable = async (word) => {
  let where

  switch (word) {
    case '_fortalezaPlayer_': {
      where = {
        fortalezaPlayer: true
      }
      break
    }
    case '_idolName_': {
      where = {
        isIdol: true
      }
      break
    }
    case '_iconicPlayer_': {
      where = {
        iconicPlayer: true
      }
      break
    }
    case '_currentFortalezaPlayer_': {
      where = {
        isCurrentFortalezaPlayer: true
      }
      break
    }
    default: {
      where = {}
    }
  }

  const result = await Players.findAll({ where: { ...where } })
  const players = result.map(r => r.dataValues)

  if (players.length === 0) throw new Error('Player Not finded')

  return players
}
module.exports = Players
