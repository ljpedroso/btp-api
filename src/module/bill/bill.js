const mongoose = require('mongoose')
const Schema = mongoose.Schema

const billSchema = new Schema({
  amountDue: { type: Number, required: true },
  balanceAmount: { type: Number, required: true },
  paymentAmount: { type: Number, required: true, default: 0 },
  dueDate: { type: Date, required: true },
  paymentDate: { type: Date, required: false },
  note: { type: String, required: false },
  paid: { type: Boolean, required: true, default: false },
  paymentMethod: { type: String, required: false, default: '' },
  payee: { type: Schema.ObjectId, ref: 'Payee' }
})

module.exports = mongoose.model('Bill', billSchema)
