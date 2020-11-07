const express = require('express')

const router = express.Router()

const characterController = require('../controllers/charactersController')

router.post('/', characterController.new)
router.post('/inLargeScala', characterController.newInLargeScala)

module.exports = router
