'use strict'

const express = require('express')
const router = express.Router()

const pierController = require('../controllers/pier')

router.get('/', pierController.index)
router.get('/list', pierController.pierList)
router.get('/add', pierController.createPierForm)
router.post('/add', pierController.postCreatePier)
router.get('/edit/:id', pierController.updatePierForm)
router.post('/edit/:id', pierController.putUpdatePier)
router.get('/remove/:id', pierController.deletePierFrom)
router.post('/remove/:id', pierController.deletePier)

module.exports = router
