const HttpStatus = require('http-status-codes')
const PayeeModel = require('@app/module/payee/payee')
const CategoryModel = require('@app/module/category/category')

const payeeController = {
  getAll: async (req, res) => {
    const payees = await PayeeModel.find({ user: req.context.user })
      .sort([['name', 1]])
      .exec()

    return res.status(HttpStatus.OK).json(payees)
  },
  getById: async (req, res) => {
    let payee
    try {
      payee = await PayeeModel.findById(req.params.id)
      if (payee === null) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Payee not found' })
      }
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json(error)
    }
    return res.status(HttpStatus.OK).json(payee)
  },
  addPayee: async (req, res) => {
    const category = await CategoryModel.findById(req.body.category)
    let newPayee = new PayeeModel({
      name: req.body.name,
      url: req.body.url,
      frequency: req.body.frequency,
      category: category,
      user: req.body.user
    })
    try {
      await PayeeModel.create(newPayee)
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json(error)
    }
    return res.status(HttpStatus.OK).json(newPayee)
  },
  updatePayee: async (req, res) => {
    let payee
    try {
      let payee = await PayeeModel.findById(req.params.id)
      const category = await CategoryModel.findById(req.body.category)
      if (payee === null) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Payee not found' })
      } else {
        payee.name = req.body.name
        payee.url = req.body.url
        payee.frequency = req.body.frequency
        payee.category = category
        payee.user = req.body.user
        await payee.save()
      }
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json(error)
    }
    return res.status(HttpStatus.OK).json(payee)
  },
  deletePayee: async (req, res) => {
    let payee
    try {
      payee = await PayeeModel.findById(req.params.id)
      if (payee === null) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Payee not found' })
      } else {
        await payee.deleteOne()
      }
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json(error)
    }
    return res.status(HttpStatus.OK).json({ success: true, data: payee })
  }
}

module.exports = payeeController
