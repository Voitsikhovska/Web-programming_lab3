/* eslint-disable indent */
'use strict'

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

const shipAllService = require('./../services/ship.all')
const shipCreateService = require('./../services/ship.create')
const shipByIdService = require('./../services/ship.byId')
const shipUpdateService = require('./../services/ship.update')
const shipDeleteService = require('./../services/ship.delete')

module.exports = {
  index (req, res) {
    res.render('pages/ship/index')
  },
  shipList (req, res) {
    shipAllService()
      .then(shipList => {
        res.render('pages/ship/list', {
          ships: shipList
        })
      })
      .catch(error => {
        res.render('pages/ship/list', {
          ships: [],
          errors: [{ msg: error.message }]
        })
      })
  },
  createShipForm (req, res) {
    res.render('pages/ship/add')
  },
  postCreateShip: [
    body('name')
      .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
    body('number')
      .isLength({ min: 1 }).trim().withMessage('Number field must be specified.'),
    sanitizeBody('name').escape(),
    sanitizeBody('number').escape(),
    (req, res) => {
      const shipData = req.body
      const errors = validationResult(req)

      if (errors.isEmpty()) {
        shipCreateService(req.body)
          .then(shipData => {
            req.flash('info', `Ship with name "${shipData.name}" was Added`)
            res.redirect('/ship/list')
          })
          .catch(error => {
            res.render('pages/ship/add', {
              newShip: shipData,
              errors: [{ msg: error.message }]
            })
          })
      } else {
        res.render('pages/ship/add', {
          newShip: shipData,
          errors: errors.array()
        })
      }
    }
  ],
  updateShipForm (req, res, next) {
    shipByIdService(req.params.id)
      .then(ship => {
        if (ship) {
          res.render('pages/ship/update', { ship: ship })
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
  putUpdateShip: [
    body('name')
      .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
    body('number')
      .isLength({ min: 1 }).trim().withMessage('Number field must be specified.'),
    sanitizeBody('name').escape(),
    sanitizeBody('number').escape(),
    (req, res, next) => {
      const shipData = req.body

      const errors = validationResult(req)
      if (errors.isEmpty()) {
        shipUpdateService(shipData)
          .then(ship => {
            req.flash('info', `Ship with id"#${ship.id} and name ${ship.name}" was Updated`)
            res.redirect('/ship/list')
          })
          .catch(error => {
            res.render('pages/ship/update', {
              ship: {},
              newShip: shipData,
              errors: [{ msg: error.message }]
            })
          })
      } else {
        res.render('pages/ship/update', {
          ship: {},
          newShip: shipData,
          errors: errors.array()
        })
      }
    }
  ],
  deleteShipFrom (req, res, next) {
    shipByIdService(req.params.id)
      .then(ship => {
        if (ship) {
          res.render('pages/ship/delete', { ship: ship })
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
  deleteShip (req, res, next) {
    shipDeleteService(req.body)
      .then(ship => {
        req.flash('info', `Ship with id "#${ship.id} and name ${ship.name}" was Deleted`)
        res.redirect('/ship/list')
      })
      .catch(error => {
        res.render('pages/ship/delete', {
          ship: req.body,
          errors: [{ msg: error.message }]
        })
      })
  }
}
