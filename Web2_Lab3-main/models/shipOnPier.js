const mongoose = require('mongoose')

const Schema = mongoose.Schema

const shipOnPierSchema = new Schema({
  ship: { type: Schema.Types.ObjectId, ref: 'Ship' },
  pier: { type: Schema.Types.ObjectId, ref: 'Pier' }
})

module.exports = mongoose.model('ShipOnPier', shipOnPierSchema, 'shipOnPier')
