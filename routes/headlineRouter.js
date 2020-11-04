const express = require('express')

const router = express.Router()

const headlineController = require('../controllers/headlineController')

router.post('/', headlineController.new)

module.exports = router
