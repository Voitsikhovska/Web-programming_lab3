const mongoose = require('mongoose')

const Schema = mongoose.Schema

const portSchema = new Schema({
  number: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: true, max: 50 },
  country: { type: String, required: true, max: 999999 },
  address: { type: String, required: true, max: 999999 }
})

module.exports = mongoose.model('Port', portSchema, 'port')
