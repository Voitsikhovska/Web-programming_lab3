const mongoose = require('mongoose')

const Schema = mongoose.Schema

const shipSchema = new Schema({
  number: { type: Number, required: true, unique: true, max: 50 },
  name: { type: String, required: true, max: 250 },
  country: { type: String, required: true, max: 999999 },
  tonnage: { type: Number, required: true, max: 999999 },
  sediment: { type: Number, required: true, max: 9999 }
})

module.exports = mongoose.model('Ship', shipSchema, 'ship')
