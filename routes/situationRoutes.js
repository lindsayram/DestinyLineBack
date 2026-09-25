const express = require('express')
const router = express.Router()
const { getSituation, deleteSituation, updateSituation } = require('../controllers/situationController')
const authMiddleware = require('../middlewares/authMiddleware')
const upload = require('../middlewares/uploadMiddleware')
const { updateSituationImage } = require('../services/situationService')

router.get('/:idSituation', authMiddleware, getSituation)
router.delete('/:idSituation', authMiddleware, deleteSituation)
router.put('/:idSituation', authMiddleware, updateSituation)
router.patch('/:idSituation/image', upload.single('image'), updateSituationImage)

module.exports = router