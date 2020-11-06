
const Players = require('../database/models/players')

module.exports = {
  async  new (req, res) {
    const {
      name,
      fortalezaPlayer,
      isIdol,
      isIconic,
      isCurrentFortalezaPlayer
    } = req.body

    try {
      const player = await Players.save({
        name,
        fortalezaPlayer,
        isIdol,
        isIconic,
        isCurrentFortalezaPlayer
      })

      if (!player) {
        return res.status(400)
          .json({ status: 'err', message: 'This player already exists' })
      }

      res.json({ status: 'ok', player })
    } catch (e) {
      console.error(e)
      res.status(500).json({ status: 'err' })
    }
  }
}
