const Headlines = require('../database/models/headlines')

const utils = require('../utils/headlineGeneratorUtil')

const getVariableResult = require('../utils/getVariableResult')

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
