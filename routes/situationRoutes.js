const express = require('express')
const router = express.Router()
const { getSituation, deleteSituation, updateSituation } = require('../controllers/situationController')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/:idSituation', authMiddleware, getSituation)
router.delete('/:idSituation', authMiddleware, deleteSituation)
router.patch('/:idSituation', authMiddleware, updateSituation)

module.exports = router