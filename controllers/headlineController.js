const Headlines = require('../database/models/headlines')

module.exports = {
  async new (req, res) {
    const {
      title
    } = req.body

    try {
      const headline = await Headlines.save({ title })

      if (!headline) {
        return res.status(400)
          .json({ status: 'err', message: 'This headline already exists' })
      }

      res.json({ status: 'ok', headline })
    } catch (e) {
      console.error(e)
      res.status(500).json({ status: 'err' })
    }
  },
  async newInlargeScala (req, res) {
    const { headlines = [] } = req.body

    const savedHeadlines = []
    const headlineWithErrors = []

    try {
      for (const headline of headlines) {
        const savedHeadline = await Headlines.save({ title: headline.title })

        if (!headline) headlineWithErrors.push(headline.title)
        else savedHeadlines.push(savedHeadline)
      }
      res.json({ status: 'ok', savedHeadlines, headlineWithErrors })
    } catch (e) {
      console.log(e)
      res.status(500).json({ status: 'err' })
    }
  }
}
