const express = require('express')
const router = express.Router()
const { getSituation } = require('../controllers/situationController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/idSituation', authMiddleware, getSituation)

module.exports = router