const express = require('express')
const router = express.Router()

const playerController = require('../controllers/playerController')

router.post('/', playerController.new)
router.post('/inLargeScala', playerController.newInLargeScala)

module.exports = router
