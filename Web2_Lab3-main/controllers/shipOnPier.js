'use strict'

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')
const shipOnPierAllService = require('./../services/shipOnPier.all')
const pierAllService = require('../services/pier.all')
const shipAllService = require('../services/ship.all')
const shipOnPierCreateService = require('./../services/shipOnPier.create')
const shipOnPierByIdService = require('./../services/shipOnPier.byId')
const shipOnPierUpdateService = require('./../services/shipOnPier.update')
const shipOnPierDeleteService = require('./../services/shipOnPier.delete')

module.exports = {
  index (req, res) {
    res.render('pages/shipOnPier/index')
  },
  async shipOnPierList (req, res) {
    try {
      const shipOnPierList = await shipOnPierAllService()
      res.render('pages/shipOnPier/list', { shipOnPiers: shipOnPierList })
    } catch (error) {
      res.render('pages/shipOnPier/list', {
        shipOnPiers: [],
        errors: [{ msg: error.message }]
      })
    }
  },
  async createShipOnPierForm (req, res) {
    try {
      const piers = await pierAllService()
      const ships = await shipAllService()

      res.render('pages/shipOnPier/add', {
        piers: piers,
        ships: ships
      })
    } catch (error) {
      res.render('pages/shipOnPier/add', {
        piers: [],
        ships: [],
        errors: [{ msg: error.message }]
      })
    }
  },
  postCreateShipOnPier: [
    body('ship')
      .isLength({ min: 1 }).trim().withMessage('Ship field must be specified.'),
    body('pier')
      .isLength({ min: 1 }).trim().withMessage('Pier field must be specified and integer.'),
    sanitizeBody('ship').escape(),
    sanitizeBody('pier').escape(),
    async (req, res) => {
      const shipOnPierData = req.body
      const piers = await pierAllService()
      const ships = await shipAllService()
      const errors = validationResult(req)

      if (errors.isEmpty()) {
        try {
          await shipOnPierCreateService(req.body)
          req.flash('info', `Ship on pier with ship id "${shipOnPierData.ship} and pier id ${shipOnPierData.pier}" was Added`)
          res.redirect('/shipOnPier/list')
        } catch (error) {
          res.render('pages/shipOnPier/add', {
            piers: piers,
            ships: ships,
            errors: [{ msg: error.message }]
          })
        }
      } else {
        res.render('pages/shipOnPier/add', {
          piers: piers,
          ships: ships,
          errors: errors.array()
        })
      }
    }
  ],
  async updateShipOnPierForm (req, res, next) {
    try {
      const shipOnPier = await shipOnPierByIdService(req.params.id)
      if (!shipOnPier) {
        const errorServer = new Error('Not found')
        errorServer.status = 404
        next(errorServer)
        return
      }

      const piers = await pierAllService()
      const ships = await shipAllService()

      res.render('pages/shipOnPier/update', {
        shipOnPier: shipOnPier,
        piers: piers,
        ships: ships
      })
    } catch (error) {
      const errorServer = new Error(`Internal server error: ${error.message}`)
      errorServer.status = 500
      next(errorServer)
    }
  },
  putUpdateShipOnPier: [
    body('ship')
      .isLength({ min: 1 }).trim().withMessage('Ship field must be specified.'),
    body('pier')
      .isLength({ min: 1 }).trim().withMessage('Pier field must be specified and integer.'),
    sanitizeBody('ship').escape(),
    sanitizeBody('pier').escape(),
    async (req, res, next) => {
      const shipOnPierData = req.body
      const piers = await pierAllService()
      const ships = await shipAllService()

      const errors = validationResult(req)
      if (errors.isEmpty()) {
        try {
          const updatedShipOnPier = await shipOnPierUpdateService(shipOnPierData)
          req.flash('info', `Ship on pier with id "#${updatedShipOnPier.id} and ship id ${updatedShipOnPier.ship}" is Updated`)
          res.redirect('/shipOnPier/list')
        } catch (error) {
          res.render('pages/shipOnPier/update', {
            shipOnPier: {},
            newShipOnPier: shipOnPierData,
            piers: piers,
            ships: ships,
            errors: [{ msg: error.message }]
          })
        }
      } else {
        res.render('pages/shipOnPier/update', {
          shipOnPier: {},
          newShipOnPier: shipOnPierData,
          piers: piers,
          ships: ships,
          errors: errors.array()
        })
      }
    }
  ],
  deleteShipOnPierFrom (req, res, next) {
    shipOnPierByIdService(req.params.id)
      .then(shipOnPier => {
        if (shipOnPier) {
          res.render('pages/shipOnPier/delete', { shipOnPier: shipOnPier })
        } else {
          const errorNotFound = new Error('Not found')
          errorNotFound.status = 404
          next(errorNotFound)
        }
      })
      .catch(error => {
        const errorServer = new Error(`Internal server error: ${error.message}`)
        errorServer.status = 500
        next(errorServer)
      })
  },
  deleteShipOnPier (req, res, next) {
    shipOnPierDeleteService(req.body)
      .then(shipOnPier => {
        req.flash('info', `Ship on pier with id "#${shipOnPier.id} and ship id ${shipOnPier.ship}" was Deleted`)
        res.redirect('/shipOnPier/list')
      })
      .catch(error => {
        res.render('pages/shipOnPier/delete', {
          shipOnPier: req.body,
          errors: [{ msg: error.message }]
        })
      })
  }
}
