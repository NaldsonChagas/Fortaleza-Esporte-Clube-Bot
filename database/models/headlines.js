const connection = require('../config')
const Sequelize = require('sequelize')

const utils = require('../../utils/headlineGeneratorUtil')
const getVariableResult = require('../../utils/getVariableResult')

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

Headlines.save = async (data) => {
  const { title } = data

  const headlineExists = await Headlines.findOne({
    where: { title }
  })

  if (headlineExists) return false

  const headline = await Headlines.create({ title })

  return headline
}

Headlines.generateHeadline = async () => {
  try {
    const result = await Headlines.findAll()
    const headlines = result.map(r => r.dataValues)

    const sortedHeadline = utils.randomArray(headlines)
    const variables = utils.getVariables(sortedHeadline.title)

    let headline = sortedHeadline.title
    for (const variable of variables) {
      const result = await getVariableResult(variable)
      headline = headline.replace(variable, result)
    }
    return headline
  } catch {
    console.log('Trying generate new headline')
    return await Headlines.generateHeadline()
  }
}

module.exports = Headlines
