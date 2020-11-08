const express = require('express')

const router = express.Router()

const twitterController = require('../controllers/twitterController')

router.get('/post', twitterController.post)

module.exports = router
