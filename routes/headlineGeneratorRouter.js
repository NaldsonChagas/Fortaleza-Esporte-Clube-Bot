const express = require('express')

const router = express.Router()

const headlineGeneratorController = require('../controllers/headlineGeneratorController')

router.get('/', headlineGeneratorController.index)

module.exports = router
