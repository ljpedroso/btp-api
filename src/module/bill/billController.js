const HttpStatus = require('http-status-codes')
const BillModel = require('@app/module/bill/bill')
const FileModel = require('@app/module/bill/file')
const isEmpty = require('lodash/isEmpty')
//const AWS = require('aws-sdk')

//const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com')
// const s3 = new AWS.S3({
//   endpoint: spacesEndpoint,
//   accessKeyId: process.env.SPACES_KEY,
//   secretAccessKey: process.env.SPACES_SECRET
// })

const billController = {
  getAll: async (req, res) => {
    let bills
    let filters = {}
    if (!isEmpty(req.query.paid) && (req.query.paid === 'true' || req.query.paid === 'false')) {
      filters.paid = req.query.paid === 'true' ? true : false
    }

    bills = await BillModel.find(filters)
      .populate(['payee', 'file'])
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
      payee: req.body.payee,
      file: req.body.file
    })
    console.log('new bill', newBill)
    try {
      await BillModel.create(newBill)
      billWithPayee = await BillModel.findById(newBill._id).populate(['payee', 'file'])
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
        bill.file = req.body.file
        await bill.save()
        billWithPayee = await BillModel.findById(bill._id).populate(['payee', 'file'])
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
        billWithPayee = await BillModel.findById(bill._id).populate(['payee', 'file'])
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
  },
  uploadBillFile: async (req, res) => {
    // const baseUrl = 'https://btp-storage.nyc3.digitaloceanspaces.com/'
    const file = req.files.file
    // var params = {
    //   Bucket: 'btp-storage',
    //   Key: file.name,
    //   Body: file.data,
    //   ACL: 'public-read'
    // }

    let newFile = new FileModel({
      data: file.data,
      contentType: 'image/jpeg'
    })
    try {
      await FileModel.create(newFile)
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json(error)
    }
    return res.status(HttpStatus.OK).json(newFile)
  }

  //   s3.putObject(params, (err, data) => {
  //     if (err) res.status(HttpStatus.BAD_REQUEST).json(err)
  //     return res
  //       .status(HttpStatus.OK)
  //       .json({ filename: file.name, url: baseUrl + file.name, etag: data.ETag })
  //   })
  // }
}

module.exports = billController
