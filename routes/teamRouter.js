const express = require('express')

const router = express.Router()

const teamController = require('../controllers/teamsController')

router.post('/', teamController.new)
router.post('/inLargeScala', teamController.newInLargeScala)

module.exports = router
