module.exports = {
  randomArray (array) {
    return array[
      [Math.floor(Math.random() * array.length)]
    ]
  },
  getVariables (headline) {
    const words = headline.split(' ')

    const variables = words.filter(word => {
      word = this.removePunctuation(this.removePunctuation(word))

      return word.startsWith('_') && word.endsWith('_')
    })

    return variables
  },
  removePunctuation (word) {
    return word
      .replace('.', '')
      .replace(',', '')
      .replace('!', '')
      .replace('?', '')
  }
}
