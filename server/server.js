const express = require('express')
const app = express()

app.use(express.json())

const playerRouter = require('../routes/playerRouter')

app.get('/', (req, res) => res.json({ message: 'Hi!' }))

app.use('/player', playerRouter)

module.exports = app
