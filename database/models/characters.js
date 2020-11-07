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
  }
})

Characters.sync({ force: false })

Characters.save = async (data) => {
  const { name } = data

  const characterExists = await Characters.findOne({
    where: { name }
  })

  if (characterExists) return false

  const character = await Characters.create({ name })

  return character
}

module.exports = Characters
