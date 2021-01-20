const validator = require('validator')
const HttpStatus = require('http-status-codes')

const payeeValidator = {
  addPayee: async (req, res, next) => {
    let {
      body: { name, frequency }
    } = req

    if (!name) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Error: name' })
    }
    name = validator.trim(name)

    if (!frequency) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Error: frequency' })
    }

    Object.assign(req.body, { name, frequency })

    return next()
  },
  updatePayee: async (req, res, next) => {
    let {
      params: { id }
    } = req

    let {
      body: { name, frequency }
    } = req

    if (!id) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Error: id' })
    }

    if (!name) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Error: name' })
    }
    name = validator.trim(name)

    if (!frequency) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Error: frequency' })
    }

    Object.assign(req.body, { name, frequency })

    return next()
  }
}

module.exports = payeeValidator
