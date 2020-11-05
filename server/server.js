const express = require('express')
const app = express()

app.use(express.json())

const playerRouter = require('../routes/playerRouter')
const headlineRouter = require('../routes/headlineRouter')
const teamRouter = require('../routes/teamRouter')
const headlineGeneratorRouter = require('../routes/headlineGeneratorRouter')

app.get('/', (req, res) => res.json({ message: 'Hi!' }))

app.use('/player', playerRouter)
app.use('/headline', headlineRouter)
app.use('/team', teamRouter)
app.use('/generator', headlineGeneratorRouter)

module.exports = app
