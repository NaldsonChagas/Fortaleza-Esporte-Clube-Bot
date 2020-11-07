const { Op } = require('sequelize')

const Players = require('../database/models/players')
const Teams = require('../database/models/teams')
const Characters = require('../database/models/characters')

const utils = require('../utils/headlineGeneratorUtil')

async function getVariableResult (variable) {
  variable = utils.removePunctuation(variable)

  const playerTable = [
    '_fortalezaPlayer_',
    '_playerName_',
    '_idolName_',
    '_iconicPlayer_',
    '_currentFortalezaPlayer_'
  ]

  const teamTable = ['_teamName_']

  const characterTable = ['_character_']

  if (playerTable.includes(variable)) {
    const players = await Players.filterByVariable(variable)
    const player = utils.randomArray(players)
    return player.name
  }

  if (teamTable.includes(variable)) {
    const result = await Teams.findAll({
      where: { [Op.not]: { name: 'Fortaleza' } }
    })
    const teams = result.map(r => r.dataValues)
    const team = utils.randomArray(teams)
    return team.name
  }

  if (characterTable.includes(variable)) {
    const result = await Characters.findAll()
    const characters = result.map(r => r.dataValues)
    const character = utils.randomArray(characters)
    return character.name
  }
}

module.exports = getVariableResult
