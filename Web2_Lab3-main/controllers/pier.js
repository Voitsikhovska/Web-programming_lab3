'use strict'

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')
const pierAllService = require('./../services/pier.all')
const portAllService = require('../services/port.all')
const pierCreateService = require('./../services/pier.create')
const pierByIdService = require('./../services/pier.byId')
const pierUpdateService = require('./../services/pier.update')
const pierDeleteService = require('./../services/pier.delete')

module.exports = {
  index (req, res) {
    res.render('pages/pier/index')
  },
  async pierList (req, res) {
    try {
      const pierList = await pierAllService()
      res.render('pages/pier/list', { piers: pierList })
    } catch (error) {
      res.render('pages/pier/list', {
        piers: [],
        errors: [{ msg: error.message }]
      })
    }
  },
  async createPierForm (req, res) {
    try {
      const ports = await portAllService()

      res.render('pages/pier/add', {
        ports: ports
      })
    } catch (error) {
      res.render('pages/pier/add', {
        ports: [],
        errors: [{ msg: error.message }]
      })
    }
  },
  postCreatePier: [
    body('number')
      .isLength({ min: 1 }).trim().withMessage('Number field must be specified.'),
    body('port')
      .isLength({ min: 1 }).trim().withMessage('Port field must be specified and integer.'),
    sanitizeBody('number').escape(),
    sanitizeBody('port').escape(),
    async (req, res) => {
      const pierData = req.body
      const ports = await portAllService()
      const errors = validationResult(req)

      if (errors.isEmpty()) {
        try {
          await pierCreateService(req.body)
          req.flash('info', `Pier with number "${pierData.number}" was Added`)
          res.redirect('/pier/list')
        } catch (error) {
          res.render('pages/pier/add', {
            ports: ports,
            errors: [{ msg: error.message }]
          })
        }
      } else {
        res.render('pages/pier/add', {
          ports: ports,
          errors: errors.array()
        })
      }
    }
  ],
  async updatePierForm (req, res, next) {
    try {
      const pier = await pierByIdService(req.params.id)
      if (!pier) {
        const errorServer = new Error('Not found')
        errorServer.status = 404
        next(errorServer)
        return
      }

      const ports = await portAllService()

      res.render('pages/pier/update', {
        pier: pier,
        ports: ports
      })
    } catch (error) {
      const errorServer = new Error(`Internal server error: ${error.message}`)
      errorServer.status = 500
      next(errorServer)
    }
  },
  putUpdatePier: [
    body('number')
      .isLength({ min: 1 }).trim().withMessage('Number field must be specified.'),
    body('port')
      .isLength({ min: 1 }).trim().withMessage('Port field must be specified and integer.'),
    sanitizeBody('number').escape(),
    sanitizeBody('port').escape(),
    async (req, res, next) => {
      const pierData = req.body
      const ports = await portAllService()

      const errors = validationResult(req)
      if (errors.isEmpty()) {
        try {
          const updatedPier = await pierUpdateService(pierData)
          req.flash('info', `Pier with id "#${updatedPier.id} and number ${updatedPier.number}" is Updated`)
          res.redirect('/pier/list')
        } catch (error) {
          res.render('pages/pier/update', {
            pier: {},
            newPier: pierData,
            ports: ports,
            errors: [{ msg: error.message }]
          })
        }
      } else {
        res.render('pages/pier/update', {
          pier: {},
          newPier: pierData,
          ports: ports,
          errors: errors.array()
        })
      }
    }
  ],
  deletePierFrom (req, res, next) {
    pierByIdService(req.params.id)
      .then(pier => {
        if (pier) {
          res.render('pages/pier/delete', { pier: pier })
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
  deletePier (req, res, next) {
    pierDeleteService(req.body)
      .then(pier => {
        req.flash('info', `Pier with id "#${pier.id} and number ${pier.number}" was Deleted`)
        res.redirect('/pier/list')
      })
      .catch(error => {
        res.render('pages/pier/delete', {
          pier: req.body,
          errors: [{ msg: error.message }]
        })
      })
  }
}
