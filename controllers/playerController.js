
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
  },
  async newInLargeScala (req, res) {
    const { players } = req.body

    const savedPlayers = []
    const playersWithErrors = []

    try {
      for (const player of players) {
        const savedPlayer = await Players.save({
          name: player.name,
          fortalezaPlayer: player.fortalezaPlayer,
          isIdol: player.isIdol,
          isIconic: player.isIconic,
          isCurrentFortalezaPlayer: player.isCurrentFortalezaPlayer
        })

        if (!savedPlayer) playersWithErrors.push(player.name)

        savedPlayers.push(savedPlayer)
      }
      res.json({ status: 'ok', savedPlayers, playersWithErrors })
    } catch (e) {
      console.log(e)
      res.status(500).json({ status: 'err' })
    }
  }
}
