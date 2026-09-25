const express = require('express')
const router = express.Router()
const { getSituation, deleteSituation, updateSituation } = require('../controllers/situationController')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/:idSituation', authMiddleware, getSituation)
router.delete('/:idSituation', authMiddleware, deleteSituation)
router.put('/:idSituation', authMiddleware, updateSituation)
router.patch('/:id/image', upload.single('image'), updateSituation)

module.exports = router