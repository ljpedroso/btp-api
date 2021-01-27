const validator = require('validator')
const HttpStatus = require('http-status-codes')

const billValidator = {
  addBill: async (req, res, next) => {
    let {
      body: { amountDue, balanceAmount, dueDate, payee, filename, imageUrl }
    } = req

    if (!amountDue) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Error: Amount Due Required' })
    }

    if (!balanceAmount) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Error: Balance Amount Required' })
    }

    if (!dueDate) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Error: Due Date Required' })
    }

    if (!validator.isDate(dueDate)) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Error: Invalid Due Date' })
    }

    if (!payee) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Error: Payee Required' })
    }

    Object.assign(req.body, { amountDue, balanceAmount, dueDate, payee, filename, imageUrl })

    return next()
  },

  payBill: async (req, res, next) => {
    let {
      body: { _id, paymentAmount, paymentDate, paymentMethod, note }
    } = req

    if (!_id) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Error: Required' })
    }

    if (!paymentAmount) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Error: Payment Amount Required' })
    }

    if (!paymentDate) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Error: Payment Date Required' })
    }

    Object.assign(req.body, { _id, paymentAmount, paymentDate, paymentMethod, note })

    return next()
  }
}

module.exports = billValidator
