const express = require('express')
const router = express.Router()

const playerController = require('../controllers/playerController')

router.post('/', playerController.new)

module.exports = router
