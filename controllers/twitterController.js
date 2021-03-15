const Twit = require('../config/TwitterConfig')
const { generateHeadline } = require('../database/models/headlines')

function tweetCallback (res, headline) {
  return (error) => {
    if (error) {
      console.log({ error })
      return res.status(500).json("Can't tweet this")
    }
    return res.json({ status: 'ok', tweet: headline })
  }
}

module.exports = {
  async  post (req, res) {
    const { key } = req.query
    if (key !== process.env.TWEET_KEY) {
      return res.status(401).json('You are not allowed to do this')
    }
    const headline = await generateHeadline()
    Twit.post('statuses/update',
      { status: headline }, tweetCallback(res, headline))
  }
}
