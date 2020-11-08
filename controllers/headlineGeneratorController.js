const { generateHeadline } = require('../database/models/headlines')

module.exports = {
  async index (req, res) {
    const headline = await generateHeadline()
    return res.json({ status: 'ok', result: headline })
  }
}
