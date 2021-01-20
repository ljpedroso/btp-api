const HttpStatus = require('http-status-codes')
const BillModel = require('@app/module/bill/bill')
const isEmpty = require('lodash/isEmpty')

const billController = {
  getAll: async (req, res) => {
    let bills
    let filters = {}
    if (!isEmpty(req.query.paid) && (req.query.paid === 'true' || req.query.paid === 'false')) {
      filters.paid = req.query.paid === 'true' ? true : false
    }

    bills = await BillModel.find(filters)
      .populate('payee')
      .sort([['dueDate', 1]])
      .exec()
    return res.status(HttpStatus.OK).json(bills)
  },
  getById: async (req, res) => {
    let bill
    try {
      bill = await BillModel.findById(req.params.id)
      if (bill === null) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Bill not found' })
      }
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json(error)
    }
    return res.status(HttpStatus.OK).json(bill)
  },
  addBill: async (req, res) => {
    let billWithPayee
    let newBill = new BillModel({
      amountDue: req.body.amountDue,
      balanceAmount: req.body.balanceAmount,
      dueDate: req.body.dueDate,
      payee: req.body.payee
    })
    try {
      await BillModel.create(newBill)
      billWithPayee = await BillModel.findById(newBill._id).populate('payee')
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json(error)
    }
    return res.status(HttpStatus.OK).json(billWithPayee)
  },
  updateBill: async (req, res) => {
    let billWithPayee
    try {
      let bill = await BillModel.findById(req.params.id)
      if (bill === null) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Bill not found' })
      } else {
        bill.amountDue = req.body.amountDue
        bill.balanceAmount = req.body.balanceAmount
        bill.dueDate = req.body.dueDate
        bill.payee = req.body.payee
        await bill.save()
        billWithPayee = await BillModel.findById(bill._id).populate('payee')
      }
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json(error)
    }
    return res.status(HttpStatus.OK).json(billWithPayee)
  },
  payBill: async (req, res) => {
    let billWithPayee
    try {
      let bill = await BillModel.findById(req.params.id)
      if (bill === null) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Bill not found' })
      } else {
        bill.paymentAmount = req.body.paymentAmount
        bill.paymentDate = req.body.paymentDate
        bill.paymentMethod = req.body.paymentMethod
        bill.note = req.body.note
        bill.paid = true
        await bill.save()
        billWithPayee = await BillModel.findById(bill._id).populate('payee')
      }
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json(error)
    }
    return res.status(HttpStatus.OK).json(billWithPayee)
  },
  deleteBill: async (req, res) => {
    let bill
    try {
      bill = await BillModel.findById(req.params.id)
      if (bill === null) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Bill not found' })
      } else {
        await bill.deleteOne()
      }
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json(error)
    }
    return res.status(HttpStatus.OK).json({ success: true, data: bill })
  }
}

module.exports = billController
