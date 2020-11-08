const express = require('express')
const app = express()

app.use(express.json())

const playerRouter = require('../routes/playerRouter')
const headlineRouter = require('../routes/headlineRouter')
const teamRouter = require('../routes/teamRouter')
const characterRouter = require('../routes/characterRouter')
const twitterRouter = require('../routes/twitterRouter')

app.get('/', (req, res) => res.json({ message: 'Hi!' }))

app.use('/twitter', twitterRouter)

const guard = require('../middlewares/guard')
app.use(guard)

app.use('/player', playerRouter)
app.use('/headline', headlineRouter)
app.use('/team', teamRouter)
app.use('/character', characterRouter)

module.exports = app
