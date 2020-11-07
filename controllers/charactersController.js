const Characters = require('../database/models/characters')

module.exports = {
  async new (req, res) {
    const {
      name
    } = req.body

    try {
      const character = await Characters.save({ name })

      if (!character) {
        return res.status(400)
          .json({ status: 'err', message: 'This character already exists' })
      }

      res.json({ status: 'ok', character })
    } catch (e) {
      console.error(e)
      res.status(500).json({ status: 'err' })
    }
  },
  async newInLargeScala (req, res) {
    const { characters = [] } = req.body

    const savedCharacters = []
    const characterWithErrors = []

    try {
      for (const character of characters) {
        const savedCharacter = await Characters.save({ name: character.name })

        if (!savedCharacter) characterWithErrors.push(character.name)
        else savedCharacters.push(savedCharacter)
      }
      res.json({ status: 'ok', savedCharacters, characterWithErrors })
    } catch (e) {
      console.error(e)
      res.status(500).json({ status: 'err' })
    }
  }
}
