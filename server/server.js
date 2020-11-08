const express = require('express')
const app = express()

app.use(express.json())

const playerRouter = require('../routes/playerRouter')
const headlineRouter = require('../routes/headlineRouter')
const teamRouter = require('../routes/teamRouter')
const characterRouter = require('../routes/characterRouter')
const headlineGeneratorRouter = require('../routes/headlineGeneratorRouter')
const twitterRouter = require('../routes/twitterRouter')

app.get('/', (req, res) => res.json({ message: 'Hi!' }))

const guard = require('../middlewares/guard')

app.use(guard)

app.use('/player', playerRouter)
app.use('/headline', headlineRouter)
app.use('/team', teamRouter)
app.use('/character', characterRouter)
app.use('/generator', headlineGeneratorRouter)
app.use('/twitter', twitterRouter)

module.exports = app
