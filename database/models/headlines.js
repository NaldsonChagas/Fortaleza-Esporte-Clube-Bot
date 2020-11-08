const connection = require('../config')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

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
  },
  lastPost: {
    type: Sequelize.DATE
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

Headlines.updateLastPostDate = async (title) => {
  await Headlines.update(
    { lastPost: new Date() },
    { where: { title } }
  )
}

Headlines.checkIfWasPostedInLast12Hours = async (sortedHeadline) => {
  const where = {
    where: {
      [Op.and]: {
        lastPost: {
          [Op.gte]: Sequelize
            .literal("(NOW() - INTERVAL '12 hours' )")
        },
        title: sortedHeadline.title
      }
    }
  }
  const headlines = await Headlines.findAll(where)
  if (headlines.length > 0) throw new Error('This was posted')
}

Headlines.generateHeadline = async () => {
  try {
    const result = await Headlines.findAll()
    const headlines = result.map(r => r.dataValues)

    const sortedHeadline = utils.randomArray(headlines)
    const variables = utils.getVariables(sortedHeadline.title)

    await Headlines.checkIfWasPostedInLast12Hours(sortedHeadline)

    let headline = sortedHeadline.title
    for (const variable of variables) {
      const result = await getVariableResult(variable)
      headline = headline.replace(variable, result)
    }
    await Headlines.updateLastPostDate(sortedHeadline.title)
    return headline
  } catch {
    console.log('Trying generate new headline')
    return await Headlines.generateHeadline()
  }
}

module.exports = Headlines
