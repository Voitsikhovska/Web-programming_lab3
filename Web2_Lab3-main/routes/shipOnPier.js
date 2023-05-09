'use strict'

const express = require('express')
const router = express.Router()

const shipOnPierController = require('../controllers/shipOnPier')

router.get('/', shipOnPierController.index)
router.get('/list', shipOnPierController.shipOnPierList)
router.get('/add', shipOnPierController.createShipOnPierForm)
router.post('/add', shipOnPierController.postCreateShipOnPier)
router.get('/edit/:id', shipOnPierController.updateShipOnPierForm)
router.post('/edit/:id', shipOnPierController.putUpdateShipOnPier)
router.get('/remove/:id', shipOnPierController.deleteShipOnPierFrom)
router.post('/remove/:id', shipOnPierController.deleteShipOnPier)

module.exports = router
