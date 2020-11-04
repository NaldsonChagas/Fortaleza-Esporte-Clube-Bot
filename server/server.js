const express = require('express')
const app = express()

app.use(express.json())

const playerRouter = require('../routes/playerRouter')
const headlinerouter = require('../routes/headlineRouter')

app.get('/', (req, res) => res.json({ message: 'Hi!' }))

app.use('/player', playerRouter)
app.use('/headline', headlinerouter)

module.exports = app
