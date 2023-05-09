const mongoose = require('mongoose')

const Schema = mongoose.Schema

const pierSchema = new Schema({
  number: { type: Number, required: true, unique: true, max: 50 },
  port: { type: Schema.Types.ObjectId, ref: 'Pier' },
  capacity: { type: Number, required: true, max: 999999 },
  minSediment: { type: Number, required: true, max: 9999 }
})

module.exports = mongoose.model('Pier', pierSchema, 'pier')
