const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  name: { type: String, required: true }
})

const payeeSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: false },
  frequency: { type: String, required: true },
  category: {
    type: categorySchema,
    default: {}
  }
})

module.exports = mongoose.model('Payee', payeeSchema)
