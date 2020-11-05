const Headlines = require('../database/models/headlines')
const Players = require('../database/models/players')

const utils = {
  randomArray (array) {
    return array[
      [Math.floor(Math.random() * array.length)]
    ]
  },
  getVariables (headline) {
    const words = headline.split(' ')

    const variables = words.filter(word => {
      word = this.removePunctuation(this.removePunctuation(word))

      return word.startsWith('_') && word.endsWith('_')
    })

    return variables
  },
  removePunctuation (word) {
    return word
      .replace('.', '')
      .replace(',', '')
      .replace('!', '')
      .replace('?', '')
  }
}

async function getVariableResult (word) {
  word = utils.removePunctuation(word)

  const playerTable = [
    '_fortalezaPlayer_',
    '_playerName_',
    '_idolName_',
    '_iconicPlayer_',
    '_currentFortalezaPlayer_'
  ]

  const teamTable = ['teamName']

  if (playerTable.includes(word)) {
    const players = await Players.filterByVariable(word)
    const player = utils.randomArray(players)
    return player.name
  }
  if (teamTable.includes(word)) {}
}

module.exports = {
  async index (req, res) {
    const result = await Headlines.findAll()
    const headlines = result.map(r => r.dataValues)

    const sortedHeadline = utils.randomArray(headlines)
    const variables = utils.getVariables(sortedHeadline.title)

    let headline = sortedHeadline.title

    for (const variable of variables) {
      const result = await getVariableResult(variable)
      headline = headline.replace(variable, result)
    }

    return res.json({ status: 'ok', result: headline })
  }
}
