const Teams = require('../database/models/teams')

module.exports = {
  async new (req, res) {
    const {
      name
    } = req.body

    try {
      const team = await Teams.save({ name })

      if (!team) {
        return res.status(400)
          .json({ status: 'err', message: 'This team already exists' })
      }

      res.json({ status: 'ok', team })
    } catch (e) {
      console.error(e)
      res.status(500).json({ status: 'err' })
    }
  }
}
