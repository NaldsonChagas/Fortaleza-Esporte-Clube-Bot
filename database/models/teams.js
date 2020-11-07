const connection = require('../config')
const Sequelize = require('sequelize')

const Teams = connection.define('teams', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [0, 70]
    }
  }
})

Teams.sync({ force: false })

Teams.save = async (data) => {
  const { name } = data

  const teamExists = await Teams.findOne({
    where: { name }
  })

  if (teamExists) return false

  const team = await Teams.create({ name })

  console.log({ team })

  return team
}

module.exports = Teams
