
const Players = require('../database/models/players')

module.exports = {
  async  new (req, res) {
    const {
      name,
      fortalezaplayer: fortalezaPlayer,
      isidol: isIdol,
      isiconic: isIconic,
      iscurrentfortalezaplayer: isCurrentFortalezaPlayer
    } = req.body

    try {
      const playerExists = await Players.findOne({
        where: {
          name
        }
      })

      if (playerExists) {
        return res.status(400).json({
          status: 'err',
          message: 'This player already exists'
        })
      }

      const player = await Players.create({
        name,
        fortalezaPlayer,
        isIdol,
        isIconic,
        isCurrentFortalezaPlayer
      })

      res.json({ status: 'ok', player })
    } catch (e) {
      console.error(e)
      res.status(500).json({ status: 'err' })
    }
  }
}
