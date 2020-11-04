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

Headlines.save = async (data) => {
  const { title } = data

  const headlineExists = await Headlines.findOne({
    where: { title }
  })

  if (headlineExists) return false

  const headline = await Headlines.create({ title })

  return headline
}

module.exports = Headlines
